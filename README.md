# H3LDesk — gestão de impressão 3D

Versão da especificação: 1.2. Data: 27/10/2026. Idioma: português brasileiro.

Este pacote define um aplicativo de gestão de projetos, precificação, orçamentos e encomendas de impressão 3D. O cenário inicial é a H3LForge, operada por uma pessoa, como atividade secundária, com **uma Bambu Lab P2S** e capacidade habitual de **12 a 16 horas de impressão por dia**.

A primeira entrega deve permitir encontrar um projeto antigo, recuperar seus arquivos e configurações, atualizar os custos e gerar um novo orçamento sem refazer o trabalho de organização. Estoque, produção, catálogo e conteúdo ampliam esse fluxo em etapas posteriores.

**Início confirmado:** aplicação nova no repositório H3LDesk já criado; manter Next.js, TypeScript, Tailwind, shadcn/ui e PostgreSQL. Começar cadastrando novos orçamentos conforme surgirem, formando o histórico progressivamente. Importação do acervo antigo não é pré-requisito. A stack consolidada, incluindo Prisma e Better Auth, foi aprovada e está em [docs/06-arquitetura.md](docs/06-arquitetura.md).

Os três casos operacionais de validação foram escolhidos pelo usuário e conferidos na planilha: suporte para tablet, `1 lixeira` e `brindes participantes`. Ver [09-exemplos-de-referencia.md](docs/09-exemplos-de-referencia.md).

## Executar a aplicação local

A fundação M0 está implementada: cadastro por e-mail/senha, verificação, recuperação e workspace privado por conta. Os CRUDs serão M1A e ainda não estão disponíveis. Não há banco/provedor de e-mail hospedado configurado.

Consulte [docs/11-fundacao-executavel.md](docs/11-fundacao-executavel.md) para instalação com pnpm, geração segura dos ambientes locais, migrações e testes. Com o setup pronto, execute `pnpm dev` e abra `http://localhost:3000`. E-mails de confirmação/recuperação ficam em `http://localhost:58025`, sem envio externo.

## Decisões atualizadas — acesso e primeira entrega

Cadastro público por e-mail e senha, recuperação de senha e um workspace privado por conta. Usar pnpm, PostgreSQL local com Docker Compose e ambientes separados para desenvolvimento, testes, homologação e produção. A primeira entrega será a fundação e os CRUDs de materiais, custos adicionais e clientes (M0/M1A), antes de projetos e orçamentos completos. Direção visual das prévias aprovada. Ver D17–D22 em `docs/08-decisoes-e-fontes.md`.

## Stack aprovada

Next.js/React/TypeScript, Tailwind/shadcn/ui, Prisma/PostgreSQL, Better Auth, React Hook Form/Zod e pnpm. Vercel para a aplicação e Neon para o banco hospedado; desenvolvimento/testes continuam no Docker local. O uso inicial será pessoal e não comercial. Componentes complementares e momento de introdução estão em [Arquitetura](docs/06-arquitetura.md). Aprovação não significa provisionamento, integração ou publicação concluídos.

## Como usar este pacote

1. Extraia o conteúdo na raiz do repositório do aplicativo, preservando a pasta `docs/`. Em repositório existente, incorpore este índice ao README ou renomeie-o; não sobrescreva documentação anterior sem revisar.
2. Se já existir `AGENTS.md`, incorpore as orientações pertinentes sem apagar as instruções existentes. Resolva conflitos com o responsável antes de substituir decisões de produto.
3. Leia este arquivo, `AGENTS.md` e os documentos na ordem abaixo.
4. Execute um marco por vez do roadmap. Cada marco contém entregáveis e critérios de aceite.
5. Registre progresso real em `docs/04-roadmap.md` e decisões novas em `docs/08-decisoes-e-fontes.md`.

## Documentos

| Arquivo | Responsabilidade |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Conduta de implementação, limites e definição de pronto |
| [01-escopo.md](docs/01-escopo.md) | Contexto, requisitos funcionais e limites de cada módulo |
| [02-dominio-e-dados.md](docs/02-dominio-e-dados.md) | Entidades, relações, estados, histórico e integridade |
| [03-precificacao.md](docs/03-precificacao.md) | Fórmulas, placas, componentes, arredondamento e exemplos |
| [04-roadmap.md](docs/04-roadmap.md) | Marcos sequenciais, tarefas e critérios de conclusão |
| [05-interface-e-experiencia.md](docs/05-interface-e-experiencia.md) | Telas, fluxos, identidade e comportamento responsivo |
| [06-arquitetura.md](docs/06-arquitetura.md) | Stack proposta, organização, APIs, persistência e acesso |
| [07-validacao.md](docs/07-validacao.md) | Cenários de aceite, cálculos de referência e testes |
| [08-decisoes-e-fontes.md](docs/08-decisoes-e-fontes.md) | Decisões confirmadas, propostas técnicas e dúvidas localizadas |
| [09-exemplos-de-referencia.md](docs/09-exemplos-de-referencia.md) | Três produtos escolhidos, dados da planilha e resultados esperados |

## Entregas do produto

| Release | Marcos | Resultado |
| --- | --- | --- |
| R1: organizar e orçar | M0 a M3 | Projetos, arquivos, configurações por placa, clientes, precificação, histórico e PDF |
| R2: produzir e medir | M4 a M6 | Pedidos, estoque, consumo, agenda da P2S, recebimentos e resultados |
| R3: apresentar | M7 | Catálogo público de produtos escolhidos, sem checkout |
| R4: divulgar | M8 | Kit visual, fotos, legendas e exportação de conteúdo para revisão manual |
| Evoluções opcionais | M9 | Importadores e integrações externas, após validar as releases anteriores |

R1 deve ser utilizável isoladamente. Não iniciar R3 ou R4 para evitar resolver as regras de R1. A infraestrutura inicial deve servir à primeira release, sem construir antecipadamente um ERP genérico.

## Prompt inicial para o Codex

> Leia `AGENTS.md` e os documentos em `docs/`. Inspecione o repositório e inicie o primeiro marco incompleto de `docs/04-roadmap.md`. Reaproveite decisões e bibliotecas existentes quando compatíveis. Implemente uma fatia funcional com persistência, validação e interface; execute as verificações proporcionais ao risco. Preserve as regras de cálculo e histórico. Não avance para outro marco antes de concluir os critérios do atual ou registrar um bloqueio específico. Atualize o roadmap e explique o que foi entregue, validado e permanece pendente. Não publique, envie mensagens, conecte contas nem importe dados reais automaticamente.

## Primeira demonstração de valor

1. Cadastrar um projeto e anexar um modelo ou arquivo de projeto.
2. Salvar uma configuração de produção com placas, tempo e materiais.
3. Criar um orçamento para um cliente e gerar seu PDF.
4. Atualizar o preço de um material.
5. Recuperar o projeto e duplicar o orçamento com preços atuais.
6. Confirmar que o orçamento anterior continua com os valores e documentos originais.

## Escopo deste pacote

A documentação descreve o produto-alvo; a fundação M0 já é executável, conforme o roadmap e `docs/11-fundacao-executavel.md`. Os módulos seguintes ainda não foram implementados. O núcleo da stack e o cadastro progressivo foram confirmados; outros defaults técnicos continuam identificados como propostas. As fórmulas observadas na planilha são referências de compatibilidade, não validação contábil de todos os seus parâmetros. A confirmação de que ainda não existe repositório não autoriza criar um remoto, publicar ou fazer push por conta própria.

## Preparação do PostgreSQL local

Compose local de desenvolvimento/testes e comandos: [docs/10-ambiente-local.md](docs/10-ambiente-local.md). Essa configuração não prepara produção nem significa que o aplicativo já foi implementado.
