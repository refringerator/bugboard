import { useRef, useState, MouseEventHandler } from 'react';
import './Window.css';
import useResizeElement from 'src/hooks/useResizeElement';

interface MainMenuProps {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

function Window({
  minWidth = 100,
  minHeight = 80,
  width = 200,
  height = 150,
}: MainMenuProps) {
  const {
    handleMouseDown: handleMouseDownResize,
    width: curWidth,
    height: curHeight,
  } = useResizeElement({ minWidth, minHeight, width, height });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isGrabbing, setGrabbing] = useState(false);

  const isDragging = useRef(false);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setGrabbing(true);
    isDragging.current = true;
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleMouseMove = (ev: MouseEvent) => {
      if (isDragging.current) {
        setPosition({ x: ev.clientX - offsetX, y: ev.clientY - offsetY });
      }
    };

    const handleMouseUp = () => {
      // setDragging(false);
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setGrabbing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="window"
      style={{
        position: 'absolute',

        left: position.x,
        top: position.y,
        width: curWidth + 2,
        height: curHeight + 2,
      }}
    >
      <div
        className="window__header"
        onMouseDown={handleMouseDown}
        style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
      >
        header
      </div>
      <div className="window__content" onMouseDown={handleMouseDownResize}>
        content
      </div>
    </div>
  );
}

Window.defaultProps = {
  minWidth: 100,
  minHeight: 80,
  width: 200,
  height: 150,
};

export default Window;
