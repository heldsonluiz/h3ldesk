# Critérios de aceite e validação

## 1. Estratégia

Priorizar testes de regras que podem gerar preço incorreto, perda de histórico, baixa duplicada ou exposição de dados. Não criar testes que apenas repetem detalhes de implementação de componentes visuais.

Motor decimal e rendimento recebem testes unitários. Emissão, estoque, agenda e pagamentos precisam de integração com banco e concorrência relevante. Jornadas principais recebem testes de navegador. PDF e conteúdo exportado exigem inspeção visual além de teste automatizado.

Nenhum caso abaixo exige conta real, envio de mensagem ou impressão física. Integrações reais devem ser verificadas separadamente quando autorizadas e disponíveis.

## 2. Casos de cálculo e integridade

### C01: compatibilidade com a planilha

Entrada: 90 produtos, uma placa com 90 saídas, 171 g a R$ 0,09/g, 22.500 segundos, acabamento/mão de obra/adicionais zero; parâmetros da seção 3 de `03-precificacao.md`.

Esperado com decimais:

```text
material = 15.39
energia = 1.281375
manutencao = 1.5
depreciacao = 3.75
provisaoFalhas = 1.53449625
reservaAdicionalLegada = 0.15625
custoTotal = 23.61212125
precoSugeridoLote = 71.00
resultadoEstimado = 47.38787875
```

Comparar decimal exato ou precisão explicitamente definida, sem tolerância que esconda centavos. Tela: R$ 23,61 / R$ 71,00 / R$ 47,39. O valor indicativo por unidade pode mostrar aproximadamente R$ 0,79.

### C02: quantidade menor que a placa

Pedido de 100 unidades, placa de 12, 5 horas por execução. Sem variante parcial: 9 execuções, 108 produzidas, 8 excedentes, 45 horas. Não retornar 41h40 por proporcionalidade. O operador deve ver o excedente antes de emitir.

### C03: variante parcial informada

Mesmo pedido, oito placas cheias e uma variante com quatro saídas e 2 horas informadas. Esperado: 100 unidades, nove execuções e 42 horas. Consumo da variante é o informado, não um terço presumido.

### C04: produto com várias placas

Troféu = uma base + um corpo + duas letras. Pedido de três. Placa A produz duas bases em 2h; B produz um corpo em 3h; C produz seis letras em 1h.

Esperado: A duas execuções, B três, C uma; 14h de impressão, quatro bases/ três corpos/seis letras; uma base excedente e três produtos completos. Custos de todas as execuções entram no lote.

### C05: mais de um material na placa

10 g do material A a R$ 0,10/g e 5 g do B a R$ 0,20/g: material total R$ 2,00. Registrar suporte/purga como parcelas já incluídas ou separadas, nunca contabilizar o mesmo total e suas parcelas novamente.

### C06: incidência de mão de obra

Taxa R$ 50/h. Preparação por pedido 0,5h e acabamento por produto 0,1h para dez unidades. Esperado: R$ 25 + R$ 50 = R$ 75. A preparação não custa R$ 250. Horas de máquina não entram como horas humanas.

### C07: custo ausente versus zero

Material sem preço bloqueia emissão e identifica o campo. Acabamento explicitamente zero é válido. Vida útil zero é inválida. Taxa de energia explicitamente zero é permitida com indicação da escolha; vazio não vira zero.

### C08: arredondamento comercial

C01 no modo lote: total R$ 71,00 e unidade aproximada. No modo unidade a R$ 0,79: total R$ 71,10. O PDF não pode exibir quantidade 90 × unidade exata R$ 0,79 = R$ 71,00.

### C09: atualização de preços

Emitir A, atualizar preço de material, criar B com preços atuais. A mantém seus custos, total, imagem e PDF. B mostra diferença. Reabrir A após atualizar o código não executa a fórmula atual sobre cadastros novos.

### C10: identidade de registros

Dois projetos com o mesmo nome e IDs diferentes não somam suas peças nem compartilham custos acidentalmente. Renomear projeto/material não quebra receita e proposta. Reordenar linhas de importação não altera vínculos.

### C11: reserva não é consumo

Rolo inicia com 1.000 g. Reservar 300: físico 1.000, reservado 300, disponível 700. Consumir 120 da mesma reserva: físico 880, reservado 180, disponível 700. Encerrar liberando restante: físico 880, reservado zero, disponível 880.

### C12: concorrência de reserva

Dois comandos tentam reservar 700 g do mesmo saldo de 1.000. Só um pode obter 700 integralmente. O outro recebe pendência/conflito, ou alocação parcial explicitamente escolhida. Não permitir reservado de 1.400.

### C13: falha e reimpressão

Trabalho consome 100 g e falha. Reserva/saldo refletem o uso; peças aprovadas seguem o resultado informado. Reimpressão cria novo trabalho com novos custos. A provisão estimada não vira um segundo consumo real. Reenviar o comando de conclusão não baixa outros 100 g.

### C14: componentes e montagem

Para C04, se há três corpos, seis letras e duas bases aprovadas, existem dois conjuntos completos. Só um trabalho de impressão concluído não torna o pedido pronto; finalização e quantidade contratada precisam estar completas.

### C15: duração longa e conversão

26h30 vira 95.400 segundos. Se a importação declarar serial de dias, 0,5 vira 43.200 segundos. Texto `06:15:00` vira 22.500 segundos. Não converter 26h30 em um horário de 02h30.

### C16: preço manual e descontos

Preço negociado pode ficar abaixo do custo com aviso e confirmação; manter custo intacto. Desconto não pode exceder subtotal nem produzir total negativo. Multi-itens + desconto + entrega cobrada devem reconciliar exatamente com o PDF.

### C17: aprovação idempotente

Dois cliques/retries sobre a mesma revisão aprovada retornam o mesmo pedido, sem duplicar trabalhos/reservas. Criar nova revisão de uma proposta aprovada não muda o pedido existente.

### C18: agenda e janelas reais

Trabalho 08h–13h impede outro no mesmo intervalo; 13h é permitido se não existir preparação bloqueando esse horário. Com 15 minutos de preparação, próxima impressão só inicia 13h15. Janela 08h–20h não comporta trabalho contínuo de 14 horas. Capacidade agregada de 16h/dia não concede autorização para iniciar/trocar placas em qualquer horário. Duas requisições concorrentes não criam sobreposição.

### C19: recebimento não é venda

Pedido vendido por R$ 300 com R$ 100 recebidos mostra venda 300, recebimento 100 e pendente 200. Estorno de 20 muda recebimento líquido para 80 e pendente para 220. Entregar o pedido não registra pagamento automático.

### C20: resultado e completude

Venda R$ 300; custos diretos registrados 100; alocações gerenciais 20: resultado gerencial 180. Se faltar trabalho humano, mostrar pendência e identificar resultado como parcial. Não tratar depreciação como pagamento em dinheiro nem adicionar provisão de falhas ao gasto real já registrado.

Se os R$ 300 correspondem a um produto com três placas, a receita consolidada continua 300, não 900. Cada placa expõe seu custo; o resultado comercial é do conjunto. Uma conclusão real tardia pode conflitar com a previsão seguinte: registrar o fato e exigir replanejamento, sem rejeitar ou reduzir o tempo ocorrido.

### C21: isolamento público

Catálogo expõe apenas campos permitidos e imagens aprovadas. Tentar acessar arquivos de modelo, custos, clientes ou PDF privado sem sessão falha no servidor, mesmo com ID conhecido. Demo não usa dados do workspace operacional.

### C22: original e imagem editada

Exportar conteúdo não altera o original nem publica automaticamente. Trocar o recorte de uma imagem não altera o conteúdo histórico de uma proposta emitida. Ausência de API de IA não impede edição manual e exportação de template.

### C23: suporte para tablet, referência escolhida

Dados de `09-exemplos-de-referencia.md`: uma unidade, uma placa, 60 g de PLA a R$ 0,09/g, 8.400 segundos e acabamento zero. Com o perfil legado, mão de obra/adicionais zero e multiplicador 3, custo aproximado 8,445399933333 e sugestão de R$ 26,00. A divisão de segundos por hora tem decimal periódico; comparar custo com tolerância absoluta de R$ 0,0000000001. Não transformar 2h20 em 2,20 horas.

### C24: uma lixeira completa, referência escolhida

Uma base de 6 g/1.920 segundos e um gancho de 1 g/720 segundos, uma execução de cada placa, acabamento 1% em ambas. Esperado: um produto completo, duas execuções, 7 g, 2.640 segundos, custo aproximado 1,519166693333 e sugestão de R$ 5,00 com as mesmas hipóteses de C23. Somar os custos sem arredondamento antes de aplicar o multiplicador e o teto uma única vez. Não somar dois preços sugeridos arredondados de componentes.

### C25: brindes participantes, referência escolhida

Uma placa produz 24 brindes, usa 77 g e 14.400 segundos, acabamento 1%. Esperado com as hipóteses de C23: custo 12,0619366; sugestão por lote R$ 37,00; unitário aproximado 1,541666… . No modo unitário a R$ 1,54, subtotal R$ 36,96. Para 25 brindes sem variante parcial, o plano prevê duas placas, 48 saídas, 23 excedentes, 154 g e oito horas. Não assumir que uma placa tem uma única saída porque a coluna da parte se chama `placa`.

### C26: começar com o orçamento novo

Workspace sem projetos, produtos ou histórico importado. Acionar `Novo orçamento`, salvar rascunho com identificação mínima, criar projeto/receita durante o fluxo e completar os dados para emitir. O projeto e a receita devem ficar disponíveis para uma segunda solicitação. Não bloquear o fluxo por falta de catálogo, migração, cliente no rascunho ou foto do produto. Requisitos obrigatórios para emissão continuam válidos.

## 3. Jornadas de navegador

| ID | Jornada |
| --- | --- |
| E01 | Login/demo → projeto → arquivo → receita → orçamento → PDF → atualização de custo → nova revisão → consulta da antiga |
| E06 | Workspace vazio → novo orçamento → projeto/receita criados no fluxo → emissão → nova solicitação reutilizando os dados salvos |
| E02 | Aprovação → pedido → reserva → programação → falha parcial → consumo → reposição → finalização → entrega |
| E03 | Registrar recebimento parcial/estorno → conferir pedido, dashboard e CSV com os mesmos filtros |
| E04 | Escolher fotos → prévia do produto → publicar explicitamente → consultar catálogo → despublicar sem perder histórico |
| E05 | Escolher produto/foto → aplicar template → editar legenda → exportar feed/story → preservar original |

## 4. Verificação visual

Inspecionar ao menos 360 px e desktop. Percorrer E01 por teclado. Testar descrição longa, nome de arquivo longo, quantidade grande, preço com centavos e ausência de foto.

Renderizar PDFs de um item, vários itens e múltiplas páginas. Conferir marca, margens, quebras, legibilidade, valores e ausência de dados internos. Capturar evidência local quando apropriado, sem publicar dados privados. Templates de conteúdo precisam de verificação das dimensões e do recorte exportado.

## 5. Segurança e recuperação

Testar sessão ausente, workspace incorreto, upload grande/inválido, download sem autorização, edição concorrente e retry após falha de rede. Não registrar segredos em erros. Executar restauração local de backup fictício com banco e arquivo de modelo, verificando os vínculos.

## 6. Evidência por marco

Registrar comandos e resultados realmente executados. Distinguir teste automático, conferência manual e recurso não validado por falta de credencial. Build aprovado não substitui conferência de cálculo, transação, acesso e PDF.


## 7. Primeira entrega: contas, ambientes e cadastros

- **A01:** cadastrar duas contas e verificar e-mail via capturador local; cada uma recebe workspace próprio, sem dados da outra.
- **A02:** login/logout, senha incorreta, sessão ausente/expirada e conta não verificada; acesso operacional negado até verificação.
- **A03:** recuperação com resposta genérica, token válido/expirado/reutilizado e nova senha; nenhum segredo em logs e nenhum e-mail externo nos testes.
- **A04:** tentar ler/alterar/excluir registros e associar IDs da conta B usando sessão A, inclusive chamadas diretas; negar no servidor.
- **A05:** criar/editar/buscar/excluir material, cliente e custo adicional próprios; valores decimais e zero explícito conforme regra; não aplicar custo adicional automaticamente.
- **A06:** resets/seeds de teste recusam configuração de produção; sessões, e-mails, arquivos e bancos permanecem separados. Validar com destinos fictícios, sem executar destruição real.
- **A07:** novos cadastros não exigem biblioteca de projetos, histórico importado, estoque, impressora ou orçamento previamente configurados.
