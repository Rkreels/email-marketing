
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceTrainerProps {}

export const VoiceTrainer: React.FC<VoiceTrainerProps> = () => {
  const [isEnabled, setIsEnabled] = useState(() => {
    return localStorage.getItem('voiceTrainerEnabled') === 'true';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentHoveredElement, setCurrentHoveredElement] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize speech synthesis
  const speak = useCallback((text: string, priority: 'high' | 'normal' = 'normal') => {
    if (!isEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech for high priority or if text is different
    if (priority === 'high' || text !== currentHoveredElement) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.7;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentHoveredElement(text);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentHoveredElement(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentHoveredElement(null);
    };
    
    console.log('🎤 Voice Guide:', text);
    window.speechSynthesis.speak(utterance);
  }, [isEnabled, currentHoveredElement]);

  // Toggle voice trainer
  const toggleVoiceTrainer = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('voiceTrainerEnabled', newState.toString());
    
    if (newState) {
      speak("Voice Guide activated! I'll help you navigate this platform. Hover over any element to learn about it.", 'high');
      toast({
        title: "Voice Guide Enabled",
        description: "I'll help you learn this platform! Hover over elements to hear descriptions.",
      });
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentHoveredElement(null);
      toast({
        title: "Voice Guide Disabled",
        description: "Voice guidance has been turned off.",
      });
    }
  };

  // Handle voice context from elements with debouncing
  useEffect(() => {
    if (!isEnabled) return;

    let hoverTimeout: NodeJS.Timeout;

    const handleElementHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const voiceContext = target.getAttribute('data-voice-context') || 
                         target.closest('[data-voice-context]')?.getAttribute('data-voice-context');
      
      if (voiceContext && voiceContext !== currentHoveredElement) {
        // Clear any existing timeout
        clearTimeout(hoverTimeout);
        
        // Set a small delay to avoid rapid-fire speech
        hoverTimeout = setTimeout(() => {
          if (!isSpeaking || currentHoveredElement !== voiceContext) {
            speak(voiceContext);
          }
        }, 300);
      }
    };

    const handleElementLeave = () => {
      clearTimeout(hoverTimeout);
    };

    const handleElementClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const voiceAction = target.getAttribute('data-voice-action') || 
                        target.closest('[data-voice-action]')?.getAttribute('data-voice-action');
      
      if (voiceAction) {
        // Clear any hover speech and speak the action immediately
        window.speechSynthesis.cancel();
        setTimeout(() => speak(voiceAction, 'high'), 100);
      }
    };

    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleElementLeave);
    document.addEventListener('click', handleElementClick);

    return () => {
      clearTimeout(hoverTimeout);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleElementLeave);
      document.removeEventListener('click', handleElementClick);
    };
  }, [isEnabled, isSpeaking, speak, currentHoveredElement]);

  // Page load guidance with route detection
  useEffect(() => {
    if (!isEnabled) return;

    const currentPath = window.location.pathname;
    let guidance = "";

    // Enhanced route-specific guidance
    switch (currentPath) {
      case '/':
        guidance = "Welcome to your MailChimp Dashboard! You can view campaign performance, audience growth, and create new campaigns. Try hovering over different elements to learn more.";
        break;
      case '/campaigns':
        guidance = "Campaigns section loaded. Here you can create, manage, and analyze your email campaigns. Use the create button to start a new campaign.";
        break;
      case '/campaigns/create':
        guidance = "Campaign creation page. Design your email campaign using our drag-and-drop editor or choose from templates.";
        break;
      case '/campaigns/templates':
        guidance = "Email templates library. Browse professionally designed templates or create your own.";
        break;
      case '/automations':
        guidance = "Automations dashboard. Create automated email sequences and customer journeys. Try the pre-built journeys for quick setup.";
        break;
      case '/automations/transactional':
        guidance = "Transactional email management. Set up automated emails triggered by user actions like purchases or signups.";
        break;
      case '/automations/journeys':
        guidance = "Customer journey builder. Create complex automated email sequences based on subscriber behavior.";
        break;
      case '/audience':
        guidance = "Audience management center. Import contacts, create segments, and manage subscriber data and preferences.";
        break;
      case '/audience/tags':
        guidance = "Tags management. Organize your subscribers with custom tags for better targeting and segmentation.";
        break;
      case '/audience/segments':
        guidance = "Audience segments. Create targeted groups based on subscriber behavior, preferences, and demographics.";
        break;
      case '/forms':
        guidance = "Forms center. Create signup forms, landing pages, and pop-ups to grow your audience.";
        break;
      case '/forms/signup':
        guidance = "Signup forms builder. Create embedded forms for your website to capture new subscribers.";
        break;
      case '/forms/landing':
        guidance = "Landing pages designer. Build high-converting landing pages for your campaigns.";
        break;
      case '/analytics':
        guidance = "Analytics dashboard. View detailed reports on campaign performance, audience insights, and revenue data.";
        break;
      case '/website':
        guidance = "Website integration center. Connect your website and track visitor behavior and conversions.";
        break;
      case '/content':
        guidance = "Content manager. Organize your brand assets, templates, and creative materials in one place.";
        break;
      case '/integrations':
        guidance = "Integrations hub. Connect MailChimp with your favorite tools and platforms for seamless workflows.";
        break;
      default:
        if (currentPath.includes('/campaigns/')) {
          guidance = "Campaign section. Manage your email campaigns, templates, and A/B testing.";
        } else if (currentPath.includes('/automations/')) {
          guidance = "Automation section. Set up automated email sequences and customer journeys.";
        } else if (currentPath.includes('/forms/')) {
          guidance = "Forms section. Create signup forms, landing pages, and pop-ups to grow your audience.";
        } else if (currentPath.includes('/audience/')) {
          guidance = "Audience section. Manage your subscribers, segments, and audience data.";
        } else if (currentPath.includes('/analytics/')) {
          guidance = "Analytics section. View reports and insights about your email marketing performance.";
        } else if (currentPath.includes('/website/')) {
          guidance = "Website section. Manage website integration and tracking.";
        } else if (currentPath.includes('/content/')) {
          guidance = "Content section. Manage your brand assets and creative materials.";
        } else if (currentPath.includes('/integrations/')) {
          guidance = "Integrations section. Connect with external tools and manage API access.";
        } else {
          guidance = `You're in the ${currentPath.split('/')[1] || 'main'} section. Hover over elements to learn about available features and tools.`;
        }
    }

    const timer = setTimeout(() => speak(guidance, 'high'), 800);
    return () => clearTimeout(timer);
  }, [isEnabled, speak]);

  // Keyboard shortcut (Ctrl+Shift+V)
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault();
        toggleVoiceTrainer();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50">
      <Button
        onClick={toggleVoiceTrainer}
        variant={isEnabled ? "default" : "outline"}
        size="icon"
        className={`rounded-full h-12 w-12 shadow-lg transition-all duration-200 ${
          isSpeaking ? 'animate-pulse scale-110' : ''
        } ${isEnabled ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
        title={`Voice Guide: ${isEnabled ? 'ON' : 'OFF'} (Ctrl+Shift+V)`}
        data-voice-context={isEnabled ? "Click to disable voice guidance and stop audio assistance" : "Click to enable voice guidance for audio assistance throughout the platform"}
      >
        {isEnabled ? (
          <Mic className={`h-5 w-5 ${isSpeaking ? 'text-green-300' : 'text-white'}`} />
        ) : (
          <MicOff className="h-5 w-5" />
        )}
      </Button>
      
      {isEnabled && (
        <div className="absolute top-14 right-0 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {isSpeaking ? '🎤 Speaking...' : '🎤 Voice Guide Active'}
        </div>
      )}
    </div>
  );
};
