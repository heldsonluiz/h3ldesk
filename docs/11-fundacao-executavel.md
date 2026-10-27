# M0 — fundação executável

Entrega local de 27/10/2026. O H3LDesk agora tem aplicação real, banco migrado, autenticação por e-mail/senha e workspace privado por conta. Materiais, clientes e custos adicionais ficam para M1A; não há indicadores fictícios no painel operacional.

## Versões e ferramentas

- Node.js 24.22.1 LTS, fixado em `.nvmrc`, `.node-version` e `devEngines.runtime`; pnpm baixa o runtime compatível para os scripts quando necessário.
- pnpm 12.15.0 e `pnpm-lock.yaml`, com peers estritos.
- Next.js 16.4.3, React/React DOM 19.3.1, TypeScript, Tailwind 4.
- Componentes base no padrão shadcn, com Radix Slot/CVA, e configuração `components.json`. Tokens locais em `design-system/`; DM Sans, Manrope e IBM Plex Mono via `next/font`.
- Prisma 7.10.1 e adapter `pg`; config em `prisma7.config.ts`, conforme a linha 7 instalada. Prisma 8 foi identificado como RC e não adotado.
- Better Auth 1.7.14 e adapter Prisma compatível.
- PostgreSQL 18; Mailpit v1.27.11, sem envio externo.
- ESLint 10 com plugins compatíveis de React/Next/TypeScript/hooks/acessibilidade. O preset `eslint-config-next` foi substituído porque seus plugins transitivos ainda rejeitam ESLint 10. Sem `--force`, sem relaxar peers. `unrs-resolver` usa binário opcional sem script de build.

Versões exatas restantes estão em `package.json` e no lockfile. Dependências de domínio/PDF/kanban/arquivos não foram instaladas antecipadamente.

## Primeiro checkout local

```bash
pnpm install --frozen-lockfile
pnpm setup:local
docker compose --env-file .env.docker --profile test up -d --wait
pnpm db:generate
pnpm db:migrate
pnpm db:migrate:test
pnpm dev
```

Acesse `http://localhost:3000`. O setup gera `.env.docker`, `.env` e `.env.test` somente se ausentes, com segredos aleatórios diferentes. Arquivos existentes são preservados; nunca usar esse setup em produção. Nenhum e-mail pessoal nem conta padrão foi incluído.

As senhas de inicialização do PostgreSQL só valem ao criar o volume. Não trocar `.env.docker` esperando alterar a senha de um banco já existente; isso exige procedimento próprio. Não remover o volume para resolver credenciais sem revisar seus dados.

## Fluxos disponíveis

- `/cadastro`: conta pública por e-mail/senha; mínimo de 8 caracteres e confirmação.
- `/verificar-email`: reenvio de confirmação com resposta genérica.
- `/entrar`: exige e-mail confirmado; logout disponível no painel.
- `/esqueci-senha`: solicitação de recuperação sem revelar se o e-mail existe.
- `/redefinir-senha`: token temporário, uso único; nova senha revoga sessões existentes.
- `/painel`: exige sessão verificada e exibe somente o workspace do proprietário.
- `/api/workspace` e `/api/workspace/[workspaceId]`: consulta autorizada no servidor; IDs de outra conta não concedem acesso. Respostas privadas sem cache público.
- `/demo`: somente leitura, referências estáticas identificadas, sem consultar banco operacional nem fornecer bypass de autenticação. Não é o motor de simulação de M2.

Conta, autenticação e workspace têm migração versionada. Restrições únicas impedem dois workspaces para o mesmo proprietário. A criação do workspace acompanha o cadastro pelo hook de servidor. O cadastro de cliente comercial será uma entidade diferente da conta de acesso.

## E-mails locais

| Ambiente | SMTP | Capturador no navegador |
| --- | --- | --- |
| Desenvolvimento | `127.0.0.1:51025` | `http://localhost:58025` |
| Testes | `127.0.0.1:51026` | `http://localhost:58026` |

Crie sua conta e abra o capturador de desenvolvimento para acessar o link de confirmação. Recuperação também aparece ali. O Mailpit captura mensagens, não as entrega na internet. Resend/domínio real não estão configurados.

Não publicar os capturadores na rede nem compartilhar links/tokens das mensagens. Os serviços Compose são vinculados a loopback.

## Testes e verificações

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:migrate:test
pnpm test:e2e
pnpm format:check
```

Playwright usa um build já gerado e inicia a aplicação em `localhost:3101` com `.env.test`. O wrapper recusa qualquer banco que não seja o local `h3ldesk_test` em 55433, credencial/usuário incorretos, origem ou porta de e-mail de outro ambiente. Não há reset genérico de banco. Os testes criam contas fictícias exclusivas no banco de testes, sem popular desenvolvimento; esse banco é temporário.

Verificações executadas: build, lint e tipos; quatro testes de ambiente; dois testes de navegador cobrindo cadastro, confirmação, login, logout, duas contas com workspaces distintos, acesso cruzado/sem sessão negado, recuperação, link usado recusado, senha antiga inválida e sessão aberta em outro navegador revogada após redefinição. Formulários e demo conferidos em 1440/390/320 px sem overflow, com erros por campo e preservação do preenchimento. Ordem básica de teclado conferida em desktop.

Persistência do banco após reinício, concorrência sob carga, envio via Resend, testes de expiração por passagem real do tempo e infraestrutura hospedada não foram validados nesta entrega. Os prazos de token são configurados no Better Auth; os testes verificam o reuso recusado. Limites de tentativas ficam habilitados em banco inclusive em desenvolvimento.

## Configuração hospedada

Ainda não foram criados projetos Vercel, Neon, R2 ou Resend. Configurar homologação e produção separadamente, com origens HTTPS, bancos, segredos e e-mails próprios. `APP_ENV` deve ser explícito; em deploy Vercel, valores `development`/`test` são recusados. Cookies têm prefixo por ambiente e usam `Secure` nos ambientes hospedados. Não usar `.env` local no deploy.

O envio hospedado usa o transporte SMTP configurado (destinado ao Resend). São exigidos host, porta, usuário e senha, com remetente/domínio verificados pelo provedor antes do uso real. As credenciais não são necessárias para validar localmente. Uploads e bucket privado serão implementados em M1B; não armazenar arquivos de produção no disco efêmero da Vercel.

## Próxima fatia

M1A: materiais, custos adicionais reutilizáveis e clientes, começando por um CRUD completo com isolamento, validação e persistência. Não iniciar projetos completos, preços, PDFs, produção ou publicação antes de concluir os marcos correspondentes.
