# Exemplos operacionais escolhidos para validação

Versão 1.1, 27/10/2026. O usuário escolheu estes três produtos da planilha `teste`, na pasta `h3lforge (old)`, para validar os tipos de produção. Foram conferidos os valores e fórmulas das linhas indicadas. Não são necessários arquivos 3D ou fotografias para testar o motor de cálculo; esses ativos ainda precisam ser selecionados para validar uploads e apresentação.

## 1. Entradas observadas

Todos os exemplos usam a P2S e o material cadastrado como `PLA 3D Prime`, custo de referência R$ 90 por 1.000 g, equivalente a R$ 0,09/g. Cor, dimensões, embalagem, duração de montagem e origem/licença do modelo não foram informadas nessas linhas. Não preencher esses campos com informações inventadas.

| Caso | Nome na planilha | Linha | Saída por execução | Peso | Duração | Acabamento |
| --- | --- | --- | --- | --- | --- | --- |
| A: produto simples | suporte para tablet | 42 | Uma peça completa | 60 g | 2h20, 8.400 s | 0% |
| B: componente base | 1 lixeira | 101 | Uma base | 6 g | 32 min, 1.920 s | 1% |
| B: componente gancho | 1 lixeira | 102 | Um gancho | 1 g | 12 min, 720 s | 1% |
| C: lote de produtos | brindes participantes | 88 | 24 brindes | 77 g | 4h, 14.400 s | 1% |

As entradas de duração da planilha são valores seriais de dias. Usar a duração convertida em segundos, sem interpretar 2h20 como 2,20 horas. Os pesos são os totais por execução informada, não pesos unitários derivados automaticamente.

## 2. Caso A: suporte para tablet

Receita de um componente, uma unidade por produto e uma placa que produz uma unidade desse componente. Pedido de uma unidade gera uma execução de 2h20 e consumo planejado de 60 g.

Serve para validar o caminho mais curto: novo orçamento → projeto simples → uma placa → custo → preço → PDF. Não exigir montagem, foto ou um cadastro público de produto para simular.

Quantidade maior repete a configuração de uma unidade até que o operador cadastre outra configuração de placa. Não presumir que dez suportes cabem numa placa nem que possuem tempo proporcional mais favorável.

## 3. Caso B: uma lixeira, base e gancho

Modelar um produto final chamado `Lixeira`, preservando `1 lixeira` como referência de origem. A composição de referência é uma base e um gancho por produto, interpretação operacional das duas linhas selecionadas pelo usuário. Não inferir dimensões ou função adicional das peças.

Receita inicial:

- Placa A: uma base, 6 g, 32 minutos.
- Placa B: um gancho, 1 g, 12 minutos.
- Um produto completo exige uma unidade aprovada de cada componente.

Para uma lixeira: duas execuções, 7 g e 44 minutos de impressão. Tempo de retirada/preparação ou montagem não está incluído nesses 44 minutos. Se necessário, o operador cadastra operações adicionais; não presumir que não existe trabalho humano na produção real.

Na planilha também foram encontrados nomes `25 lixeira` e `50 lixeira`. Eles não são substitutos automáticos da configuração de uma unidade. Quantidades de saída e significado de cada placa precisam ser conferidos antes de utilizá-los. Não deduzir capacidade apenas pelo nome do registro.

## 4. Caso C: brindes participantes

Um produto final de um componente, e uma placa com 24 saídas. Peso total da placa: 77 g. Tempo total: quatro horas.

Para 24 unidades: uma execução. Para 25 sem variante parcial: duas execuções, 48 saídas, 23 excedentes, 154 g e oito horas. Se o operador quiser produzir uma placa cheia e uma parcial, deve informar a variante parcial baseada em fatiamento próprio.

Não dividir o tempo por 24 e multiplicar por 25 como se o resultado fosse um fatiamento válido. Também não multiplicar o peso total de 77 g novamente pelas 24 saídas.

## 5. Hipóteses de cálculo dos testes

Aplicar `spreadsheet_legacy_v1` com V=9.000, L=15.000h, P=0,18kW, T=1,139/kWh, manutenção=40%, falhas=7% e reserva adicional legada=0,025/h. Para estes testes, mão de obra e adicionais são explicitamente zero e multiplicador 3. O objetivo é verificar as fórmulas; isso não confirma preço comercial nem ausência de trabalho/custos na operação.

Preço sugerido é calculado sobre o conjunto de execuções e arredondado para cima uma única vez ao real inteiro.

| Caso | Custo de referência | Sugestão do lote de teste |
| --- | --- | --- |
| Um suporte para tablet | 8,445399933333… | R$ 26,00 |
| Uma lixeira completa | 1,519166693333… | R$ 5,00 |
| 24 brindes participantes | 12,0619366 | R$ 37,00 |

Os custos periódicos usam tolerância de R$ 0,0000000001 nos testes; valores comerciais finais devem reconciliar exatamente em centavos. Não usar a soma de custos já exibidos com duas casas como base da memória de cálculo.

No caso C, R$ 37 divididos por 24 dão aproximadamente R$ 1,54. Se o orçamento cobrar R$ 1,54 por unidade exata, o total será R$ 36,96. Escolher modo lote ou unidade explicitamente, conforme a política descrita em `03-precificacao.md`.

## 6. Fluxo de início confirmado

1. Iniciar com banco operacional vazio, salvo configurações básicas revisadas.
2. Cadastrar os orçamentos novos conforme as solicitações chegarem.
3. Criar projeto, arquivos e receita no próprio fluxo quando ainda não existirem.
4. Salvar os dados de produção para reaproveitar na próxima solicitação.
5. Formar o catálogo de maneira gradual, selecionando produtos e fotos posteriormente.

Estes três exemplos podem compor fixtures identificadas de desenvolvimento e testes. Clientes, propostas enviadas e pedidos de demonstração são fictícios. O operador não precisa importar todos os produtos antigos para usar a primeira release. Nenhuma informação da planilha ou arquivo real deve ser copiada automaticamente para um ambiente público.

## 7. Evidências esperadas

- C23/C24/C25 comprovam as três formas de produção.
- C26/E06 comprovam que o cadastro progressivo funciona sem migração inicial.
- C01 preserva a referência anterior de 90 suportes de foto como teste adicional de compatibilidade, não como substituta dos três produtos escolhidos.
- Alterar os parâmetros de teste cria novos resultados, mas não redefine silenciosamente a referência histórica.
