import Link from "next/link";
export default function NotFound() {
  return (
    <main id="conteudo" className="container page">
      <p className="eyebrow">404</p>
      <h1>Página não encontrada.</h1>
      <p className="page-intro muted">
        O endereço pode ter mudado ou não está disponível.
      </p>
      <div className="actions">
        <Link href="/painel" className="text-link">
          Voltar ao meu workspace
        </Link>
      </div>
    </main>
  );
}
