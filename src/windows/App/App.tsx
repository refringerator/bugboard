import { useState } from 'react';

const oauthLink = `https://github.com/login/oauth/authorize?client_id=${
  import.meta.env.VITE_CLIENT_ID
}&scope=public_repo`;
//
// &redirect_uri=${import.meta.env.VITE_REDIRECT_URI}

function App() {
  const [count, setCount] = useState(0);

  const currentUri = window.location.origin + window.location.pathname;
  const encodedUri = btoa(encodeURIComponent(`${currentUri}#oauth-callback`));

  const fullOathLink = `${oauthLink}&state=${encodedUri}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setCount(count + 1)}
      >{`Counter: ${count}`}</button>
      <a href={fullOathLink} className="github-button">
        Sign in with GitHub
      </a>
    </>
  );
}

export default App;
