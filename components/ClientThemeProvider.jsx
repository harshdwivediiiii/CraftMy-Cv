"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const ClientThemeProvider = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
