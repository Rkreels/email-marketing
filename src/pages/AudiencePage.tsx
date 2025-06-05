
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Upload, Tag, Filter, Search, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const AudiencePage: React.FC = () => {
  const audienceStats = [
    { label: 'Total Contacts', value: '2,456', change: '+12%', icon: Users },
    { label: 'Subscribed', value: '2,234', change: '+8%', icon: Mail },
    { label: 'Unsubscribed', value: '222', change: '+2%', icon: Users },
    { label: 'Segments', value: '8', change: '+1', icon: Tag }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audience</h1>
          <p className="text-gray-600">Manage your contacts, segments, and subscriber preferences</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" data-voice-context="Import contacts from a file">
            <Upload className="h-4 w-4 mr-2" />
            Import Contacts
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" data-voice-context="Add a new contact manually">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {audienceStats.map((stat, index) => (
          <Card key={index} data-voice-context={`${stat.label}: ${stat.value}, ${stat.change} change`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="text-sm text-green-600 font-medium">{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard" data-voice-context="View audience overview dashboard">Audience Dashboard</TabsTrigger>
          <TabsTrigger value="tags" data-voice-context="Manage contact tags">Tags</TabsTrigger>
          <TabsTrigger value="segments" data-voice-context="Create and manage segments">Segments</TabsTrigger>
          <TabsTrigger value="surveys" data-voice-context="Create surveys for your audience">Surveys</TabsTrigger>
          <TabsTrigger value="preferences" data-voice-context="Manage subscriber preferences">Subscriber Preferences</TabsTrigger>
          <TabsTrigger value="inbox" data-voice-context="View subscriber communications">Inbox</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest subscriber actions and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">25 new subscribers joined</p>
                      <p className="text-sm text-gray-600">From signup form on website</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">3 contacts unsubscribed</p>
                      <p className="text-sm text-gray-600">From newsletter campaign</p>
                    </div>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Segments</h2>
              <Button data-voice-context="Create a new audience segment">
                <Plus className="h-4 w-4 mr-2" />
                Create Segment
              </Button>
            </div>
            <div className="text-center py-12">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No segments yet</h3>
              <p className="text-gray-600 mb-4">Create segments to target specific groups of subscribers.</p>
              <Button data-voice-context="Create your first audience segment">Create First Segment</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tags">
          <div className="text-center py-12">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Organize with Tags</h3>
            <p className="text-gray-600">Add tags to organize and categorize your contacts.</p>
          </div>
        </TabsContent>

        <TabsContent value="surveys">
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Surveys</h3>
            <p className="text-gray-600">Gather feedback and insights from your audience.</p>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscriber Preferences</h3>
            <p className="text-gray-600">Let subscribers manage their communication preferences.</p>
          </div>
        </TabsContent>

        <TabsContent value="inbox">
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscriber Inbox</h3>
            <p className="text-gray-600">View and respond to subscriber messages.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
