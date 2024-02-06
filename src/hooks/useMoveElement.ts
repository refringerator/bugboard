import { useRef, useState, MouseEventHandler } from 'react';

interface UseMoveProps {
  startX?: number;
  startY?: number;
}

export function useMoveElement({ startX = 100, startY = 100 }: UseMoveProps) {
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
}

useMoveElement.defaultProps = {
  startX: 100,
  startY: 100,
};

export default useMoveElement;
