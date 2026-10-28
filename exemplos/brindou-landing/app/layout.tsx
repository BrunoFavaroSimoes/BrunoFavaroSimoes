import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://brindou.com"),
  title: "Brindou — Do convite ao grande dia, tudo num lugar só",
  description: "Site do casamento, convites com confirmação de presença, orçamento, fornecedores e tarefas. Grátis e sem cartão.",
  openGraph: { title: "Brindou — Planeje menos. Brinde mais.", images: ["/img/aneis.webp"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
