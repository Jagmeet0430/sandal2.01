"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const DynamicGlobalWebGLCanvas = dynamic(
  () => import("@/components/webgl/GlobalWebGLCanvas").then((mod) => mod.GlobalWebGLCanvas),
  {
    ssr: false,
  },
);

type WebGLProviderProps = {
  children: ReactNode;
};

export function WebGLProvider({ children }: WebGLProviderProps) {
  return (
    <>
      <DynamicGlobalWebGLCanvas />
      {children}
    </>
  );
}
