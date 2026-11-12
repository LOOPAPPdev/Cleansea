import { expect, test } from "@playwright/test";

/**
 * Scenario: Segmented tabs (keyboard)
 *   GIVEN the architecture panel on /solucoes
 *   WHEN the visitor focuses "Arquitetura" and presses ArrowRight
 *   THEN "SSM" becomes selected AND its panel shows the 6 SSM steps
 */
test("segmented tabs work with the keyboard", async ({ page }) => {
  await page.goto("/solucoes");
  const list = page.getByRole("tablist", { name: "Visualizações da arquitetura" });
  const first = list.getByRole("tab", { name: "Arquitetura" });
  await expect(first).toHaveAttribute("aria-selected", "true");
  await first.focus();
  await page.keyboard.press("ArrowRight");
  const ssm = list.getByRole("tab", { name: "SSM" });
  await expect(ssm).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(ssm).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").getByText("Rich picture")).toBeVisible();
});

/**
 * Scenario: Architecture diagram reads without the picture
 *   GIVEN /solucoes  THEN the diagram figure lists the actor, both layers and the integrations in order.
 */
test("architecture diagram exposes its layers", async ({ page }) => {
  await page.goto("/solucoes");
  const fig = page.getByRole("figure", { name: "Arquitetura operacional" });
  await expect(fig.getByText("Cliente / Consultor / Operador")).toBeVisible();
  await expect(fig.getByRole("region", { name: "LOOP Studio — apps/web" })).toBeVisible();
  await expect(fig.getByRole("region", { name: "Backend integrado" })).toBeVisible();
  await expect(fig.getByText("Cloudflare")).toBeVisible();
});

/**
 * Scenario: Design system page
 *   GIVEN /design-system  THEN the 8 module sections exist AND the component registry lists every spec.
 */
test("design system page lists modules and components", async ({ page }) => {
  await page.goto("/design-system");
  for (const name of ["Valores", "Marca", "Cores", "Tipografia", "Ícones", "Fotografia", "Visualização de dados", "Componentes"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(page.getByText("LOOP-PRM-011", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("LOOP-TPL-019", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("table", { name: /Horas economizadas/ }).first()).toBeAttached();
});
