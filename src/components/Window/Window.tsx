import {
  ReactElement,
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { useResizeElement, useMoveElement } from 'src/hooks';
import { setWindowState } from 'src/store/windowsSlice';

import './Window.css';

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
    // handleMouseDown: HandleMouseDownMove,
    isGrabbing,
    position,
  } = useMoveElement({ startX, startY });

  const bg = useRef(document.getElementById('bg'));
  if (!bg.current) bg.current = document.getElementById('bg');

  const onWindowClose = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, curWidth, curHeight, position, onCloseClick]);

  const clonedContent = useMemo(() => {
    const cloned = isValidElement(content)
      ? cloneElement(content as ReactElement, { windowId: id, onWindowClose })
      : content;

    return cloned;
  }, [content, id, onWindowClose]);

  const onMouseUp = () => {
    window.removeEventListener('mouseup', onMouseUp);
    // const el = bg.current?.style;
    // if (el) el.zIndex = '1';
    setIsDragable(false);
  };
  const onMouseDown = () => {
    window.addEventListener('mouseup', onMouseUp);
    setIsDragable(true);
  };
  const onDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
    // const el = bg.current?.style;
    // if (el) el.zIndex = '100000';

    //    bg.current?.style.setProperty('zIndex', '100000');

    // console.log(bg.current?.style);
    console.log({ ev_target: ev });
    console.log({
      l: ev.currentTarget.offsetLeft,
      t: ev.currentTarget.offsetTop,
      x: ev.pageX,
      y: ev.pageY,
    });
    // const
    ev.dataTransfer.setData(
      'text',
      JSON.stringify({
        id,
        instanceId: (
          window as Window & typeof globalThis & { instanceId: string }
        ).instanceId,
        x: ev.pageX - ev.currentTarget.offsetLeft,
        y: ev.pageY - ev.currentTarget.offsetTop,
        width: curWidth + 2,
        height: curHeight + 2,
        content: encodeURIComponent(
          (ev.target as EventTarget & HTMLDivElement).lastElementChild
            ?.innerHTML || ''
        ),
        title: encodeURIComponent(title),
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
            onClick={onWindowClose}
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
