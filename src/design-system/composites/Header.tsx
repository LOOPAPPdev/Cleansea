"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import type { NavGroup } from "@/content";
import { ButtonLink } from "../primitives";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { cn } from "@/lib/utils";

/**
 * Site header (LOOP-CMP-001).
 * ≥1100px: Base UI NavigationMenu with dropdown panels.
 * <1100px: "Menu" button opens a Base UI Sheet (modal dialog): focus trap, Esc closes,
 * focus returns to the trigger, page scroll locked. Groups expand in an Accordion.
 * The sheet closes on any link activation and on route change.
 */
export function Header({ groups, cta }: { groups: NavGroup[]; cta: { label: string; href: string } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  // Section anchors (/solucoes#areas) are never "the current page".
  const current = (href: string) => (!href.includes("#") && pathname === href ? "page" : undefined);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex min-h-(--header-height) max-w-site items-center gap-2 px-(--space-gutter) min-[360px]:gap-4">
        <Link href="/solucoes" className="mr-auto inline-flex min-h-11 items-center gap-2.5 whitespace-nowrap text-[1.0625rem] font-semibold tracking-tight min-[360px]:text-xl lg:mr-4">
          <span aria-hidden="true" className="size-6 rounded-full border-[5px] border-primary" />
          Loop Consultoria
        </Link>

        {/* Desktop */}
        <NavigationMenu className="hidden flex-1 justify-start lg:flex" aria-label="Principal">
          <NavigationMenuList>
            {groups.map((g) =>
              g.children ? (
                <NavigationMenuItem key={g.label}>
                  <NavigationMenuTrigger>{g.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid min-w-60 gap-0.5 p-2">
                      {g.children.map((c) => (
                        <li key={c.href + c.label}>
                          <NavigationMenuLink render={<Link href={c.href} />} aria-current={current(c.href)} className="aria-[current=page]:text-primary-strong">
                            {c.label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={g.label}>
                  <NavigationMenuLink render={<Link href={g.href!} />} aria-current={current(g.href!)} className={cn(navigationMenuTriggerStyle(), "aria-[current=page]:text-primary-strong")}>
                    {g.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <ButtonLink href={cta.href} className="hidden lg:inline-flex">{cta.label}</ButtonLink>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex h-11 items-center gap-2 rounded-pill border border-border bg-background px-3 text-sm font-medium min-[360px]:px-4 lg:hidden">
            <MenuIcon className="size-4" aria-hidden="true" />
            Menu
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 overflow-y-auto pb-[calc(2rem+env(safe-area-inset-bottom))] data-[side=right]:sm:max-w-md">
            <SheetTitle className="flex min-h-(--header-height) items-center px-(--space-gutter) text-lg">Menu</SheetTitle>
            <nav aria-label="Principal" className="flex flex-col gap-6 px-(--space-gutter)">
              <Accordion>
                {groups.map((g) =>
                  g.children ? (
                    <AccordionItem key={g.label} value={g.label} className="border-b border-border">
                      <AccordionTrigger className="text-lg">{g.label}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="pb-2">
                          {g.children.map((c) => (
                            <li key={c.href + c.label}>
                              <Link href={c.href} onClick={() => setOpen(false)} aria-current={current(c.href)} className="flex min-h-11 items-center rounded-md px-3 text-foreground hover:bg-surface aria-[current=page]:bg-surface aria-[current=page]:text-primary-strong">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div key={g.label} className="border-b border-border">
                      <Link href={g.href!} onClick={() => setOpen(false)} aria-current={current(g.href!)} className="flex min-h-14 items-center text-lg font-medium aria-[current=page]:text-primary-strong">
                        {g.label}
                      </Link>
                    </div>
                  ),
                )}
              </Accordion>
              <ButtonLink href={cta.href} onClick={() => setOpen(false)} className="w-full">{cta.label}</ButtonLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
