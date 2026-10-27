import { config } from "dotenv";
import { spawnSync } from "node:child_process";
config({ path: ".env.test", override: true, quiet: true });
const url = new URL(process.env.DATABASE_URL ?? "invalid");
if (
  process.env.APP_ENV !== "test" ||
  !["127.0.0.1", "localhost"].includes(url.hostname) ||
  url.port !== "55433" ||
  url.pathname !== "/h3ldesk_test" ||
  url.username !== "h3ldesk_test" ||
  process.env.BETTER_AUTH_URL !== "http://localhost:3101" ||
  process.env.SMTP_PORT !== "51026"
)
  throw new Error(
    "Configuração de teste deve usar exclusivamente os serviços locais de testes.",
  );
const result = spawnSync("pnpm", ["exec", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
});
process.exit(result.status ?? 1);
