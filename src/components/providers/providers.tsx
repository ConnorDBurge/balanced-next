"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApolloWrapper } from "@/components/providers/apollo-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </ApolloWrapper>
  );
}
