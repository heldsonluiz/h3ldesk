# PostgreSQL local — desenvolvimento e testes

Configuração inicial de M0. A fundação M0 já inclui aplicativo, schema, migrações e autenticação, detalhados em `11-fundacao-executavel.md`. A produção não é configurada por este Compose.

## Serviços

| Ambiente | Serviço | Acesso no host | Banco / usuário | Persistência |
| --- | --- | --- | --- | --- |
| Desenvolvimento | `postgres-dev` | `127.0.0.1:55432` | `h3ldesk_dev` | Volume `h3ldesk-local_postgres-dev-data` |
| Testes automatizados | `postgres-test` | `127.0.0.1:55433` | `h3ldesk_test` | Temporário em memória; removido ao parar o container |

O projeto Compose se chama `h3ldesk-local`. Cada banco tem credenciais e rede próprias; o serviço de testes só sobe com o profile `test` ou seleção explícita. Ambos usam a imagem oficial PostgreSQL 18 e são publicados somente na interface local. O volume é montado em `/var/lib/postgresql`, conforme o layout da imagem PostgreSQL 18: https://hub.docker.com/_/postgres.

O volume de desenvolvimento não é um backup. As credenciais são destinadas exclusivamente ao ambiente local. Homologação e produção terão bancos, segredos e arquivos separados quando os provedores forem definidos.

## Credenciais

Foi criado `.env.docker` local, ignorado pelo Git, com senhas aleatórias diferentes e permissão 600. Não imprimir nem versionar seu conteúdo. Em outro checkout, copiar `.env.docker.example` para `.env.docker` e substituir os dois valores. Não reutilizar senhas operacionais.

Os futuros URLs da aplicação terão o formato `postgresql://<usuario>:<senha>@127.0.0.1:<porta>/<banco>`. Eles serão configurados junto do Prisma, sem misturar os bancos. As senhas geradas usam hexadecimal para evitar ambiguidades de codificação em URLs.

## Iniciar pelo terminal da máquina

```bash
cd /home/helds/code/h3ldesk

docker compose --env-file .env.docker config --quiet

docker compose --env-file .env.docker up -d --wait postgres-dev

docker compose --env-file .env.docker --profile test up -d --wait postgres-test

docker compose --env-file .env.docker --profile test ps
```

A primeira execução baixa a imagem oficial. Se houver conflito de portas ou algum recurso com o mesmo nome, revisar antes de alterar ou excluir serviços. Não parar containers de outros projetos.

## Conferir as conexões

```bash
docker compose --env-file .env.docker exec postgres-dev psql -U h3ldesk_dev -d h3ldesk_dev -c 'select current_database(), current_user;'

docker compose --env-file .env.docker exec postgres-test psql -U h3ldesk_test -d h3ldesk_test -c 'select current_database(), current_user;'
```

Essas consultas só leem a identidade da conexão. Quando a aplicação existir, cada execução de testes deverá validar explicitamente o destino de testes antes de qualquer reset. O Compose sozinho não impede uma aplicação mal configurada de usar o URL errado.

## Parar preservando desenvolvimento

```bash
docker compose --env-file .env.docker --profile test stop
```

Parar apaga os dados em memória dos testes; desenvolvimento permanece no volume. Não usar `down -v` na rotina, pois excluiria o volume de desenvolvimento deste projeto.

## Estado da verificação

Após o reinício da sessão, o acesso ao daemon funcionou com execução autorizada fora do sandbox. Executados `docker compose --env-file .env.docker --profile test up -d --wait` e `ps`: os dois bancos ficaram `healthy`. Consultas via TCP autenticadas com as credenciais próprias retornaram `h3ldesk_dev`/`h3ldesk_dev` e `h3ldesk_test`/`h3ldesk_test`. O `financehub-db` existente permaneceu em execução na porta 5432, sem alteração. O volume persistente e o armazenamento temporário estão configurados; recuperação após reinício ainda não foi testada.

Captura local de e-mails e aplicação pnpm foram implementadas em M0: desenvolvimento usa SMTP 51025/UI 58025 e testes usam SMTP 51026/UI 58026. Confirmação e recuperação de senha usam esses capturadores, sem entrega externa. Ver `11-fundacao-executavel.md`.
