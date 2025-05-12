import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Header } from "./components/app/header";
import { AppRoutes } from "./routes";
import { queryClient } from "./lib/query-client";
import { TooltipProvider } from "./components/ui/tooltip";

export function App() {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <Header />

        <main className="py-6">
          <AppRoutes />
        </main>

        <Toaster richColors />
      </QueryClientProvider>
    </TooltipProvider>
  );
}
