import { describe, it, expect } from "vitest";
import { assertTestDatabase, parseEnvironment } from "./environment";
const valid = {
  APP_ENV: "test",
  DATABASE_URL: "postgresql://h3ldesk_test:fake@127.0.0.1:55433/h3ldesk_test",
  BETTER_AUTH_SECRET: "x".repeat(40),
  BETTER_AUTH_URL: "http://localhost:3101",
  SMTP_HOST: "127.0.0.1",
  SMTP_PORT: "51026",
  MAIL_FROM: "Teste <teste@example.test>",
};
describe("isolamento dos ambientes", () => {
  it("aceita somente o banco local dedicado nos testes", () => {
    expect(() => assertTestDatabase(valid.DATABASE_URL)).not.toThrow();
    for (const url of [
      "postgresql://h3ldesk_dev:fake@127.0.0.1:55432/h3ldesk_dev",
      "postgresql://h3ldesk_test:fake@db.example.com:55433/h3ldesk_test",
      "postgresql://h3ldesk_dev:fake@127.0.0.1:55433/h3ldesk_test",
    ])
      expect(() => assertTestDatabase(url)).toThrow();
  });
  it("recusa e-mail ou origem de outro ambiente nos testes", () => {
    expect(() => parseEnvironment(valid)).not.toThrow();
    expect(() => parseEnvironment({ ...valid, SMTP_PORT: "51025" })).toThrow();
    expect(() =>
      parseEnvironment({ ...valid, BETTER_AUTH_URL: "https://example.com" }),
    ).toThrow();
  });
  it("não habilita serviços locais em deploy", () => {
    expect(() => parseEnvironment({ ...valid, VERCEL: "1" })).toThrow();
    expect(() =>
      parseEnvironment({ ...valid, APP_ENV: "production" }),
    ).toThrow();
  });
  it("não expõe valores secretos em erro de configuração", () => {
    try {
      parseEnvironment({ ...valid, BETTER_AUTH_SECRET: "segredo-curto" });
      throw new Error("esperava erro");
    } catch (error) {
      expect(String(error)).toContain("BETTER_AUTH_SECRET");
      expect(String(error)).not.toContain("segredo-curto");
    }
  });
});
