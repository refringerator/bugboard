import MainMenu from 'src/components/MainWindow/MainMenu/MainMenu';
import MainHeader from 'src/components/MainWindow/MainHeader/MainHeader';
import WindowsControlPanel from 'src/components/MainWindow/WindowsControlPanel/WindowsControlPanel';
import Window, { IWindowProps } from 'src/components/Window/Window';
import ContextMenu from 'src/components/ContextMenu/ContextMenu';

import { useRef, useState } from 'react';
import type { RootState } from 'src/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from 'src/redux/counterSlice';

import { windowsSelectors } from 'src/redux/windowsSlice';
import { Outlet } from 'react-router-dom';
import useContextMenu from 'src/hooks/useContextMenu';
import CounterWindow from '../CounterWindow';

const windows = [
  { id: '1', title: 'window 1', content: 'content 1', zIndex: 5 },
  { id: '2', title: 'window 2', content: 'content 2', zIndex: 5 },
];

function MainScreen() {
  const [wins, setWins] = useState<IWindowProps[]>(windows);
  const [zIndex, setZIndex] = useState(10);
  const { cm, cmCoords, hideMenu } = useContextMenu();
  const winId = useRef(3);
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  const windowsState = useSelector(windowsSelectors.get);

  const handleOpenCounterWindow = () => {
    const windowId = 'CounterWindow';

    const ws = windowsState.find((w) => w.id === windowId);

    setWins([
      ...wins.filter((window) => window.id !== windowId),
      {
        id: windowId,
        title: 'Counter Window',
        content: <CounterWindow />,
        zIndex,
        ...ws,
      },
    ]);
    setZIndex((val) => val + 1);
  };

  const onClose = () => {
    setWins([]);
    // console.log('Close button clicked');
  };

  const onCloseClick = (windowId: string) => {
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
        zIndex: 5,
      },
    ]);
  };

  const menuElements = [
    { id: '1', title: 'Открыть Счетчик', onClick: handleOpenCounterWindow },
    { id: '2', title: 'Что-то еще', onClick: genNewWindows },
    { id: '3', title: 'Выход', onClick: () => dispatch(increment()) },
  ];

  const controlElements = [
    { id: '1', title: 'Окно 1', icon: 'vite.svg' },
    { id: '2', title: 'Окно 2' },
    { id: '3', title: 'Окно 3', icon: 'bug.svg' },
  ];

  return (
    <>
      <MainHeader
        title={`BugBoard ${count}`}
        icon="bug.svg"
        onClick={onClose}
      />
      <MainMenu menuElements={menuElements} />
      {cm && (
        <ContextMenu
          startX={cmCoords.x}
          startY={cmCoords.y}
          onCloseClick={hideMenu}
        />
      )}

      {wins.map((window: IWindowProps, index) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          content={window.content}
          zIndex={window.zIndex}
          onCloseClick={onCloseClick}
          onWindowFocus={onActive}
          startX={window.startX ? window.startX : 100 + index * 25}
          startY={window.startY ? window.startY : 100 + index * 25}
          height={window.height ? window.height : undefined}
          width={window.width ? window.width : undefined}
        />
      ))}

      <Outlet />

      <WindowsControlPanel controlPanelElements={controlElements} />
    </>
  );
}

export default MainScreen;
