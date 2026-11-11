import { expect, test } from "@playwright/test";

const isDesktop = (w: number) => w >= 1100;

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => page.goto("/solucoes"));

  /**
   * Scenario: Mobile menu (Base UI Sheet)
   *   GIVEN a viewport < 1100px  WHEN the visitor opens "Menu"
   *   THEN a modal dialog opens  WHEN Esc  THEN it closes AND focus returns to "Menu"
   *   WHEN the visitor follows a link  THEN the page changes AND the dialog is closed.
   */
  test("mobile menu", async ({ page, viewport }) => {
    test.skip(isDesktop(viewport!.width), "desktop uses NavigationMenu");
    const trigger = page.getByRole("button", { name: "Menu" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await dialog.getByRole("button", { name: "Empresa" }).click();
    await dialog.getByRole("link", { name: "Sobre", exact: true }).click();
    await page.waitForURL("**/sobre");
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  /**
   * Scenario: Desktop dropdown (Base UI NavigationMenu)
   *   GIVEN a viewport ≥ 1100px  WHEN the visitor opens "Empresa"  THEN its links show
   *   WHEN Esc  THEN the panel closes AND focus returns to "Empresa".
   */
  test("desktop dropdown", async ({ page, viewport }) => {
    test.skip(!isDesktop(viewport!.width), "mobile uses Sheet");
    const trigger = page.getByRole("banner").getByRole("button", { name: "Empresa" });
    await trigger.click();
    await expect(page.locator("[data-slot=navigation-menu-link]", { hasText: "Princípios" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-slot=navigation-menu-link]", { hasText: "Princípios" })).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("section anchors are not marked as current page", async ({ page }) => {
    await expect(page.locator('a[aria-current="page"][href*="#"]')).toHaveCount(0);
  });
});
