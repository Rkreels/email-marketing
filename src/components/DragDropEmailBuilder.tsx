import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Type, 
  Image, 
  Link, 
  Palette, 
  Layout, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Bold, 
  Italic, 
  Underline, 
  Save, 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet,
  Trash2,
  Copy,
  Move,
  Plus
} from 'lucide-react';

interface EmailElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'social' | 'header' | 'footer';
  content: any;
  styles: any;
}

interface DragDropEmailBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave: (content: string, html: string) => void;
}

export const DragDropEmailBuilder: React.FC<DragDropEmailBuilderProps> = ({ 
  isOpen, 
  onClose, 
  initialContent = '', 
  onSave 
}) => {
  const [elements, setElements] = useState<EmailElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);

  const elementLibrary = [
    {
      type: 'header',
      name: 'Header',
      icon: Layout,
      description: 'Email header with logo',
      defaultContent: {
        logoUrl: 'https://via.placeholder.com/200x60?text=LOGO',
        backgroundColor: '#ffffff',
        padding: '20px'
      }
    },
    {
      type: 'text',
      name: 'Text Block',
      icon: Type,
      description: 'Headlines and paragraphs',
      defaultContent: {
        text: '<h2>Your Headline Here</h2><p>Add your content here. You can format text, add links, and more.</p>',
        fontSize: '16px',
        color: '#333333',
        alignment: 'left'
      }
    },
    {
      type: 'image',
      name: 'Image',
      icon: Image,
      description: 'Photos and graphics',
      defaultContent: {
        src: 'https://via.placeholder.com/600x300?text=Your+Image',
        alt: 'Image description',
        width: '100%',
        alignment: 'center'
      }
    },
    {
      type: 'button',
      name: 'Button',
      icon: Link,
      description: 'Call-to-action buttons',
      defaultContent: {
        text: 'Call to Action',
        url: '#',
        backgroundColor: '#007bff',
        textColor: '#ffffff',
        borderRadius: '4px',
        padding: '12px 24px',
        alignment: 'center'
      }
    },
    {
      type: 'divider',
      name: 'Divider',
      icon: AlignCenter,
      description: 'Separate content sections',
      defaultContent: {
        style: 'solid',
        color: '#e5e7eb',
        thickness: '1px',
        margin: '20px 0'
      }
    },
    {
      type: 'spacer',
      name: 'Spacer',
      icon: Layout,
      description: 'Add space between elements',
      defaultContent: {
        height: '20px'
      }
    },
    {
      type: 'social',
      name: 'Social Links',
      icon: Link,
      description: 'Social media icons',
      defaultContent: {
        platforms: ['facebook', 'twitter', 'instagram', 'linkedin'],
        iconSize: '32px',
        spacing: '10px',
        alignment: 'center'
      }
    },
    {
      type: 'footer',
      name: 'Footer',
      icon: AlignLeft,
      description: 'Contact info and unsubscribe',
      defaultContent: {
        companyName: 'Your Company Name',
        address: '123 Main St, City, State 12345',
        backgroundColor: '#f8f9fa',
        textColor: '#6c757d',
        fontSize: '12px'
      }
    }
  ];

  const addElement = (elementType: string) => {
    const elementDef = elementLibrary.find(el => el.type === elementType);
    if (!elementDef) return;

    const newElement: EmailElement = {
      id: `element-${Date.now()}`,
      type: elementType as any,
      content: elementDef.defaultContent,
      styles: {}
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<EmailElement>) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  };

  const removeElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    const newElement = {
      ...element,
      id: `element-${Date.now()}`
    };

    const index = elements.findIndex(el => el.id === elementId);
    const newElements = [...elements];
    newElements.splice(index + 1, 0, newElement);
    setElements(newElements);
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    const index = elements.findIndex(el => el.id === elementId);
    if (index === -1) return;

    const newElements = [...elements];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < elements.length) {
      [newElements[index], newElements[targetIndex]] = [newElements[targetIndex], newElements[index]];
      setElements(newElements);
    }
  };

  const generateHTML = () => {
    let html = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff;">
    `;

    elements.forEach(element => {
      switch (element.type) {
        case 'header':
          html += `
            <div style="background-color: ${element.content.backgroundColor}; padding: ${element.content.padding}; text-align: center;">
              <img src="${element.content.logoUrl}" alt="Logo" style="max-height: 60px;" />
            </div>
          `;
          break;
        case 'text':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              <div style="color: ${element.content.color}; font-size: ${element.content.fontSize};">
                ${element.content.text}
              </div>
            </div>
          `;
          break;
        case 'image':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              <img src="${element.content.src}" alt="${element.content.alt}" style="width: ${element.content.width}; height: auto;" />
            </div>
          `;
          break;
        case 'button':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              <a href="${element.content.url}" style="
                background-color: ${element.content.backgroundColor}; 
                color: ${element.content.textColor}; 
                padding: ${element.content.padding}; 
                text-decoration: none; 
                border-radius: ${element.content.borderRadius};
                display: inline-block;
              ">
                ${element.content.text}
              </a>
            </div>
          `;
          break;
        case 'divider':
          html += `
            <div style="padding: 0 20px;">
              <hr style="
                border: none; 
                border-top: ${element.content.thickness} ${element.content.style} ${element.content.color}; 
                margin: ${element.content.margin};
              " />
            </div>
          `;
          break;
        case 'spacer':
          html += `<div style="height: ${element.content.height};"></div>`;
          break;
        case 'social':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              ${element.content.platforms.map((platform: string) => `
                <a href="#" style="margin: 0 ${element.content.spacing};">
                  <img src="https://via.placeholder.com/${element.content.iconSize}?text=${platform.charAt(0).toUpperCase()}" 
                       alt="${platform}" 
                       style="width: ${element.content.iconSize}; height: ${element.content.iconSize};" />
                </a>
              `).join('')}
            </div>
          `;
          break;
        case 'footer':
          html += `
            <div style="
              background-color: ${element.content.backgroundColor}; 
              color: ${element.content.textColor}; 
              font-size: ${element.content.fontSize}; 
              padding: 30px 20px; 
              text-align: center;
            ">
              <p style="margin: 0 0 10px 0;">${element.content.companyName}</p>
              <p style="margin: 0 0 15px 0;">${element.content.address}</p>
              <p style="margin: 0;">
                <a href="#" style="color: ${element.content.textColor};">Unsubscribe</a> | 
                <a href="#" style="color: ${element.content.textColor};">Update Preferences</a>
              </p>
            </div>
          `;
          break;
      }
    });

    html += '</div>';
    return html;
  };

  const handleSave = () => {
    const html = generateHTML();
    onSave(JSON.stringify(elements), html);
    toast({
      title: "Email Saved",
      description: "Your email design has been saved successfully",
    });
    onClose();
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0">
        <div className="flex h-full">
          {/* Left Sidebar - Elements Library */}
          <div className="w-64 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Elements</h3>
              <p className="text-sm text-gray-600">Drag elements to your email</p>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {elementLibrary.map((element) => (
                  <Card 
                    key={element.type} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addElement(element.type)}
                    draggable
                    onDragStart={() => setDraggedElement(element.type)}
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
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
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
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 p-4 overflow-auto bg-gray-100">
              <div className={`mx-auto bg-white shadow-lg ${
                previewMode === 'mobile' ? 'max-w-sm' : 
                previewMode === 'tablet' ? 'max-w-md' : 'max-w-2xl'
              }`}>
                <div 
                  ref={canvasRef}
                  className="min-h-96"
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedElement) {
                      addElement(draggedElement);
                      setDraggedElement(null);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {elements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                      <Plus className="h-12 w-12 mb-4" />
                      <p className="text-lg font-medium">Start Building Your Email</p>
                      <p className="text-sm">Drag elements from the sidebar or click to add them</p>
                    </div>
                  ) : (
                    elements.map((element) => (
                      <div
                        key={element.id}
                        className={`relative group cursor-pointer ${
                          selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedElement(element.id)}
                      >
                        {/* Element Toolbar */}
                        <div className="absolute top-0 right-0 bg-white shadow-md rounded-bl z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveElement(element.id, 'up');
                              }}
                            >
                              ↑
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveElement(element.id, 'down');
                              }}
                            >
                              ↓
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                duplicateElement(element.id);
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeElement(element.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Render Element */}
                        <div dangerouslySetInnerHTML={{ __html: generateElementHTML(element) }} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Element Properties */}
          {selectedElementData && (
            <div className="w-80 bg-white border-l overflow-y-auto">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Element Properties</h3>
                <p className="text-sm text-gray-600 capitalize">{selectedElementData.type} Settings</p>
              </div>
              
              <div className="p-4 space-y-4">
                <ElementPropertiesPanel 
                  element={selectedElementData}
                  onUpdate={(updates) => updateElement(selectedElementData.id, updates)}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to generate HTML for individual elements
const generateElementHTML = (element: EmailElement): string => {
  // Implementation would be similar to the generateHTML function above
  // but for individual elements
  return `<div>Element: ${element.type}</div>`;
};

// Element properties panel component
const ElementPropertiesPanel: React.FC<{
  element: EmailElement;
  onUpdate: (updates: Partial<EmailElement>) => void;
}> = ({ element, onUpdate }) => {
  const updateContent = (updates: any) => {
    onUpdate({ content: { ...element.content, ...updates } });
  };

  switch (element.type) {
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <Label>Text Content</Label>
            <Textarea
              value={element.content.text}
              onChange={(e) => updateContent({ text: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <Label>Font Size</Label>
            <Input
              value={element.content.fontSize}
              onChange={(e) => updateContent({ fontSize: e.target.value })}
            />
          </div>
          <div>
            <Label>Text Color</Label>
            <Input
              type="color"
              value={element.content.color}
              onChange={(e) => updateContent({ color: e.target.value })}
            />
          </div>
        </div>
      );
    
    case 'button':
      return (
        <div className="space-y-4">
          <div>
            <Label>Button Text</Label>
            <Input
              value={element.content.text}
              onChange={(e) => updateContent({ text: e.target.value })}
            />
          </div>
          <div>
            <Label>Link URL</Label>
            <Input
              value={element.content.url}
              onChange={(e) => updateContent({ url: e.target.value })}
            />
          </div>
          <div>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={element.content.backgroundColor}
              onChange={(e) => updateContent({ backgroundColor: e.target.value })}
            />
          </div>
        </div>
      );
    
    default:
      return <div>Properties for {element.type}</div>;
  }
};