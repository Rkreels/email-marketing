
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { CampaignsPage } from "./pages/CampaignsPage";
import { AutomationsPage } from "./pages/AutomationsPage";
import { AudiencePage } from "./pages/AudiencePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/automations" element={<AutomationsPage />} />
            <Route path="/audience" element={<AudiencePage />} />
            <Route path="/forms" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Forms - Coming Soon</h1></div>} />
            <Route path="/analytics" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Analytics - Coming Soon</h1></div>} />
            <Route path="/website" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Website - Coming Soon</h1></div>} />
            <Route path="/content" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Content - Coming Soon</h1></div>} />
            <Route path="/integrations" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Integrations - Coming Soon</h1></div>} />
            <Route path="/create" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Create - Coming Soon</h1></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
