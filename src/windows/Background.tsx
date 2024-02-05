import { memo, useContext } from 'react';
import WindowsContext from 'src/context/WindowsContext';

interface Props {
  color: string;
}

const Background = memo(({ color }: Props) => {
  const { changeWindowProps } = useContext(WindowsContext);

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
