import { expect, test } from "@playwright/test";
import { ROUTES } from "./routes";

/**
 * Scenario: No horizontal overflow
 *   GIVEN any route  WHEN it loads at 320 / 390 / 820 / 1440 px (light and dark)
 *   THEN the page does not scroll sideways AND there is exactly one <h1>
 *   AND no header label wraps AND no visible link/button is shorter than 32px.
 */
for (const route of ROUTES) {
  test(`layout ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(route);
    expect(res?.ok(), `HTTP ${res?.status()}`).toBeTruthy();
    const m = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      h1: document.querySelectorAll("h1").length,
      wrapped: [...document.querySelectorAll<HTMLElement>("header a, header button")]
        .filter((el) => el.offsetParent !== null && el.getBoundingClientRect().height > 60)
        .map((el) => el.textContent?.trim()),
      small: [...document.querySelectorAll<HTMLElement>("main a, main button, header a, header button")]
        .filter((el) => { const b = el.getBoundingClientRect(); return el.offsetParent !== null && b.width > 0 && b.height < 32; })
        .map((el) => el.textContent?.trim()),
    }));
    expect(m.overflow, "horizontal overflow").toBe(false);
    expect(m.h1).toBe(1);
    expect(m.wrapped, "header labels wrap").toEqual([]);
    expect(m.small, "targets under 32px").toEqual([]);
    expect(errors).toEqual([]);
  });
}
