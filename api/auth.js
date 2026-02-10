export default async function handler(req, res) {
  // 1. Permessi per evitare blocchi del browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const body = JSON.parse(req.body);
    const email = body.email;

    // 2. Chiamata diretta a Supabase dal server di Vercel
    const response = await fetch('https://dvcoszwhurmseubyyxel.supabase.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y29zendodXJtc2V1Ynl5eGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjEzMjUsImV4cCI6MjA4NjIzNzMyNX0.iBf-rl27gn3GhcK3BasTAQCUCydIc7edIDHCpY97j9Y'
      },
      body: JSON.stringify({ 
        email: email,
        create_user: true 
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
