import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { ROUTES } from "./routes";

/**
 * Scenario: WCAG 2.1 AA automated audit
 *   GIVEN any route  WHEN axe-core scans it (light and dark projects)
 *   THEN there are no violations of WCAG 2.0/2.1 A and AA rules.
 * Runs on the 390px and desktop projects; layout tests cover the other sizes.
 */
test.describe("accessibility (axe)", () => {
  test.skip(({ viewport }) => ![390, 1440].includes(viewport!.width), "audited at 390 and 1440 only");
  for (const route of ROUTES) {
    test(`axe ${route}`, async ({ page }) => {
      await page.goto(route);
      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const summary = violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length}× — ${v.nodes[0]?.target.join(" ")}`);
      expect(summary).toEqual([]);
    });
  }
});
