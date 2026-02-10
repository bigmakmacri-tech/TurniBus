export default async function handler(req, res) {
  const { email } = JSON.parse(req.body);
  const URL = 'https://dvcoszwhurmseubyyxel.supabase.co';
  const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Y29zendodXJtc2V1Ynl5eGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjEzMjUsImV4cCI6MjA4NjIzNzMyNX0.iBf-rl27gn3GhcK3BasTAQCUCydIc7edIDHCpY97j9Y';

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': KEY
    },
    body: JSON.stringify({
      email: email,
      create_user: true
    })
  });

  const data = await response.json();
  return res.status(200).json(data);
}
