import { useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  MainMenu,
  MainHeader,
  WindowsControlPanel,
  Window,
  IWindowProps,
  ContextMenu,
} from 'src/components';

import { useContextMenu, useWindows } from 'src/hooks';
import { WindowsContext } from 'src/context';
import {
  CounterWindowContent,
  SettingsWindowContent,
  IssuesListWindowContent,
  IssueWindowContent,
  Background,
} from 'src/windows';
import { useSelector } from 'react-redux';
import { selectToken, tokenThunks, useTypedDispatch } from 'src/store';

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
  // console.log('Main screen render');
  const token = useSelector(selectToken);
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
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const menuElements = [
    {
      id: '1',
      title: 'Открыть Счетчик',
      onClick: () => openWindow(CounterWindowContent),
    },
    { id: '2', title: 'Добавить окно', onClick: () => genNewWindows() },
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
  ];

  if (token)
    menuElements.push({
      id: '99',
      title: 'Выход',
      onClick: () => {
        console.log('exit');
        dispatch(tokenThunks.resetTokenThunk());
      },
    });
  else
    menuElements.push({
      id: '98',
      title: 'Вход',
      onClick: () => {
        navigate('auth');
      },
    });

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
          height={window.height ? window.height : undefined}
          width={window.width ? window.width : undefined}
          minHeight={window?.minHeight}
          minWidth={window?.minWidth}
          startX={window.startX ? window.startX : 100 + index * 25}
          startY={window.startY ? window.startY : 100 + index * 25}
          position={
            window?.position || {
              x: window.startX ? window.startX : 100 + index * 25,
              y: window.startY ? window.startY : 100 + index * 25,
            }
          }
        />
      ))}

      <Outlet />
      <Background color="#7d8a96" />

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
