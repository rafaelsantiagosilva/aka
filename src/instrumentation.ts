export async function register() {
  console.log("> Instumentation...");

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (!process.env.VERCEL) {
      const cron = await import('node-cron');

      cron.schedule('0 * * * *', async () => {
        await fetch("/api/clean", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.CRON_SECRET}`
          }
        });
      });
    }
  }
}