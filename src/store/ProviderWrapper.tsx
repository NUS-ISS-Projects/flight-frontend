"use client";

import { ReactNode } from "react";

// project-import
import { JWTProvider } from "@/contexts/JWTContext";

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return <JWTProvider>{children}</JWTProvider>;
}
