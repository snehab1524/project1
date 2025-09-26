import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/navigation/AppSidebar";

// --- IMPORT YOUR EXISTING PAGES ---
import Dashboard from "./pages/Dashboard";
import SpeciesPortal from "./pages/SpeciesPortal";
import Oceanographic from "./pages/Oceanographic";
import Models3D from "./pages/Models3D";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics"; // <-- CHANGE #1: IMPORT THE REAL PAGE

// --- DEFINE VARIABLES AND PLACEHOLDERS BEFORE THEY ARE USED ---
const queryClient = new QueryClient();

const Morphometric = () => <div className="p-4">Morphometric Page Coming Soon...</div>;
const OtolithID = () => <div className="p-4">OtolithID Page Coming Soon...</div>;
const Notifications = () => <div className="p-4">Notifications Page Coming Soon...</div>;
const Admin = () => <div className="p-4">Admin Page Coming Soon...</div>;
const Settings = () => <div className="p-4">Settings Page Coming Soon...</div>;
// CHANGE #2: THE ANALYTICS PLACEHOLDER HAS BEEN REMOVED FROM HERE

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            
            <div className="flex-1 flex flex-col">
              <header className="h-14 border-b border-border bg-surface/50 backdrop-blur-sm flex items-center px-4 sticky top-0 z-40">
                <SidebarTrigger className="text-foreground hover:text-accent transition-colors" />
                <div className="flex-1 flex items-center justify-end">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse"></div>
                    System Online
                  </div>
                </div>
              </header>

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/species" element={<SpeciesPortal />} />
                  <Route path="/oceanographic" element={<Oceanographic />} />
                  <Route path="/morphometric" element={<Morphometric />} />
                  <Route path="/models" element={<Models3D />} />
                  <Route path="/otolith" element={<OtolithID />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;