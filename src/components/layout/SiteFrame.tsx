"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GlobalBackground } from "@/components/three/GlobalBackground";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="relative z-10">{children}</div>;
  }

  return (
    <SmoothScroll>
      <GlobalBackground />

      <div className="relative z-10">
        <Header />
        {children}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
