import { useEffect } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from 'src/store/authSlice';
import { useUserMutation } from 'src/service/issues';

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

function OAuthCallback() {
  const { accessToken, error } = useLoaderData() as {
    accessToken?: string;
    error?: string;
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [user] = useUserMutation();

  useEffect(() => {
    const fetchData = () => {
      if (accessToken) {
        console.log('Устанавливаем токен');
        dispatch(setToken(accessToken));
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

  if (navigation.state === 'loading') {
    return (
      <div>
        <p>Handling OAuth callback...</p>
      </div>
    );
  }

  if (error || !accessToken) {
    return (
      <div>
        <p>Ошибка при получении токена</p>
        {error && <p>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <p>
        Получен токен
        {` ${accessToken.substring(0, 10)}**********`}
      </p>
    </div>
  );
}

export default OAuthCallback;
OAuthCallback.loader = loader;
