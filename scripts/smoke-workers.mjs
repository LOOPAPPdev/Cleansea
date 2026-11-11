/**
 * Smoke test on the real Workers runtime (regression for the SSG 404 found on 2026-11-11).
 * Usage: npm run test:workers  (build → populateCache local → this script)
 * Starts `wrangler dev`, requests every route in e2e/routes.ts plus all SSG params, expects 200.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const PORT = 8799;
const BASE = `http://127.0.0.1:${PORT}`;
const routesSrc = readFileSync(new URL("../e2e/routes.ts", import.meta.url), "utf8");
const ROUTES = [...routesSrc.matchAll(/"(\/[^"]*)"/g)].map((m) => m[1]);
const site = JSON.parse(readFileSync(new URL("../src/content/site-map.json", import.meta.url), "utf8"));
const ssg = site.pages["/solucoes"].sections.flatMap((s) => (s.items ?? []).map((i) => i.href));
const all = [...new Set([...ROUTES, ...ssg, ...ssg.filter((h) => h.includes("/areas/")).map((h) => `${h}/workflows`), "/por-que-loop/pequenas-empresas", "/termos", "/cookies"])];

const dev = spawn("npx", ["wrangler", "dev", "--port", String(PORT), "--ip", "127.0.0.1"], { stdio: "ignore" });
const stop = () => dev.kill("SIGTERM");
try {
  for (let i = 0; i < 45; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    try { if ((await fetch(`${BASE}/solucoes`)).ok) break; } catch {}
  }
  const bad = [];
  for (const r of all) {
    const res = await fetch(BASE + r, { redirect: "manual" });
    if (res.status !== 200) bad.push(`${r} → ${res.status}`);
  }
  const missing = await fetch(`${BASE}/nao-existe`);
  if (missing.status !== 404) bad.push(`/nao-existe → ${missing.status} (expected 404)`);
  if (bad.length) { console.error(`✗ ${bad.length} route(s) failed on Workers:\n- ${bad.join("\n- ")}`); process.exitCode = 1; }
  else console.log(`✓ ${all.length} routes return 200 on the Workers runtime; unknown route returns 404`);
} finally { stop(); }
