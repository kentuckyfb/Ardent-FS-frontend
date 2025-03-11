// src/app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { Fira_Code } from "next/font/google";

// Load Fira Code font
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code", // Define a CSS variable for the font
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {/* Apply the font to the body */}
      <body className={`${firaCode.variable} font-mono`}>{children}</body>
    </ThemeProvider>
  );
}