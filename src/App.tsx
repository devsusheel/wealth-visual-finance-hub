
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Calculators from "./pages/Calculators";
import About from "./pages/About";
import Updates from "./pages/Updates";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import HomeLoans from "./pages/HomeLoans";
import Refinancing from "./pages/Refinancing";
import CommercialLoans from "./pages/CommercialLoans";
import CarLoans from "./pages/CarLoans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/home-loans" element={<HomeLoans />} />
          <Route path="/services/refinancing" element={<Refinancing />} />
          <Route path="/services/commercial-loans" element={<CommercialLoans />} />
          <Route path="/services/car-loans" element={<CarLoans />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/about" element={<About />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
