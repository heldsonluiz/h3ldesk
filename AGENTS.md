# Instruções para o Codex

## Missão

Implementar o produto definido em `README.md` e `docs/`, em marcos pequenos e verificáveis. O principal resultado de R1 é reaproveitar projetos, arquivos e configurações para emitir orçamentos com histórico confiável.

Começar em projeto novo com o núcleo da stack confirmado. O operador quer cadastrar os próximos orçamentos conforme surgirem; não exigir migração ou cadastro prévio de um catálogo. Permitir criar/salvar projeto e configuração a partir do fluxo de orçamento. Validar os três produtos de `docs/09-exemplos-de-referencia.md`.

## Ordem de trabalho

1. Inspecione o repositório, as instruções existentes, scripts e ambiente antes de alterá-los.
2. Leia o escopo, o domínio, a precificação e o marco atual do roadmap.
3. Escolha a menor fatia funcional que atende aos critérios do marco.
4. Implemente domínio, persistência, ações e interface necessários a essa fatia.
5. Valide as regras afetadas e registre evidências no roadmap.
6. Informe limitações reais. Não declare como concluída uma integração apenas simulada.

## Regras obrigatórias

- Use português brasileiro na interface e nos documentos do produto.
- Considere uma única P2S na operação inicial. Não criar um planejador de frota como requisito inicial.
- Não confundir horas de impressão com horas de trabalho humano.
- Não deduzir tempo de impressão a partir do STL, volume ou peso.
- Não escalar automaticamente tempo e consumo de uma placa parcial pela quantidade de peças.
- Não vincular registros por nome. Use identificadores estáveis e versões.
- Não recalcular silenciosamente orçamentos emitidos ou pedidos aprovados.
- Não usar números de ponto flutuante comuns como base de cálculos monetários.
- Não confiar em totais enviados pelo navegador: recalcular e validar no servidor.
- Não consumir estoque na simulação de orçamento. Reservar e consumir são operações diferentes.
- Não somar a provisão de falhas estimada novamente aos custos reais de reimpressão.
- Não chamar resultado parcial de lucro líquido. Identifique os custos incluídos.
- Não expor custos, clientes, arquivos privados ou credenciais no catálogo e na demo.
- Não automatizar WhatsApp, Instagram ou controle da impressora nas releases iniciais.
- Não implementar decisões pendentes de negócio como se tivessem sido confirmadas.

## Autonomia e decisões

Use as decisões propostas em `docs/08-decisoes-e-fontes.md` quando não houver preferência no repositório. Rotinas de implementação, nomes internos e organização de componentes podem ser resolvidos sem interromper o trabalho. Registre uma ADR curta para desvios materiais de arquitetura.

Uma dúvida de negócio deve bloquear apenas o recurso que depende dela. Exemplo: é possível implementar e testar o modo de cálculo compatível com a planilha enquanto se aguarda a definição do objetivo da reserva adicional chamada ROI. Nunca corrigir silenciosamente uma regra de preço.

## Qualidade

- Formulários devem explicar erros junto ao campo e preservar o que foi preenchido.
- Forneça alternativa por formulário/teclado a toda ação de arrastar.
- Implemente estados vazio, carregando, erro, falta de acesso e conflito relevantes.
- Teste cálculos, transações e regras de histórico com casos significativos.
- Verifique o fluxo principal em desktop e celular; PDF precisa de inspeção visual.
- Clientes e pedidos de demonstração devem ser fictícios e isolados da operação. Os três exemplos numéricos de produto autorizados podem ser fixtures identificadas, sem dados de clientes ou arquivos privados.
- Não marcar uma tarefa pronta com telas estáticas, funções vazias ou TODOs no fluxo principal.

## Encerramento de cada marco

Atualize somente tarefas efetivamente concluídas em `docs/04-roadmap.md`. Registre verificações executadas, pendências e decisões. Não faça push, deploy, publicação, envio externo ou alterações destrutivas em serviços sem autorização aplicável. A criação destes documentos não autoriza essas ações.

## Referência visual local

Para o H3LDesk, usar `design-system/README.md` e os tokens copiados nesta pasta. A assinatura é o laranja H3LForge `#ff6600`, mantendo fundos neutros, bordas retas e a tipografia da base website/Unveil. Não editar a base externa para customizar este produto. A cópia das referências não inicia M0 nem autoriza implementar o aplicativo.

## Primeira entrega e acesso — atualização de 27/10/2026

Usar pnpm. Cadastro público por e-mail/senha com verificação, login, logout e recuperação; workspace privado por conta, com autorização no servidor e testes de isolamento. Não usar allowlist nem Google OAuth como fluxo inicial. Separar desenvolvimento, testes, homologação e produção. Começar por M0/M1A (materiais, custos adicionais e clientes), deixando projetos completos, motor de preços e PDFs para os marcos seguintes. Não ampliar para equipes, convites ou cobrança SaaS. A preparação documental não marca a implementação como concluída.

## Stack consolidada aprovada

Seguir D23/D24 e a tabela de `docs/06-arquitetura.md`. Adotar Vercel/Neon para hospedagem e Resend/R2 conforme a necessidade dos marcos. Não reabrir escolhas já aprovadas sem incompatibilidade concreta; verificar versões estáveis, peers e runtime na implementação. Não instalar bibliotecas futuras nem criar recursos externos apenas porque aparecem na stack.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
