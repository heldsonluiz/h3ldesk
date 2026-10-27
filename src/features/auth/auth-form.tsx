"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { authClient } from "./client";
import { authFormSchema, type AuthFormValues } from "./schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export type AuthMode = "login" | "register" | "forgot" | "reset" | "verify";
const content = {
  login: {
    title: "Seu trabalho, no lugar certo.",
    description: "Entre para acessar seus projetos, materiais e clientes.",
    button: "Entrar",
  },
  register: {
    title: "Comece sua organização.",
    description: "Crie sua conta. Seu workspace e seus dados serão privados.",
    button: "Criar conta",
  },
  forgot: {
    title: "Esqueceu sua senha?",
    description:
      "Informe seu e-mail para receber as instruções de recuperação.",
    button: "Enviar instruções",
  },
  reset: {
    title: "Defina uma nova senha.",
    description: "Escolha uma senha de pelo menos 8 caracteres.",
    button: "Salvar nova senha",
  },
  verify: {
    title: "Confirme seu e-mail.",
    description:
      "A confirmação é necessária para acessar seus dados. Você pode solicitar um novo link.",
    button: "Reenviar confirmação",
  },
};
export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const token = params.get("token");
  const c = content[mode];
  const hasEmail = mode !== "reset";
  const hasPassword =
    mode === "login" || mode === "register" || mode === "reset";
  const schema = authFormSchema.superRefine((data, ctx) => {
    if (hasEmail && !data.email)
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Informe seu e-mail.",
      });
    if (hasPassword && !data.password)
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Informe sua senha.",
      });
    if (mode === "register" && !data.name?.trim())
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message: "Informe seu nome.",
      });
    if (
      (mode === "register" || mode === "reset") &&
      data.confirmation !== data.password
    )
      ctx.addIssue({
        code: "custom",
        path: ["confirmation"],
        message: "As senhas precisam ser iguais.",
      });
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirmation: "" },
  });
  async function submit(values: AuthFormValues) {
    setFeedback("");
    setError("");
    try {
      if (mode === "login") {
        const result = await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });
        if (result.error) {
          setError(
            result.error.code === "EMAIL_NOT_VERIFIED"
              ? "Confirme seu e-mail antes de entrar."
              : "Não foi possível entrar. Confira o e-mail e a senha ou tente novamente mais tarde.",
          );
          return;
        }
        router.push("/painel");
        router.refresh();
      } else if (mode === "register") {
        const result = await authClient.signUp.email({
          name: values.name!.trim(),
          email: values.email,
          password: values.password,
          callbackURL: "/entrar?confirmado=1",
        });
        if (result.error) {
          setError(
            "Não foi possível concluir o cadastro. Revise os dados ou tente novamente mais tarde.",
          );
          return;
        }
        setFeedback(
          "Confira seu e-mail para confirmar o cadastro antes de entrar.",
        );
      } else if (mode === "forgot") {
        const result = await authClient.requestPasswordReset({
          email: values.email,
          redirectTo: "/redefinir-senha",
        });
        if (result.error) {
          setError(
            "Não foi possível processar a solicitação agora. Aguarde e tente novamente.",
          );
          return;
        }
        setFeedback(
          "Se houver uma conta com esse e-mail, você receberá as instruções de recuperação.",
        );
      } else if (mode === "verify") {
        const result = await authClient.sendVerificationEmail({
          email: values.email,
          callbackURL: "/entrar?confirmado=1",
        });
        if (result.error) {
          setError(
            "Não foi possível processar a solicitação agora. Aguarde e tente novamente.",
          );
          return;
        }
        setFeedback(
          "Se a conta precisar de confirmação, enviaremos um novo link para esse e-mail.",
        );
      } else {
        if (!token) {
          setError("O link é inválido. Solicite uma nova recuperação.");
          return;
        }
        const result = await authClient.resetPassword({
          newPassword: values.password,
          token,
        });
        if (result.error) {
          setError(
            "O link é inválido ou expirou. Solicite uma nova recuperação.",
          );
          return;
        }
        setFeedback("Senha atualizada. Entre novamente com sua nova senha.");
      }
    } catch {
      setError(
        "Não foi possível conectar. Seus dados continuam no formulário; tente novamente.",
      );
    }
  }
  const field = (
    name: keyof AuthFormValues,
    label: string,
    type = "text",
    autoComplete?: string,
  ) => (
    <div className="field" key={name}>
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        type={type}
        autoComplete={autoComplete}
        {...register(name)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        disabled={isSubmitting}
      />
      {errors[name] && (
        <p className="field-error" id={`${name}-error`}>
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
  return (
    <div className="auth-content">
      <p className="eyebrow">H3LDESK / SUA OPERAÇÃO ORGANIZADA</p>
      <h1>{c.title}</h1>
      <p className="muted intro">{c.description}</p>
      {mode === "login" && params.get("confirmado") === "1" && (
        <p className="notice" role="status">
          <Check size={18} aria-hidden="true" /> E-mail confirmado. Você já pode
          entrar.
        </p>
      )}
      {mode === "reset" && !token && (
        <p className="notice error" role="alert">
          Link inválido. <Link href="/esqueci-senha">Solicite outro link.</Link>
        </p>
      )}
      <form onSubmit={handleSubmit(submit)} noValidate className="auth-fields">
        {mode === "register" && field("name", "Seu nome", "text", "name")}
        {hasEmail && field("email", "E-mail", "email", "email")}
        {hasPassword &&
          field(
            "password",
            mode === "reset" ? "Nova senha" : "Senha",
            "password",
            mode === "login" ? "current-password" : "new-password",
          )}
        {(mode === "register" || mode === "reset") && (
          <>
            <p className="hint">Use entre 8 e 128 caracteres.</p>
            {field(
              "confirmation",
              "Confirme sua senha",
              "password",
              "new-password",
            )}
          </>
        )}
        {mode === "login" && (
          <Link className="text-link" href="/esqueci-senha">
            Esqueci minha senha
          </Link>
        )}
        {error && (
          <p className="notice error" role="alert">
            {error}
          </p>
        )}
        <Button
          className="w-full"
          disabled={isSubmitting || (mode === "reset" && !token)}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                className="animate-spin"
                size={18}
                aria-hidden="true"
              />{" "}
              Aguarde...
            </>
          ) : (
            <>
              {c.button}
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </Button>
        {feedback && (
          <p className="notice" role="status">
            {feedback}
          </p>
        )}
      </form>
      <div className="auth-links">
        {mode === "login" ? (
          <>
            <p>
              Ainda não tem conta? <Link href="/cadastro">Criar conta</Link>
            </p>
            <Link href="/verificar-email">Reenviar confirmação de e-mail</Link>
          </>
        ) : (
          <Link href="/entrar">Voltar para entrar</Link>
        )}
      </div>
      <p className="privacy">
        Cada conta tem um workspace próprio. Seus dados não ficam visíveis para
        outras pessoas.
      </p>
    </div>
  );
}
