import { Bricolage_Grotesque, Fragment_Mono } from "next/font/google";
import "./globals.scss";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });
const mono = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--f-mono" });

export const metadata = {
  title: "Plamedi Ilunga — Développeur Full Stack",
  description: "Portfolio de Plamedi Ilunga, développeur full stack bilingue basé à Québec. React, Next.js, ASP.NET Core et déploiement cloud.",
  openGraph: { title: "Plamedi Ilunga — Développeur Full Stack", type: "website" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
