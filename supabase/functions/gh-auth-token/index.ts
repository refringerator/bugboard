// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Закидывание секретов
// https://supabase.com/docs/guides/functions/secrets

// Создание функций
// https://supabase.com/docs/guides/functions/quickstart

// Деплой
// https://supabase.com/docs/guides/functions/deploy

console.log("Hello from GH auth!");

Deno.serve(async (req) => {
  const { code } = await req.json();

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      client_id: Deno.env.get("VITE_CLIENT_ID"),
      client_secret: Deno.env.get("GITHUB_APP_SECRET"),
      code: code,
    }),
  });

  const { access_token, scope, token_type } = await response.json();

  const data = {
    message: `GH Result`,
    access_token,
    scope,
    token_type,
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});

/* To invoke locally:

curl --request POST 'https://qzdcusvmotytjzoctaga.supabase.co/functions/v1/gh-auth-token' \
  --header 'Content-Type: application/json' \
  --data '{ "code":"f9a327fa98c6ae8d0447" }'

*/
