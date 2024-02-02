import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IWindowProps } from 'src/components/Window/Window';
import { windowsSelectors } from 'src/redux/windowsSlice';

interface IUseWindows {
  windows: IWindowProps[];
}

function useWindows({ windows }: IUseWindows) {
  const [wins, setWins] = useState<IWindowProps[]>(windows);
  const [zIndex, setZIndex] = useState(10);
  const winId = useRef(3);
  const windowsState = useSelector(windowsSelectors.get);

  const openWindow = (
    OpeningWindow: React.FC & {
      windowId: string;
      title: string;
      minHeight?: number;
      minWidth?: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params?: Record<string, any>;
    }
  ) => {
    const { windowId, title, minHeight, minWidth, params } = OpeningWindow;

    const ws = windowsState.find((w) => w.id === windowId);

    console.log(`Открываем окно ${windowId}`);

    setWins([
      ...wins.filter((window) => window.id !== windowId),
      {
        id: windowId,
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
    // console.log('Close button clicked');
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

  const genNewWindows = () => {
    winId.current += 1;
    setWins([
      ...wins,
      {
        id: `${winId.current}`,
        title: `window ${winId.current}`,
        content: `content ${winId.current}`,
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
  };
}

export default useWindows;
