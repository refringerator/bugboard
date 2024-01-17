import { useLoaderData, useNavigation } from "react-router-dom";

interface ILoader {
  request: Request;
}

async function loader({ request }: ILoader) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) return { error: "Не был предоставлен code" };

  // TODO: выполняем проверку полученного state со значением из хранилища
  // const state = url.searchParams.get("state");

  // тут выполнить запрос на лямбду
  const response = await fetch(
    "https://qzdcusvmotytjzoctaga.supabase.co/functions/v1/gh-auth-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    }
  );

  let error;
  if (!response.ok) {
    error = `HTTP error! Status: ${response.status}`;
  }

  const { access_token } = await response.json();

  return { access_token, error };
}

function OAuthCallback() {
  const { access_token, error } = useLoaderData() as {
    access_token?: string;
    error?: string;
  };
  const navigation = useNavigation();

  if (navigation.state === "loading")
    return (
      <div>
        <p>Handling OAuth callback...</p>
      </div>
    );

  if (error || !access_token)
    return (
      <div>
        <p>Ошибка при получении токена</p>
        {error && <p>{error}</p>}
      </div>
    );

  return (
    <div>
      <p>Получен токен {access_token}</p>
    </div>
  );
}

export default OAuthCallback;
OAuthCallback.loader = loader;
