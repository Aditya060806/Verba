import { useState, useEffect, useRef, useCallback } from "react";
import { 
  MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, 
  Brain, Sparkles, BookOpen, Target, Shield, Lightbulb,
  RefreshCw, Settings, ChevronDown, Play, Pause, RotateCcw,
  Timer, Award, Users, TrendingUp, Zap, Heart, Star,
  MessageSquare, Bot, User, Copy, ThumbsUp, ThumbsDown,
  Download, Upload, Archive, Clock, BarChart3, Maximize2,
  Minimize2, Filter, Search, Hash, MessageSquarePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getDebateCoachResponse } from "@/lib/ai";
import CoachHeader from "./CoachHeader";
import CoachChat from "./CoachChat";
import CoachTips from "./CoachTips";
import CoachPractice from "./CoachPractice";
import CoachHistory from "./CoachHistory";
import CoachAnalytics from "./CoachAnalytics";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: string;
  isVoice?: boolean;
  helpful?: boolean | null;
  score?: number;
  tags?: string[];
  sessionId?: string;
}

interface VoiceSettings {
  enabled: boolean;
  autoSpeak: boolean;
  speed: number;
  pitch: number;
  volume: number;
  voice: string;
}

interface ConversationSession {
  id: string;
  title: string;
  timestamp: Date;
  messageCount: number;
  lastActivity: Date;
  category: string;
}

interface DebateMetrics {
  totalSessions: number;
  averageScore: number;
  strongestAreas: string[];
  improvementAreas: string[];
  practiceTime: number;
}

const DebateCoach = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'tips' | 'practice' | 'history' | 'analytics'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [practiceScenario, setPracticeScenario] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Enhanced state management
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [conversationSessions, setConversationSessions] = useState<ConversationSession[]>([]);
  const [debateMetrics, setDebateMetrics] = useState<DebateMetrics>({
    totalSessions: 0,
    averageScore: 0,
    strongestAreas: [],
    improvementAreas: [],
    practiceTime: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  // Voice settings
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    autoSpeak: true,
    speed: 1,
    pitch: 1,
    volume: 0.8,
    voice: 'default'
  });

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  const { toast } = useToast();

  // Enhanced debate tips with more categories
  const debateTips = [
    {
      id: 1,
      icon: Target,
      title: "Master the Opening Statement",
      content: "Your opening sets the entire debate framework. Define key terms, establish your team's burden of proof, and preview your main arguments clearly.",
      category: "Opening Strategy",
      difficulty: "Beginner",
      time: "2-3 minutes",
      example: "In today's debate on social media regulation, we define 'harmful content' as posts that demonstrably increase suicide rates among teens. Our burden is to prove regulation reduces harm without stifling free speech.",
      tips: [
        "Define ambiguous terms immediately",
        "State your burden of proof clearly", 
        "Preview 2-3 main arguments",
        "Use confident, authoritative language"
      ]
    },
    {
      id: 2,
      icon: Shield,
      title: "The Art of Rebuttal",
      content: "Effective rebuttals don't just attack - they rebuild. Use the four R's: Refute their logic, Reduce their impact, Reverse their argument, then Rebuild your case stronger.",
      category: "Rebuttal Strategy",
      difficulty: "Advanced",
      time: "3-4 minutes",
      example: "Opponent claims 'regulation kills innovation.' We refute with TikTok's continued growth under EU regulation, reduce by showing innovation in safety features, reverse by arguing regulation spurs innovation, rebuild our economic argument.",
      tips: [
        "Address their strongest argument first",
        "Use evidence to refute, not just logic",
        "Turn their arguments into support for your side",
        "Always rebuild after tearing down"
      ]
    },
    {
      id: 3,
      icon: Brain,
      title: "Stakeholder Impact Analysis",
      content: "Map out who's affected and how. Consider immediate vs. long-term impacts, direct vs. indirect effects, and quantify the scale wherever possible.",
      category: "Advanced Analysis",
      difficulty: "Expert",
      time: "4-5 minutes",
      example: "Social media regulation affects: Users (privacy protection), Platforms (compliance costs), Advertisers (targeting restrictions), Society (reduced misinformation), Governments (enforcement burden), Future generations (digital rights precedent).",
      tips: [
        "Identify all affected parties",
        "Quantify impacts with numbers",
        "Consider ripple effects",
        "Compare short vs. long-term consequences"
      ]
    }
  ];

  // Practice scenarios
  const practiceScenarios = [
    {
      id: 'opening',
      title: 'Opening Statement Practice',
      description: 'Practice delivering a compelling 3-minute opening on a random topic',
      prompts: [
        "You're arguing FOR universal basic income. Deliver your opening statement.",
        "Argue AGAINST mandatory vaccination policies. What's your framework?",
        "Support the motion: 'Social media should be banned for under-18s'",
        "Oppose: 'Artificial intelligence will replace most human jobs'"
      ]
    },
    {
      id: 'rebuttal',
      title: 'Rebuttal Training',
      description: 'I\'ll give you an argument to rebut. Practice the four R\'s technique.',
      prompts: [
        "Opponent argues: 'Climate action will destroy the economy'",
        "They claim: 'Private healthcare is more efficient than public'",
        "Counter this: 'Free speech means no content moderation needed'",
        "Rebut: 'Nuclear energy is too dangerous for widespread use'"
      ]
    },
    {
      id: 'crossfire',
      title: 'Crossfire Simulation',
      description: 'Practice quick thinking with rapid-fire questions and responses',
      prompts: [
        "You have 30 seconds: What's your strongest argument for renewable energy?",
        "Quick response: How do you address the cost concerns of your proposal?",
        "Defend this position: Why is your impact more significant than theirs?",
        "Counter-question: What evidence supports your claim about effectiveness?"
      ]
    }
  ];

  // Initialize session and load data
  useEffect(() => {
    const sessionId = `session_${Date.now()}`;
    setCurrentSessionId(sessionId);
    
    // Load conversation history from localStorage
    const savedSessions = localStorage.getItem('debateCoachSessions');
    if (savedSessions) {
      try {
        setConversationSessions(JSON.parse(savedSessions));
      } catch (error) {
        console.error('Failed to load conversation history:', error);
      }
    }

    // Load debate metrics
    const savedMetrics = localStorage.getItem('debateMetrics');
    if (savedMetrics) {
      try {
        setDebateMetrics(JSON.parse(savedMetrics));
      } catch (error) {
        console.error('Failed to load debate metrics:', error);
      }
    }
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    }

    // Initialize speech recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Could not process your speech. Please try again.",
          variant: "destructive"
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Text-to-speech function
  const speak = useCallback((text: string) => {
    if (!voiceSettings.enabled || !speechSynthesisRef.current) return;

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceSettings.speed;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current.speak(utterance);
  }, [voiceSettings]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Start/stop voice input
  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening, toast]);

  // Save conversation session
  const saveConversationSession = useCallback(() => {
    if (messages.length === 0) return;

    const sessionTitle = messages[0]?.content.slice(0, 50) + (messages[0]?.content.length > 50 ? '...' : '');
    const session: ConversationSession = {
      id: currentSessionId,
      title: sessionTitle,
      timestamp: new Date(),
      messageCount: messages.length,
      lastActivity: new Date(),
      category: 'advice'
    };

    setConversationSessions(prev => {
      const updated = prev.filter(s => s.id !== currentSessionId);
      updated.unshift(session);
      localStorage.setItem('debateCoachSessions', JSON.stringify(updated.slice(0, 50))); // Keep last 50 sessions
      return updated.slice(0, 50);
    });

    // Update metrics
    setDebateMetrics(prev => {
      const updated = {
        ...prev,
        totalSessions: prev.totalSessions + (prev.totalSessions === 0 ? 1 : 0),
        practiceTime: prev.practiceTime + 5 // Add 5 minutes per session
      };
      localStorage.setItem('debateMetrics', JSON.stringify(updated));
      return updated;
    });
  }, [messages, currentSessionId]);

  // Send message
  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      sessionId: currentSessionId
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Use OpenRouter Claude 3 Haiku for live AI feedback
      const aiResponse = await getDebateCoachResponse({
        prompt: userMessage.content,
        context: {
          sessionId: currentSessionId,
          previousMessages: messages,
          mode,
          practiceScenario
        }
      });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        category: 'advice',
        sessionId: currentSessionId
      };
      setMessages(prev => [...prev, aiMessage]);
      // Auto-speak if enabled
      if (voiceSettings.autoSpeak && voiceSettings.enabled) {
        speak(aiResponse);
      }
      // Save session and update metrics
      saveConversationSession();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, voiceSettings, speak, toast, currentSessionId, saveConversationSession, messages, mode, practiceScenario]);

  // Handle key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  // Start practice scenario
  const startPractice = useCallback((scenarioId: string) => {
    const scenario = practiceScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    setPracticeScenario(scenarioId);
    const randomPrompt = scenario.prompts[Math.floor(Math.random() * scenario.prompts.length)];
    
    const practiceMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `🎯 **${scenario.title}**\n\n${randomPrompt}\n\nTake your time to think through your approach. When you're ready, speak or type your response. I'll provide feedback on structure, argumentation, and delivery.`,
      timestamp: new Date(),
      category: 'practice',
      sessionId: currentSessionId
    };

    setMessages(prev => [...prev, practiceMessage]);
    setMode('chat');
    
    if (voiceSettings.autoSpeak && voiceSettings.enabled) {
      speak(practiceMessage.content);
    }
  }, [practiceScenarios, voiceSettings, speak, currentSessionId]);

  // Rate message helpfulness
  const rateMessage = useCallback((messageId: string, helpful: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful } : msg
    ));
    
    toast({
      title: helpful ? "Thanks for the feedback!" : "Feedback noted",
      description: helpful ? "I'm glad that was helpful!" : "I'll try to improve my responses.",
    });
  }, [toast]);

  // Copy message content
  const copyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard.",
    });
  }, [toast]);

  // Export messages handler for CoachHistory
  const exportMessages = useCallback(() => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `debate-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-all duration-300 animate-float group"
          aria-label="Open Coach"
          title="Open Coach"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-glow">
            <Sparkles className="w-2 h-2 text-white absolute top-1 left-1" />
          </div>
          {messages.length > 0 && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="text-xs text-white bg-black/70 px-2 py-1 rounded-full">
                {messages.length}
              </div>
            </div>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed ${isExpanded ? 'inset-4' : 'bottom-6 right-6'} z-50 animate-slide-in-up`}>
      <Card className={`${
        isExpanded 
          ? 'w-full h-full' 
          : 'w-[420px] max-w-[calc(100vw-3rem)] max-h-[85vh]'
      } neu-card border border-primary/20 flex flex-col transition-all duration-300`}>
        <CardHeader className="pb-3 shrink-0">
          <CoachHeader
            mode={mode}
            setMode={setMode as (mode: string) => void}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            voiceSettings={voiceSettings}
            setVoiceSettings={setVoiceSettings}
            isSpeaking={isSpeaking}
            stopSpeaking={stopSpeaking}
            setIsOpen={setIsOpen}
            messageCount={messages.length}
          />
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 p-0">
          <div key={mode} className="w-full h-full animate-fade-in animate-slide-in-up">
            {mode === 'chat' && (
              <CoachChat
                messages={messages}
                isLoading={isLoading}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleKeyPress={handleKeyPress}
                sendMessage={sendMessage}
                toggleVoiceInput={toggleVoiceInput}
                isListening={isListening}
                speak={speak}
                copyMessage={copyMessage}
                rateMessage={rateMessage}
                textareaRef={textareaRef}
                messagesEndRef={messagesEndRef}
                isSpeaking={isSpeaking}
              />
            )}
            {mode === 'tips' && (
              <CoachTips
                debateTips={debateTips}
                currentTip={currentTip}
                setCurrentTip={setCurrentTip}
              />
            )}
            {mode === 'practice' && (
              <CoachPractice
                practiceScenarios={practiceScenarios}
                startPractice={startPractice}
              />
            )}
            {mode === 'history' && (
              <CoachHistory
                conversationSessions={conversationSessions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                messages={messages}
                exportMessages={exportMessages}
              />
            )}
            {mode === 'analytics' && (
              <CoachAnalytics debateMetrics={debateMetrics} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebateCoach;