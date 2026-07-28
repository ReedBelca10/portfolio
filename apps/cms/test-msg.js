const fetch = require('node-fetch');

async function run() {
  try {
    const res = await fetch('https://api.calebadjeoda.dev/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          name: 'Test',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'Test Message'
        }
      })
    });
    
    const status = res.status;
    const text = await res.text();
    console.log('Status:', status);
    console.log('Response:', text);
  } catch (err) {
    console.error(err);
  }
}

run();
