
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mainTabs = [
  { id: 'create', label: 'Create', path: '/create' },
  { id: 'home', label: 'Home', path: '/' },
  { id: 'campaigns', label: 'Campaigns', path: '/campaigns' },
  { id: 'automations', label: 'Automations', path: '/automations' },
  { id: 'forms', label: 'Forms', path: '/forms' },
  { id: 'audience', label: 'Audience', path: '/audience' },
  { id: 'analytics', label: 'Analytics', path: '/analytics' },
  { id: 'website', label: 'Website', path: '/website' },
  { id: 'content', label: 'Content', path: '/content' },
  { id: 'integrations', label: 'Integrations', path: '/integrations' },
];

export const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === '/') return 'home';
    return location.pathname.split('/')[1] || 'home';
  };

  const activeTab = getActiveTab();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-purple-600">MailChimp Clone</h1>
            </div>
            <nav className="flex space-x-1">
              {mainTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => navigate(tab.path)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    activeTab === tab.id
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  data-voice-context={`Navigate to ${tab.label} section`}
                >
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
