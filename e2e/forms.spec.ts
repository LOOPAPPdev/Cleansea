import { expect, test } from "@playwright/test";

/**
 * Scenario: Contact form errors
 *   GIVEN the contact form is empty  WHEN the visitor submits
 *   THEN "Preencha seu nome." is shown as text AND focus moves to the first invalid field
 *   WHEN the visitor fills valid data and submits  THEN a success status is announced.
 */
test("contact form validation and submit", async ({ page }) => {
  await page.goto("/contato");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.getByText("Preencha seu nome.")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Nome" })).toBeFocused();
  await expect(page.getByRole("textbox", { name: "Nome" })).toHaveAttribute("aria-invalid", "true");

  await page.getByRole("textbox", { name: "Nome" }).fill("Ana");
  await page.getByRole("textbox", { name: "E-mail corporativo" }).fill("ana@empresa.com");
  await page.getByRole("textbox", { name: "Empresa" }).fill("Empresa X");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.getByRole("status")).toContainText("Mensagem pronta");
});

/**
 * Scenario: Job filter
 *   GIVEN the job search  WHEN the visitor picks "Design"
 *   THEN only Design jobs show AND the count updates AND the chip reports pressed.
 */
test("job filter", async ({ page }) => {
  await page.goto("/carreiras/busca");
  await expect(page.getByRole("status")).toHaveText("8 vagas");
  const design = page.getByRole("button", { name: "Design" });
  await design.click();
  await expect(design).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toHaveText("2 vagas");
});
