import {
  test,
  expect,
  type Page,
  type APIRequestContext,
} from "@playwright/test";

async function accountEmail(
  request: APIRequestContext,
  email: string,
  subject: string,
) {
  let id = "";
  await expect
    .poll(async () => {
      const response = await request.get(
        "http://127.0.0.1:58026/api/v1/messages",
      );
      const data = await response.json();
      const item = data.messages.find(
        (m: { ID: string; Subject: string; To: { Address: string }[] }) =>
          m.Subject.includes(subject) &&
          m.To.some((to) => to.Address === email),
      );
      id = item?.ID ?? "";
      return !!id;
    })
    .toBe(true);
  const response = await request.get(
    `http://127.0.0.1:58026/api/v1/message/${id}`,
  );
  const mail = await response.json();
  const url = mail.Text.match(/http:\/\/localhost:3101\/\S+/)?.[0];
  expect(url).toBeTruthy();
  return url as string;
}
async function signUp(page: Page, email: string, name: string) {
  await page.goto("/cadastro");
  await page.getByLabel("Seu nome", { exact: true }).fill(name);
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill("Senha123");
  await page.getByLabel("Confirme sua senha", { exact: true }).fill("Senha123");
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Confira seu e-mail");
}
async function login(page: Page, email: string, password = "Senha123") {
  await page.goto("/entrar");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
}
test("cadastro, confirmação, isolamento, recuperação de senha e logout", async ({
  page,
  browser,
  request,
}) => {
  const stamp = Date.now();
  const emailA = `conta-a-${stamp}@example.test`;
  const emailB = `conta-b-${stamp}@example.test`;
  await page.goto("/painel");
  await expect(page).toHaveURL(/\/entrar/);
  await signUp(page, emailA, "Pessoa A fictícia");
  await login(page, emailA);
  await expect(page.locator('.notice[role="alert"]')).toContainText(
    "Confirme seu e-mail",
  );
  const verification = await accountEmail(request, emailA, "Confirme");
  await page.goto(verification);
  await expect(page).toHaveURL(/\/entrar/);
  await login(page, emailA);
  await expect(page).toHaveURL(/\/painel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Pessoa A",
  );
  const a = await (await page.request.get("/api/workspace")).json();
  expect(a.id).toBeTruthy();
  expect(a.currency).toBe("BRL");
  const second = await browser.newContext();
  const other = await second.newPage();
  await signUp(other, emailB, "Pessoa B fictícia");
  await other.goto(await accountEmail(request, emailB, "Confirme"));
  await login(other, emailB);
  await expect(other).toHaveURL(/\/painel/);
  const b = await (await other.request.get("/api/workspace")).json();
  expect(a.id).not.toBe(b.id);
  expect((await page.request.get(`/api/workspace/${b.id}`)).status()).toBe(404);
  expect((await other.request.get(`/api/workspace/${a.id}`)).status()).toBe(
    404,
  );
  expect((await request.get(`/api/workspace/${a.id}`)).status()).toBe(404);
  await second.close();
  await page.getByRole("button", { name: "Sair da conta" }).click();
  await expect(page).toHaveURL(/\/entrar/);
  expect((await page.request.get("/api/workspace")).status()).toBe(401);
  const previousContext = await browser.newContext();
  const previousPage = await previousContext.newPage();
  await login(previousPage, emailA);
  await expect(previousPage).toHaveURL(/\/painel/);
  await page.goto("/esqueci-senha");
  await page.getByLabel("E-mail", { exact: true }).fill(emailA);
  await page.getByRole("button", { name: "Enviar instruções" }).click();
  await expect(page.getByRole("status")).toContainText("Se houver uma conta");
  const reset = await accountEmail(request, emailA, "Redefina");
  await page.goto(reset);
  await page.getByLabel("Nova senha", { exact: true }).fill("Senha456");
  await page.getByLabel("Confirme sua senha", { exact: true }).fill("Senha456");
  await page.getByRole("button", { name: "Salvar nova senha" }).click();
  await expect(page.getByRole("status")).toContainText("Senha atualizada");
  expect((await previousPage.request.get("/api/workspace")).status()).toBe(401);
  await previousContext.close();
  await page.goto(reset);
  await expect(page.locator('.notice[role="alert"]')).toContainText(
    "Link inválido",
  );
  await expect(
    page.getByRole("button", { name: "Salvar nova senha" }),
  ).toBeDisabled();
  await login(page, emailA);
  await expect(page.locator('.notice[role="alert"]')).toContainText(
    "Não foi possível entrar",
  );
  await login(page, emailA, "Senha456");
  await expect(page).toHaveURL(/\/painel/);
});

test("validação por campo, demo isolada e formulários em desktop/mobile", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/entrar",
      "/cadastro",
      "/esqueci-senha",
      "/verificar-email",
      "/redefinir-senha",
      "/demo",
    ]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.goto("/cadastro");
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await expect(
    page.getByText("Informe seu nome.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Informe seu e-mail.", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Seu nome", { exact: true }).fill("Nome preservado");
  await page.getByLabel("E-mail", { exact: true }).fill("invalido");
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await expect(
    page.getByText("Informe um e-mail válido.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Seu nome", { exact: true })).toHaveValue(
    "Nome preservado",
  );
  expect(errors).toEqual([]);
});
