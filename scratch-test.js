async function run() {
  const res = await fetch('https://calebadjeoda.dev/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { name: "Test", email: "test@test.com", subject: "test", message: "test" } })
  });
  console.log(res.status);
  console.log(await res.text());
}
run();
