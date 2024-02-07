const oauthLink = `https://github.com/login/oauth/authorize?client_id=${
  import.meta.env.VITE_CLIENT_ID
}&scope=public_repo`;

interface ISettingsWindow {
  windowId?: string;
  onWindowClose?: () => void;
}

function Auth({ windowId: _winId = '', onWindowClose }: ISettingsWindow) {
  const currentUri = window.location.origin + window.location.pathname;
  const encodedUri = btoa(encodeURIComponent(`${currentUri}#oauth-callback`));

  const fullOathLink = `${oauthLink}&state=${encodedUri}`;

  const onClick = () => {
    console.log('CLICK: сохранить настройки в стор и перейти по ссылке');

    window.location.href = fullOathLink;
  };

  return (
    <>
      <button type="button" onClick={onClick}>
        Подключиться через ГитХаб
      </button>
      <button type="button" onClick={onWindowClose}>
        Отмена
      </button>
    </>
  );
}

Auth.defaultProps = {
  windowId: '',
  onWindowClose: () => {},
};

Auth.windowId = 'AuthWindow';
Auth.title = 'Вход';

export default Auth;
