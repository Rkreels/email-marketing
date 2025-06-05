
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Zap, Users, Mail, Timer, ArrowRight } from 'lucide-react';

export const AutomationsPage: React.FC = () => {
  const journeys = [
    {
      id: 1,
      name: 'Welcome Series',
      status: 'Active',
      trigger: 'New Subscriber',
      emails: 3,
      subscribers: 156,
      performance: '89% completion'
    },
    {
      id: 2,
      name: 'Abandoned Cart',
      status: 'Draft',
      trigger: 'Cart Abandonment',
      emails: 2,
      subscribers: 0,
      performance: '-'
    }
  ];

  const prebuiltJourneys = [
    {
      name: 'Welcome New Subscribers',
      description: 'Introduce new subscribers to your brand',
      emails: 3,
      category: 'Welcome',
      icon: Users
    },
    {
      name: 'Abandoned Cart Recovery',
      description: 'Win back customers who left items in cart',
      emails: 2,
      category: 'E-commerce',
      icon: Timer
    },
    {
      name: 'Birthday Campaign',
      description: 'Send personalized birthday offers',
      emails: 1,
      category: 'Engagement',
      icon: Mail
    },
    {
      name: 'Re-engagement Series',
      description: 'Win back inactive subscribers',
      emails: 4,
      category: 'Retention',
      icon: Zap
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automations</h1>
          <p className="text-gray-600">Create automated email journeys to engage your audience</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new automation journey"
          data-voice-action="Opening automation builder"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Journey
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-voice-context="View all automation journeys">All Journeys</TabsTrigger>
          <TabsTrigger value="prebuilt" data-voice-context="Browse pre-built automation templates">Pre-built Journeys</TabsTrigger>
          <TabsTrigger value="transactional" data-voice-context="Manage transactional emails">Transactional Email</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {journeys.map((journey) => (
              <Card key={journey.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Zap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{journey.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            journey.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {journey.status}
                          </span>
                          <span>Trigger: {journey.trigger}</span>
                          <span>{journey.emails} emails</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{journey.subscribers}</div>
                        <div className="text-gray-600">Active Subscribers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{journey.performance}</div>
                        <div className="text-gray-600">Performance</div>
                      </div>
                      <Button variant="outline" size="sm" data-voice-context={`Edit ${journey.name} automation`}>
                        Edit Journey
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prebuilt" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pre-built Journeys</h2>
            <p className="text-gray-600">Start with proven automation templates and customize them for your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prebuiltJourneys.map((journey, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <journey.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{journey.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {journey.category} • {journey.emails} emails
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{journey.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Ready to customize</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Use ${journey.name} template`}
                      data-voice-action={`Setting up ${journey.name} automation`}
                    >
                      Use Template
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactional">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Transactional Emails</h2>
              <p className="text-gray-600">Set up automated emails triggered by customer actions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-green-100 p-3 rounded-lg w-fit">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Order Confirmation</CardTitle>
                  <CardDescription>Confirm successful purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" data-voice-context="Set up order confirmation emails">
                    Set Up
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-lg w-fit">
                    <Timer className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Shipping Updates</CardTitle>
                  <CardDescription>Keep customers informed about delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" data-voice-context="Set up shipping notification emails">
                    Set Up
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-orange-100 p-3 rounded-lg w-fit">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Password Reset</CardTitle>
                  <CardDescription>Help users reset their passwords securely</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" data-voice-context="Set up password reset emails">
                    Set Up
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
