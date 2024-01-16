import { useState } from "react";

import "./App.css";

const oauth_link = `https://github.com/login/oauth/authorize?client_id=${
  import.meta.env.VITE_CLIENT_ID
}`;
// &redirect_uri=${import.meta.env.VITE_REDIRECT_URI}
// &scope=user

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{`Counter: ${count}`}</button>
      <a href={oauth_link} className="github-button">
        Sign in with GitHub
      </a>
    </>
  );
}

export default App;
