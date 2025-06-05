
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Mail, BarChart3, Plus } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create Campaign',
      description: 'Design and send email campaigns',
      icon: Mail,
      action: () => navigate('/campaigns/create'),
      context: 'Create a new email campaign with our drag-and-drop editor'
    },
    {
      title: 'Build Automation',
      description: 'Set up automated email journeys',
      icon: TrendingUp,
      action: () => navigate('/automations/create'),
      context: 'Create automated email sequences to engage your audience'
    },
    {
      title: 'Create Form',
      description: 'Capture new subscribers',
      icon: Plus,
      action: () => navigate('/forms/create'),
      context: 'Design signup forms to grow your audience'
    },
    {
      title: 'View Analytics',
      description: 'Track your performance',
      icon: BarChart3,
      action: () => navigate('/analytics'),
      context: 'View detailed reports on your email campaign performance'
    }
  ];

  const stats = [
    { label: 'Total Campaigns', value: '24', change: '+12%' },
    { label: 'Total Subscribers', value: '1,234', change: '+8%' },
    { label: 'Open Rate', value: '23.5%', change: '+2.1%' },
    { label: 'Click Rate', value: '4.2%', change: '+0.8%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your campaigns and audience.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={action.action}
              data-voice-context={action.context}
              data-voice-action={`Navigating to ${action.title.toLowerCase()}`}
            >
              <CardHeader className="text-center pb-4">
                <action.icon className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest campaigns and automations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Welcome Series Automation</p>
                <p className="text-sm text-gray-600">3 new subscribers entered</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Monthly Newsletter</p>
                <p className="text-sm text-gray-600">Sent to 1,234 subscribers</p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Product Launch Campaign</p>
                <p className="text-sm text-gray-600">Draft saved</p>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
