
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Mail, DollarSign, BarChart3, Download } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const overviewStats = [
    { 
      title: 'Total Campaigns', 
      value: '124', 
      change: '+12%', 
      icon: Mail,
      description: 'Email campaigns sent this month'
    },
    { 
      title: 'Open Rate', 
      value: '24.5%', 
      change: '+2.1%', 
      icon: TrendingUp,
      description: 'Average open rate across campaigns'
    },
    { 
      title: 'Click Rate', 
      value: '4.2%', 
      change: '+0.8%', 
      icon: BarChart3,
      description: 'Average click-through rate'
    },
    { 
      title: 'Revenue', 
      value: '$12,450', 
      change: '+25%', 
      icon: DollarSign,
      description: 'Revenue attributed to email campaigns'
    }
  ];

  const campaignPerformance = [
    {
      name: 'Monthly Newsletter',
      sent: '2024-01-15',
      recipients: 12450,
      opens: 3045,
      clicks: 523,
      revenue: '$2,100'
    },
    {
      name: 'Product Launch',
      sent: '2024-01-10',
      recipients: 8900,
      opens: 2230,
      clicks: 445,
      revenue: '$3,200'
    },
    {
      name: 'Holiday Sale',
      sent: '2024-01-05',
      recipients: 15600,
      opens: 4200,
      clicks: 680,
      revenue: '$5,800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your email marketing performance and insights</p>
        </div>
        <Button 
          variant="outline"
          data-voice-context="Export analytics data to CSV file"
          data-voice-action="Downloading analytics report"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" data-voice-context="View overall analytics overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns" data-voice-context="View individual campaign performance">Campaign Performance</TabsTrigger>
          <TabsTrigger value="audience" data-voice-context="View audience engagement metrics">Audience Insights</TabsTrigger>
          <TabsTrigger value="revenue" data-voice-context="View revenue and conversion metrics">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat, index) => (
              <Card key={index} data-voice-context={stat.description}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <stat.icon className="h-8 w-8 text-purple-600 mb-2" />
                      <div className="text-sm text-green-600 font-medium">{stat.change}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaign Performance</CardTitle>
              <CardDescription>Your last 30 days of email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignPerformance.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">Sent on {campaign.sent}</p>
                    </div>
                    <div className="flex items-center space-x-8 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{campaign.recipients.toLocaleString()}</div>
                        <div className="text-gray-600">Recipients</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{campaign.opens.toLocaleString()}</div>
                        <div className="text-gray-600">Opens</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{campaign.clicks}</div>
                        <div className="text-gray-600">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{campaign.revenue}</div>
                        <div className="text-gray-600">Revenue</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Details</CardTitle>
              <CardDescription>Detailed metrics for all your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Campaign Name</th>
                      <th className="text-left py-3 px-4">Date Sent</th>
                      <th className="text-left py-3 px-4">Recipients</th>
                      <th className="text-left py-3 px-4">Open Rate</th>
                      <th className="text-left py-3 px-4">Click Rate</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.map((campaign, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{campaign.name}</td>
                        <td className="py-3 px-4">{campaign.sent}</td>
                        <td className="py-3 px-4">{campaign.recipients.toLocaleString()}</td>
                        <td className="py-3 px-4">{((campaign.opens / campaign.recipients) * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4">{((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4 text-green-600 font-semibold">{campaign.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card data-voice-context="Total subscriber growth this month">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-sm text-green-600 font-medium mt-2">+15% vs last month</div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Subscriber engagement level">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                    <p className="text-2xl font-bold text-gray-900">68%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-sm text-green-600 font-medium mt-2">+3% vs last month</div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Number of unsubscribed users">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unsubscribes</p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-sm text-red-600 font-medium mt-2">-2% vs last month</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Audience Engagement Trends</CardTitle>
              <CardDescription>How your audience interacts with your emails over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Engagement Chart</h3>
                <p className="text-gray-600">Interactive engagement charts would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card data-voice-context="Total revenue from email campaigns">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$45,230</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-sm text-green-600 font-medium mt-2">+28% vs last month</div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Average order value from email traffic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">$89.50</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-sm text-green-600 font-medium mt-2">+5% vs last month</div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Return on investment for email campaigns">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email ROI</p>
                    <p className="text-2xl font-bold text-gray-900">3,200%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-sm text-green-600 font-medium mt-2">Industry leading</div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Revenue per email sent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue per Email</p>
                    <p className="text-2xl font-bold text-gray-900">$1.23</p>
                  </div>
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-sm text-green-600 font-medium mt-2">+12% vs last month</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
