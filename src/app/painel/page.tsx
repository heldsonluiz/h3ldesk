import Link from "next/link";
import { requireWorkspace } from "@/server/workspace";
import { Brand } from "@/components/brand";
import { SignOut } from "@/components/sign-out";
export const metadata = { title: "Seu workspace" };
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const { workspace, user } = await requireWorkspace();
  return (
    <>
      <header className="app-header">
        <div className="container header-inner">
          <Brand />
          <SignOut />
        </div>
      </header>
      <main id="conteudo" className="container page">
        <p className="eyebrow">SEU ESPAÇO DE TRABALHO</p>
        <h1>
          Olá, {user.name}
          <span className="orange">.</span>
        </h1>
        <p className="muted page-intro">
          Seu acesso está confirmado. Este é seu workspace privado; os dados de
          outras contas não aparecem aqui.
        </p>
        <section className="panel" aria-labelledby="workspace-title">
          <h2 id="workspace-title">{workspace.name}</h2>
          <dl className="info-grid">
            <div>
              <dt>Conta</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Fuso horário</dt>
              <dd>{workspace.timezone}</dd>
            </div>
            <div>
              <dt>Moeda</dt>
              <dd>{workspace.currency}</dd>
            </div>
          </dl>
        </section>
        <section className="panel">
          <p className="eyebrow">PRÓXIMA ENTREGA</p>
          <h2>Seus cadastros começam aqui.</h2>
          <p className="muted">
            Os cadastros de materiais, custos adicionais e clientes serão a
            próxima etapa. Nenhum registro fictício foi adicionado à sua conta.
          </p>
          <div className="actions">
            <Link href="/demo" className="text-link">
              Consultar a demonstração isolada
            </Link>
          </div>
        </section>
        <footer className="footer">
          H3LDesk · seus dados permanecem privados por conta.
        </footer>
      </main>
    </>
  );
}
