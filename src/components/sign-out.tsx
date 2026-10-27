"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/features/auth/client";
import { Button } from "@/components/ui/button";
export function SignOut() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <Button
        variant="outline"
        onClick={async () => {
          setBusy(true);
          setError("");
          try {
            const result = await authClient.signOut();
            if (result.error) throw new Error();
            router.replace("/entrar");
            router.refresh();
          } catch {
            setError("Não foi possível sair. Tente novamente.");
            setBusy(false);
          }
        }}
        disabled={busy}
      >
        {busy ? "Saindo..." : "Sair da conta"}
      </Button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
