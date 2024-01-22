import './Window.css';
import useResizeElement from 'src/hooks/useResizeElement';
import useMoveElement from 'src/hooks/useMoveElement';

interface WindowProps {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  id: string;
  title: string;
  content: string;
  onCloseClick: (id: string) => void;
}

function Window({
  minWidth = 100,
  minHeight = 80,
  width = 200,
  height = 150,
  id,
  title,
  content,
  onCloseClick,
}: WindowProps) {
  const {
    handleMouseDown: handleMouseDownResize,
    width: curWidth,
    height: curHeight,
  } = useResizeElement({ minWidth, minHeight, width, height });

  const {
    handleMouseDown: handleMouseDownMove,
    isGrabbing,
    position,
  } = useMoveElement({ startX: 100, startY: 100 });

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
        onMouseDown={handleMouseDownMove}
        style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
      >
        <div>{title}</div>
        <div>
          <button
            type="button"
            onClick={() => onCloseClick(id)}
            className="header__button"
          >
            X
          </button>
        </div>
      </div>
      <div className="window__content" onMouseDown={handleMouseDownResize}>
        {content}
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
