import MainMenu from 'src/components/MainWindow/MainMenu/MainMenu';
import MainHeader from 'src/components/MainWindow/MainHeader/MainHeader';
import WindowsControlPanel from 'src/components/MainWindow/WindowsControlPanel/WindowsControlPanel';
import Window from 'src/components/Window/Window';
import ContextMenu from 'src/components/ContextMenu/ContextMenu';

import { useEffect, useRef, useState } from 'react';
import type { RootState } from 'src/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'src/redux/counterSlice';

const windows = [
  { id: '1', title: 'window 1', content: 'content 1', zIndex: 5 },
  { id: '2', title: 'window 2', content: 'content 2', zIndex: 5 },
  { id: '3', title: 'window 3', content: 'content 3', zIndex: 5 },
];

function MainScreen() {
  const [wins, setWins] = useState(windows);
  const [zIndex, setZIndex] = useState(10);
  const [cm, setCm] = useState(false);
  const [cmCoords, setCmCoords] = useState({ x: 0, y: 0 });
  const winId = useRef(3);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault(); // Prevent the browser's default context menu
    setCmCoords({ x: event.pageX, y: event.pageY });
    setCm(true);
  };

  const handleHideContextMenu = () => {
    setCm(false);
  };

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleHideContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleHideContextMenu);
    };
  }, []);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const onClose = () => {
    setWins([]);
    console.log('Close button clicked');
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
    { id: '1', title: 'Сообщить о баге' },
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
          onCloseClick={() => setCm(false)}
        />
      )}

      {wins.map((window, index) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          content={window.content}
          zIndex={window.zIndex}
          onCloseClick={onCloseClick}
          onWindowFocus={onActive}
          startX={100 + index * 25}
          startY={100 + index * 25}
        />
      ))}

      <WindowsControlPanel controlPanelElements={controlElements} />
    </>
  );
}

export default MainScreen;