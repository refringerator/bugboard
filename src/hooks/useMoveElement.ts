import { useRef, useState, MouseEventHandler } from 'react';

interface UseMoveProps {
  startX?: number;
  startY?: number;
}

function useMoveElement({ startX = 100, startY = 100 }: UseMoveProps) {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [isGrabbing, setGrabbing] = useState(false);

  const isDragging = useRef(false);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setGrabbing(true);
    isDragging.current = true;
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;

    const handleMouseMove = (mouseEvent: MouseEvent) => {
      if (isDragging.current) {
        setPosition({
          x: mouseEvent.clientX - offsetX,
          y: mouseEvent.clientY - offsetY,
        });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setGrabbing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return {
    position,
    isGrabbing,
    handleMouseDown,
  };

  //   (

  //     <div
  //       className="window"
  //       style={{
  //         position: 'absolute',

  //         left: position.x,
  //         top: position.y,
  //         width: curWidth + 2,
  //         height: curHeight + 2,
  //       }}
  //     >
  //       <div
  //         className="window__header"
  //         onMouseDown={handleMouseDown}
  //         style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
  //       >
  //         header
  //       </div>
  //       <div className="window__content" onMouseDown={handleMouseDownResize}>
  //         content
  //       </div>
  //     </div>
  //   );
}

useMoveElement.defaultProps = {
  startX: 100,
  startY: 100,
};

export default useMoveElement;
