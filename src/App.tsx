import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import Statistics from "./pages/Statistics";
import GalleryPage from "./pages/GalleryPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/statistika" element={<PageTransition><Statistics /></PageTransition>} />
        <Route path="/galerija" element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/galerija/:eventId" element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/vijesti" element={<PageTransition><NewsPage /></PageTransition>} />
        <Route path="/vijesti/:articleId" element={<PageTransition><NewsPage /></PageTransition>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
