import { z } from "zod";

const schema = z.object({
  APP_ENV: z.enum(["development", "test", "homologation", "production"]),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_SECURE: z.enum(["true", "false"]).default("false"),
  MAIL_FROM: z.string().min(1),
});
export function assertTestDatabase(value: string) {
  const url = new URL(value);
  if (
    !["127.0.0.1", "localhost"].includes(url.hostname) ||
    url.port !== "55433" ||
    url.pathname !== "/h3ldesk_test" ||
    url.username !== "h3ldesk_test"
  )
    throw new Error(
      "Testes exigem o banco local exclusivo h3ldesk_test na porta 55433.",
    );
}
export function parseEnvironment(input: Record<string, string | undefined>) {
  const parsed = schema.safeParse(input);
  if (!parsed.success)
    throw new Error(
      "Configuração inválida: " +
        [
          ...new Set(parsed.error.issues.map((issue) => issue.path.join("."))),
        ].join(", "),
    );
  const env = parsed.data;
  const origin = new URL(env.BETTER_AUTH_URL);
  if (env.APP_ENV === "test") {
    assertTestDatabase(env.DATABASE_URL);
    if (
      !["localhost", "127.0.0.1"].includes(origin.hostname) ||
      origin.port !== "3101" ||
      env.SMTP_HOST !== "127.0.0.1" ||
      env.SMTP_PORT !== 51026
    )
      throw new Error(
        "Origem e e-mail de teste devem usar os serviços locais exclusivos.",
      );
  }
  if (input.VERCEL && ["development", "test"].includes(env.APP_ENV))
    throw new Error(
      "Deploy exige ambiente homologation ou production explícito.",
    );
  if (["homologation", "production"].includes(env.APP_ENV)) {
    if (
      origin.protocol !== "https:" ||
      ["localhost", "127.0.0.1"].includes(new URL(env.DATABASE_URL).hostname) ||
      ["localhost", "127.0.0.1"].includes(env.SMTP_HOST) ||
      !env.SMTP_USER ||
      !env.SMTP_PASSWORD
    )
      throw new Error(
        "Ambiente hospedado exige HTTPS e serviços privados de banco e e-mail configurados.",
      );
  }
  return env;
}
export const getEnvironment = () => parseEnvironment(process.env);
