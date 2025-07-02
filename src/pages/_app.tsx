import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
       <AuthProvider>
          <Navigation />
          <Component {...pageProps} />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}