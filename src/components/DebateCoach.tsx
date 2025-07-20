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
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-heading text-gradient flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              AI Debate Coach
            </CardTitle>
            <div className="flex items-center space-x-2">
              {/* Voice toggle */}
              {isSpeaking && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={stopSpeaking}
                  className="hover:bg-card-secondary text-destructive"
                  title="Stop speaking"
                >
                  <VolumeX className="w-4 h-4" />
                </Button>
              )}
              
              {/* Settings */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-card-secondary">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Voice Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="voice-enabled" className="text-sm">Enable Voice</Label>
                      <Switch
                        id="voice-enabled"
                        checked={voiceSettings.enabled}
                        onCheckedChange={(checked) => 
                          setVoiceSettings(prev => ({ ...prev, enabled: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-speak" className="text-sm">Auto-speak</Label>
                      <Switch
                        id="auto-speak"
                        checked={voiceSettings.autoSpeak}
                        onCheckedChange={(checked) => 
                          setVoiceSettings(prev => ({ ...prev, autoSpeak: checked }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Speed: {voiceSettings.speed.toFixed(1)}x</Label>
                      <Slider
                        value={[voiceSettings.speed]}
                        onValueChange={([value]) => 
                          setVoiceSettings(prev => ({ ...prev, speed: value }))
                        }
                        min={0.5}
                        max={2}
                        step={0.1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                      <Slider
                        value={[voiceSettings.volume]}
                        onValueChange={([value]) => 
                          setVoiceSettings(prev => ({ ...prev, volume: value }))
                        }
                        min={0}
                        max={1}
                        step={0.1}
                      />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="hover:bg-card-secondary"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Enhanced Mode Toggle */}
          <div className="grid grid-cols-5 gap-1 p-1 bg-card-secondary rounded-lg mt-2">
            {[
              { id: 'chat', icon: MessageSquare, label: 'Chat' },
              { id: 'tips', icon: Lightbulb, label: 'Tips' },
              { id: 'practice', icon: Target, label: 'Practice' },
              { id: 'history', icon: Clock, label: 'History' },
              { id: 'analytics', icon: BarChart3, label: 'Stats' }
            ].map((m) => (
              <Button
                key={m.id}
                variant={mode === m.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setMode(m.id as any)}
                className="text-xs h-8 p-1"
                title={m.label}
                aria-label={m.label}
              >
                <m.icon className="w-3 h-3" />
              </Button>
            ))}
          </div>

          {/* Expand/Collapse Toggle */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-foreground-secondary">
              {messages.length > 0 && `${messages.length} messages`}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs p-1"
              title={isExpanded ? "Collapse" : "Expand"}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col min-h-0 p-0">
          {mode === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4 custom-scrollbar overflow-y-auto max-h-[50vh] min-h-[200px]">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-foreground-secondary">
                    <Bot className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Hi! I'm your AI Debate Coach</h3>
                    <p className="text-sm leading-relaxed">
                      Ask me anything about debate strategy, argument structure, rebuttals, or practice with me!
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setInputValue("How do I structure a strong opening statement?")}
                        className="text-xs"
                      >
                        Opening Strategy
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setInputValue("What's the best way to rebut an argument?")}
                        className="text-xs"
                      >
                        Rebuttal Tips
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setInputValue("Help me practice my delivery")}
                        className="text-xs"
                      >
                        Practice Session
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                              : 'bg-card-secondary border border-card-border'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.type === 'ai' && (
                              <Bot className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {message.content}
                              </p>
                              <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                                <span>{message.timestamp.toLocaleTimeString()}</span>
                                {message.type === 'ai' && (
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => speak(message.content)}
                                      className="h-6 w-6 p-0 hover:bg-primary/10"
                                      title="Read aloud"
                                    >
                                      <Volume2 className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyMessage(message.content)}
                                      className="h-6 w-6 p-0 hover:bg-primary/10"
                                      title="Copy"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => rateMessage(message.id, true)}
                                      className={`h-6 w-6 p-0 hover:bg-success/10 ${
                                        message.helpful === true ? 'text-success' : ''
                                      }`}
                                      title="Helpful"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => rateMessage(message.id, false)}
                                      className={`h-6 w-6 p-0 hover:bg-destructive/10 ${
                                        message.helpful === false ? 'text-destructive' : ''
                                      }`}
                                      title="Not helpful"
                                    >
                                      <ThumbsDown className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-card-secondary border border-card-border rounded-2xl px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 text-primary" />
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-card-border">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask me about debate strategy, or start practicing..."
                      className="min-h-[44px] max-h-32 resize-none pr-12 rounded-xl"
                      disabled={isLoading}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleVoiceInput}
                      className={`absolute right-2 top-2 h-7 w-7 p-0 ${
                        isListening ? 'text-destructive' : 'text-foreground-secondary'
                      }`}
                      title={isListening ? "Stop listening" : "Voice input"}
                      disabled={isLoading}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="h-11 px-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {mode === 'tips' && (
            <div className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {(() => {
                      const IconComponent = debateTips[currentTip].icon;
                      return <IconComponent className="w-6 h-6 text-primary" />;
                    })()}
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {debateTips[currentTip].difficulty}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {debateTips[currentTip].title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-3">
                    {debateTips[currentTip].content}
                  </p>
                  
                  <div className="p-3 rounded-lg bg-card/50 border border-card-border mb-3">
                    <div className="text-xs font-medium text-primary mb-1">Example:</div>
                    <p className="text-xs text-foreground-secondary italic leading-relaxed">
                      {debateTips[currentTip].example}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-primary">Key Tips:</div>
                    <ul className="space-y-1">
                      {debateTips[currentTip].tips.map((tip, index) => (
                        <li key={index} className="text-xs text-foreground-secondary flex items-start gap-2">
                          <Star className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-card-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentTip((prev) => (prev - 1 + debateTips.length) % debateTips.length)}
                    className="border-card-border hover:border-primary"
                  >
                    Previous
                  </Button>
                  
                  <span className="text-xs text-foreground-secondary">
                    {currentTip + 1} of {debateTips.length}
                  </span>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentTip((prev) => (prev + 1) % debateTips.length)}
                    className="border-card-border hover:border-primary"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {mode === 'practice' && (
            <div className="p-4 space-y-4">
              <div className="text-center">
                <Target className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Practice Sessions</h3>
                <p className="text-sm text-foreground-secondary">
                  Choose a practice mode to improve your debate skills
                </p>
              </div>

              <div className="space-y-3">
                {practiceScenarios.map((scenario) => (
                  <Card key={scenario.id} className="p-4 hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                        {scenario.id === 'opening' && <Target className="w-5 h-5 text-primary" />}
                        {scenario.id === 'rebuttal' && <Shield className="w-5 h-5 text-primary" />}
                        {scenario.id === 'crossfire' && <Zap className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{scenario.title}</h4>
                        <p className="text-xs text-foreground-secondary mb-3">
                          {scenario.description}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => startPractice(scenario.id)}
                          className="bg-gradient-to-r from-primary to-accent text-xs h-8"
                        >
                          Start Practice
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="pt-4 border-t border-card-border">
                <div className="text-center text-xs text-foreground-secondary">
                  <Timer className="w-4 h-4 inline mr-1" />
                  Practice sessions include real-time feedback and scoring
                </div>
              </div>
            </div>
          )}

          {mode === 'history' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  Conversation History
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const dataStr = JSON.stringify(messages, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `debate-chat-${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-card-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'advice', 'practice', 'questions'].map((category) => (
                    <Button
                      key={category}
                      variant={filterCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory(category)}
                      className="text-xs h-6"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sessions List */}
              <ScrollArea className="h-64">
                {conversationSessions.length === 0 ? (
                  <div className="text-center py-8 text-foreground-secondary">
                    <Archive className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No conversation history yet</p>
                    <p className="text-xs">Start chatting to build your history!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {conversationSessions
                      .filter(session => 
                        session.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        (filterCategory === 'all' || session.category === filterCategory)
                      )
                      .map((session) => (
                        <Card key={session.id} className="p-3 hover:border-primary/30 transition-colors cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm mb-1">{session.title}</h4>
                              <p className="text-xs text-foreground-secondary mb-2">
                                {session.messageCount} messages • {session.category}
                              </p>
                              <div className="text-xs text-foreground-secondary">
                                {session.timestamp.toLocaleDateString()} • {session.lastActivity.toLocaleTimeString()}
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {session.category}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}
              </ScrollArea>

              <div className="pt-4 border-t border-card-border">
                <div className="text-center text-xs text-foreground-secondary">
                  <MessageSquarePlus className="w-4 h-4 inline mr-1" />
                  {conversationSessions.length} total conversations
                </div>
              </div>
            </div>
          )}

          {mode === 'analytics' && (
            <div className="p-4 space-y-4">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Performance Analytics</h3>
                <p className="text-sm text-foreground-secondary">
                  Track your debate improvement over time
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 text-center">
                  <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold text-gradient">{debateMetrics.totalSessions}</div>
                  <div className="text-xs text-foreground-secondary">Total Sessions</div>
                </Card>
                <Card className="p-3 text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-success" />
                  <div className="text-lg font-bold text-gradient">{debateMetrics.averageScore.toFixed(1)}</div>
                  <div className="text-xs text-foreground-secondary">Avg Score</div>
                </Card>
                <Card className="p-3 text-center">
                  <Timer className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-lg font-bold text-gradient">{Math.round(debateMetrics.practiceTime / 60)}h</div>
                  <div className="text-xs text-foreground-secondary">Practice Time</div>
                </Card>
                <Card className="p-3 text-center">
                  <Brain className="w-6 h-6 mx-auto mb-2 text-secondary" />
                  <div className="text-lg font-bold text-gradient">{debateMetrics.strongestAreas.length}</div>
                  <div className="text-xs text-foreground-secondary">Strong Areas</div>
                </Card>
              </div>

              {/* Progress Visualization */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Opening Statements</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Rebuttals</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Evidence Analysis</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Delivery Confidence</span>
                    <span>79%</span>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
              </div>

              {/* Improvement Areas */}
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-1 text-primary" />
                  Focus Areas
                </h4>
                <div className="space-y-2">
                  {['Evidence Quality', 'Counterargument Strength', 'Time Management'].map((area, index) => (
                    <div key={area} className="flex items-center justify-between p-2 bg-card-secondary rounded-lg">
                      <span className="text-xs">{area}</span>
                      <Badge variant="outline" className="text-xs">
                        Priority {index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-card-border">
                <div className="text-center text-xs text-foreground-secondary">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Data updated in real-time
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DebateCoach;