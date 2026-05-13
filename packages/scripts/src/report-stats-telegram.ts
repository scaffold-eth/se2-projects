/*
  Send a friendly last-7-days repository stats summary to the Telegram chat
  (the same chat used for error notifications).

  Reports per-day saved/deleted counts, 7-day totals, and the delta vs. the
  previous 7-day window.

  Environment variables:
    - POSTGRES_URL: PostgreSQL connection string (required)
    - TELEGRAM_BOT_TOKEN: Telegram bot API token (required to deliver)
    - TELEGRAM_CHAT_ID: Target chat ID (required to deliver)
*/

import dotenv from "dotenv";
import { pool } from "./common";
import {
  notifyTelegramOnError,
  sendTelegramMessage,
} from "./telegram-error-notify";

dotenv.config();

interface DateCountRow {
  date: Date;
  count: string;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatDelta(current: number, previous: number): string {
  const diff = current - previous;
  if (diff > 0) return `+${diff} (was ${previous})`;
  if (diff < 0) return `${diff} (was ${previous})`;
  return `±0 (was ${previous})`;
}

function formatSection(
  title: string,
  rows: { date: string; count: number }[],
  total: number,
  previousTotal: number
): string {
  const lines = [title];
  if (rows.length === 0) {
    lines.push("  • No activity");
  } else {
    for (const row of rows) {
      lines.push(`  • ${row.date} — ${row.count}`);
    }
  }
  lines.push(`  Total: ${total}`);
  lines.push(`  Δ vs previous 7d: ${formatDelta(total, previousTotal)}`);
  return lines.join("\n");
}

async function main(): Promise<void> {
  const client = await pool.connect();
  try {
    const savedByDateResult = await client.query<DateCountRow>(`
      SELECT saved_at::date AS date, COUNT(*) AS count
      FROM repositories
      WHERE saved_at >= NOW() - INTERVAL '7 days'
      GROUP BY saved_at::date
      ORDER BY saved_at::date ASC
    `);

    const deletedByDateResult = await client.query<DateCountRow>(`
      SELECT deleted_at::date AS date, COUNT(*) AS count
      FROM repositories
      WHERE deleted_at IS NOT NULL
        AND deleted_at >= NOW() - INTERVAL '7 days'
      GROUP BY deleted_at::date
      ORDER BY deleted_at::date ASC
    `);

    const savedPrevResult = await client.query<{ count: string }>(`
      SELECT COUNT(*) AS count
      FROM repositories
      WHERE saved_at >= NOW() - INTERVAL '14 days'
        AND saved_at < NOW() - INTERVAL '7 days'
    `);

    const deletedPrevResult = await client.query<{ count: string }>(`
      SELECT COUNT(*) AS count
      FROM repositories
      WHERE deleted_at IS NOT NULL
        AND deleted_at >= NOW() - INTERVAL '14 days'
        AND deleted_at < NOW() - INTERVAL '7 days'
    `);

    const savedRows = savedByDateResult.rows.map((row) => ({
      date: formatDate(row.date),
      count: parseInt(row.count, 10),
    }));
    const deletedRows = deletedByDateResult.rows.map((row) => ({
      date: formatDate(row.date),
      count: parseInt(row.count, 10),
    }));

    const savedTotal = savedRows.reduce((acc, r) => acc + r.count, 0);
    const deletedTotal = deletedRows.reduce((acc, r) => acc + r.count, 0);
    const savedPrevTotal = parseInt(savedPrevResult.rows[0].count, 10);
    const deletedPrevTotal = parseInt(deletedPrevResult.rows[0].count, 10);

    const message = [
      "📊 *Repository Stats — Last 7 Days*",
      "",
      formatSection("✅ *Saved*", savedRows, savedTotal, savedPrevTotal),
      "",
      formatSection("🗑️ *Deleted*", deletedRows, deletedTotal, deletedPrevTotal),
    ].join("\n");

    console.log(message);
    await sendTelegramMessage(message, { parseMode: "Markdown" });
    console.log("Telegram stats report sent.");
  } finally {
    client.release();
  }
}

main()
  .then(async () => {
    await pool.end();
  })
  .catch((err) => {
    console.error("Unhandled error:", err);
    notifyTelegramOnError("report-stats-telegram", err).finally(() => {
      process.exit(1);
    });
  });
