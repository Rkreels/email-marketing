
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
  const { toast } = useToast();

  // Initialize speech synthesis
  const speak = useCallback((text: string) => {
    if (!isEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    console.log('Voice Trainer:', text); // For debugging
    window.speechSynthesis.speak(utterance);
  }, [isEnabled]);

  // Toggle voice trainer
  const toggleVoiceTrainer = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('voiceTrainerEnabled', newState.toString());
    
    if (newState) {
      speak("Voice Guide activated! I'll help you navigate this platform. Click any element to learn about it.");
      toast({
        title: "Voice Guide Enabled",
        description: "I'll help you learn this platform!",
      });
    } else {
      window.speechSynthesis.cancel();
      toast({
        title: "Voice Guide Disabled",
        description: "Voice guidance has been turned off.",
      });
    }
  };

  // Handle voice context from elements
  useEffect(() => {
    if (!isEnabled) return;

    const handleElementHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const voiceContext = target.getAttribute('data-voice-context');
      
      if (voiceContext && !isSpeaking) {
        speak(voiceContext);
      }
    };

    const handleElementClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const voiceAction = target.getAttribute('data-voice-action');
      
      if (voiceAction) {
        setTimeout(() => speak(voiceAction), 100); // Slight delay for action feedback
      }
    };

    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('click', handleElementClick);

    return () => {
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('click', handleElementClick);
    };
  }, [isEnabled, isSpeaking, speak]);

  // Page load guidance
  useEffect(() => {
    if (!isEnabled) return;

    const currentPath = window.location.pathname;
    let guidance = "";

    switch (currentPath) {
      case '/':
        guidance = "Welcome to the Home Dashboard! Here you can view campaign performance, audience growth, and quick-create buttons. Try clicking 'Create Campaign' to start.";
        break;
      case '/campaigns':
        guidance = "This is the Campaigns section. Create and manage your email campaigns here. Use the drag-and-drop editor to design beautiful emails.";
        break;
      case '/automations':
        guidance = "Welcome to Automations! Create automated email journeys. Try 'Pre-built Journeys' for ready-made templates.";
        break;
      case '/audience':
        guidance = "Audience management center. Import contacts, create segments, and manage subscriber preferences here.";
        break;
      case '/forms':
        guidance = "Forms manager. Create embedded forms for your website to capture new subscribers.";
        break;
      case '/analytics':
        guidance = "Analytics dashboard. View real-time reports on campaign performance, open rates, and revenue.";
        break;
      default:
        guidance = `You're now in the ${currentPath.split('/')[1]} section. Explore the available options and tools.`;
    }

    const timer = setTimeout(() => speak(guidance), 500);
    return () => clearTimeout(timer);
  }, [isEnabled, speak]);

  // Keyboard shortcut
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

  return (
    <div className="fixed top-20 right-4 z-50">
      <Button
        onClick={toggleVoiceTrainer}
        variant={isEnabled ? "default" : "outline"}
        size="icon"
        className={`rounded-full h-12 w-12 shadow-lg transition-all duration-200 ${
          isSpeaking ? 'animate-pulse' : ''
        }`}
        title={`Voice Guide: ${isEnabled ? 'ON' : 'OFF'} (Ctrl+Shift+V)`}
        data-voice-context={isEnabled ? "Click to disable voice guidance" : "Click to enable voice guidance"}
      >
        {isEnabled ? (
          <Mic className={`h-5 w-5 ${isSpeaking ? 'text-green-400' : ''}`} />
        ) : (
          <MicOff className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
