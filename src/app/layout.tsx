import type { Metadata } from "next";
import { DM_Sans, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body-loaded" });
const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading-loaded",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-loaded",
});
export const metadata: Metadata = {
  title: { default: "H3LDesk", template: "%s | H3LDesk" },
  description: "Organize sua operação de impressão 3D.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${body.variable} ${heading.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
