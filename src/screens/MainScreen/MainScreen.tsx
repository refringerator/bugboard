import MainMenu from 'src/components/MainWindow/MainMenu/MainMenu';
import MainHeader from 'src/components/MainWindow/MainHeader/MainHeader';
import WindowsControlPanel from 'src/components/MainWindow/WindowsControlPanel/WindowsControlPanel';

function MainScreen() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <MainHeader title="BugBoard" icon="vite.svg" />
      <MainMenu />
      <WindowsControlPanel />
      {/* <button onClick={() => setCount(count + 1)}>{`Counter: ${count}`}</button> */}
      {/* <a href={oauth_link} className="github-button">
        Sign in with GitHub
      </a> */}
    </>
  );
}

export default MainScreen;
