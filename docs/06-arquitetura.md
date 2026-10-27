# Arquitetura e implementação

## 1. Status das escolhas

O repositório H3LDesk já existe. A stack consolidada abaixo foi aprovada pelo usuário em 27/10/2026 (D23). O início será pessoal e não comercial, na Vercel, com banco hospedado Neon. O uso de serviços pagos poderá ser revisto posteriormente. Aprovar a stack não significa que os serviços estejam provisionados, que as integrações tenham sido implementadas ou que a aplicação esteja publicada.

Não fixar neste documento números de versões que envelhecem. Em M0, verificar documentação oficial, escolher versões estáveis compatíveis e registrar versões, requisitos de runtime e lockfile. Não usar exemplos de APIs antigas sem conferir a versão instalada.

## 2. Stack para projeto novo

| Camada | Escolha aprovada | Quando introduzir |
| --- | --- | --- |
| Aplicação | Next.js App Router, React e TypeScript strict | M0 |
| Backend | Server Actions e Route Handlers no Next.js, com serviços de domínio testáveis | M0/M1A |
| Interface | Tailwind CSS + shadcn/ui + design system local laranja | M0 |
| Ícones | Lucide | Conforme a interface |
| Formulários/contratos | React Hook Form + Zod; validação também no servidor | M0/M1A |
| Persistência | PostgreSQL + Prisma ORM e migrações versionadas | M0 |
| Autenticação | Better Auth; e-mail/senha, verificação, recuperação e workspace privado por conta | M0 |
| Banco hospedado | Neon, projetos separados para homologação e produção | Ao configurar os ambientes hospedados |
| Banco local | PostgreSQL via Docker Compose, serviços distintos de desenvolvimento/teste | Preparado; ver `10-ambiente-local.md` |
| E-mails locais | Mailpit, sem entrega externa | M0 |
| E-mails reais | Resend, domínio/remetente verificados antes do uso público | Antes de liberar cadastro/verificação/recuperação hospedados |
| Cálculos | decimal.js em funções puras, com precisão e arredondamento explícitos | M2 |
| Arquivos | Adapter local no desenvolvimento; Cloudflare R2 privado, compatível com S3, na hospedagem | M1B; antes de uploads hospedados |
| PDF | React PDF, template fixo, artefato histórico armazenado | Prova técnica em M3 |
| Kanban/arrastar | dnd-kit, com alternativa por formulário/teclado | Quando o fluxo correspondente for implementado |
| Testes | Vitest + Testing Library + Playwright | M0 em diante, conforme a regra/fluxo |
| Qualidade | ESLint + Prettier | M0 |
| Gerenciador | pnpm, lockfile único | M0 |
| Runtime | Node.js LTS compatível, escolhido e fixado na implementação | M0 |
| Hospedagem | Vercel, inicialmente uso pessoal/não comercial | Quando houver aplicação validada para publicar |

Instalar apenas o necessário ao marco atual. Serviços e bibliotecas previstos para etapas futuras não devem virar dependências antecipadas dos CRUDs. Limites e preços dos planos gratuitos devem ser conferidos no provisionamento; não representam gratuidade ilimitada ou permanente.

O backend permanece no mesmo projeto da interface. O acesso privado ao banco ocorre no servidor, com autorização por workspace; a presença do ORM não substitui essa autorização. Em ambientes serverless, configurar a conexão Prisma/Neon com pooling e a estratégia de migração compatíveis com as versões efetivamente instaladas.

Prisma e autenticação devem seguir a documentação da versão efetivamente adotada, inclusive configuração e adaptadores de banco. O PDF exige uma prova técnica pequena em M3 para validar fontes, páginas e compatibilidade do runtime. Se não atender, registrar substituição do renderer; não apresentar impressão do navegador como download de PDF já resolvido.

## 3. Um monólito modular

Evitar microserviços, filas externas, arquitetura de plugins e múltiplos bancos no início. Servidor e interface vivem no mesmo repositório, com módulos separados por responsabilidade.

Estrutura ilustrativa, adaptável ao repositório:

```text
src/
  app/                 rotas, layouts e handlers
  features/
    projects/
    clients/
    materials/
    recipes/
    quotes/
    orders/            a partir de R2
    inventory/         a partir de R2
    production/        a partir de R2
    reports/           a partir de R2
    catalog/           a partir de R3
    content/           a partir de R4
  domain/
    costing/           cálculos puros e versionados
    planning/          rendimento e quantidade de execuções
  server/
    auth/
    db/
    storage/
    pdf/
  shared/
    ui/
    validation/
tests/
docs/
```

Domínio não importa componentes React, ORM ou segredos. Serviços de aplicação orquestram autorização, leitura de dados, cálculo e transações. Não criar repository genérico para cada tabela sem necessidade.

## 4. Contratos e ações

API própria é o centro do produto. REST handlers ou server actions podem ser usados, mantendo funções de serviço testáveis e contratos tipados. Usar uma única implementação do cálculo no servidor; a prévia no cliente pode compartilhar funções puras, mas emissão recalcula tudo no servidor.

Operações conceituais mínimas:

| Operação | Contrato e regra |
| --- | --- |
| Criar/editar projeto | Dados validados e revisão esperada; retorno de ID/revisão |
| Upload e vinculação | Arquivo autorizado, metadados e associação confirmada sem duplicação |
| Salvar receita | Componentes/placas completos, ou rascunho explicitamente incompleto |
| Simular | Quantidade, versão da receita e política; retorna execuções, custos e avisos |
| Emitir orçamento | Rascunho, revisão esperada e comando idempotente; congela conteúdo e produz PDF |
| Criar nova revisão | Origem e modo histórico/atual; apresenta diferenças |
| Aprovar/converter | Revisão emitida válida; pedido único por revisão aprovada |
| Reservar/consumir | Rolo, gramas, referência e chave idempotente; transação |
| Agendar trabalho | Intervalo, disponibilidade e revisão; detectar concorrência |
| Registrar resultado | Componentes, tempos, consumo e pendências; baixa única |
| Publicar catálogo | Lista de campos/ativos comerciais autorizados; R3 |

Retornos de erro distinguem validação, ausência de acesso, não encontrado, conflito e falha temporária. Mensagem de interface deve explicar a ação possível; logs internos recebem um ID de correlação.

## 5. Valores monetários e imutabilidade

Decimais em JSON são strings. Os tipos devem distinguir custo interno de preço comercial. Valor em centavos não pode ser multiplicado/dividido como se fosse real.

Snapshots versionados podem usar JSON validado além de relações normais. O snapshot de orçamento é a fonte do documento histórico, não a consulta dos cadastros atuais. Guardar versão do schema, do cálculo e do template.

Revisão otimista para rascunhos; transações no banco para emissão/conversão, reservas, consumos, estornos e agenda. Limitar preço negociado a números válidos, mas permitir abaixo do custo com aviso claro e confirmação, sem inventar política comercial proibitiva.

Validação de agenda aplica-se a novas previsões. Um horário real já ocorrido pode gerar conflito com planos seguintes; registrar o fato e sinalizar replanejamento. Não falsificar a duração real para manter o calendário sem sobreposição visual.

## 6. Acesso e arquivos

- Toda ação privada verifica sessão e workspace no servidor. Proxy/middleware não substitui essa verificação.
- Cadastro público por e-mail e senha: criar conta e workspace próprio sem conceder acesso a outros workspaces. Não solicitar escopos OAuth.
- Exigir verificação do e-mail antes do uso operacional. Recuperação usa token expirável, de uso único, sem registrar senha/token em logs ou revelar se um e-mail tem conta.
- Hash de senha, sessões e tokens ficam a cargo da biblioteca de autenticação adotada, com a configuração da versão instalada; não criar criptografia própria.
- Aplicar limites de tentativas nas rotas de cadastro, login e recuperação; invalidar sessões conforme a política de redefinição. Resend e domínio/remetente serão configurados antes da publicação; capturador local é somente demonstração/teste.
- Toda consulta, mutação, referência de relacionamento, arquivo, cache e exportação privada deve pertencer ao workspace autenticado. Conhecer um ID não autoriza acesso.
- Sem credenciais, testes e demo usam adapter explicitamente isolado. Nunca liberar operação real por `NODE_ENV` mal configurado.
- Upload valida extensão, MIME e tamanho no servidor; nomes são normalizados e chaves geradas pelo sistema.
- Limites iniciais propostos: imagens até 15 MiB e modelos/documentos até 100 MiB, configuráveis e visíveis no formulário. Conferir limites reais da hospedagem; usar upload direto assinado quando necessário.
- Não executar, extrair ou confiar em conteúdo de modelos. Downloads privados usam autorização e URLs temporárias.
- Produção hospedada não deve guardar arquivos importantes no disco efêmero do servidor.
- PDF e imagens públicas usam conteúdo permitido; nunca incluir dados privados em URL pública ou metadados de exportação.
- Filtrar conteúdo HTML/Markdown vindo de entradas/importações antes de exibir.

## 7. Demo de portfólio

Fornecer modo de leitura com dados fictícios e uma simulação editável isolada em sessão. Se existir edição persistida de demo, usar workspace temporário separado, limites e limpeza. Não compartilhar banco/workspace real com a demo.

Seed de desenvolvimento/teste deve usar as três receitas de `09-exemplos-de-referencia.md`; o lote de 90 unidades permanece teste adicional de compatibilidade. Criar clientes e pedidos fictícios para revisões, falha, reserva parcial, entrega e recebimento. Não popular a operação real automaticamente com esse histórico demonstrativo. Os exemplos autorizados não permitem copiar arquivos privados nem contatos de clientes.

## 8. Importação e exportação

O início da operação usa cadastro manual dos novos orçamentos e não depende de importação histórica. O importador CSV é evolução opcional de M9. Quando implementado: arquivo selecionado pelo usuário; prévia com mapeamento, unidades, erros por linha e possíveis duplicatas. Converter durações de planilha de forma declarada: valor serial de dia × 86.400, ou texto de duração, conforme mapeamento escolhido. Não interpretar automaticamente `1,5` como 15 ou 1.500.

No legado, linhas com o mesmo nome podem ser partes diferentes. A prévia propõe agrupamento, mas exige revisão quando nomes ou quantidades forem ambíguos. Não usar nome como chave final. Guardar procedência e lote de importação para diagnóstico.

Exportação operacional: JSON/CSV versionado de dados e manifesto de arquivos. Backup inclui banco e objetos privados. Documentar restauração e executar um ensaio local com dados fictícios antes do uso real. Exportação de relatório não substitui backup.

## 9. Performance e custos

Paginação e busca no servidor; debounce somente onde adequado; miniaturas dimensionadas; não carregar modelos 3D para listar projetos. Cachear apenas informação pública ou explicitamente isolada por usuário/workspace. Não cachear documentos privados globalmente.

Começar com filtros/indexação simples. Verificar com dataset fictício de cerca de 1.000 projetos e 10.000 registros de movimentos/trabalhos para evitar telas que dependem de carregar todo o banco. Esse volume é um cenário de teste, não uma previsão da operação.

PDF pode ser síncrono na primeira release se o tempo/ambiente permitir. Introduzir job assíncrono apenas se medições justificarem; o estado `gerando/erro/pronto` não pode duplicar emissão.

## 10. Integrações futuras

| Integração | Uso possível | Limite |
| --- | --- | --- |
| Spoolman | Gestão ou sincronização de rolos | Definir uma única fonte autoritativa de saldo |
| Drive | Importação de arquivos ou planilha | Consentimento/escopos e seleção explícita |
| Telemetria de impressora | Dados de execução | Compatibilidade P2S/firmware verificada; não presumir REST pública |
| IA de texto/imagem | Sugestões e edição | Revisão humana, limite de custo e política para dados |
| WhatsApp/Instagram | Compartilhamento avançado | Fora de R1-R4; nenhuma automação implícita |

Não integrar APIs públicas apenas para demonstrar consumo. A utilidade desse produto depende dos dados da operação e da confiabilidade das regras.

## 11. Referências técnicas

Consultadas em 27/10/2026; conferir a versão adotada em M0:

- Next.js App Router: https://nextjs.org/docs/app
- Prisma: https://www.prisma.io/docs/orm/data-modeling
- shadcn/ui: https://ui.shadcn.com/docs
- Better Auth com Next.js: https://better-auth.com/docs/integrations/next
- Google OAuth no Better Auth: https://better-auth.com/docs/authentication/google
- Spoolman: https://github.com/Donkie/Spoolman

As referências sustentam opções técnicas, não autorizam criar contas, contratar serviços ou copiar dados reais.


## 12. Separação de ambientes e primeira entrega

- **Desenvolvimento:** banco e arquivos locais; PostgreSQL em Docker Compose. Captura de e-mails local com Mailpit, sem entrega externa.
- **Testes automatizados:** banco dedicado descartável, arquivos temporários e adaptador de e-mail de teste. Reset de dados deve recusar qualquer destino de produção.
- **Homologação:** ambiente separado para validação manual, com credenciais, banco, arquivos e sessões próprios. Vercel com projeto/variáveis de ambiente próprios; não copiar clientes reais por padrão.
- **Produção:** banco, arquivos, domínio/origem de autenticação, segredos e provedor de e-mail próprios. Sem demo habilitando acesso operacional e sem seeds fictícios automáticos.

Separar apenas por prefixo de tabela ou pelo nome de uma variável não é isolamento suficiente. Migrações são versionadas e aplicadas explicitamente a cada ambiente. Cookies, URLs de verificação/recuperação e credenciais não devem cruzar os ambientes. A nomenclatura e os serviços concretos serão definidos em M0, sem contratar recursos agora.

A primeira fatia é autenticação e CRUDs de materiais, custos adicionais reutilizáveis e clientes. Não antecipar o domínio inteiro de projetos/receitas/estoque para entregar esses cadastros. O cadastro de novos usuários é público, mas não há equipes, convites, múltiplos workspaces por conta ou cobrança nesta fase.


## 13. Fontes da stack consolidada

Consultadas em 27/10/2026; verificar versões e condições novamente ao implementar/provisionar:

- Next.js: https://nextjs.org/docs/app/getting-started
- Better Auth, e-mail/senha: https://better-auth.com/docs/authentication/email-password
- Prisma e Neon: https://neon.com/docs/guides/prisma
- Neon e plano gratuito: https://neon.com/pricing
- Vercel e Neon: https://vercel.com/marketplace/neon
- Resend: https://resend.com/pricing
- Cloudflare R2: https://developers.cloudflare.com/r2/pricing/

Manter credenciais e projetos separados entre homologação e produção. Testes automatizados continuam no PostgreSQL local temporário. Arquivos de modelo/fotos/PDFs são objetos privados no armazenamento, com referências no banco; não guardar seus binários nas tabelas de negócio.
