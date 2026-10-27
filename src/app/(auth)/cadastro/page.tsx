import { Suspense } from "react";
import { AuthForm } from "@/features/auth/auth-form";
export const metadata = { title: "Criar conta" };
export default function Page() {
  return (
    <Suspense fallback={<p role="status">Carregando...</p>}>
      <AuthForm mode="register" />
    </Suspense>
  );
}
