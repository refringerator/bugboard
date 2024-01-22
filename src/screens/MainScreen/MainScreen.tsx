import MainMenu from 'src/components/MainWindow/MainMenu/MainMenu';
import MainHeader from 'src/components/MainWindow/MainHeader/MainHeader';
import WindowsControlPanel from 'src/components/MainWindow/WindowsControlPanel/WindowsControlPanel';
import Window from 'src/components/Window/Window';
import { useState } from 'react';

const windows = [
  { id: '1', title: 'window 1', content: 'content 1', zIndex: 5 },
  { id: '2', title: 'window 2', content: 'content 2', zIndex: 5 },
  { id: '3', title: 'window 3', content: 'content 3', zIndex: 5 },
];

function MainScreen() {
  const [wins, setWins] = useState(windows);
  const [zIndex, setZIndex] = useState(10);

  const onClose = () => {
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

  const menuElements = [
    { id: '1', title: 'Сообщить о баге' },
    { id: '2', title: 'Что-то еще' },
    { id: '3', title: 'Выход' },
  ];

  const controlElements = [
    { id: '1', title: 'Окно 1', icon: 'vite.svg' },
    { id: '2', title: 'Окно 2' },
    { id: '3', title: 'Окно 3', icon: 'bug.svg' },
  ];

  return (
    <>
      <MainHeader title="BugBoard" icon="bug.svg" onClick={onClose} />
      <MainMenu menuElements={menuElements} />

      {wins.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          content={window.content}
          zIndex={window.zIndex}
          onCloseClick={onCloseClick}
          onWindowFocus={onActive}
        />
      ))}

      <WindowsControlPanel controlPanelElements={controlElements} />
    </>
  );
}

export default MainScreen;
