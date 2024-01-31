import { useState } from 'react';

// import "./App.css";

const oauthLink = `https://github.com/login/oauth/authorize?client_id=${
  import.meta.env.VITE_CLIENT_ID
}&scope=public_repo`;
//
// &redirect_uri=${import.meta.env.VITE_REDIRECT_URI}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
      >{`Counter: ${count}`}</button>
      <a href={oauthLink} className="github-button">
        Sign in with GitHub
      </a>
    </>
  );
}

export default App;
