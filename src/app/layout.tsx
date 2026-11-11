import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { footerColumns, nav } from "@/content";
import { Footer, Header } from "@/design-system/composites";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Loop Consultoria", template: "%s · Loop Consultoria" },
  description: "Consultoria full stack: estratégia, operações, dados e engenharia.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F3F7" },
    { media: "(prefers-color-scheme: dark)", color: "#15131F" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <a href="#conteudo" className="absolute -top-24 left-4 z-50 rounded-sm bg-surface-raised px-4 py-3 shadow-lg focus:top-4">
          Pular para o conteúdo
        </a>
        <Providers>
          <Header groups={nav} cta={{ label: "Fale com vendas", href: "/contato" }} />
          <main id="conteudo" tabIndex={-1}>{children}</main>
          <Footer columns={footerColumns} />
        </Providers>
      </body>
    </html>
  );
}
