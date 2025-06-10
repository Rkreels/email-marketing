
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, Mail, Calendar, Users, TrendingUp, Edit, Trash2, Play, Pause, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Campaign {
  id: number;
  name: string;
  status: 'Draft' | 'Sent' | 'Scheduled' | 'Sending';
  type: 'Regular' | 'A/B Test' | 'Automation';
  sent: string | null;
  recipients: number;
  openRate: string;
  clickRate: string;
  subject: string;
  created: string;
  lastModified: string;
}

export const CampaignsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: 'Monthly Newsletter - January',
      status: 'Sent',
      type: 'Regular',
      sent: '2024-01-15',
      recipients: 1234,
      openRate: '24.5%',
      clickRate: '4.2%',
      subject: 'Your January Newsletter is Here!',
      created: '2024-01-10',
      lastModified: '2024-01-14'
    },
    {
      id: 2,
      name: 'Product Launch Campaign',
      status: 'Draft',
      type: 'Regular',
      sent: null,
      recipients: 0,
      openRate: '-',
      clickRate: '-',
      subject: 'Introducing Our Amazing New Product',
      created: '2024-01-18',
      lastModified: '2024-01-20'
    },
    {
      id: 3,
      name: 'Holiday Sale - Winter Special',
      status: 'Scheduled',
      type: 'Regular',
      sent: '2024-01-25',
      recipients: 2456,
      openRate: '-',
      clickRate: '-',
      subject: '50% OFF Everything - Limited Time!',
      created: '2024-01-19',
      lastModified: '2024-01-21'
    },
    {
      id: 4,
      name: 'Welcome Series A/B Test',
      status: 'Sending',
      type: 'A/B Test',
      sent: '2024-01-22',
      recipients: 500,
      openRate: '28.3%',
      clickRate: '5.1%',
      subject: 'Welcome to Our Community!',
      created: '2024-01-20',
      lastModified: '2024-01-22'
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || campaign.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateCampaign = () => {
    toast({
      title: "Creating New Campaign",
      description: "Redirecting to campaign builder...",
    });
    navigate('/campaigns/create');
  };

  const handleEditCampaign = (campaign: Campaign) => {
    toast({
      title: "Opening Campaign Editor",
      description: `Editing "${campaign.name}"`,
    });
    // In a real app, navigate to edit page with campaign ID
    console.log('Editing campaign:', campaign);
  };

  const handleDuplicateCampaign = (campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Math.max(...campaigns.map(c => c.id)) + 1,
      name: `${campaign.name} (Copy)`,
      status: 'Draft',
      sent: null,
      recipients: 0,
      openRate: '-',
      clickRate: '-',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setCampaigns([...campaigns, newCampaign]);
    toast({
      title: "Campaign Duplicated",
      description: `Created copy of "${campaign.name}"`,
    });
  };

  const handleDeleteCampaign = (campaignId: number) => {
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
    toast({
      title: "Campaign Deleted",
      description: "Campaign has been permanently deleted.",
    });
  };

  const handleSendCampaign = (campaign: Campaign) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id 
        ? { ...c, status: 'Sending' as const, sent: new Date().toISOString().split('T')[0] }
        : c
    );
    setCampaigns(updatedCampaigns);
    toast({
      title: "Campaign Sending",
      description: `"${campaign.name}" is now being sent to ${campaign.recipients || 'selected'} recipients.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Sending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" data-voice-context="Campaigns main page where you manage all your email campaigns">
            Campaigns
          </h1>
          <p className="text-gray-600">Create, manage, and track your email campaigns</p>
        </div>
        <Button 
          onClick={handleCreateCampaign}
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new email campaign using our drag-and-drop editor"
          data-voice-action="Opening campaign creation wizard with templates and design options"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="space-y-6">
        <TabsList>
          <TabsTrigger 
            value="all" 
            data-voice-context="View all campaigns regardless of status"
            data-voice-action="Showing all campaigns in your account"
          >
            All Campaigns ({campaigns.length})
          </TabsTrigger>
          <TabsTrigger 
            value="draft" 
            data-voice-context="View only draft campaigns that haven't been sent yet"
            data-voice-action="Filtering to show only draft campaigns"
          >
            Drafts ({campaigns.filter(c => c.status === 'Draft').length})
          </TabsTrigger>
          <TabsTrigger 
            value="scheduled" 
            data-voice-context="View campaigns scheduled to be sent in the future"
            data-voice-action="Showing scheduled campaigns"
          >
            Scheduled ({campaigns.filter(c => c.status === 'Scheduled').length})
          </TabsTrigger>
          <TabsTrigger 
            value="sent" 
            data-voice-context="View campaigns that have already been sent with performance metrics"
            data-voice-action="Displaying sent campaigns with analytics"
          >
            Sent ({campaigns.filter(c => c.status === 'Sent').length})
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search campaigns by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              data-voice-context="Search through your campaigns by name, subject line, or content"
              data-voice-action="Typing will filter campaigns in real-time"
            />
          </div>
          <Button 
            variant="outline" 
            data-voice-context="Advanced filtering options for campaigns by date, performance, or type"
            data-voice-action="Opening advanced filter panel"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        <TabsContent value={selectedFilter} className="space-y-4">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No campaigns found' : 'No campaigns yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first campaign to get started'}
              </p>
              {!searchTerm && (
                <Button onClick={handleCreateCampaign} data-voice-context="Create your very first email campaign">
                  Create Your First Campaign
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Mail className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{campaign.name}</h3>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                            <Badge variant="outline">{campaign.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Subject: {campaign.subject}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            {campaign.sent && (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {campaign.status === 'Scheduled' ? `Scheduled: ${campaign.sent}` : `Sent: ${campaign.sent}`}
                              </div>
                            )}
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {campaign.recipients > 0 ? `${campaign.recipients.toLocaleString()} recipients` : 'No recipients selected'}
                            </div>
                            <span>Created: {campaign.created}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        {campaign.status === 'Sent' && (
                          <div className="flex space-x-6 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-green-600">{campaign.openRate}</div>
                              <div className="text-gray-600">Open Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-blue-600">{campaign.clickRate}</div>
                              <div className="text-gray-600">Click Rate</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditCampaign(campaign)}
                            data-voice-context={`Edit ${campaign.name} campaign content, design, and settings`}
                            data-voice-action={`Opening editor for ${campaign.name}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDuplicateCampaign(campaign)}
                            data-voice-context={`Create a copy of ${campaign.name} to use as a template`}
                            data-voice-action={`Duplicating ${campaign.name} campaign`}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          
                          {campaign.status === 'Draft' && (
                            <Button 
                              size="sm"
                              onClick={() => handleSendCampaign(campaign)}
                              data-voice-context={`Send ${campaign.name} campaign to selected recipients now`}
                              data-voice-action={`Sending ${campaign.name} to recipients`}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          )}
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                data-voice-context={`Delete ${campaign.name} permanently - this cannot be undone`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Campaign</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete "{campaign.name}"? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleDeleteCampaign(campaign.id)}
                                  data-voice-context="Confirm deletion of this campaign"
                                  data-voice-action="Campaign will be permanently deleted"
                                >
                                  Delete Campaign
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
