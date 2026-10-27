import { z } from "zod";
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Informe um e-mail válido.")
  .max(254, "E-mail muito longo.");
export const passwordSchema = z
  .string()
  .min(8, "Use pelo menos 8 caracteres.")
  .max(128, "Use no máximo 128 caracteres.");
export const authFormSchema = z.object({
  name: z.string().trim().max(100, "Use até 100 caracteres.").optional(),
  email: z.union([emailSchema, z.literal("")]),
  password: z.union([passwordSchema, z.literal("")]),
  confirmation: z.string().optional(),
});
export type AuthFormValues = z.infer<typeof authFormSchema>;
