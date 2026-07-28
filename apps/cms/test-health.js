const fetch = require('node-fetch');

async function run() {
  try {
    const res = await fetch('https://api.calebadjeoda.dev/api/portfolio-info');
    console.log('Status:', res.status);
  } catch (err) {
    console.error(err);
  }
}
run();
