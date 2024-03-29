// TODO: поменять loader на нормальную функцию
// сейчас страница висит и ждет обработки этого лоадера
import { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import { WindowsContext } from 'src/context';
import { useUserMutation } from 'src/service/issues';
import { useTypedDispatch, tokenThunks } from 'src/store';

interface ILoader {
  request: Request;
}

async function loader({ request }: ILoader) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) return { error: 'Не был предоставлен code' };

  // TODO: выполняем проверку полученного state со значением из хранилища, например

  // Проверям в сессионном хранилище наш токен по коду
  const token = sessionStorage.getItem(code);
  if (token) return { accessToken: token };

  // тут выполнить запрос на лямбду для получения токена
  const response = await fetch(
    // TODO: положить в переменные окружения
    'https://qzdcusvmotytjzoctaga.supabase.co/functions/v1/gh-auth-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    }
  );

  let error;
  if (!response.ok) {
    error = `HTTP error! Status: ${response.status}`;
  }

  const { access_token: accessToken } = await response.json();

  // Записываем в сессионное хранилище код-токен
  if (accessToken) sessionStorage.setItem(code, accessToken);

  return { accessToken, error };
}

interface IMyWindow {
  text: string;
  onWindowClose?: () => void;
}

function MyComponent({ text, onWindowClose }: IMyWindow) {
  const navigate = useNavigate();

  return (
    <div>
      <p>{text}</p>
      <button
        type="button"
        onClick={() => {
          navigate('..');
          if (onWindowClose) onWindowClose();
        }}
      >
        ОК
      </button>
    </div>
  );
}
MyComponent.defaultProps = {
  onWindowClose: () => {},
};

function OAuthCallback() {
  const { accessToken, error } = useLoaderData() as {
    accessToken?: string;
    error?: string;
  };
  const navigation = useNavigation();
  const { genNewWindows } = useContext(WindowsContext);
  const dispatch = useTypedDispatch();
  const [user] = useUserMutation();

  useEffect(() => {
    const fetchData = () => {
      if (accessToken) {
        console.log('Устанавливаем токен');
        dispatch(tokenThunks.setTokenThunk(accessToken));
        user({});
      } else {
        console.log('Еще нет токена');
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (navigation.state === 'loading') {
      genNewWindows(
        'callback_handling',
        'Обработка колбэка',
        <MyComponent text="Обработка колбэка OAuth" />
      );
    } else if (error || !accessToken) {
      genNewWindows(
        'callback_error',
        'Обработка колбэка',
        <MyComponent text={`Ошибка при получении токена ${error}`} />
      );
      // {error && <p>{error}</p>}
    } else {
      genNewWindows(
        'callback_end',
        'Обработка колбэка',
        <MyComponent
          text={`Получен токен ${accessToken.substring(0, 10)}**********`}
        />
      );
    }
  }, [navigation.state, error, accessToken, genNewWindows]);

  return null;
}

export default OAuthCallback;
OAuthCallback.loader = loader;
