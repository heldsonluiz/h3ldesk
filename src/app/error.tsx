"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="conteudo" className="container page">
      <h1>Não foi possível carregar.</h1>
      <p className="page-intro muted">
        Tente novamente. Se o problema continuar, confira a conexão e volte em
        alguns instantes.
      </p>
      <div className="actions">
        <Button onClick={reset}>Tentar novamente</Button>
      </div>
    </main>
  );
}
