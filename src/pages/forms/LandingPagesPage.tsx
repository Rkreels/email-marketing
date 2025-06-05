
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Globe, Palette, BarChart3 } from 'lucide-react';

export const LandingPagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      name: 'Lead Magnet',
      description: 'Perfect for offering free resources',
      category: 'Lead Generation',
      conversions: '15.2%',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Product Launch',
      description: 'Announce new products with impact',
      category: 'Product',
      conversions: '12.8%',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Event Registration',
      description: 'Drive event signups and engagement',
      category: 'Events',
      conversions: '18.5%',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'Newsletter Signup',
      description: 'Build your subscriber list effectively',
      category: 'Newsletter',
      conversions: '11.3%',
      preview: '/api/placeholder/300/200'
    }
  ];

  const myPages = [
    {
      id: 1,
      name: 'Free eBook Download',
      status: 'Published',
      visitors: 2456,
      conversions: 245,
      conversionRate: '9.97%',
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      name: 'Webinar Registration',
      status: 'Draft',
      visitors: 0,
      conversions: 0,
      conversionRate: '0%',
      lastModified: '2024-01-10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
          <p className="text-gray-600">Create high-converting landing pages for your campaigns</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new landing page from templates"
          data-voice-action="Opening landing page builder"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Landing Page
        </Button>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates" data-voice-context="Browse landing page templates">Templates</TabsTrigger>
          <TabsTrigger value="pages" data-voice-context="View your existing landing pages">My Pages</TabsTrigger>
          <TabsTrigger value="analytics" data-voice-context="View landing page performance metrics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="mb-6">
            <div className="relative">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
                data-voice-context="Search through available landing page templates"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                    <Globe className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {template.name}
                    <Badge variant="secondary">{template.category}</Badge>
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">Avg. Conversion</span>
                    <span className="font-semibold text-green-600">{template.conversions}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      data-voice-context={`Use ${template.name} template for your landing page`}
                      data-voice-action={`Selected ${template.name} template`}
                    >
                      Use Template
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      data-voice-context={`Preview ${template.name} template`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <div className="grid gap-4">
            {myPages.map((page) => (
              <Card key={page.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Globe className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{page.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            page.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {page.status}
                          </span>
                          <span>Last modified: {page.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{page.visitors.toLocaleString()}</div>
                        <div className="text-gray-600">Visitors</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{page.conversions}</div>
                        <div className="text-gray-600">Conversions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{page.conversionRate}</div>
                        <div className="text-gray-600">Rate</div>
                      </div>
                      <Button variant="outline" size="sm" data-voice-context={`Edit ${page.name} landing page`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card data-voice-context="Total page views across all landing pages">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900">12,456</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">+22%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Total conversions from landing pages">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversions</p>
                    <p className="text-2xl font-bold text-gray-900">1,245</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">+18%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Average conversion rate across pages">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Rate</p>
                    <p className="text-2xl font-bold text-gray-900">10.0%</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">+1.2%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Number of published landing pages">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Pages</p>
                    <p className="text-2xl font-bold text-gray-900">6</p>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">+1</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
