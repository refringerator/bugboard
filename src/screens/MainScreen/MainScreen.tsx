import MainMenu from 'src/components/MainWindow/MainMenu/MainMenu';
import MainHeader from 'src/components/MainWindow/MainHeader/MainHeader';
import WindowsControlPanel from 'src/components/MainWindow/WindowsControlPanel/WindowsControlPanel';

function MainScreen() {
  const onClose = () => {
    console.log('Close button clicked');
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
      <WindowsControlPanel controlPanelElements={controlElements} />
    </>
  );
}

export default MainScreen;
