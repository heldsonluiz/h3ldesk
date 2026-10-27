# Decisões, fontes e pontos pendentes

## 1. Precedência

Instruções atuais do usuário → decisões confirmadas neste documento → regras de domínio/precificação → roadmap → defaults técnicos. Uma proposta técnica não vira preferência pessoal confirmada apenas por estar documentada.

Quando surgir uma contradição, registrar o ponto e resolver a menor parte afetada. Não reabrir toda a definição do produto nem interromper trabalho independente.

## 2. Decisões confirmadas pelo contexto

| ID | Decisão |
| --- | --- |
| D01 | Uma Bambu Lab P2S; informação mais recente substitui a hipótese anterior de duas máquinas |
| D02 | Operação secundária, habitualmente 12 a 16 horas de impressão por dia |
| D03 | Poucos clientes e muitas projeções de orçamento; recuperar trabalho antigo é a prioridade |
| D04 | Guardar modelos, configurações e orçamentos reduz a necessidade de fatiar e preencher planilha novamente |
| D05 | Suportar uma peça, várias unidades por placa e um produto com várias placas |
| D06 | Gerar orçamento atraente em PDF para envio manual por WhatsApp |
| D07 | Controlar material, datas de produção/entrega e resultado por impressão/pedido |
| D08 | Ter catálogo dos produtos sob encomenda e consistência de fotos/conteúdo |
| D09 | A planilha existente serve de referência de cálculo; não houve pedido para alterá-la |
| D10 | Este trabalho autoriza criar instruções `.md` e roadmap; não implementa nem publica o aplicativo |
| D11 | Ainda não existe repositório; o aplicativo começará como projeto novo |
| D12 | Manter o núcleo da stack: Next.js, TypeScript, Tailwind, shadcn/ui e PostgreSQL. Prisma e outros adapters do pacote permanecem defaults técnicos |
| D13 | Começar cadastrando os novos orçamentos conforme surgirem, sem migração obrigatória do histórico |
| D14 | Casos de referência: suporte para tablet (uma peça/placa), `1 lixeira` (produto em placas distintas) e `brindes participantes` (várias unidades/placa) |

Decisões adicionais de 27/10/2026:

- **D15:** o repositório `h3ldesk` já foi criado e está disponível localmente; atualiza a situação inicial de D11. Nesta etapa, o usuário autorizou apenas leitura, cópia das referências visuais e adaptação local das cores, sem implementar o aplicativo.
- **D16:** adotar o design system do website/Unveil, substituindo a assinatura verde pelo laranja H3LForge `#ff6600` somente neste repositório. Ver `../design-system/README.md`. A base compartilhada permanece intacta.

Decisões confirmadas nesta rodada:

- **D17:** a direção visual das três prévias foi aprovada como referência inicial, mantendo D16.
- **D18:** autenticação por cadastro público, e-mail e senha, com recuperação de senha. Substitui a proposta de Google OAuth/allowlist. Cada conta tem um workspace próprio e dados privados isolados; não há acesso automático à operação H3LForge.
- **D19:** utilizar pnpm e um único lockfile pnpm. O runtime estável compatível será escolhido em M0; o Node encontrado na máquina não fixa a versão do projeto.
- **D20:** adotar Docker Compose para o PostgreSQL local. Docker e Compose foram encontrados instalados, mas o usuário atual não tem permissão no socket do daemon. Nenhuma permissão foi alterada e nenhum container foi criado nesta preparação.
- **D21:** separar desenvolvimento, testes automatizados, homologação e produção, com bancos, credenciais, sessões, arquivos e envio de e-mail isolados. A necessidade de separar testes e produção foi confirmada; quatro ambientes é a organização técnica proposta.
- **D22:** começar pela fundação e pelos CRUDs de materiais, custos adicionais e clientes, antes de projetos completos, motor de preços, orçamentos, PDFs e produção. O objetivo de R1 permanece, mas a primeira entrega útil é menor.

- **D23:** stack consolidada aprovada: Next.js/React/TypeScript, Tailwind/shadcn e design system local, Lucide, React Hook Form/Zod, Prisma/PostgreSQL, Better Auth, pnpm, ESLint/Prettier, Vitest/Testing Library/Playwright. Hospedagem Vercel e banco Neon; desenvolvimento/testes PostgreSQL em Docker. Resend/Mailpit para e-mails, R2/adapter local para arquivos, decimal.js para cálculos, React PDF para documentos e dnd-kit para interação de arrastar entram nos marcos em que forem necessários. Ver `06-arquitetura.md`.
- **D24:** uso pessoal e não comercial no início, com planos gratuitos dentro dos limites. Migração para planos pagos será avaliada futuramente; não contratar nem provisionar serviços automaticamente.

## 3. Decisões propostas para permitir implementação

| ID | Default executável | Motivo |
| --- | --- | --- |
| P01 | Quatro releases incrementais | Entregar valor antes de catálogo e conteúdo |
| P02 | Um workspace privado por conta, inicialmente com um proprietário | Atualizado por D18; sem equipes, convites ou cobrança SaaS no início |
| P03 | Implementação dos adapters de `06-arquitetura.md` | Ferramentas aprovadas em D23; configuração e versões serão verificadas no marco correspondente |
| P04 | Entrada manual dos dados do fatiador em R1 | Preservar precisão sem depender de formatos não verificados |
| P05 | Preço fechado por lote como modo inicial de compatibilidade | Reproduzir a regra de R$ 71,00 do exemplo |
| P06 | Modo unitário alternativo com centavos exatos | Evitar divergência entre quantidade, unitário e total |
| P07 | Uma fonte de placa por componente em cada receita | Cobrir o caso real sem otimização de combinações |
| P08 | Estoque por rolo, com custo específico de aquisição | Rastrear consumo sem inventar um método contábil complexo |
| P09 | Status e compartilhamento manual no início | Evitar credenciais e automação externa desnecessárias |
| P10 | Um template de PDF e três templates de conteúdo | Consistência visual com escopo implementável |
| P11 | Agenda da P2S em R2; formulário antes de arrastar | Resolver primeiro regras e histórico |
| P12 | Fotos e arquivos privados até seleção explícita | Evitar publicação involuntária de personalizações |

Esses defaults podem ser implementados sem nova pergunta, salvo conflito com o repositório ou instrução posterior. Alteração significativa deve ser registrada.

## 4. Pendências e como não bloquear o restante

| ID | Pergunta pendente | Tratamento previsto |
| --- | --- | --- |
| Q01 | Qual o objetivo da reserva chamada ROI e do divisor 24? | Preservar em modo legado identificado; não corrigir nem incorporar numa nova política silenciosamente |
| Q02 | Quais parâmetros de custo devem valer para propostas reais? | Usar preset da planilha para testes; exigir revisão dos parâmetros no onboarding operacional |
| Q03 | Quais são os horários concretos de início/troca e funcionamento? | Implementar configuração; 12–16h são hipóteses de capacidade, não janelas definidas |
| Q04 | Quais logo e ativos oficiais serão usados? | Paleta e tipografia base confirmadas em D16; logo e ativos ainda pendentes antes de finalizar PDF/catálogo de marca |
| Q05 | Quais contas, regiões e domínios usar no provisionamento? | Vercel/Neon aprovados em D23; recursos e credenciais de homologação/produção ainda não provisionados |
| Q06 | Como será a administração global da plataforma, se necessária? | Cadastro público com workspace próprio confirmado em D18; contas comuns não têm acesso global. Administração da plataforma fora do fluxo inicial |
| Q07 | Haverá importação histórica no futuro e quais arquivos? | Não bloqueia R1: início por cadastro progressivo. Os três exemplos de D14 foram autorizados para referência; arquivos de modelo/fotos ainda não selecionados |
| Q08 | Há taxa, imposto ou custo comercial que não está na planilha? | Campos manuais com base explícita; não inferir obrigações ou percentuais |
| Q09 | Há interesse em telemetria/IA e quais custos são aceitáveis? | M9 opcional; módulos manuais completos antes disso |
| Q10 | Como tratar alterações comerciais depois de aprovado? | Não alterar pedido por revisão automática; registrar novo escopo antes de implementar aditivos |

Pedir informação ao usuário somente quando for necessária para uma ação concreta dependente. Exemplos: escolher arquivos reais para importar ou publicar uma identidade final. Recursos locais e testes podem continuar com dados fictícios.

## 5. Fonte operacional primária

Relato do usuário nesta conversa, atualizado em 27/10/2026. As informações sobre uma P2S, atividade secundária, capacidade diária, dificuldades e prioridades vieram diretamente dele.

Planilha Google Sheets `teste`, na pasta `h3lforge (old)`, consultada em 27/10/2026. Abas lidas: `Impressoras`, `Filamentos`, `Lista Produtos` e `Exemplo`. Foram inspecionadas fórmulas e valores em faixas limitadas. Não foi realizada auditoria de todas as linhas, células ou erros do arquivo.

Na atualização 1.1, foram conferidas também as linhas 42 (`suporte para tablet`), 88 (`brindes participantes`) e 101–102 (`1 lixeira`), além dos parâmetros da P2S e do PLA. O detalhamento fica em `09-exemplos-de-referencia.md`. Os preços de venda calculados nesse documento são simulações de teste com multiplicador 3, não preços comerciais confirmados pelo usuário para esses itens.

Para evitar carregar metadados de um arquivo privado para um futuro repositório público, o link/ID do Drive não é necessário nesta especificação. Se houver importação autorizada, registrar a origem no ambiente privado da operação.

### Regras observadas

- Material: custo de compra dividido pelo peso em gramas e multiplicado pelo peso estimado.
- Energia: duração de planilha convertida de dias para horas, potência e tarifa.
- Manutenção: 40% do valor da impressora distribuído pela vida útil em horas.
- Depreciação: valor dividido pela vida útil e multiplicado pelo tempo.
- Acabamento: percentual do material.
- Falhas: percentual sobre material, energia, manutenção, depreciação e acabamento.
- Reserva chamada ROI: valor da impressora dividido por vida útil × 24; multiplicado pelo tempo.
- Resumo: soma por nome do produto, trabalho humano, adicionais e multiplicador de venda com arredondamento para cima ao real inteiro.
- Unitário observado: preço do lote dividido pela quantidade encontrada na primeira linha do produto.

O novo sistema substitui o vínculo por nome por IDs/versões e composição explícita. Essa é uma melhoria de estrutura, sem alterar silenciosamente a fórmula de compatibilidade.

## 6. Fontes técnicas públicas

- Next.js: https://nextjs.org/docs/app
- Prisma ORM: https://www.prisma.io/docs/orm/data-modeling
- shadcn/ui: https://ui.shadcn.com/docs
- Better Auth / Next.js: https://better-auth.com/docs/integrations/next
- Better Auth / Google: https://better-auth.com/docs/authentication/google
- Spoolman: https://github.com/Donkie/Spoolman
- OctoPrint REST: https://docs.octoprint.org/en/main/api/index.html
- Moonraker: https://moonraker.readthedocs.io/en/latest/

Consultar a documentação de versões atuais na implementação. Spoolman é serviço para hospedar; OctoPrint/Moonraker dependem de ambientes compatíveis. Essas opções não demonstram compatibilidade pronta com a P2S do usuário.

## 7. Registro de decisões novas

Adicionar entradas sem apagar o histórico relevante:

```text
ID e data:
Contexto:
Decisão:
Origem: usuário | default técnico | experimento validado
Alternativas relevantes:
Impacto em dados, custos e compatibilidade:
Marcos afetados:
```

## 8. Lacunas deliberadas

A cor principal e o design system foram confirmados em D16; logo e outros ativos oficiais continuam pendentes. Não há credenciais, orçamento de infraestrutura, modelos de arquivos de fatiador para parser, exigências fiscais ou datas de implementação confirmadas. O roadmap é ordenado por dependência e valor, sem prometer calendário de entrega.

## 9. Histórico da especificação

- 1.0, 27/10/2026: pacote inicial de escopo, cálculo, dados, roadmap e critérios de aceite.
- 1.1, 27/10/2026: projeto novo e núcleo da stack confirmados; cadastro progressivo priorizado; importador CSV movido para evolução opcional; três exemplos reais adicionados com dados conferidos e testes C23–C26/E06. Nenhum código de aplicativo ou repositório remoto criado nesta atualização.


### D25 — implementação da fundação, 27/10/2026

Origem: instrução do usuário para iniciar e validação local. M0 implementado e testado localmente; usar Prisma 7.10.1 estável com adapter `pg` e Node 24.22.1 LTS. ESLint 10 usa plugins equivalentes compatíveis em vez do preset Next que ainda inclui peers incompatíveis. Os limites, comandos e evidências estão em `11-fundacao-executavel.md` e no roadmap. Autorização para iniciar não implica commit, push, contratação nem deploy. M1A permanece a próxima etapa.
