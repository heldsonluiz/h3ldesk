import { randomBytes } from "node:crypto";
import { readFile, writeFile, access } from "node:fs/promises";
import { parse } from "dotenv";
const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};
if (
  process.env.VERCEL ||
  process.env.APP_ENV === "production" ||
  process.env.APP_ENV === "homologation"
)
  throw new Error("Preparação local não pode rodar em ambiente hospedado.");
const secret = () => randomBytes(32).toString("hex");
if (!(await exists(".env.docker")))
  await writeFile(
    ".env.docker",
    `H3LDESK_DEV_DB_PASSWORD=${secret()}\nH3LDESK_TEST_DB_PASSWORD=${secret()}\n`,
    { mode: 0o600, flag: "wx" },
  );
const docker = parse(await readFile(".env.docker"));
for (const [file, environment, port, db, key, appPort, mailPort] of [
  [
    ".env",
    "development",
    55432,
    "h3ldesk_dev",
    "H3LDESK_DEV_DB_PASSWORD",
    3000,
    51025,
  ],
  [
    ".env.test",
    "test",
    55433,
    "h3ldesk_test",
    "H3LDESK_TEST_DB_PASSWORD",
    3101,
    51026,
  ],
]) {
  if (await exists(file)) {
    console.log(`${file}: preservado.`);
    continue;
  }
  const password = docker[key];
  if (!password) throw new Error(`Configure ${key} em .env.docker.`);
  await writeFile(
    file,
    `APP_ENV=${environment}\nDATABASE_URL=postgresql://${db}:${encodeURIComponent(password)}@127.0.0.1:${port}/${db}\nBETTER_AUTH_SECRET=${secret()}\nBETTER_AUTH_URL=http://localhost:${appPort}\nSMTP_HOST=127.0.0.1\nSMTP_PORT=${mailPort}\nMAIL_FROM=H3LDesk <nao-responda@h3ldesk.local>\n`,
    { mode: 0o600, flag: "wx" },
  );
  console.log(`${file}: criado com credenciais locais.`);
}
console.log(
  "Nenhum valor secreto foi exibido. Serviços ainda precisam ser iniciados via Compose.",
);
