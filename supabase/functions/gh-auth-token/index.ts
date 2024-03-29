// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Закидывание секретов
// https://supabase.com/docs/guides/functions/secrets

// Создание функций
// https://supabase.com/docs/guides/functions/quickstart

// Деплой
// https://supabase.com/docs/guides/functions/deploy

// npx supabase functions deploy gh-auth-token --no-verify-jwt

import { corsHeaders } from '../_shared/cors.ts'

console.log("Hello from GH auth!");

Deno.serve(async (req) => {
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
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
  const message = response.ok ? 'GH Result ok': `${response.status} ${response.statusText}`

  const data = {
    message,
    access_token,
    scope,
    token_type,
  };

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

/* To invoke locally:

curl --request POST 'https://qzdcusvmotytjzoctaga.supabase.co/functions/v1/gh-auth-token' \
  --header 'Content-Type: application/json' \
  --data '{ "code":"f9a327fa98c6ae8d0447" }'

*/
