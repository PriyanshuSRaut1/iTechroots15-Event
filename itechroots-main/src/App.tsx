import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
import useScrollToTop from "./hooks/useScrollToTop";

import ShootingStarCursor from './components/ShootingStarCursor'
import VoicePlayer from './components/VoicePlayer'

import audio from './assets/audio/infinitevoice.mp3'
// import Spider from "./components/Spider";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  return (
    <div className="min-h-screen text-foreground relative">
      {/* <Spider/> */}
      <ShootingStarCursor />
      <VoicePlayer src={audio}/>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
