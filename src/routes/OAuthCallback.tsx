import { useLoaderData, useNavigation } from 'react-router-dom';

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
        {accessToken}
      </p>
    </div>
  );
}

export default OAuthCallback;
OAuthCallback.loader = loader;
