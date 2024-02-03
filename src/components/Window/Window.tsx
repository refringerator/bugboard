import './Window.css';
import useResizeElement from 'src/hooks/useResizeElement';
import useMoveElement from 'src/hooks/useMoveElement';
import { useDispatch } from 'react-redux';
import { setWindowState } from 'src/redux/windowsSlice';
import { ReactElement, cloneElement, isValidElement, useMemo } from 'react';

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
}: IWindowProps) {
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

  return (
    <div
      className="window"
      onMouseDown={() => onWindowFocus(id)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: curWidth + 2,
        height: curHeight + 2,
        zIndex,
      }}
    >
      <div
        className="window__header"
        onMouseDown={handleMouseDownMove}
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
      <div className="window__content" onMouseDown={handleMouseDownResize}>
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
  icon: '',
  onCloseClick: () => {},
  onWindowFocus: () => {},
};

export default Window;
