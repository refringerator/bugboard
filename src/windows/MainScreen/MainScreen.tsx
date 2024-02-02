import MainMenu from 'src/components/MainWindow/MainMenu/MainMenu';
import MainHeader from 'src/components/MainWindow/MainHeader/MainHeader';
import WindowsControlPanel from 'src/components/MainWindow/WindowsControlPanel/WindowsControlPanel';
import Window, { IWindowProps } from 'src/components/Window/Window';
import ContextMenu from 'src/components/ContextMenu/ContextMenu';

import type { RootState } from 'src/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from 'src/redux/counterSlice';

import { Outlet } from 'react-router-dom';
import useContextMenu from 'src/hooks/useContextMenu';
import useWindows from 'src/hooks/useWindows';
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
    windows,
  } = useWindows({ windows: startWindows });

  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (issueWindow as any).params = { number: 7 };
        openWindow(issueWindow);
      },
    },
    { id: '99', title: 'Выход', onClick: () => dispatch(increment()) },
  ];

  return (
    <>
      <MainHeader
        title={`BugBoard ${count}`}
        icon="bug.svg"
        onClick={closeAllWindows}
      />
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
    </>
  );
}

export default MainScreen;
