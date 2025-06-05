
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ShoppingCart, Heart, Gift, Calendar, Mail } from 'lucide-react';

export const PrebuiltJourneysPage: React.FC = () => {
  const journeys = [
    {
      id: 1,
      name: 'Welcome New Subscribers',
      description: 'Onboard new subscribers with a 5-email welcome series',
      category: 'Welcome',
      icon: Heart,
      emails: 5,
      duration: '7 days',
      usage: 'Popular'
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      description: 'Recover lost sales with targeted cart abandonment emails',
      category: 'E-commerce',
      icon: ShoppingCart,
      emails: 3,
      duration: '3 days',
      usage: 'High Converting'
    },
    {
      id: 3,
      name: 'Birthday Campaign',
      description: 'Send personalized birthday wishes and special offers',
      category: 'Seasonal',
      icon: Gift,
      emails: 1,
      duration: 'Annual',
      usage: 'Engaging'
    },
    {
      id: 4,
      name: 'Win-Back Campaign',
      description: 'Re-engage inactive subscribers',
      category: 'Re-engagement',
      icon: Users,
      emails: 4,
      duration: '14 days',
      usage: 'Effective'
    },
    {
      id: 5,
      name: 'Product Launch Series',
      description: 'Build excitement for new product launches',
      category: 'Promotional',
      icon: Mail,
      emails: 6,
      duration: '10 days',
      usage: 'Results-Driven'
    },
    {
      id: 6,
      name: 'Event Reminder Series',
      description: 'Ensure maximum attendance with reminder emails',
      category: 'Events',
      icon: Calendar,
      emails: 3,
      duration: '7 days',
      usage: 'Reliable'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pre-built Journeys</h1>
        <p className="text-gray-600">Choose from proven email automation templates to get started quickly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journeys.map((journey) => (
          <Card key={journey.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <journey.icon className="h-8 w-8 text-purple-600" />
                <Badge variant="secondary">{journey.usage}</Badge>
              </div>
              <CardTitle className="text-lg">{journey.name}</CardTitle>
              <CardDescription>{journey.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>{journey.emails} emails</span>
                <span>{journey.duration}</span>
              </div>
              <div className="space-y-2">
                <Button 
                  className="w-full"
                  data-voice-context={`Use ${journey.name} automation template`}
                  data-voice-action={`Setting up ${journey.name} journey`}
                >
                  Use This Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  data-voice-context={`Preview the ${journey.name} email sequence`}
                >
                  Preview Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8" data-voice-context="Learn about automation best practices">
        <CardHeader>
          <CardTitle>Getting Started with Automations</CardTitle>
          <CardDescription>Tips for successful email automation</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">1. Choose Your Goal</h4>
            <p className="text-sm text-gray-600">Define what you want to achieve with your automation.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">2. Segment Your Audience</h4>
            <p className="text-sm text-gray-600">Target the right people with relevant messages.</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">3. Test and Optimize</h4>
            <p className="text-sm text-gray-600">Monitor performance and make improvements.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
