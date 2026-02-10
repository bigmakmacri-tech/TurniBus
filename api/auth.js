export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { email } = JSON.parse(req.body);
    
    const response = await fetch('https://dvcoszwhurmseubyyxel.supabase.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y29zendodXJtc2V1Ynl5eGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjEzMjUsImV4cCI6MjA4NjIzNzMyNX0.iBf-rl27gn3GhcK3BasTAQCUCydIc7edIDHCpY97j9Y',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y29zendodXJtc2V1Ynl5eGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjEzMjUsImV4cCI6MjA4NjIzNzMyNX0.iBf-rl27gn3GhcK3BasTAQCUCydIc7edIDHCpY97j9Y'
      },
      body: JSON.stringify({ 
        email: email,
        type: 'magiclink',
        create_user: true 
      })
    });

    const data = await response.json();

    // Se Supabase risponde con un errore, lo passiamo a Vercel per vederlo
    if (!response.ok) {
      return res.status(response.status).json({ error: data.msg || data.error_description });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
