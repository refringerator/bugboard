import './Window.css';
import useResizeElement from 'src/hooks/useResizeElement';
import useMoveElement from 'src/hooks/useMoveElement';
import { useDispatch } from 'react-redux';
import { setWindowState } from 'src/redux/windowsSlice';
import {
  DragEventHandler,
  ReactElement,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from 'react';

export interface IWindowProps {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  id: string;
  title: string;
  icon?: string;
  content: React.ReactNode;
  zIndex?: number;
  startX?: number;
  startY?: number;
  position?: { x: number; y: number };
  onCloseClick?: (id: string) => void;
  onWindowFocus?: (id: string) => void;
}

function Window({
  minWidth = 100,
  minHeight = 80,
  width = 200,
  height = 150,
  id,
  title,
  icon,
  content,
  zIndex,
  onCloseClick = () => {},
  onWindowFocus = () => {},
  startX,
  startY,
  position: curPosition,
}: IWindowProps) {
  const [isDragable, setIsDragable] = useState(false);
  const dispatch = useDispatch();
  const {
    handleMouseDown: handleMouseDownResize,
    width: curWidth,
    height: curHeight,
  } = useResizeElement({ minWidth, minHeight, width, height });

  const {
    handleMouseDown: handleMouseDownMove,
    isGrabbing,
    position,
  } = useMoveElement({ startX, startY });

  const onWindowClode = () => {
    dispatch(
      setWindowState({
        id,
        width: curWidth,
        height: curHeight,
        startX: position.x,
        startY: position.y,
      })
    );
    onCloseClick(id);
  };

  const clonedContent = useMemo(() => {
    const cloned = isValidElement(content)
      ? cloneElement(content as ReactElement, { windowId: id })
      : content;

    return cloned;
  }, [content, id]);

  const onMouseUp = () => {
    window.removeEventListener('mouseup', onMouseUp);
    (bg as HTMLElement).style.zIndex = '1';
    setIsDragable(false);
  };
  const onMouseDown = () => {
    window.addEventListener('mouseup', onMouseUp);
    setIsDragable(true);
  };
  const onDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    (bg as HTMLElement).style.zIndex = '10000';

    console.log({ ev_target: ev });
    console.log({
      l: ev.target.offsetLeft,
      t: ev.target.offsetTop,
      x: ev.pageX,
      y: ev.pageY,
    });
    // const
    ev.dataTransfer.setData(
      'text',
      JSON.stringify({
        id,
        x: ev.pageX - ev.target.offsetLeft,
        y: ev.pageY - ev.target.offsetTop,
      })
    );
  };

  return (
    <div
      draggable={isDragable}
      onDragStart={onDragStart}
      className="window"
      onMouseDown={() => onWindowFocus(id)}
      style={{
        position: 'absolute',
        left: curPosition ? curPosition.x : position.x,
        top: curPosition ? curPosition.y : position.y,
        width: curWidth + 2,
        height: curHeight + 2,
        zIndex,
      }}
    >
      <div
        className="window__header"
        // onMouseDown={handleMouseDownMove}
        onMouseDown={onMouseDown}
        style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
      >
        {icon && <img className="footer__icon" src={icon} alt="" />}
        <div>{title}</div>
        <div>
          <button
            type="button"
            onClick={onWindowClode}
            className="header__button"
          >
            X
          </button>
        </div>
      </div>
      <div
        className="window__content"
        onMouseDown={(ev) => {
          if (!isDragable) handleMouseDownResize(ev);
        }}
      >
        {clonedContent}
      </div>
    </div>
  );
}

Window.defaultProps = {
  minWidth: 100,
  minHeight: 80,
  width: 200,
  height: 150,
  zIndex: 5,
  startX: 100,
  startY: 100,
  position: { x: 100, y: 100 },
  icon: '',
  onCloseClick: () => {},
  onWindowFocus: () => {},
};

export default Window;
