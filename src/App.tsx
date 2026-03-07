import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";

// Lazy load sub-pages
const Statistics = lazy(() => import("./pages/Statistics"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/statistika" element={<Suspense fallback={<PageLoader />}><PageTransition><Statistics /></PageTransition></Suspense>} />
        <Route path="/galerija" element={<Suspense fallback={<PageLoader />}><PageTransition><GalleryPage /></PageTransition></Suspense>} />
        <Route path="/galerija/:eventId" element={<Suspense fallback={<PageLoader />}><PageTransition><GalleryPage /></PageTransition></Suspense>} />
        <Route path="/vijesti" element={<Suspense fallback={<PageLoader />}><PageTransition><NewsPage /></PageTransition></Suspense>} />
        <Route path="/vijesti/:articleId" element={<Suspense fallback={<PageLoader />}><PageTransition><NewsPage /></PageTransition></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><PageTransition><NotFound /></PageTransition></Suspense>} />
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