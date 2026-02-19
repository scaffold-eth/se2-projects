const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function notifyTelegramOnError(
  scriptName: string,
  err: unknown
): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn(
      "Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set."
    );
    return;
  }

  const errorText =
    err instanceof Error
      ? `${err.name}: ${err.message}\n${err.stack || ""}`
      : JSON.stringify(err, null, 2);

  const text = [`[${scriptName}] Unhandled error occurred:`, "", errorText].join(
    "\n"
  );

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Failed to send Telegram error notification: ${res.status} ${res.statusText}`,
        errorText
      );
      return;
    }

    const result = await res.json();
    if (!result.ok) {
      console.error(
        `Telegram API error: ${result.description || "Unknown error"}`,
        result
      );
    }
  } catch (notifyErr) {
    console.error("Failed to send Telegram error notification:", notifyErr);
  }
}
