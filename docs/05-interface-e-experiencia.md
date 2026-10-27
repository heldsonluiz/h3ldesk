# Interface e experiência

## 1. Direção

O aplicativo deve reduzir a necessidade de lembrar onde cada informação está. A página do projeto reúne arquivos, produção e histórico comercial. O operador deve conseguir retomar um orçamento antigo sem percorrer cadastros técnicos desconectados.

Interface em português brasileiro, valores em reais, massas em gramas e horários claros. Separar complexidade em etapas; não apresentar todas as opções do modelo de dados de uma vez.

A entrada principal de R1 é `Novo orçamento`, acompanhada de busca por projetos/orçamentos. O usuário começa com novas solicitações, sem migrar o acervo. No próprio editor, permitir criar um projeto simples, anexar arquivos quando disponíveis e salvar a configuração usada. Não obrigar o usuário a concluir um catálogo antes de simular.

Visual simples, com espaço entre grupos de informação, tabelas legíveis e hierarquia clara. Em 27/10/2026, o usuário confirmou a adoção do design system do website e do Unveil, com o laranja H3LForge `#ff6600` substituindo o verde apenas neste repositório. A referência local está em [`../design-system/README.md`](../design-system/README.md): fundos neutros escuros, bordas retas, DM Sans, Manrope e IBM Plex Mono, preservando espaçamentos e acessibilidade. Logo e outros ativos oficiais ainda dependem de seleção/fornecimento. Não inventar logo oficial, depoimentos ou fotos de produtos.

### Primeiros fluxos confirmados

A direção das prévias foi aprovada como referência inicial. A primeira entrega oferece cadastro de conta, login, verificação e `Esqueci minha senha`, seguida de Materiais, Custos adicionais e Clientes. Cada pessoa vê somente seu workspace. Não exibir dados ilustrativos como se fossem indicadores da operação real. Projetos, orçamentos, dashboard completo e kanban entram depois dos CRUDs básicos, conforme o roadmap.

## 2. Navegação por release

| Release | Navegação |
| --- | --- |
| R1 | Projetos, Orçamentos, Clientes, Materiais de referência, Configurações |
| R2 | Adicionar Pedidos, Produção, Estoque e Visão geral |
| R3 | Adicionar Catálogo e prévia pública |
| R4 | Adicionar Conteúdo e Kit visual |

Não mostrar módulos futuros como botões que falham ou telas vazias de promessa. Indicadores de R1 ficam nas listagens; a visão consolidada passa a existir quando houver dados de R2.

## 3. Telas e ações principais

### Projetos

Busca com filtros, miniatura, nome, etiquetas, versão aprovada e data do último orçamento. Alternar cards/lista apenas se houver ganho real; começar com uma visualização principal bem resolvida.

Página de projeto com resumo e abas `Arquivos`, `Produção`, `Orçamentos` e, em R2, `Pedidos`. Ações principais: adicionar arquivo, criar configuração e novo orçamento. Miniaturas devem distinguir referência de foto real e imagem editada.

### Configuração de produção

Fluxo recomendado:

1. Definir produto completo e seus componentes.
2. Adicionar placas e saídas de componentes.
3. Informar tempo e materiais de cada placa.
4. Informar trabalho humano e acessórios.
5. Simular quantidade e conferir rendimento/sobras.

Oferecer atalhos `Uma peça por placa`, `Várias peças iguais` e `Produto em várias placas`. São assistentes sobre o mesmo modelo de dados, não três motores incompatíveis.

Mostrar `Tempo de impressão` e `Seu tempo de trabalho` em grupos diferentes. Aceitar duração longa sem virar horário do relógio: 26h30 é duração de 26 horas e meia, não 02h30.

### Orçamento

Editor por etapas: cliente → itens/configurações → custos/preço → condições → revisão/PDF. Permitir navegar sem perder rascunho.

Resumo do preço acompanha a edição, com ações para abrir a memória detalhada. Mudanças de quantidade recalculam as execuções e mostram sobras. Selecionar preços atuais deve apresentar diferenças antes de substituir os dados do rascunho.

Rótulos comerciais: `Preço fechado do lote` ou `Preço por unidade`. Distinguir sugestão de preço escolhido. Bloquear emissão se o total exibido não reconciliar com os itens/descontos.

Histórico mostra revisões, situação, data e ação `Criar nova versão`. Uma revisão emitida abre em modo de consulta; não apresentar um formulário que sugira poder alterar seu conteúdo.

### Estoque e produção

Estoque mostra físico/reservado/disponível juntos, com detalhamento por rolo e cor. Alertas precisam apontar qual pedido/material exige atenção.

Produção em desktop usa agenda da P2S e fila; em celular, lista por dia com ações de iniciar e registrar resultado. Um painel de resultado pede apenas os dados necessários e deixa claro o que é estimado. Não bloquear registro de falha porque um detalhe opcional está ausente.

### Dashboard

Priorizar ações: propostas sem resposta, pedidos próximos, material faltante e recebimentos pendentes. Gráficos só quando houver pergunta e dados suficientes. Cada indicador deve abrir os registros que compõem o valor.

Filtros de período deixam claro se estão usando emissão, aprovação, entrega ou recebimento. Mostrar conjuntos vazios como ausência de dados, não inventar gráficos demonstrativos na operação real.

## 4. PDF comercial

Um template inicial; não construir editor livre de documentos em R1.

- Cabeçalho com marca, número, revisão, data e validade.
- Cliente e identificação da proposta.
- Foto selecionada e especificação das personalizações.
- Quantidade, modo de cobrança e valores coerentes.
- Prazo de produção/entrega, pagamento e observações.
- Contato comercial e paginação quando necessário.

O PDF deve ser legível no celular e imprimível em A4. Não reduzir fonte indefinidamente para caber em uma página. Evitar cortar fotos, linhas de item e condições entre páginas. Repetir cabeçalho de tabela quando houver continuação.

Não incluir custo por grama, provisões, resultado interno, observações privadas ou caminhos de arquivo. Usar somente imagem autorizada para aquela proposta. Mensagem de WhatsApp é texto editável para copiar; o operador faz o envio.

## 5. Conteúdo visual

O kit visual centraliza logo, cores, tipografia e margens. Fotos originais nunca são substituídas. Guardar instruções de recorte/ajuste e arquivo exportado com ligação à versão de origem.

Templates devem favorecer a peça real, com elementos recorrentes e pouco texto. Sugestões de legenda em português, curtas, sem emojis por padrão e sem afirmações não cadastradas. Mencionar personalização de cores quando aplicável ao produto e confirmado nos dados.

A IA, quando integrada, recebe instruções de preservar geometria e cores do produto. Toda imagem gerada/editada exige revisão antes de publicação. Uma geração com aparência incorreta não pode atualizar automaticamente fotos do catálogo.

## 6. Acessibilidade e responsividade

- Layout sem overflow horizontal acidental em 360 px; tabelas extensas podem ter área de rolagem identificada ou visualização alternativa.
- Estados e prioridades têm texto/ícone, além de cor.
- Foco visível, rótulos associados, mensagens por campo e ordem de teclado previsível.
- Arrastar possui alternativa por formulário, e movimentos não apagam dados após erro.
- Upload informa progresso/erro e permite tentar novamente sem duplicar o registro.
- Confirmação para emissão, cancelamento com consumo existente, estorno, exclusão e publicação.
- Conflitos de edição oferecem recarregar e preservar o texto do rascunho.
- O resumo de custo não deve empurrar a ação principal para fora da tela no celular.

## 7. Estados obrigatórios

Vazio com próxima ação; carregamento sem saltos excessivos; erro recuperável; falta de acesso; arquivo indisponível; custo ausente; orçamento expirado; material insuficiente; registro desatualizado; calendário em conflito. Não exibir mensagens técnicas de banco ou credenciais na interface.
