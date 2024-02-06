import { memo, useContext } from 'react';
import { WindowsContext } from 'src/context';

interface Props {
  color: string;
}

function MyComponent({ innerHTML }: { innerHTML: string }) {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: innerHTML }} />;
}

export const Background = memo(({ color }: Props) => {
  const { changeWindowProps, genNewWindows } = useContext(WindowsContext);

  function allowDrop(ev: React.DragEvent) {
    ev.preventDefault();
  }

  function drop(ev: React.DragEvent) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    console.log({ ev, data, color });

    const d = JSON.parse(data);

    if (
      d.instanceId ===
      (window as Window & typeof globalThis & { instanceId: string }).instanceId
    ) {
      console.log('same window');
      changeWindowProps(d.id, { newX: ev.pageX - d.x, newY: ev.pageY - d.y });
    } else {
      console.log('another window');
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
    >
      1234
    </div>
  );
});

Background.displayName = '1234';

export default Background;
