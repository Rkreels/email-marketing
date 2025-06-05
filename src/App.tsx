
import React from 'react';
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
import { CreatePage } from "./pages/CreatePage";
import { CreateCampaignPage } from "./pages/campaigns/CreateCampaignPage";
import { TemplatesPage } from "./pages/campaigns/TemplatesPage";
import { ABTestingPage } from "./pages/campaigns/ABTestingPage";
import { PrebuiltJourneysPage } from "./pages/automations/PrebuiltJourneysPage";
import { SignupFormsPage } from "./pages/forms/SignupFormsPage";
import { LandingPagesPage } from "./pages/forms/LandingPagesPage";
import { PopupsPage } from "./pages/forms/PopupsPage";
import { AnalyticsPage } from "./pages/analytics/AnalyticsPage";
import { WebsitePage } from "./pages/website/WebsitePage";
import { ContentPage } from "./pages/content/ContentPage";
import { IntegrationsPage } from "./pages/integrations/IntegrationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Create Route */}
              <Route path="/create" element={<CreatePage />} />
              
              {/* Campaigns Routes */}
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/campaigns/create" element={<CreateCampaignPage />} />
              <Route path="/campaigns/templates" element={<TemplatesPage />} />
              <Route path="/campaigns/ab-testing" element={<ABTestingPage />} />
              
              {/* Automations Routes */}
              <Route path="/automations" element={<AutomationsPage />} />
              <Route path="/automations/prebuilt" element={<PrebuiltJourneysPage />} />
              <Route path="/automations/transactional" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Transactional Email - Coming Soon</h1></div>} />
              <Route path="/automations/journeys" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Customer Journeys - Coming Soon</h1></div>} />
              
              {/* Forms Routes */}
              <Route path="/forms" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Forms - Coming Soon</h1></div>} />
              <Route path="/forms/signup" element={<SignupFormsPage />} />
              <Route path="/forms/landing" element={<LandingPagesPage />} />
              <Route path="/forms/popups" element={<PopupsPage />} />
              
              {/* Audience Routes */}
              <Route path="/audience" element={<AudiencePage />} />
              <Route path="/audience/tags" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Tags - Coming Soon</h1></div>} />
              <Route path="/audience/segments" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Segments - Coming Soon</h1></div>} />
              <Route path="/audience/surveys" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Surveys - Coming Soon</h1></div>} />
              <Route path="/audience/preferences" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Subscriber Preferences - Coming Soon</h1></div>} />
              <Route path="/audience/inbox" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Inbox - Coming Soon</h1></div>} />
              
              {/* Analytics Routes */}
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/analytics/custom" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Custom Reports - Coming Soon</h1></div>} />
              <Route path="/analytics/revenue" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Revenue Reports - Coming Soon</h1></div>} />
              <Route path="/analytics/audience" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Audience Insights - Coming Soon</h1></div>} />
              
              {/* Website Routes */}
              <Route path="/website" element={<WebsitePage />} />
              <Route path="/website/reports" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Website Reports - Coming Soon</h1></div>} />
              <Route path="/website/sites" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Connected Sites - Coming Soon</h1></div>} />
              
              {/* Content Routes */}
              <Route path="/content" element={<ContentPage />} />
              <Route path="/content/templates" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Email Templates - Coming Soon</h1></div>} />
              <Route path="/content/brand" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Brand Kit - Coming Soon</h1></div>} />
              <Route path="/content/images" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Image Library - Coming Soon</h1></div>} />
              
              {/* Integrations Routes */}
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/integrations/browse" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Browse Integrations - Coming Soon</h1></div>} />
              <Route path="/integrations/api" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">API Keys - Coming Soon</h1></div>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
