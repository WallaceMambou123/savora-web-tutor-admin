// app/context/ThemeContext.tsx
'use client';

import { ThemeProvider } from "next-themes";

export function ThemeContext({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} // Désactive l'utilisation du thème système
    >
      {children}
    </ThemeProvider>
  );
}