# Design system do H3LDesk

Cópia local da base visual compartilhada do website pessoal e do Unveil, adaptada em 27/10/2026 por solicitação do usuário. Os arquivos nesta pasta são referências e estilos copiados, ainda sem integração em aplicativo.

## Origem e isolamento

Origem: `/home/helds/code/design-system`, versão 0.1.0. Esta cópia é independente: não importa o pacote externo e não modifica a identidade do website ou do Unveil. Mudanças futuras na base não entram automaticamente no H3LDesk.

Foram copiados apenas `tokens.json`, `tokens.css`, `styles.css` e `tailwind.css`. Não foram copiados o guia HTML interativo, capturas, scripts ou o pacote npm, para manter esta etapa sem código novo da aplicação nem instalação de ferramentas.

## Identidade confirmada

| Papel | Valor |
| --- | --- |
| Destaque principal H3LForge | `#ff6600` |
| Hover do destaque | `#ff8533` |
| Foco visível | `#ffb380` |
| Texto sobre o destaque | `#141414` |
| Fundo principal | `#141414` |
| Superfície | `#1c1c1c` |
| Texto principal | `#ededed` |
| Texto secundário | `#a1a1a1` |
| Linha decorativa | `#333333` |
| Borda de controle | `#707070` |

A cor principal foi especificada pelo usuário. Hover e foco são derivações locais propostas para manter a família laranja e o contraste. Aviso (`#e3ba67`), erro (`#e48a96`) e informação (`#8cb9db`) mantêm seus papéis semânticos e precisam de texto/ícone; o laranja de uma ação não significa erro ou alerta. Para status de sucesso, usar indicação textual/ícone própria, sem depender da cor da marca.

## Padrões preservados

- Tema escuro com fundos neutros, sem tonalidade laranja nas superfícies.
- Bordas retas em cartões, campos, botões e diálogos; círculos somente quando fizerem sentido funcional.
- DM Sans no corpo, Manrope nos títulos e IBM Plex Mono em metadados.
- Escala de espaçamento em múltiplos de 4 px, com preferência por múltiplos de 8 nos blocos maiores.
- Container principal de até 1184 px; áreas de leitura e ferramentas podem usar 960 px.
- Margens laterais de 56, 32 e 20 px conforme a largura da tela.
- Controles de 48 px ou 44 px na densidade compacta; cards com 24 px de padding.
- Foco com outline de 2 px e offset de 4 px; rótulos associados e estados claros.
- Transições de 160–240 ms, entradas de até 460 ms e respeito a movimento reduzido.

O H3LDesk é uma ferramenta de operação: priorizar tabelas legíveis, formulários por etapas, resumos e dados monetários alinhados. Não aplicar espaços de uma landing page indiscriminadamente a formulários ou tabelas.

## Arquivos e uso futuro

`tokens.json` contém os valores locais; `tokens.css` contém as variáveis equivalentes. Manter ambos sincronizados quando houver alteração. `styles.css` oferece classes opcionais com prefixo `hl-`, sob o escopo `data-hl`. As fontes precisam ser configuradas quando o aplicativo for iniciado; estes arquivos não as baixam.

`tailwind.css` é um adaptador para Tailwind v4. A versão do Tailwind ainda será verificada em M0. Componentes shadcn que usem variáveis diretas e tokens adicionais precisam de mapeamento compatível; a simples cópia não conclui essa integração.

A paleta foi verificada matematicamente para texto, ação, hover, foco e limites de controles. Isso não é uma auditoria de acessibilidade de uma aplicação, que ainda não foi implementada.

O logo oficial e outros ativos de marca ainda precisam ser fornecidos/selecionados. Não inventar símbolo oficial nem publicar arquivos privados. O PDF comercial deverá ter tratamento imprimível próprio, com fundo claro, texto legível e laranja como detalhe, sem reproduzir grandes áreas escuras da interface.
