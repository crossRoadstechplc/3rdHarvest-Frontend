import { Toaster, Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import About from "@/pages/About";
import TriveraPro from "@/pages/TriveraPro";
import PCW from "@/pages/PCW";
import ImpactESG from "@/pages/ImpactESG";
import Partner from "@/pages/Partner";
import { AccessGate } from "./components/AccessGate";
import { ScrollToTop } from "./components/ScrollToTop";
import { ContactModalProvider } from "./components/ContactModalProvider";
import { AdminShortcutModal } from "./components/AdminShortcutModal";

// Must match the LoadingScreen timeout (4500 ms animation + ~200 ms buffer)
const LOADING_DURATION_MS = 4700;

const queryClient = new QueryClient();

const App = () => {
  // `loadingDone` flips to true once the loading animation has finished.
  // We delay enabling the AuthGate so it never fights with the loading screen.
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
        {/* Admin panel — activated by Ctrl+Shift+3 / Cmd+Shift+3 */}
        <AdminShortcutModal />
        {/* enabled=false while the loading animation is running */}
        <AccessGate enabled={loadingDone}>
          <BrowserRouter>
            <ContactModalProvider>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/triverapro" element={<TriveraPro />} />
                <Route path="/triveraPro" element={<TriveraPro />} />
                <Route path="/pcw" element={<PCW />} />
                <Route path="/PCW" element={<PCW />} />
                <Route path="/impact-esg" element={<ImpactESG />} />
                <Route path="/impactESG" element={<ImpactESG />} />
                <Route path="/partner" element={<Partner />} />
                <Route path="/partners" element={<Partner />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ContactModalProvider>
          </BrowserRouter>
        </AccessGate>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
