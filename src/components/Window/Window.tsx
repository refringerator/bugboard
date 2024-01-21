import { useState, useRef, MouseEventHandler } from 'react';
import './Window.css';

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
  const [winSize, setWinSize] = useState({ width, height });
  const isResizing = useRef(false);
  const iSize = useRef<{ height: number; width: number; x: number; y: number }>(
    { height: 0, width: 0, x: 0, y: 0 }
  );

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = iSize.current.width + (event.screenX - iSize.current.x);
      const newHeight =
        iSize.current.height + (event.screenY - iSize.current.y);

      if (!Number.isNaN(newWidth) && !Number.isNaN(newWidth)) {
        setWinSize({
          width: Math.max(newWidth, minWidth),
          height: Math.max(newHeight, minHeight),
        });
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    isResizing.current = true;

    iSize.current = {
      x: event.screenX,
      y: event.screenY,
      width: winSize.width,
      height: winSize.height,
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="window"
      //   onMouseEnter={ome}
      //   onMouseLeave={oml}
      onMouseDown={handleMouseDown}
      //   onMouseUp={omu}
      style={{
        // position: 'absolute',
        width: winSize.width + 2,
        height: winSize.height + 2,
      }}
    >
      <div className="window__header">header</div>
      <div className="window__content">content</div>
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
