import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IWindowProps } from 'src/components/Window/Window';
import { windowsSelectors } from 'src/store/windowsSlice';

interface IUseWindows {
  windows: IWindowProps[];
}

export interface IOpeningWindow extends React.FC {
  windowId: string;
  title: string;
  minHeight?: number;
  minWidth?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}

export function useWindows({ windows }: IUseWindows) {
  const [wins, setWins] = useState<IWindowProps[]>(windows);
  const [zIndex, setZIndex] = useState(10);
  const winId = useRef(3);
  const windowsState = useSelector(windowsSelectors.get);

  const openWindow = (OpeningWindow: IOpeningWindow) => {
    const { windowId, title, minHeight, minWidth, params } = OpeningWindow;

    const owId = params?.id ? params?.id : windowId;

    const ws = windowsState.find((w) => w.id === owId);

    console.log(`Открываем окно ${owId}`);

    setWins([
      ...wins.filter((window) => window.id !== owId),
      {
        id: owId,
        title,
        // eslint-disable-next-line react/jsx-props-no-spreading
        content: <OpeningWindow {...params} />,
        zIndex,
        minHeight,
        minWidth,
        ...ws,
      },
    ]);
    setZIndex((val) => val + 1);
  };

  const closeAllWindows = () => {
    setWins([]);
  };

  const changeWindowProps = (
    windowId: string,
    props: { newTitle?: string; newId?: string; newX?: number; newY?: number }
  ) => {
    const newWins = wins.map((curWindow) => {
      if (curWindow.id !== windowId) return curWindow;

      const position =
        !!props.newX && !!props.newY ? { x: props.newX, y: props.newY } : null;

      return {
        ...curWindow,
        title: props.newTitle ? props.newTitle : curWindow.title,
        id: props.newId ? props.newId : curWindow.id,
        position: position || curWindow.position,
      };
    });
    setWins(newWins);
  };

  const onWindowClose = (windowId: string) => {
    setWins(wins.filter((window) => window.id !== windowId));
  };

  const onActive = (windowId: string) => {
    const newWins = wins.map((curWindow) => ({
      ...curWindow,
      zIndex: curWindow.id === windowId ? zIndex : curWindow.zIndex,
    }));
    setWins(newWins);
    setZIndex((val) => val + 1);
  };

  const genNewWindows = (
    id?: string,
    title?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any,
    props?: {
      newX?: number;
      newY?: number;
      height?: number;
      width?: number;
    }
  ) => {
    // Не создавать новое окно при существующем идентификаторе
    if (id && wins.find((el) => id === el.id) !== undefined) return;

    winId.current += 1;
    const position =
      props && props.newX && props.newY
        ? { x: props.newX, y: props.newY }
        : null;

    console.log({ position });

    setWins([
      ...wins,
      {
        id: id || `${winId.current}`,
        title: title || `window ${winId.current}`,
        content: content || `content ${winId.current}`,
        position: position || undefined,
        height: props?.height || undefined,
        width: props?.width || undefined,
        zIndex,
      },
    ]);

    setZIndex((val) => val + 1);
  };
  return {
    windows: wins,
    openWindow,
    genNewWindows,
    onWindowClose,
    closeAllWindows,
    onActive,
    changeWindowProps,
  };
}

export default useWindows;
