import Link from "next/link";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
export const metadata = { title: "Demonstração" };
const examples = [
  {
    name: "Suporte para tablet",
    plates: "Uma peça por placa",
    time: "2h20",
    mass: "60 g",
  },
  {
    name: "Lixeira",
    plates: "Base e gancho em placas distintas",
    time: "44 min",
    mass: "7 g",
  },
  {
    name: "Brindes participantes",
    plates: "24 unidades por placa",
    time: "4h",
    mass: "77 g",
  },
];
export default function Demo() {
  return (
    <>
      <div className="demo-banner">
        Demonstração somente leitura · dados de referência · nenhum acesso à
        operação real
      </div>
      <header className="app-header">
        <div className="container header-inner">
          <Brand />
          <Button asChild variant="outline">
            <Link href="/entrar">Entrar na minha conta</Link>
          </Button>
        </div>
      </header>
      <main className="container page" id="conteudo">
        <p className="eyebrow">CONHEÇA A BASE DO H3LDESK</p>
        <h1>Um espaço para reaproveitar ideias.</h1>
        <p className="muted page-intro">
          Estes exemplos são independentes das contas cadastradas. Não consultam
          o banco operacional nem permitem alterações.
        </p>
        <div className="info-grid">
          {examples.map((example) => (
            <article key={example.name} className="panel">
              <h2>{example.name}</h2>
              <p className="muted">{example.plates}</p>
              <p>
                {example.time} de impressão · {example.mass}
              </p>
            </article>
          ))}
        </div>
        <p className="muted page-intro">
          Os exemplos não são orçamento comercial, catálogo de venda ou
          demonstração do motor de cálculo. Tempo de trabalho humano e custos
          adicionais não estão representados.
        </p>
        <div className="actions">
          <Button asChild>
            <Link href="/cadastro">Criar meu workspace</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
