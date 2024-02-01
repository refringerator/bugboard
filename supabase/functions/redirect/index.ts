// Функция для редиректа
// Чтобы работало и локально, и, например, на гх-страницах

// Нужно как-то передалть редирект урл, чтобы оно там было

// npx supabase functions deploy redirect --no-verify-jwt

const defaultPath = "aHR0cHMlM0ElMkYlMkZkb2NzLmdvb2dsZS5jb20lMkZwcmVzZW50YXRpb24lMkZkJTJGMVBwbkg2RlBEellyekZLM1ZycHZ6OWd5N2JCWGdBUndMSzZ5ZWt5RUR6WmslMkZlZGl0JTIzc2xpZGUlM0RpZC5nMjRlOWRhNGYzMmFfMF81Mw=="

Deno.serve(async (req) => {
  // const { name } = await req.json()
  const data = {
    message: `Hello Redirect!`,
  }
  
  // Parse the URL to get the query parameters
  const url = new URL(req.url, `http://${req.headers.get("host")}`);
  const params = url.searchParams;
  
  const code = params.get("code");
  // В state должен храниться Урл в base64 для редиректа
  const state = params.get("state") || defaultPath;
  const decodedUri = decodeURIComponent(atob(state));
  
  const targetUrl = `${decodedUri}?code=${code}`

  return new Response(
    JSON.stringify(data),
    { status: 302,
      headers: { 
        "Content-Type": "application/json",
        Location: targetUrl, 
      },
   },
  )
})
