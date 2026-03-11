import { Toaster, Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import AdminEntry from "@/pages/admin/AdminEntry";
import { AccessGate } from "./components/AccessGate";
import { ScrollToTop } from "./components/ScrollToTop";
import { ContactModalProvider } from "./components/ContactModalProvider";

const LOADING_DURATION_MS = 4700;

const queryClient = new QueryClient();

const App = () => {
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingDone(true), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ContactModalProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/admin/*" element={<AdminEntry />} />
              <Route
                path="/"
                element={
                  <AccessGate enabled={loadingDone}>
                    <Home />
                  </AccessGate>
                }
              />
              <Route
                path="/insights"
                element={
                  <AccessGate enabled={loadingDone}>
                    <Insights />
                  </AccessGate>
                }
              />
              <Route
                path="/insights/:slug"
                element={
                  <AccessGate enabled={loadingDone}>
                    <InsightDetail />
                  </AccessGate>
                }
              />
              <Route
                path="*"
                element={
                  <AccessGate enabled={loadingDone}>
                    <NotFound />
                  </AccessGate>
                }
              />
            </Routes>
          </ContactModalProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
