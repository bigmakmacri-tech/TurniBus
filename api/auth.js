export default async function handler(req, res) {
  // 1. Gestiamo solo richieste POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    const { email } = JSON.parse(req.body);
    const URL = 'https://dvcoszwhurmseubyyxel.supabase.co';
    const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y29zendodXJtc2V1Ynl5eGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjEzMjUsImV4cCI6MjA4NjIzNzMyNX0.iBf-rl27gn3GhcK3BasTAQCUCydIc7edIDHCpY97j9Y';

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`
      },
      body: JSON.stringify({
        email: email,
        gotrue_meta_security: {},
        redirectTo: 'https://' + req.headers.host
      })
    });

    const result = await response.json();

    // Se Supabase risponde con un errore (es. rate limit)
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: result.msg || result.error_description || 'Errore Supabase' 
      });
    }

    return res.status(200).json({ success: true, detail: result });

  } catch (err) {
    return res.status(500).json({ error: 'Errore interno: ' + err.message });
  }
}
