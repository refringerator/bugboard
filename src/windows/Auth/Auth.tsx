const oauthLink = `https://github.com/login/oauth/authorize?client_id=${
  import.meta.env.VITE_CLIENT_ID
}&scope=public_repo`;

function Auth() {
  const currentUri = window.location.origin + window.location.pathname;
  const encodedUri = btoa(encodeURIComponent(`${currentUri}#oauth-callback`));

  const fullOathLink = `${oauthLink}&state=${encodedUri}`;

  const onClick = () => {
    console.log('CLICK: сохранить настройки в стор и перейти по ссылке');
  };

  return (
    <a onClick={onClick} href={fullOathLink} className="github-button">
      Sign in with GitHub
    </a>
  );
}

export default Auth;
