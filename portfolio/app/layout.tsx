import type { Metadata } from "next";
import "./globals.css";
import { personalInfo } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: `${personalInfo.name} - ${personalInfo.tagline}. Full Stack Developer specializing in React, Next.js, Node.js, and cloud-native applications.`,
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Portfolio"],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: personalInfo.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
