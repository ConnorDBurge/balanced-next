"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
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
        <TooltipProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{ style: { zIndex: 40 } }} />
        </TooltipProvider>
      </ThemeProvider>
    </ApolloWrapper>
  );
}
