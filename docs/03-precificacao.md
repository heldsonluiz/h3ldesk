# Precificação, placas e resultados

Este documento é normativo para o motor de cálculo. A referência observada é a planilha `teste`, na pasta `h3lforge (old)`, lida em 27/10/2026. O registro não autoriza acesso automático ao Drive nem confirma que seus parâmetros ainda serão os desejados no início da implementação.

## 1. Separar quatro resultados

1. **Custo planejado:** entradas, taxas e provisões da simulação.
2. **Preço sugerido:** regra de venda aplicada ao custo planejado.
3. **Preço comercial:** valor escolhido para proposta, com modo de cobrança e descontos explícitos.
4. **Resultado apurado:** valor de venda menos custos registrados e alocações identificadas; não é automaticamente lucro líquido ou saldo de caixa.

Receber dinheiro, vender, produzir e consumir material são eventos distintos.

## 2. Precisão, unidades e validação

- Usar aritmética decimal e transportar decimais como strings em APIs.
- Guardar duração em segundos; converter para horas por divisão por 3.600 no cálculo.
- Converter quilogramas para gramas explicitamente. Potência é kW; energia consumida é kWh.
- Não arredondar cada etapa intermediária aos centavos. Exibir componentes arredondados, mantendo precisão no cálculo.
- Somatórios de valores exibidos podem diferir em um centavo do total calculado. Mostrar nota discreta na memória detalhada.
- Rejeitar negativos inválidos, NaN, divisões por zero, material ausente e componentes sem saída de fabricação.
- Campo ausente não vira zero silenciosamente. Permitir zero explícito para custo não aplicável, com registro dessa escolha.

## 3. Perfil de compatibilidade com a planilha

`calculationMode = spreadsheet_legacy_v1` deve reproduzir as regras observadas, com parâmetros versionados e memória de cálculo. Não modificar esse modo ao introduzir uma política nova.

Parâmetros observados da P2S:

| Símbolo | Parâmetro | Valor de referência |
| --- | --- | --- |
| V | Valor da máquina | R$ 9.000 |
| L | Vida útil | 15.000 horas |
| P | Potência média cadastrada | 0,18 kW |
| T | Tarifa | R$ 1,139/kWh |
| M | Reserva de manutenção sobre valor da máquina | 0,40 |
| F | Provisão de falhas | 0,07 |
| H | Valor da hora humana no exemplo | R$ 50 |
| K | Multiplicador de preço no exemplo | 3 |
| D | Divisor adicional da reserva chamada ROI | 24 |

Esses valores podem ser disponibilizados como preset identificado da planilha. Não são dados medidos, recomendações técnicas ou um valor de mercado atual da máquina. Preset deve ser revisado antes de emitir proposta real.

Para uma execução de placa, com duração `h` horas e materiais `i`:

```text
custoGrama_i = custoCompra_i / massaCompraEmGramas_i
material = soma(gramas_i × custoGrama_i)
energia = h × P × T
manutencao = h × (V × M / L)
depreciacao = h × (V / L)
acabamentoPercentual = material × percentualAcabamento
baseFalhas = material + energia + manutencao + depreciacao + acabamentoPercentual
provisaoFalhas = baseFalhas × F
reservaAdicionalLegada = h × V / (L × D)
custoPlaca = baseFalhas + provisaoFalhas + reservaAdicionalLegada
```

Na planilha observada havia um material por linha. A soma de materiais acima estende a estrutura a várias cores; com um material, deve produzir exatamente o cálculo de referência.

Manutenção e depreciação são alocações por hora no modelo, mesmo que a aba de resumo as agrupe como custos fixos. Na interface, usar nomes que expliquem a base de cálculo.

### Reserva chamada ROI

A fórmula observada produz R$ 0,025/h. Seu nome não representa uma taxa percentual de retorno. Como a vida útil já está em horas, o propósito do divisor 24 não foi explicado pelo usuário.

- Preservar a fórmula no modo legado e rotular como `Reserva adicional da planilha`.
- Mostrar origem e valor por hora.
- Permitir ativar/desativar apenas por escolha explícita e criar uma política versionada diferente quando a regra mudar.
- Não remover o fator 24, combinar a reserva com a depreciação ou substituí-la por outra fórmula sem decisão registrada.
- O motor e os testes de compatibilidade podem ser implementados sem resolver o propósito econômico desse campo.

## 4. Quantidades e planos de placas

Entrada: quantidade `Q` de produtos finais, componentes requeridos por produto `b_c`, e saídas de cada placa `y_pc`.

Cada componente tem uma placa fornecedora ativa na receita. Para cada placa `p`:

```text
necessidade_c = Q × b_c
execucoes_p = max(ceil(necessidade_c / y_pc)) para os componentes produzidos por p
produzido_c = execucoes_p × y_pc
sobra_c = produzido_c - necessidade_c
```

Todos os insumos e tempos de cada execução entram integralmente, inclusive os das sobras planejadas. Não dividir o custo pelo número de peças de componentes diferentes. A unidade comercial é o produto completo.

### Placa parcial

Há duas opções explícitas:

1. Repetir a placa completa, preservando tempo/consumo e mostrando excedentes.
2. Cadastrar uma variante parcial com tempo, consumo e saídas informados pelo fatiador e aplicá-la à última execução.

Não interpolar tempo ou consumo automaticamente pela proporção de peças. Com variante parcial, validar a soma das saídas de todas as execuções contra as necessidades; não reutilizar cegamente o `ceil` do plano cheio.

### Trabalho humano e acessórios

Cada operação informa incidência: por orçamento/pedido, por execução ou por produto. Quando a mesma operação pertence a vários itens, definir uma única incidência compartilhada para não multiplicá-la duas vezes.

```text
maoDeObra = soma(duracaoAtivaEmHoras × taxaHora × multiplicidadeDaIncidencia)
adicionais = soma(valorBase × multiplicidadeDaIncidencia)
custoTotal = soma(custoPlaca_p × execucoes_p) + maoDeObra + adicionais
```

Preparação de máquina pode ocupar agenda e exigir trabalho humano. Guardar esses tempos separadamente da impressão; não cobrar energia de impressão sobre toda preparação por padrão. Acabamento percentual e mão de obra de acabamento podem coexistir apenas se o usuário entender que cobrem componentes distintos; a tela deve apontar a possível duplicação.

## 5. Preço e arredondamento

O campo `Markup = 300` observado equivale a multiplicador `3×`, com acréscimo de 200% sobre o custo antes do arredondamento. Não apresentar 300 como margem de lucro.

Modo legado:

```text
precoSugeridoLote = ceil(custoTotal × multiplicador) em reais inteiros
resultadoEstimado = precoComercialLote - custoTotal
precoUnitarioIndicativo = precoComercialLote / quantidadeContratada
```

Uma política configurável pode arredondar ao centavo ou ao real inteiro. A compatibilidade legada usa real inteiro. A política usada fica congelada no orçamento.

### Dois modos comerciais

- `batch`: o preço fechado do lote é autoritativo. A proposta mostra quantidade e preço do lote. Preço por unidade, se mostrado, recebe indicação `aproximado`; não usar uma coluna que sugira multiplicação exata de um valor arredondado.
- `unit`: o preço unitário em centavos é autoritativo. O subtotal é quantidade × preço unitário. Qualquer diferença em relação à sugestão por lote deve aparecer na simulação antes da emissão.

Descontos monetários são explícitos e não podem ultrapassar o subtotal. Frete/entrega cobrado e seu custo, quando existentes, são campos distintos; não presumir valor nem integração. Não implementar impostos automáticos ou taxas bancárias implícitas. Custos/taxas adicionais podem ser cadastrados manualmente com base definida e exibida.

Pedidos com vários itens usam o somatório dos preços comerciais de cada item, custos compartilhados definidos uma vez e ajustes explícitos. A soma exibida no PDF deve reconciliar exatamente com o total aprovado.

## 6. Exemplo de referência real lido na planilha

Produto selecionado: `Suporte para Fotos Coração Limpo`, uma placa de 90 unidades, 171 g de PLA a R$ 0,09/g, 6h15, acabamento percentual zero, mão de obra e adicionais zero. Multiplicador 3×, parâmetros da seção 3.

| Resultado sem arredondamento intermediário | Valor |
| --- | --- |
| Material | 15,39 |
| Energia | 1,281375 |
| Manutenção | 1,50 |
| Depreciação | 3,75 |
| Provisão de falhas | 1,53449625 |
| Reserva adicional legada | 0,15625 |
| Custo total | 23,61212125 |
| Preço sugerido do lote | 71,00 |
| Resultado estimado nesse preço | 47,38787875 |
| Preço unitário indicativo | 0,788888… |

Tela resumida: custo R$ 23,61; lote R$ 71,00; resultado R$ 47,39; aproximadamente R$ 0,79 por unidade. Cobrar 90 unidades a R$ 0,79 resulta em R$ 71,10 no modo unitário. Não mostrar R$ 71,00 como produto exato dessa multiplicação.

## 7. Previsão versus execução

Guardar os dados aprovados e registrar dados reais em paralelo. Nunca reescrever o custo estimado da proposta depois de uma falha.

Custos de execução podem incluir:

- Material efetivamente consumido, valorizado pelos rolos utilizados.
- Energia estimada pelo tempo real, ou medida quando houver dado confiável; indicar a origem.
- Trabalho humano registrado e insumos efetivos.
- Alocações de manutenção/depreciação pelo tempo real com política congelada no pedido.

A provisão de falhas do orçamento não entra como consumo real. Reimpressões contribuem com seus próprios custos. A reserva adicional legada deve aparecer como alocação planejada, separada dos desembolsos, e não como compra de material.

Apresentar três visões em R2: custo direto registrado; custo gerencial incluindo alocações; diferença entre venda e esse custo gerencial. Identificar custos ainda não preenchidos. Caixa = recebimentos menos saídas efetivamente registradas, quando houver cobertura desses registros; não deduzir depreciação como saída de caixa.

Uma receita de venda entra uma única vez. Para um produto em várias placas, apresentar custos individuais das execuções e resultado do produto/pedido completo. Para uma placa que produz um lote completo vendido, a associação é direta, desde que não haja outra execução recebendo a mesma receita. Não inventar lucro por componente nem atribuir a receita total a cada reimpressão.

## 8. Histórico e rastreabilidade

Cada simulação emitida guarda `calculationVersion`, receitas, quantidades, parâmetros, preços de materiais, incidências, política de arredondamento e resultados detalhados. Uma nova versão do código não altera documentos anteriores.

Uma atualização de preços deve apresentar diferenças por material e impacto no custo/preço. Não exigir novo fatiamento se geometria, material de produção e parâmetros relevantes não mudaram; indicar que a estimativa vem de uma configuração salva. Quando mudarem, sinalizar necessidade de revisão pelo operador.
