import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GlobalBackground } from "@/components/three/GlobalBackground";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  applicationName: "ApexMind",
  title: {
    default: "ApexMind | AI Products, Automation and Digital Platforms",
    template: "%s | ApexMind",
  },
  description:
    "ApexMind builds intelligent applications, automation systems, cloud platforms, and digital products for modern businesses.",
  keywords: [
    "AI development",
    "web application development",
    "cloud solutions",
    "digital product development",
    "workflow automation",
  ],
  authors: [{ name: "ApexMind" }],
  creator: "ApexMind",
  publisher: "ApexMind",
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
    siteName: "ApexMind",
    title: "ApexMind | AI Products, Automation and Digital Platforms",
    description:
      "ApexMind builds intelligent applications, automation systems, cloud platforms, and digital products for modern businesses.",
    images: siteUrl
      ? [
          {
            url: "/images/apexmind-social-preview.svg",
            width: 1200,
            height: 630,
            alt: "ApexMind AI-ready enterprise platform preview",
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "ApexMind | AI Products, Automation and Digital Platforms",
    description:
      "ApexMind builds intelligent applications, automation systems, cloud platforms, and digital products for modern businesses.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll>
            <GlobalBackground />

            <div className="relative z-10">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-primary focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:shadow-button"
              >
                Skip to content
              </a>

              <Header />
              {children}
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
