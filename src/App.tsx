import { Toaster, Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages";
import NotFound from "./pages/NotFound";
import About3rdHarvest from "./pages/About3rdHarvest";
import TriveraProTechnology from "./pages/TriveraProTechnology";
import ProudCoffeeWomen from "./pages/ProudCoffeeWomen";
import ImpactESG from "./pages/ImpactESG";
import PartnerWith3rdHarvest from "./pages/PartnerWith3rdHarvest";
import OurEcosystem from "./pages/OurEcosystem";
import StoriesMedia from "./pages/StoriesMedia";
import { AccessGate } from "./components/AccessGate";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AccessGate>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About3rdHarvest />} />
            <Route path="/triverapro" element={<TriveraProTechnology />} />
            <Route path="/proud-coffee-women" element={<ProudCoffeeWomen />} />
            <Route path="/impact-esg" element={<ImpactESG />} />
            <Route path="/partner" element={<PartnerWith3rdHarvest />} />
            <Route path="/ecosystem" element={<OurEcosystem />} />
            <Route path="/stories" element={<StoriesMedia />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AccessGate>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
