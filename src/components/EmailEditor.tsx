import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DragDropEmailBuilder } from './DragDropEmailBuilder';
import { 
  Type, Image, Link, Palette, Layout, AlignLeft, AlignCenter, 
  Bold, Italic, Underline, Save, Eye, Smartphone, Monitor, Tablet, Layers 
} from 'lucide-react';

interface EmailEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave: (content: string) => void;
}

export const EmailEditor: React.FC<EmailEditorProps> = ({ 
  isOpen, 
  onClose, 
  initialContent = '', 
  onSave 
}) => {
  const [content, setContent] = useState(initialContent);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragDropOpen, setIsDragDropOpen] = useState(false);

  const elements = [
    { id: 'text', name: 'Text Block', icon: Type, description: 'Add headlines and paragraphs' },
    { id: 'image', name: 'Image', icon: Image, description: 'Insert photos and graphics' },
    { id: 'button', name: 'Button', icon: Link, description: 'Add call-to-action buttons' },
    { id: 'divider', name: 'Divider', icon: AlignCenter, description: 'Separate content sections' },
    { id: 'social', name: 'Social Links', icon: Link, description: 'Add social media icons' },
    { id: 'footer', name: 'Footer', icon: AlignLeft, description: 'Contact info and unsubscribe' }
  ];

  const templates = [
    { id: 1, name: 'Newsletter', preview: 'Modern newsletter layout with header, content blocks, and footer' },
    { id: 2, name: 'Promotional', preview: 'Eye-catching design for sales and special offers' },
    { id: 3, name: 'Welcome', preview: 'Warm welcome message for new subscribers' },
    { id: 4, name: 'Product Launch', preview: 'Showcase new products with compelling visuals' }
  ];

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  const addElement = (elementType: string) => {
    const elementContent = {
      text: '<h2>Your Headline Here</h2><p>Add your content here...</p>',
      image: '<img src="https://via.placeholder.com/400x200" alt="Your image" style="width: 100%; height: auto;" />',
      button: '<a href="#" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Call to Action</a>',
      divider: '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />',
      social: '<div style="text-align: center; margin: 20px 0;"><a href="#" style="margin: 0 10px;">Facebook</a><a href="#" style="margin: 0 10px;">Twitter</a><a href="#" style="margin: 0 10px;">Instagram</a></div>',
      footer: '<div style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 40px;"><p>Your Company Name<br>123 Main St, City, State 12345</p><p><a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a></p></div>'
    };

    setContent(prev => prev + '\n' + elementContent[elementType as keyof typeof elementContent]);
  };

  const applyTemplate = (templateId: number) => {
    const templateContent = {
      1: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <header style="background: #3B82F6; color: white; padding: 20px; text-align: center;">
    <h1>Newsletter Title</h1>
  </header>
  <main style="padding: 20px;">
    <h2>Welcome to our newsletter!</h2>
    <p>This is where your main content goes. You can add multiple paragraphs, images, and more.</p>
    <a href="#" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Read More</a>
  </main>
  <footer style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px;">
    <p>© 2024 Your Company. All rights reserved.</p>
    <p><a href="#">Unsubscribe</a></p>
  </footer>
</div>`,
      2: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <div style="padding: 40px 20px; text-align: center; color: white;">
    <h1 style="font-size: 32px; margin-bottom: 10px;">Special Offer!</h1>
    <h2 style="font-size: 24px; margin-bottom: 20px;">50% Off Everything</h2>
    <p style="font-size: 18px; margin-bottom: 30px;">Limited time offer. Don't miss out!</p>
    <a href="#" style="background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px;">Shop Now</a>
  </div>
</div>`,
      3: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="padding: 40px 20px; text-align: center;">
    <h1 style="color: #10b981; font-size: 28px;">Welcome!</h1>
    <p style="font-size: 18px; color: #374151;">We're excited to have you join our community.</p>
    <div style="margin: 30px 0;">
      <img src="https://via.placeholder.com/400x200" alt="Welcome" style="width: 100%; max-width: 400px; height: auto;" />
    </div>
    <p>Here's what you can expect from us:</p>
    <ul style="text-align: left; display: inline-block;">
      <li>Weekly tips and insights</li>
      <li>Exclusive offers and discounts</li>
      <li>Early access to new features</li>
    </ul>
    <a href="#" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px;">Get Started</a>
  </div>
</div>`,
      4: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="text-align: center; padding: 20px;">
    <h1 style="color: #1f2937;">Introducing Our Latest Product</h1>
    <div style="margin: 20px 0;">
      <img src="https://via.placeholder.com/500x300" alt="New Product" style="width: 100%; max-width: 500px; height: auto;" />
    </div>
    <h2 style="color: #3B82F6;">Revolutionary Innovation</h2>
    <p style="font-size: 16px; line-height: 1.6;">Experience the future with our groundbreaking new product. Designed with you in mind.</p>
    <div style="margin: 30px 0;">
      <a href="#" style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-size: 18px; margin: 0 10px;">Pre-order Now</a>
      <a href="#" style="background: white; color: #3B82F6; border: 2px solid #3B82F6; padding: 13px 28px; text-decoration: none; border-radius: 4px; font-size: 18px; margin: 0 10px;">Learn More</a>
    </div>
  </div>
</div>`
    };

    setContent(templateContent[templateId as keyof typeof templateContent] || '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Email Editor</h3>
              <p className="text-sm text-gray-600">Drag and drop elements to build your email</p>
            </div>

            <Tabs defaultValue="elements" className="w-full">
              <TabsList className="grid w-full grid-cols-3 m-4">
                <TabsTrigger value="elements" className="text-xs">Elements</TabsTrigger>
                <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="elements" className="px-4">
                <div className="space-y-2">
                  {elements.map((element) => (
                    <Card 
                      key={element.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => addElement(element.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <element.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-sm">{element.name}</h4>
                            <p className="text-xs text-gray-500">{element.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="px-4">
                <div className="space-y-3">
                  {templates.map((template) => (
                    <Card 
                      key={template.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => applyTemplate(template.id)}
                    >
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm mb-1">{template.name}</h4>
                        <p className="text-xs text-gray-500">{template.preview}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="px-4 space-y-4">
                <div>
                  <Label htmlFor="bgColor">Background Color</Label>
                  <Input id="bgColor" type="color" defaultValue="#ffffff" />
                </div>
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <Input id="textColor" type="color" defaultValue="#000000" />
                </div>
                <div>
                  <Label htmlFor="linkColor">Link Color</Label>
                  <Input id="linkColor" type="color" defaultValue="#3B82F6" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsDragDropOpen(true)}
                >
                  <Layers className="h-4 w-4 mr-1" />
                  Drag & Drop
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-2" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                      document.execCommand('bold', false);
                    }
                  }}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                      document.execCommand('italic', false);
                    }
                  }}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                      document.execCommand('underline', false);
                    }
                  }}
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-2" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                      document.execCommand('justifyLeft', false);
                    }
                  }}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection && selection.rangeCount > 0) {
                      document.execCommand('justifyCenter', false);
                    }
                  }}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 rounded p-1">
                  <Button 
                    variant={previewMode === 'desktop' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={previewMode === 'tablet' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('tablet')}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={previewMode === 'mobile' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (content) {
                      const previewWindow = window.open('', '_blank');
                      if (previewWindow) {
                        previewWindow.document.write(`
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <title>Email Preview</title>
                              <meta charset="utf-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                            </head>
                            <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
                              <div style="max-width: 600px; margin: 0 auto; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                ${content}
                              </div>
                            </body>
                          </html>
                        `);
                        previewWindow.document.close();
                      }
                    }
                  }}
                  disabled={!content}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-4 overflow-auto bg-gray-100">
              <div className={`mx-auto bg-white shadow-lg ${
                previewMode === 'mobile' ? 'max-w-sm' : 
                previewMode === 'tablet' ? 'max-w-md' : 'max-w-2xl'
              }`}>
                <div
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: content }}
                  onInput={(e) => setContent(e.currentTarget.innerHTML)}
                  className="w-full h-full min-h-96 border-0 resize-none text-sm p-4 focus:outline-none"
                  style={{ minHeight: '400px' }}
                  data-placeholder="Start building your email... Use the elements panel or templates to get started."
                />
                
                {/* Preview */}
                {content && (
                  <div className="border-t p-4">
                    <h4 className="font-medium mb-2">Live Preview:</h4>
                    <div 
                      className="border rounded p-4 bg-white"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Drag & Drop Email Builder */}
        <DragDropEmailBuilder
          isOpen={isDragDropOpen}
          onClose={() => setIsDragDropOpen(false)}
          initialContent={content}
          onSave={(jsonContent, htmlContent) => {
            setContent(htmlContent);
            onSave(htmlContent);
            setIsDragDropOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};