import { memo, useContext } from 'react';
import { useSelector } from 'react-redux';

import { WindowsContext } from 'src/context';
import { settingsSelectors } from 'src/store/settingsSlice';

interface Props {
  color: string;
}

function MyComponent({ innerHTML }: { innerHTML: string }) {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: innerHTML }} />;
}

const Background = memo(({ color: _color }: Props) => {
  const { changeWindowProps, genNewWindows } = useContext(WindowsContext);
  const isDragAndDropEnable = useSelector(settingsSelectors.getDragAndDrop);

  function allowDrop(ev: React.DragEvent) {
    // Включить драг и дроп в зависимости от настроек
    if (isDragAndDropEnable) ev.preventDefault();
  }

  function drop(ev: React.DragEvent) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    // console.log({ ev, data, _color });

    const d = JSON.parse(data);

    if (
      d.instanceId ===
      (window as Window & typeof globalThis & { instanceId: string }).instanceId
    ) {
      // console.log('same window');
      changeWindowProps(d.id, { newX: ev.pageX - d.x, newY: ev.pageY - d.y });
    } else {
      // console.log('another window');
      genNewWindows(
        `${d.instanceId}_${d.id}`,
        decodeURIComponent(d.title),
        <MyComponent innerHTML={decodeURIComponent(d.content)} />,
        {
          newX: ev.pageX - d.x,
          newY: ev.pageY - d.y,
          width: d.width,
          height: d.height,
        }
      );
    }
  }

  return (
    <div
      id="bg"
      onDrop={(event) => drop(event)}
      onDragOver={(event) => allowDrop(event)}
      style={{
        // backgroundColor: color || 'fff',
        backgroundColor: 'none',
        flex: '1 1 auto',
        height: '100%',
      }}
    />
  );
});

Background.displayName = 'Background';

export default Background;
