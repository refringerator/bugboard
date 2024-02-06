import MainMenu from 'src/components/MainWindow/MainMenu/MainMenu';
import MainHeader from 'src/components/MainWindow/MainHeader/MainHeader';
import WindowsControlPanel from 'src/components/MainWindow/WindowsControlPanel/WindowsControlPanel';
import Window, { IWindowProps } from 'src/components/Window/Window';
import ContextMenu from 'src/components/ContextMenu/ContextMenu';

import { Outlet } from 'react-router-dom';
import useContextMenu from 'src/hooks/useContextMenu';
import useWindows from 'src/hooks/useWindows';
import { WindowsContext } from 'src/context';
import { useMemo } from 'react';
import CounterWindowContent from '../CounterWindowContent';
import SettingsWindowContent from '../SettingsWindowContent';
import IssuesListWindowContent from '../IssuesListWindowContent';
import IssueWindowContent from '../IssueWindowContent';

const startWindows = [
  {
    id: '1',
    title: 'window 1',
    content: 'content 1',
    zIndex: 5,
    icon: 'vite.svg',
  },
  {
    id: '2',
    title: 'window 2',
    content: 'content 2',
    zIndex: 5,
    icon: 'bug.svg',
  },
];

function MainScreen() {
  const { cm, cmCoords, hideMenu } = useContextMenu();
  const {
    openWindow,
    genNewWindows,
    onWindowClose,
    closeAllWindows,
    onActive,
    changeWindowProps,
    windows,
  } = useWindows({ windows: startWindows });

  // const dispatch = useDispatch();

  console.log('Main screen render');

  const menuElements = [
    {
      id: '1',
      title: 'Открыть Счетчик',
      onClick: () => openWindow(CounterWindowContent),
    },
    { id: '2', title: 'Добавить окно', onClick: genNewWindows },
    {
      id: '3',
      title: 'Настройки',
      onClick: () => openWindow(SettingsWindowContent),
    },
    {
      id: '4',
      title: 'Список задач',
      onClick: () => openWindow(IssuesListWindowContent),
    },
    {
      id: '5',
      title: 'Новая задача',
      onClick: () => {
        const issueWindow = IssueWindowContent;
        const issueNumber = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (issueWindow as any).params = {
          number: issueNumber,
          id: `${issueWindow.windowId}_${issueNumber}`,
        };
        issueWindow.title = `Создание новой задачи`;
        openWindow(issueWindow);
      },
    },
    {
      id: '99',
      title: 'Выход',
      onClick: () => {
        console.log('exit');
      },
    },
  ];

  return (
    <WindowsContext.Provider
      value={useMemo(
        () => ({
          closeWindow: onWindowClose,
          openWindow,
          changeWindowProps,
          genNewWindows,
        }),
        [openWindow, onWindowClose, changeWindowProps, genNewWindows]
      )}
    >
      <MainHeader title="BugBoard" icon="bug.svg" onClick={closeAllWindows} />
      <MainMenu menuElements={menuElements} />
      {cm && (
        <ContextMenu
          startX={cmCoords.x}
          startY={cmCoords.y}
          onCloseClick={hideMenu}
        />
      )}

      {windows.map((window: IWindowProps, index) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          content={window.content}
          zIndex={window.zIndex}
          onCloseClick={onWindowClose}
          onWindowFocus={onActive}
          startX={window.startX ? window.startX : 100 + index * 25}
          startY={window.startY ? window.startY : 100 + index * 25}
          height={window.height ? window.height : undefined}
          width={window.width ? window.width : undefined}
          minHeight={window?.minHeight}
          minWidth={window?.minWidth}
          position={window?.position}
        />
      ))}

      <Outlet />

      <WindowsControlPanel
        controlPanelElements={windows.map(({ id, title, icon }) => ({
          id,
          title,
          icon,
        }))}
      />
    </WindowsContext.Provider>
  );
}

export default MainScreen;
