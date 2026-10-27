# Escopo do produto

## 1. Contexto confirmado

- H3LForge é uma operação de impressão 3D personalizada, como atividade secundária.
- Existe uma Bambu Lab P2S. A referência anterior a duas impressoras foi substituída pelo relato atual.
- A máquina pode trabalhar aproximadamente 12 a 16 horas por dia, conforme disponibilidade.
- Há poucos clientes e muitas simulações de orçamento.
- O trabalho se perde entre arquivos, fatiamentos, fotos e planilhas. Uma nova cotação meses depois exige reconstruir informações.
- Peças podem ser produzidas individualmente, em várias unidades por placa ou divididas em várias placas.
- É necessário controlar material, custos, preços, produção, entrega e resultado.
- Existem produtos já vendidos, mas falta um catálogo consistente e uma direção visual reaproveitável para divulgação.
- Ainda não existe repositório; o projeto começa do zero com Next.js, TypeScript, Tailwind, shadcn/ui e PostgreSQL mantidos.
- O cadastro operacional começa com os novos orçamentos conforme surgirem. Não exigir importação do passado nem uma biblioteca completa para começar.
- Referências escolhidas: suporte para tablet, `1 lixeira` e `brindes participantes`, detalhadas em `09-exemplos-de-referencia.md`.

## 2. Objetivos e sinais de sucesso

| Objetivo | Evidência verificável |
| --- | --- |
| Reaproveitar trabalho | Encontrar um projeto antigo, arquivos e configuração em um único fluxo |
| Reorçar com confiança | Duplicar uma proposta, atualizar preços e preservar a versão anterior |
| Entender custos | Abrir uma memória de cálculo por placa, produto, quantidade e orçamento |
| Controlar operação | Transformar aprovação em pedido sem recadastrar itens e anexos |
| Evitar falta de material | Diferenciar saldo físico, reservado e disponível |
| Acompanhar retorno | Comparar previsto e registrado sem confundir venda com recebimento |
| Apresentar produtos | Publicar apenas os produtos e imagens escolhidos |
| Manter consistência visual | Reaproveitar marca, fotos aprovadas e modelos de conteúdo |

Medir futuramente o tempo para reorçar, proporção de orçamentos recuperados e completude dos registros. Não inventar resultados ou metas de melhoria já alcançadas.

## 3. Público e acesso

Cadastro público por e-mail e senha, com recuperação de senha. Cada conta cria um workspace próprio e privado; H3LForge é a operação de referência, não um workspace compartilhado por todos os cadastrados. Inicialmente há um proprietário por workspace, sem equipes, convites, cobrança SaaS ou papéis complexos. Clientes são cadastros comerciais de cada workspace, não usuários administrativos.

O catálogo é público apenas a partir de R3. A demonstração de portfólio usa dados fictícios em ambiente ou sessão isolados. Quem acessa a demo não ganha acesso à operação real.

## 4. Requisitos por módulo

### Primeira entrega: acesso e cadastros básicos

Antes dos módulos completos de R1, entregar:

- Cadastro público, login, logout, verificação de e-mail e recuperação de senha.
- Materiais: tipo, fabricante, descrição, cor, custo de referência e conversão explícita para custo por grama; sem saldo de estoque nesta fase.
- Clientes: nome obrigatório, contato e observações opcionais.
- Custos adicionais reutilizáveis: nome, descrição, valor-base e incidência por pedido, execução ou produto. Cadastrar não aplica nem cobra o custo automaticamente.
- Listagem, busca, inclusão, edição e exclusão de registros sem vínculos; arquivamento quando forem referenciados.
- Isolamento de dados entre contas e ambientes, com validação no servidor.

Não exigir projetos, arquivos, preços de venda, PDFs ou agenda para começar a usar esses cadastros.

### PROJ: projetos e arquivos (R1)

- PROJ-01: criar, editar, arquivar e pesquisar projetos por nome, descrição, cliente e etiquetas.
- PROJ-02: guardar arquivos STL, 3MF, arquivos de edição e documentos, com nome, tipo, tamanho, versão, finalidade e origem opcional.
- PROJ-03: anexar fotos de referência, fotos reais e imagens aprovadas para divulgação, distinguindo os papéis.
- PROJ-04: marcar a versão de modelo/configuração aprovada e preservar as versões usadas em propostas.
- PROJ-05: reunir configurações, orçamentos e pedidos na página do projeto.
- PROJ-06: registrar autoria/origem e permissão de uso comercial como informação declarada, sem inferir licença pelo download.
- PROJ-07: manter arquivos privados por padrão; não executar conteúdo de modelos ou extrair ZIP/3MF automaticamente em R1.

Um projeto pode existir sem cliente e sem orçamento. Um orçamento pode ser recusado sem apagar o projeto. Arquivar não elimina o histórico.

### CAD: cadastros e parâmetros (R1)

- CAD-01: cliente com nome obrigatório, telefone/WhatsApp, e-mail e observações opcionais. Não exigir CPF/CNPJ.
- CAD-02: materiais com tipo, fabricante, descrição, cor, unidade de compra e custo de referência por grama.
- CAD-03: parâmetros da P2S, custo de mão de obra, regras de preço e identidade da marca.
- CAD-04: registrar quando um custo muda e oferecer atualização explícita de uma simulação existente.
- CAD-05: nomes repetidos são permitidos quando os IDs distinguem os registros.

O cadastro de material de R1 não representa saldo físico. Rolos e movimentações entram em R2.

### PROD: configurações de produção (R1)

- PROD-01: produto final composto por um ou mais componentes e suas quantidades necessárias.
- PROD-02: configuração versionada descreve placas, saídas por placa, tempo, materiais e custos acessórios.
- PROD-03: uma placa pode conter diferentes componentes do mesmo produto. Compartilhamento entre produtos/pedidos fica fora de R1/R2.
- PROD-04: cada placa admite vários materiais/cores e consumo planejado, incluindo suportes e purga quando informados.
- PROD-05: tempo e consumo vêm de entrada manual baseada no fatiador; manter referência ao arquivo usado.
- PROD-06: permitir configurações alternativas, como uma peça, placa cheia, outra orientação ou outro tamanho.
- PROD-07: exibir execuções necessárias, sobras de componentes, produção possível e tempo total para cada quantidade solicitada.

### ORC: simulação e orçamento (R1)

- ORC-01: orçamento com um ou mais itens, cliente opcional no rascunho e obrigatório na emissão.
- ORC-02: itens referenciam projeto e versão da configuração, quantidade de produtos completos e detalhamento de custos.
- ORC-03: comparar quantidades dentro de um rascunho sem criar pedidos nem reservar material.
- ORC-04: separar custo, preço sugerido, preço negociado, desconto e resultado estimado.
- ORC-05: suportar cobrança por lote e por unidade com arredondamento explícito.
- ORC-06: congelar dados, fórmulas/versionamento, preços e apresentação ao emitir. Edições posteriores criam nova revisão.
- ORC-07: duplicar com valores históricos ou preços atuais, mostrando o que mudou antes de confirmar.
- ORC-08: gerar PDF com logo, fotos selecionadas, especificação, quantidades, valor, validade, prazo e condições.
- ORC-09: baixar o PDF e copiar mensagem curta para envio manual. Registrar envio manualmente, sem alegar leitura pelo cliente.
- ORC-10: controlar rascunho, emitido, enviado, aprovado, recusado, expirado e substituído.
- ORC-11: iniciar com `Novo orçamento` mesmo sem produto ou projeto pré-cadastrado; criar um projeto/configuração mínimos durante o fluxo e salvá-los para reutilização. Rascunho incompleto é permitido; emissão exige os dados necessários.

Associação de um cliente ou anexação de foto não autoriza publicação pública. Custos internos nunca entram no PDF comercial.

### PED: pedidos e execução (R2)

- PED-01: converter uma revisão aprovada em um único pedido de forma idempotente.
- PED-02: acompanhar pendências de material, programado, em produção, finalização, pronto, entregue e cancelado.
- PED-03: gerar trabalhos por execução de placa, guardando plano e resultados separados.
- PED-04: registrar início/fim, material consumido, componentes aprovados e rejeitados, causa de falha e observações.
- PED-05: reimpressão é um novo trabalho ligado ao original; não apagar o trabalho que falhou.
- PED-06: calcular produtos completos a partir dos componentes aprovados; montagem/acabamento podem continuar pendentes.
- PED-07: manter datas distintas de fim da impressão, pronto para entrega e entrega ao cliente.

### EST: estoque (R2)

- EST-01: rolos por material/cor, massa inicial utilizável, custo de aquisição, localização e saldo.
- EST-02: movimentos de entrada, consumo, ajuste e estorno com motivo e data.
- EST-03: reserva alocada a rolos para pedidos aprovados e disponível = saldo físico menos reservas ativas.
- EST-04: falta de material permite criar um pedido com pendência, sem inventar saldo ou reserva inexistente.
- EST-05: consumo parcial libera a parcela correspondente da reserva na mesma transação.
- EST-06: cancelamento libera reservas não consumidas, sem devolver material já usado.
- EST-07: alertas configuráveis por material/cor e revisão manual de saldo por pesagem.

Não integrar NFC/AMS nem deduzir saldo automaticamente do fatiamento em R1/R2.

### AGE: planejamento da P2S (R2)

- AGE-01: fila por prioridade, prazo e dependências, com agenda diária/semanal.
- AGE-02: configurar janelas reais de funcionamento, horários de início/troca e bloqueios.
- AGE-03: usar cenário conservador de 12 horas/dia e cenário estendido de 16 apenas como hipóteses de capacidade; não inventar horários concretos.
- AGE-04: impedir sobreposição da máquina e interrupção automática de uma impressão contínua.
- AGE-05: permitir programação por formulário; arrastar e soltar é melhoria posterior dentro de M5.
- AGE-06: atraso destaca risco de prazo, sem reorganizar automaticamente pedidos aprovados.
- AGE-07: previsões incompletas devem indicar trabalhos não agendados e finalização pendente.

### FIN: resultados e recebimentos (R2)

- FIN-01: registrar recebimentos parciais, pagamentos pendentes e estornos sem integração bancária.
- FIN-02: mostrar venda, recebimento, custo previsto e custo registrado como medidas diferentes.
- FIN-03: separar gastos diretos registrados e alocações gerenciais estimadas, como depreciação e manutenção.
- FIN-04: resultado estimado e resultado apurado com os custos registrados; informar completude e nunca chamar de lucro líquido por padrão.
- FIN-05: dashboard com orçamentos pendentes, conversão, prazos, estoque, recebíveis e resultado por pedido/produto/período.
- FIN-06: relatório CSV com filtros e definições consistentes com a tela.

Uma execução que produz produtos completos pode apresentar seu resultado associado à venda. Quando o produto usa várias placas, mostrar custo por execução e resultado do conjunto comercial; não atribuir a mesma receita integral a cada placa. Um rateio de resultado entre placas deve ser identificado como rateio gerencial e fica fora do cálculo padrão.

### CAT: catálogo público (R3)

- CAT-01: escolher produtos publicados e suas informações comerciais, independentemente de projetos internos.
- CAT-02: página de produto com fotos aprovadas, descrição, dimensões, opções e botão para solicitar orçamento.
- CAT-03: mostrar preço apenas se houver valor comercial explicitamente publicado. Personalização pode exigir orçamento.
- CAT-04: rascunho, prévia e publicação explícita; ocultar um produto sem apagar o histórico interno.
- CAT-05: sem checkout, cálculo automático de frete, marketplace ou pagamentos online.

### CON: conteúdo e identidade (R4)

- CON-01: kit com logos, cores, fontes, margens e exemplos aprovados; sem inventar ativos oficiais.
- CON-02: fotos originais e versões editadas preservadas separadamente, com seleção de imagem aprovada.
- CON-03: templates iniciais para apresentação de produto, personalização e bastidores.
- CON-04: exportar peças de feed e stories com proporções configuradas; prévia e ajuste de recorte.
- CON-05: legenda editável baseada em informações aprovadas, sem inventar materiais, dimensões ou depoimentos.
- CON-06: registrar rascunho, pronto e publicado manualmente. Sem postagem automática no Instagram.
- CON-07: geração de texto/imagem é integração opcional; o módulo deve funcionar com templates e edição manual.

## 5. Fora do escopo das releases iniciais

Frota de impressoras, marketplace, gestão de múltiplas empresas por conta, emissão fiscal, contabilidade completa, automação bancária, otimização matemática de produção, fatiamento no navegador, controle remoto da P2S, publicação automática em redes e envio automático de mensagens.

## 6. Importação de informações existentes

R1 usa cadastro manual progressivo, a partir dos novos orçamentos. Os três exemplos autorizados são referências de teste, não uma migração da operação. Importação CSV assistida de materiais, clientes e configurações fica como evolução opcional em M9. Se implementada, exige prévia, mapeamento de unidades e confirmação do lote. Não conectar ao Drive, mover arquivos ou copiar dados privados automaticamente.

## 7. Requisitos não funcionais

Persistência real; exportação dos dados; permissões no servidor; arquivos privados; dinheiro calculado com decimais; histórico recuperável; interface acessível e responsiva; busca paginada; confirmação de ações irreversíveis; logs sem dados sensíveis desnecessários; backup e restauração documentados antes do uso em produção.
