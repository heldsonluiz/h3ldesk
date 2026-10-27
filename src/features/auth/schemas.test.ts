import { expect, it } from "vitest";
import { passwordSchema } from "./schemas";
it("aceita 8 caracteres e rejeita senhas abaixo do mínimo ou acima do máximo", () => {
  expect(passwordSchema.safeParse("12345678").success).toBe(true);
  expect(passwordSchema.safeParse("1234567").success).toBe(false);
  expect(passwordSchema.safeParse("x".repeat(128)).success).toBe(true);
  expect(passwordSchema.safeParse("x".repeat(129)).success).toBe(false);
});
