import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { WebGLProvider } from "@/components/webgl/WebGLProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  applicationName: "Alyvora AI Technologies",
  title: {
    default: "Alyvora AI Technologies | Intelligent Technology. Real Business Impact.",
    template: "%s | Alyvora AI Technologies",
  },
  description:
    "Alyvora AI Technologies builds AI solutions, custom software, automation systems, web and mobile applications, and secure cloud platforms for businesses in India and worldwide.",
  keywords: [
    "AI development",
    "Alyvora AI Technologies",
    "custom software development",
    "web application development",
    "mobile application development",
    "cloud solutions",
    "digital product development",
    "workflow automation",
    "RAG systems",
    "AI agents",
  ],
  authors: [{ name: "Alyvora AI Technologies Private Limited" }],
  creator: "Alyvora AI Technologies Private Limited",
  publisher: "Alyvora AI Technologies Private Limited",
  category: "Technology",
  alternates: siteUrl
    ? {
        canonical: "/",
      }
    : undefined,
  icons: {
    icon: [{ url: "/icons/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/icons/favicon.svg",
    apple: [{ url: "/icons/apexmind-apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Alyvora AI Technologies",
    title: "Alyvora AI Technologies | Intelligent Technology. Real Business Impact.",
    description:
      "AI, custom software, automation, cloud platforms, and digital transformation services for startups, SMEs, institutions, clinics, retailers, and growing companies.",
    images: siteUrl
      ? [
          {
            url: "/images/apexmind-social-preview.svg",
            width: 1200,
            height: 630,
            alt: "Alyvora AI Technologies intelligent platform preview",
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Alyvora AI Technologies | Intelligent Technology. Real Business Impact.",
    description:
      "AI, custom software, automation, cloud platforms, and digital transformation services for modern businesses.",
    images: siteUrl ? ["/images/apexmind-social-preview.svg"] : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <WebGLProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--purple)] focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
            >
              Skip to content
            </a>
            {children}
          </WebGLProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
