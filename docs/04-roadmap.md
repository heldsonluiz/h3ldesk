# Roadmap de implementação

O status de cada marco é registrado nas tarefas e evidências abaixo. M0 foi concluído localmente em 27/10/2026; M1A e os seguintes ainda não foram iniciados. Atualizar checkboxes apenas após a verificação correspondente.

## Regras de execução

- Dependência principal: M0 → M1A → M1B → M2 → M3 → M4 → M5 → M6 → M7 → M8.
- Não agrupar todo o roadmap em uma única implementação.
- Em cada marco, entregar fluxo completo: persistência, domínio, interface, erros e validação.
- Criar somente a infraestrutura necessária ao marco atual.
- Se faltar credencial, oferecer o adapter local/demo documentado; não fingir que uma integração real funciona.
- Uma decisão pendente afeta apenas o recurso dependente. Usar os defaults propostos que estão explicitamente documentados.

## M0. Fundação executável e contratos do domínio

**Resultado:** projeto local executável, cadastro público e acesso protegido, isolamento entre contas e ambientes, pronto para os cadastros básicos.

- [x] Inspecionar o repositório, registrar stack encontrada e preservar recursos existentes.
- [x] Iniciar um projeto novo com o núcleo da stack confirmado em `06-arquitetura.md`, versões estáveis verificadas e lockfile; preservar documentação existente. A criação do remoto é ação separada.
- [x] Configurar lint, typecheck, testes de domínio, build, banco local e migrações.
- [x] Criar estrutura por funcionalidades para autenticação e cadastros, preservando a futura separação do motor de cálculo.
- [x] Usar pnpm com lockfile único e runtime estável compatível verificado.
- [x] Configurar cadastro público por e-mail/senha, login, logout, verificação de e-mail e recuperação de senha.
- [x] Criar workspace privado por conta, timezone e moeda; testar acesso cruzado negado no servidor.
- [x] Isolar bancos/credenciais/cookies/e-mails locais de desenvolvimento e testes; implementar contratos de configuração que recusem serviços locais em deploy. Homologação/produção exigirão provisionamento próprio, ainda não realizado.
- [x] Configurar PostgreSQL local via Docker Compose e captura de e-mails sem envio externo; documentar o acesso necessário ao daemon Docker.
- [x] Implementar modo demo isolado e negar bypass de autenticação em produção.
- [x] Documentar o isolamento de arquivos; implementar upload e adapters privados no marco de projetos, quando forem necessários.
- [x] Reservar parâmetros versionados e preset da planilha para M2, sem tornar o motor de preços pré-requisito dos CRUDs básicos.
- [x] Testar cadastro/login/recuperação, proteção de rotas e isolamento entre contas e ambientes.
- [x] Documentar execução local, variáveis, seed e limitações reais.

**Aceite:** instalação limpa com pnpm, banco criado por migrações, app abre sem erro, cadastro/login/logout funcionam, recuperação é validada no capturador local, rota privada nega acesso e uma conta não lê/edita dados da outra. Testes não atingem produção. Não declarar envio real de e-mails como pronto sem provedor configurado.

## M1A. Cadastros básicos — primeira entrega funcional

**Dependência:** M0. Prioridade confirmada pelo usuário antes de projetos e orçamentos completos.

- [ ] CRUD de materiais com descrição, tipo, fabricante/cor e custo de referência; sem estoque físico.
- [ ] CRUD de clientes com nome obrigatório e contatos opcionais.
- [ ] CRUD de custos adicionais reutilizáveis com nome, valor-base e incidência, sem aplicação automática em orçamentos.
- [ ] Listagens com busca/paginação e formulários com validação, estados e preservação de dados após erro.
- [ ] Exclusão com confirmação para registros sem vínculo; arquivamento de referenciados.
- [ ] Persistir valores monetários com precisão decimal e validar no servidor.
- [ ] Verificar propriedade nas operações, inclusive IDs de relacionamentos; testes com duas contas independentes.
- [ ] Conferir os fluxos em desktop, celular e teclado, usando o design system laranja aprovado.

**Aceite:** duas contas podem cadastrar dados próprios sem enxergar ou alterar os dados uma da outra. Criar, editar, buscar e excluir/arquivar materiais, clientes e custos adicionais funciona com persistência real. Não exigir catálogo, projeto, impressora configurada ou orçamento para esses cadastros.

## M1B. Projetos e biblioteca reutilizável

**Dependência:** M1A. **Requisitos:** PROJ, CAD e estrutura PROD.

- [ ] Cadastro/edição/arquivamento de clientes, materiais e projetos.
- [ ] Busca de projetos por nome, etiquetas, descrição e cliente com paginação.
- [ ] Upload privado de arquivos e fotos com validação de tamanho/tipo e download autorizado.
- [ ] Versões de modelo, referência de origem e seleção da versão aprovada.
- [ ] Cadastro de componentes, receitas, placas, saídas e consumos por material/cor.
- [ ] Cadastro de operações humanas e adicionais com incidência explícita.
- [ ] Página de projeto com arquivos, receitas, fotos e histórico ainda vazio de orçamentos.
- [ ] Oferecer cadastro manual progressivo, sem exigir importação de dados antigos ou catálogo inicial.
- [ ] Usar as três receitas autorizadas de `09-exemplos-de-referencia.md`, mantendo clientes e pedidos fictícios.

**Aceite:** criar projeto completo, reencontrá-lo pela busca, recuperar o arquivo, escolher receita e editar um rascunho sem perder uma versão anterior. Os três exemplos autorizados estão representados sem migração do acervo. Nomes repetidos não misturam registros.

## M2. Simulação e memória de cálculo

**Dependência:** M1B. **Requisitos:** PROD, ORC-01 a ORC-05.

- [ ] Gerar planos de execuções com rendimento por componente e sobras visíveis.
- [ ] Tratar placa parcial por repetição cheia ou variante informada, sem interpolação automática.
- [ ] Implementar motor `spreadsheet_legacy_v1`, incluindo a reserva adicional identificada.
- [ ] Validar dados ausentes e parâmetros zero/inválidos.
- [ ] Implementar trabalho humano e custos extras nas incidências definidas.
- [ ] Comparar pelo menos três quantidades dentro de uma mesma simulação.
- [ ] Exibir custo por categoria, total, tempo, multiplicador, preço sugerido e preço negociado.
- [ ] Implementar modo comercial lote/unidade, descontos explícitos e reconciliação monetária.
- [ ] Salvar/recuperar rascunhos; apresentar ação explícita para atualizar preços.
- [ ] Iniciar um orçamento sem cadastros prévios, criar projeto/receita no fluxo e salvá-los para reutilizar na próxima solicitação.
- [ ] Testar C01 a C08 e C15/C16 de `07-validacao.md`.
- [ ] Testar C23 a C26 com os exemplos reais selecionados e o cadastro progressivo.

**Aceite:** os três tipos de produto têm resultados explicáveis; repetir cálculo com a mesma entrada gera o mesmo resultado. Nada é reservado ou consumido. A tela não permite emitir cálculo incompleto.

## M3. Histórico de orçamentos e PDF comercial

**Dependência:** M2. **Requisitos:** ORC completo. **Fechamento de R1.**

- [ ] Cliente, condições, validade, prazo e identificação comercial.
- [ ] Emissão com snapshot imutável, versão do cálculo e referência às receitas/arquivos.
- [ ] PDF de um template consistente com logo, imagem e especificação comercial.
- [ ] Guardar o artefato emitido ou garantir a reprodução byte-estável pela versão, preferindo guardar o PDF.
- [ ] Registrar estados de envio/aprovação/recusa/expiração sem alterar conteúdo.
- [ ] Duplicar revisão com parâmetros históricos ou atuais e mostrar diferenças.
- [ ] Baixar PDF e copiar mensagem para envio manual pelo WhatsApp.
- [ ] Garantir que PDF/preview não expõem custos internos nem observações privadas.
- [ ] Conferir visualmente PDFs de um item, vários itens, texto longo e duas ou mais páginas.
- [ ] Executar fluxos E01/E06 e testes C09/C10/C16, incluindo um orçamento criado sem biblioteca previamente populada.
- [ ] Documentar backup/exportação dos dados e arquivos de R1.

**Aceite de R1:** abrir projeto antigo, emitir proposta, atualizar preço de material, duplicar proposta e preservar integralmente a anterior. Todos os passos têm persistência. É possível usar o fluxo sem estoque e sem conexão com a impressora.

## M4. Pedidos, rolos e reservas

**Dependência:** M3. **Requisitos:** PED-01, EST.

- [ ] Conversão idempotente de revisão aprovada em pedido.
- [ ] Cadastro de rolos, entradas, custo de aquisição e saldo utilizável.
- [ ] Alocação de reservas por rolo/material e indicador de falta.
- [ ] Lista do que precisa ser comprado sem assumir integração com loja.
- [ ] Ajustes e estornos com motivo; nenhuma edição destrutiva do livro de movimentos.
- [ ] Cancelamento libera apenas reservas ainda não consumidas.
- [ ] Serviços transacionais e testes de concorrência de reserva/conversão.
- [ ] Gerar trabalhos planejados por execução de placa, sem descontar material antecipadamente.

**Aceite:** orçamento não altera saldo; aprovação gera pedido uma vez; reserva reduz disponível; falta de material fica explícita e não cria estoque fictício. C11/C12/C17 passam.

## M5. Produção, resultados físicos e agenda

**Dependência:** M4. **Requisitos:** PED, AGE.

- [ ] Configurar janelas de máquina, disponibilidade para iniciar/trocar e bloqueios da P2S.
- [ ] Agenda por formulário com prevenção transacional de sobreposição.
- [ ] Exibir cenários de 12 e 16 horas/dia como hipóteses, sem confundir com agendamento real.
- [ ] Iniciar/concluir/falhar trabalhos com tempos e componentes aprovados/rejeitados.
- [ ] Registrar consumos reais e liberar reservas na mesma transação.
- [ ] Criar reposição por ação explícita, vinculada ao trabalho de origem.
- [ ] Calcular quantidade de produtos completos pelos componentes disponíveis.
- [ ] Controlar montagem/finalização, pronto, entrega e entrega parcial quando aplicável.
- [ ] Atualizar previsões e destacar atraso, trabalhos sem programação e finalização pendente.
- [ ] Permitir registrar um atraso real sem rejeitar o fato por conflito com a agenda futura; destacar os trabalhos que precisam ser reprogramados.
- [ ] Adicionar arrastar e soltar se o formulário e as validações estiverem completos; manter alternativa acessível.
- [ ] Executar E02 e C13/C14/C18.

**Aceite:** falha consome material, não infla peças aprovadas e permite replanejar o restante. A agenda não interrompe uma impressão para caber num dia. `Pronto` e `entregue` são registros distintos.

## M6. Resultados, recebíveis e visão consolidada

**Dependência:** M5. **Requisitos:** FIN. **Fechamento de R2.**

- [ ] Registrar recebimentos parciais e estornos ligados ao pedido.
- [ ] Calcular valores a receber, sem inferir pagamento pela aprovação/entrega.
- [ ] Comparar custo previsto e registrado por categoria.
- [ ] Separar provisões, alocações gerenciais e desembolsos.
- [ ] Mostrar custos por execução e resultado por conjunto vendido, sem repetir receita em placas/componentes diferentes.
- [ ] Apresentar resultado e completude dos dados; não usar lucro líquido como rótulo padrão.
- [ ] Dashboard com ações pendentes, prazos, material, conversão e resultados.
- [ ] Filtros por período com base de data explícita: emissão, aprovação, entrega ou recebimento.
- [ ] Exportar CSV reconciliado com tela e pedidos.
- [ ] Validar ausência de dupla contagem de falhas/reimpressões e estornos.

**Aceite de R2:** acompanhar pedido do orçamento à entrega, explicar material utilizado, perdas e resultado, e distinguir venda de recebimento. C19/C20 e E03 passam.

## M7. Catálogo público consistente

**Dependência:** M6. **Requisitos:** CAT. **Release R3.**

- [ ] Produto comercial com descrição, dimensões, opções e fotos selecionadas.
- [ ] Prévia e publicação explícita, com preço opcional cadastrado.
- [ ] Página de catálogo e produto responsivas, com busca/filtros apropriados.
- [ ] Ação para solicitar orçamento com referência do produto, sem prometer disponibilidade automática.
- [ ] DTO público permitido por lista de campos, sem serializar entidades internas completas.
- [ ] Publicar somente cópias/derivados comerciais de imagens aprovadas.
- [ ] Validar SEO básico, navegação por teclado e fotos sem distorção.
- [ ] Executar E04 e C21.

**Aceite:** um produto pode ficar público sem expor cliente, custos ou arquivos de fabricação. Despublicar não apaga projeto/pedidos. Checkout e publicação em domínio externo não fazem parte da implementação automática.

## M8. Conteúdo e direção visual

**Dependência:** M7. **Requisitos:** CON. **Release R4.**

- [ ] Kit visual com ativos fornecidos, tokens e exemplos de referência aprovados.
- [ ] Seleção de imagens originais/aprovadas e versões de edição não destrutivas.
- [ ] Três templates de conteúdo com áreas de foto, texto, logo e margens.
- [ ] Prévia e exportação separada para feed e stories, com dimensões registradas.
- [ ] Legendas baseadas nos dados do produto, sempre editáveis e revisáveis.
- [ ] Histórico de conteúdo e registro manual de publicação.
- [ ] Testar recorte, fontes, transparência, overflow e exportação sem inventar elementos do produto.
- [ ] Funcionamento manual completo quando nenhuma API de IA estiver configurada.

**Aceite:** gerar duas peças de produtos diferentes com a mesma direção visual, preservar os originais e editar legenda antes de exportar. Sem postagem automática. E05 e C22 passam.

## M9. Evoluções opcionais, após uso real

Não iniciar automaticamente. Selecionar pela dificuldade observada na operação e registrar escopo específico.

- Importação de metadados de fatiador, somente com formato/documentação e fixtures reais autorizadas.
- Importação CSV assistida de histórico, com prévia, mapeamento, unidades e validação transacional. Não é condição para utilizar R1.
- Integração com Spoolman, evitando dois estoques autoritativos concorrentes.
- Telemetria da P2S por integração compatível verificada, inicialmente somente leitura.
- Leitor 3D para consulta de geometria, sem prometer custo/tempo de fatiamento.
- OCR ou classificação de fotos/arquivos com revisão humana.
- Sugestões de legenda/edição de imagem por IA com controle de custo e proteção dos arquivos.
- Agenda automática, aproveitamento de sobras e placas compartilhadas entre pedidos.
- Outros equipamentos, equipe ou plataforma multiempresa somente por necessidade confirmada.

## Registro de progresso

Usar uma entrada por marco concluído ou bloqueio material:

```text
Marco:
Status: não iniciado | em andamento | bloqueado | concluído
Data:
Entregas verificadas:
Testes/comandos e resultados:
Verificação visual:
Decisões ou desvios:
Pendências e próximo passo:
```

Nenhuma implementação foi executada pela criação deste pacote.


### Preparação parcial de M0 — 27/10/2026

- Status: em andamento, somente infraestrutura local preparada.
- Entregas: Compose PostgreSQL 18 com bancos dev/test em serviços e redes distintos; volume persistente de desenvolvimento e testes em memória; portas locais 55432/55433; credenciais locais separadas e ignoradas pelo Git; comandos em `10-ambiente-local.md`.
- Verificações: `docker compose --env-file .env.docker --profile test config --quiet` passou; configuração resolvida confirmou bancos/senhas/redes distintos, portas somente locais e persistência separada; `.env.docker` confirmado como ignorado pelo Git.
- Limitação: a sessão do Codex não acessa o socket Docker, mesmo fora da restrição; não foi possível iniciar containers, confirmar healthchecks nem testar conexões/persistência.
- Não concluído: aplicação, migrações, login/recuperação, capturador de e-mail e CRUDs. Nenhum marco concluído por esta preparação.


### Atualização da infraestrutura local — 27/10/2026

- A limitação de acesso ao daemon foi resolvida após reiniciar a sessão, usando execução autorizada fora do sandbox.
- Compose iniciado com `--profile test up -d --wait`; PostgreSQL dev/test ficaram `healthy` em 55432/55433.
- Consultas TCP autenticadas confirmaram banco/usuário corretos em cada serviço. O container `financehub-db` foi preservado.
- M0 continua em andamento: aplicação, migrações, autenticação, e-mails e CRUDs ainda não implementados. Persistência após reinício ainda não testada.


### M0 — concluído localmente em 27/10/2026

- Aplicação Next.js real com pnpm/Node LTS, tokens laranja e componentes base no padrão shadcn.
- Migração inicial aplicada nos dois bancos locais: contas, sessões, verificações, rate limit e workspace privado por proprietário.
- Cadastro público, confirmação de e-mail, login, logout, reenvio, recuperação e troca de senha com revogação de sessões. E-mails somente nos capturadores locais separados.
- Autorização no servidor e ausência de cache público; teste com duas contas comprova IDs distintos e acesso cruzado negado.
- Demo somente leitura sem consultar os dados operacionais nem conceder acesso privado. O simulador editável pertence ao motor de M2.
- Setup reproduzível sem sobrescrever segredos existentes; guia em `11-fundacao-executavel.md`.
- Verificações: instalação pnpm, Prisma generate/migrações, lint, typecheck, quatro testes unitários de configuração, build e dois testes de navegador passaram. Browser: cadastro→confirmação→login→isolamento→logout→recuperação→senha antiga negada→senha nova aceita; link usado negado; sessão pré-existente revogada. Telas em 1440/390/320 px e teclado básico conferidos.
- Limites: nenhuma infraestrutura hospedada/provedor real de e-mail configurado; sem upload, CRUDs, motor de custos, PDF ou publicação. Recuperação do volume após reinício e expiração por passagem de tempo não testadas; ver guia para os demais limites.
- Próximo marco: M1A, um CRUD básico completo por vez. Não iniciado nesta entrega.
