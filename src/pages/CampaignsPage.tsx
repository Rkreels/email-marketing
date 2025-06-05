
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, Mail, Calendar, Users, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const CampaignsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const campaigns = [
    {
      id: 1,
      name: 'Monthly Newsletter',
      status: 'Sent',
      sent: '2024-01-15',
      recipients: 1234,
      openRate: '24.5%',
      clickRate: '4.2%'
    },
    {
      id: 2,
      name: 'Product Launch',
      status: 'Draft',
      sent: null,
      recipients: 0,
      openRate: '-',
      clickRate: '-'
    },
    {
      id: 3,
      name: 'Holiday Sale',
      status: 'Scheduled',
      sent: '2024-01-20',
      recipients: 2456,
      openRate: '-',
      clickRate: '-'
    }
  ];

  const templates = [
    { name: 'Newsletter Template', category: 'Regular', preview: 'newsletter-preview.jpg' },
    { name: 'Product Launch', category: 'Promotional', preview: 'product-preview.jpg' },
    { name: 'Welcome Email', category: 'Automation', preview: 'welcome-preview.jpg' },
    { name: 'Sale Announcement', category: 'Promotional', preview: 'sale-preview.jpg' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600">Create, manage, and track your email campaigns</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new email campaign"
          data-voice-action="Opening campaign creation wizard"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-voice-context="View all campaigns">All Campaigns</TabsTrigger>
          <TabsTrigger value="drafts" data-voice-context="View draft campaigns">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled" data-voice-context="View scheduled campaigns">Scheduled</TabsTrigger>
          <TabsTrigger value="sent" data-voice-context="View sent campaigns">Sent</TabsTrigger>
          <TabsTrigger value="templates" data-voice-context="Browse email templates">Templates</TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              data-voice-context="Search through your campaigns"
            />
          </div>
          <Button variant="outline" data-voice-context="Filter campaigns by criteria">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                            campaign.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {campaign.status}
                          </span>
                          {campaign.sent && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {campaign.sent}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {campaign.recipients.toLocaleString()} recipients
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{campaign.openRate}</div>
                        <div className="text-gray-600">Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{campaign.clickRate}</div>
                        <div className="text-gray-600">Click Rate</div>
                      </div>
                      <Button variant="outline" size="sm" data-voice-context={`Edit ${campaign.name} campaign`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.category}</p>
                  <Button className="w-full" variant="outline" data-voice-context={`Use ${template.name} template`}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No draft campaigns</h3>
            <p className="text-gray-600 mb-4">Start creating your first campaign to see it here.</p>
            <Button data-voice-context="Create your first campaign">Create Campaign</Button>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No scheduled campaigns</h3>
            <p className="text-gray-600">Schedule campaigns to send them automatically.</p>
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="space-y-4">
            {campaigns.filter(c => c.status === 'Sent').map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">Sent on {campaign.sent}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{campaign.openRate}</div>
                        <div className="text-gray-600">Opens</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{campaign.clickRate}</div>
                        <div className="text-gray-600">Clicks</div>
                      </div>
                      <Button variant="outline" size="sm" data-voice-context={`View detailed analytics for ${campaign.name}`}>
                        View Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
