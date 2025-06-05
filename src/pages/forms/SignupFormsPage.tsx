
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Eye, Code, Settings, Users, BarChart3 } from 'lucide-react';

export const SignupFormsPage: React.FC = () => {
  const [formTitle, setFormTitle] = useState('Join Our Newsletter');
  const [formDescription, setFormDescription] = useState('Get the latest updates and offers directly to your inbox.');
  const [buttonText, setButtonText] = useState('Subscribe');
  const [showName, setShowName] = useState(true);
  const [isRequired, setIsRequired] = useState(true);

  const existingForms = [
    {
      id: 1,
      name: 'Newsletter Signup',
      type: 'Embedded',
      subscribers: 245,
      conversionRate: '12.3%',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Product Updates',
      type: 'Pop-up',
      subscribers: 89,
      conversionRate: '8.7%',
      status: 'Draft'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Signup Forms</h1>
          <p className="text-gray-600">Create forms to capture new subscribers</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new signup form to capture subscribers"
          data-voice-action="Opening form builder"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList>
          <TabsTrigger value="builder" data-voice-context="Build and customize your signup form">Form Builder</TabsTrigger>
          <TabsTrigger value="existing" data-voice-context="View all existing signup forms">My Forms</TabsTrigger>
          <TabsTrigger value="analytics" data-voice-context="View form performance analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
                <CardDescription>Customize your signup form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Form Title</Label>
                  <Input
                    id="title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    data-voice-context="Edit the main heading of your signup form"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    data-voice-context="Edit the description text for your form"
                  />
                </div>

                <div>
                  <Label htmlFor="button">Button Text</Label>
                  <Input
                    id="button"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    data-voice-context="Customize the submit button text"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-name">Include Name Field</Label>
                  <Switch
                    id="show-name"
                    checked={showName}
                    onCheckedChange={setShowName}
                    data-voice-context="Toggle whether to include a name field in the form"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="required">Email Required</Label>
                  <Switch
                    id="required"
                    checked={isRequired}
                    onCheckedChange={setIsRequired}
                    data-voice-context="Make email field required or optional"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your form will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">{formTitle}</h3>
                  <p className="text-gray-600 mb-4">{formDescription}</p>
                  
                  <div className="space-y-4">
                    {showName && (
                      <div>
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                      </div>
                    )}
                    <div>
                      <Label>Email {isRequired && '*'}</Label>
                      <Input placeholder="Enter your email" type="email" />
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      {buttonText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" data-voice-context="Preview form in a new window">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" data-voice-context="Get embed code for your website">
              <Code className="h-4 w-4 mr-2" />
              Get Code
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" data-voice-context="Save and publish your signup form">
              Save Form
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="existing" className="space-y-4">
          <div className="grid gap-4">
            {existingForms.map((form) => (
              <Card key={form.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{form.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            form.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {form.status}
                          </span>
                          <span>Type: {form.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{form.subscribers}</div>
                        <div className="text-gray-600">Subscribers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{form.conversionRate}</div>
                        <div className="text-gray-600">Conversion</div>
                      </div>
                      <Button variant="outline" size="sm" data-voice-context={`Edit ${form.name} signup form`}>
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

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card data-voice-context="Total form submissions across all forms">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">+15%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Average conversion rate across all forms">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">10.5%</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">+2.1%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Number of active signup forms">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Forms</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">+2</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
