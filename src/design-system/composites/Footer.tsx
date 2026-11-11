import Link from "next/link";
import type { NavLink } from "@/content";
import { Container, Logo } from "../primitives";

/** Site footer (LOOP-CMP-002): link columns from site-map.json + legal line. */
export function Footer({ columns }: { columns: { title: string; links: NavLink[] }[] }) {
  return (
    <footer className="mt-16 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]">
      <Container>
        <div className="pt-12"><Logo variant="lockup" height={22} /></div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-8 py-10">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="mb-3 text-sm font-medium text-muted-foreground">{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="flex min-h-11 items-center text-[0.9375rem] hover:underline">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Loop Consultoria</span>
          <span>Protótipo · copy em lorem ipsum</span>
        </div>
      </Container>
    </footer>
  );
}
