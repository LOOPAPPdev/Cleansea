/**
 * Vendor the Minimal theme for Obsidian (MIT, © Steph Ango) into vendor/obsidian-minimal/.
 *   node scripts/minimal-sync.mjs [commit]   → clone upstream, copy the source, record the commit
 * Copies the theme source only (src/scss, theme.css, manifest, license, readme); docs and images are skipped.
 * After a sync, run `npm run minimal` to regenerate src/design-system/tokens/minimal.json.
 */
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "https://github.com/kepano/obsidian-minimal.git";
const FILES = ["LICENSE", "README.md", "manifest.json", "package.json", "theme.css", "src/scss"];
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "vendor/obsidian-minimal");
const tmp = mkdtempSync(join(tmpdir(), "minimal-"));
const git = (...a) => execFileSync("git", a, { cwd: tmp, encoding: "utf8" }).trim();

try {
  execFileSync("git", ["clone", "--quiet", REPO, tmp]);
  if (process.argv[2]) git("checkout", "--quiet", process.argv[2]);
  const commit = git("rev-parse", "HEAD");
  const date = git("log", "-1", "--format=%cs");
  rmSync(dest, { recursive: true, force: true });
  for (const f of FILES) if (existsSync(join(tmp, f))) cpSync(join(tmp, f), join(dest, f), { recursive: true });
  writeFileSync(join(dest, "VENDOR.json"), JSON.stringify({ repo: REPO.replace(/\.git$/, ""), commit, date, license: "MIT", files: FILES }, null, 2) + "\n");
  console.log(`vendor/obsidian-minimal ← ${commit.slice(0, 7)} (${date})`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
