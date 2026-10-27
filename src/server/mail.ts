import "server-only";
import nodemailer from "nodemailer";
import { getEnvironment } from "./environment";
export async function sendAccountEmail(
  to: string,
  url: string,
  kind: "verify" | "reset",
) {
  const env = getEnvironment();
  // Only auth-generated links for this installation can be sent.
  if (new URL(url).origin !== new URL(env.BETTER_AUTH_URL).origin)
    throw new Error("Origem inválida do link de conta.");
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE === "true",
    auth: env.SMTP_USER
      ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
      : undefined,
    connectionTimeout: 10000,
  });
  await transport.sendMail({
    from: env.MAIL_FROM,
    to,
    subject:
      kind === "verify"
        ? "Confirme seu e-mail — H3LDesk"
        : "Redefina sua senha — H3LDesk",
    text: `${kind === "verify" ? "Confirme seu e-mail para acessar seu workspace" : "Você solicitou uma nova senha para o H3LDesk"}.\n\n${url}\n\nSe você não fez essa solicitação, ignore esta mensagem.`,
  });
}
