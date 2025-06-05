
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Settings, Eye, Timer, Target } from 'lucide-react';

export const PopupsPage: React.FC = () => {
  const [triggerType, setTriggerType] = useState('exit-intent');
  const [delay, setDelay] = useState('5');
  const [showOnMobile, setShowOnMobile] = useState(true);

  const popups = [
    {
      id: 1,
      name: 'Exit Intent Newsletter',
      type: 'Exit Intent',
      status: 'Active',
      views: 5432,
      conversions: 543,
      conversionRate: '10.0%'
    },
    {
      id: 2,
      name: 'Welcome Discount',
      type: 'Time Delay',
      status: 'Paused',
      views: 3210,
      conversions: 289,
      conversionRate: '9.0%'
    }
  ];

  const triggerOptions = [
    { value: 'exit-intent', label: 'Exit Intent' },
    { value: 'time-delay', label: 'Time Delay' },
    { value: 'scroll', label: 'Scroll Percentage' },
    { value: 'page-views', label: 'Page Views' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pop-ups</h1>
          <p className="text-gray-600">Create targeted pop-ups to capture subscribers</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new pop-up campaign"
          data-voice-action="Opening pop-up builder"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Pop-up
        </Button>
      </div>

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList>
          <TabsTrigger value="builder" data-voice-context="Build and customize your pop-up">Pop-up Builder</TabsTrigger>
          <TabsTrigger value="existing" data-voice-context="View all existing pop-ups">My Pop-ups</TabsTrigger>
          <TabsTrigger value="targeting" data-voice-context="Set up targeting and trigger rules">Targeting</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pop-up Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Pop-up Settings</CardTitle>
                <CardDescription>Configure your pop-up behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="trigger">Trigger Type</Label>
                  <Select value={triggerType} onValueChange={setTriggerType}>
                    <SelectTrigger data-voice-context="Select when the pop-up should appear">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {triggerType === 'time-delay' && (
                  <div>
                    <Label htmlFor="delay">Delay (seconds)</Label>
                    <Input
                      id="delay"
                      value={delay}
                      onChange={(e) => setDelay(e.target.value)}
                      type="number"
                      data-voice-context="Set delay in seconds before pop-up appears"
                    />
                  </div>
                )}

                {triggerType === 'scroll' && (
                  <div>
                    <Label htmlFor="scroll">Scroll Percentage</Label>
                    <Input
                      id="scroll"
                      placeholder="50"
                      type="number"
                      data-voice-context="Set scroll percentage to trigger pop-up"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Label htmlFor="mobile">Show on Mobile</Label>
                  <Switch
                    id="mobile"
                    checked={showOnMobile}
                    onCheckedChange={setShowOnMobile}
                    data-voice-context="Toggle whether to show pop-up on mobile devices"
                  />
                </div>

                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select defaultValue="once-per-session">
                    <SelectTrigger data-voice-context="Set how often to show the pop-up">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once-per-session">Once per session</SelectItem>
                      <SelectItem value="once-per-day">Once per day</SelectItem>
                      <SelectItem value="every-visit">Every visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pop-up Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>See how your pop-up will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border rounded-lg p-6 bg-gray-50 min-h-[300px] flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                    <h3 className="text-xl font-semibold mb-2">Special Offer!</h3>
                    <p className="text-gray-600 mb-4">
                      Get 20% off your first purchase when you subscribe to our newsletter.
                    </p>
                    <div className="space-y-3">
                      <Input placeholder="Enter your email" type="email" />
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Claim Discount
                      </Button>
                      <button className="text-sm text-gray-500 hover:text-gray-700 w-full">
                        No thanks, I'll pay full price
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" data-voice-context="Preview pop-up behavior">
              <Eye className="h-4 w-4 mr-2" />
              Test Pop-up
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" data-voice-context="Save and activate pop-up">
              Save & Activate
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="existing" className="space-y-4">
          <div className="grid gap-4">
            {popups.map((popup) => (
              <Card key={popup.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Target className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{popup.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            popup.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {popup.status}
                          </span>
                          <span>Type: {popup.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{popup.views.toLocaleString()}</div>
                        <div className="text-gray-600">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{popup.conversions}</div>
                        <div className="text-gray-600">Conversions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{popup.conversionRate}</div>
                        <div className="text-gray-600">Rate</div>
                      </div>
                      <Button variant="outline" size="sm" data-voice-context={`Edit ${popup.name} pop-up`}>
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="targeting">
          <Card>
            <CardHeader>
              <CardTitle>Targeting Rules</CardTitle>
              <CardDescription>Define when and where your pop-ups should appear</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Page Rules</Label>
                  <Select defaultValue="all-pages">
                    <SelectTrigger data-voice-context="Select which pages to show pop-up on">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-pages">All pages</SelectItem>
                      <SelectItem value="specific-pages">Specific pages</SelectItem>
                      <SelectItem value="homepage">Homepage only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Visitor Type</Label>
                  <Select defaultValue="all-visitors">
                    <SelectTrigger data-voice-context="Target specific types of visitors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-visitors">All visitors</SelectItem>
                      <SelectItem value="new-visitors">New visitors only</SelectItem>
                      <SelectItem value="returning-visitors">Returning visitors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Device Type</Label>
                  <Select defaultValue="all-devices">
                    <SelectTrigger data-voice-context="Target specific device types">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-devices">All devices</SelectItem>
                      <SelectItem value="desktop">Desktop only</SelectItem>
                      <SelectItem value="mobile">Mobile only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Geographic Location</Label>
                  <Select defaultValue="worldwide">
                    <SelectTrigger data-voice-context="Target visitors from specific locations">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worldwide">Worldwide</SelectItem>
                      <SelectItem value="us-only">United States only</SelectItem>
                      <SelectItem value="custom">Custom regions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-purple-600 hover:bg-purple-700" data-voice-context="Save targeting settings">
                  Save Targeting Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
