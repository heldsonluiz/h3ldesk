import { Brand } from "@/components/brand";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout">
      <aside className="auth-aside">
        <Brand />
        <div>
          <p className="eyebrow">DO PROJETO À PRÓXIMA IDEIA</p>
          <h2>
            Menos retrabalho.
            <br />
            <span className="orange">Mais clareza.</span>
          </h2>
          <p className="muted">
            Organize a base da sua operação de impressão 3D. Cada conta tem seu
            próprio espaço, com acesso privado.
          </p>
        </div>
        <p className="aside-foot">H3LDESK · ORGANIZAÇÃO QUE FICA</p>
      </aside>
      <main id="conteudo" className="auth-main">
        <div className="w-full">
          <div className="mobile-brand">
            <Brand />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
