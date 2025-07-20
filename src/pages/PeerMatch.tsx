import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Clock, 
  Search, 
  MessageSquare,
  Star,
  ThumbsUp,
  Laugh,
  Send,
  X,
  ArrowLeft,
  Timer,
  Mic,
  MicOff,
  Crown,
  Trophy,
  Zap
} from "lucide-react";
import ParticleBackground from "@/components/ui/particle-background";

type DebatePhase = 'matching' | 'countdown' | 'opening' | 'rebuttal' | 'conclusion' | 'feedback';
type Reaction = '👍' | '👏' | '😂';

const PeerMatch = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<DebatePhase>('matching');
  const [timer, setTimer] = useState(300); // 5 minutes per phase
  const [isMatching, setIsMatching] = useState(true);
  const [matchedOpponent, setMatchedOpponent] = useState<any>(null);
  const [countdown, setCountdown] = useState(5);
  const [micEnabled, setMicEnabled] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Simulate matching process
  useEffect(() => {
    if (currentPhase === 'matching') {
      const matchingTimer = setTimeout(() => {
        setMatchedOpponent({
          name: 'Alex Chen',
          level: 12,
          avatar: 'AC',
          skillLevel: 85
        });
        setIsMatching(false);
        setCurrentPhase('countdown');
      }, 3000);

      return () => clearTimeout(matchingTimer);
    }
  }, [currentPhase]);

  // Countdown timer
  useEffect(() => {
    if (currentPhase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentPhase === 'countdown' && countdown === 0) {
      setCurrentPhase('opening');
      setTimer(420); // 7 minutes for opening
    }
  }, [currentPhase, countdown]);

  // Debate timer
  useEffect(() => {
    if (['opening', 'rebuttal', 'conclusion'].includes(currentPhase) && timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      // Auto-advance to next phase
      const phaseOrder: DebatePhase[] = ['opening', 'rebuttal', 'conclusion', 'feedback'];
      const currentIndex = phaseOrder.indexOf(currentPhase);
      if (currentIndex < phaseOrder.length - 1) {
        setCurrentPhase(phaseOrder[currentIndex + 1]);
        if (phaseOrder[currentIndex + 1] !== 'feedback') {
          setTimer(phaseOrder[currentIndex + 1] === 'opening' ? 420 : 300); // 7 min opening, 5 min others
        }
      }
    }
  }, [currentPhase, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendReaction = (reaction: Reaction) => {
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'You',
      message: reaction,
      timestamp: new Date()
    }]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'You',
        message: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  const cancelMatch = () => {
    navigate('/debate-arena');
  };

  const submitFeedback = () => {
    // Simulate feedback submission
    navigate('/debate-arena');
  };

  const quickRematch = () => {
    setCurrentPhase('matching');
    setIsMatching(true);
    setMatchedOpponent(null);
    setCountdown(5);
    setChatMessages([]);
    setRating(0);
    setFeedback('');
  };

  if (currentPhase === 'matching') {
    return (
      <div className="min-h-screen bg-animated-gradient pt-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient">Peer Match</h1>
            </div>
            <p className="text-xl text-foreground-secondary">Find Your Perfect Debate Partner</p>
          </div>

          {/* Matching Animation */}
          <Card className="neu-card max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                  <Search className="w-8 h-8 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">Finding opponent...</h3>
              <p className="text-foreground-secondary mb-6">Matching you with a debater at your skill level</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Your Skill Level</span>
                  <span className="font-medium">Level 10 • Advanced</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <Button variant="outline" onClick={cancelMatch} className="w-full">
                <X className="w-4 h-4 mr-2" />
                Cancel Match
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentPhase === 'countdown') {
    return (
      <div className="min-h-screen bg-animated-gradient pt-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Card className="neu-card max-w-lg mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-lg">
                      {matchedOpponent?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-foreground">{matchedOpponent?.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Level {matchedOpponent?.level}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-foreground-secondary">{matchedOpponent?.skillLevel}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-6xl font-bold text-primary mb-2">{countdown}</div>
                <p className="text-foreground-secondary">Starting in...</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Motion</span>
                  <span className="font-medium">This House Would Ban Social Media for Under 16s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Format</span>
                  <span className="font-medium">Asian Parliamentary</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration</span>
                  <span className="font-medium">15 minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-animated-gradient pt-20 relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/debate-arena')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Arena
            </Button>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gradient">Live Debate</h1>
              <p className="text-foreground-secondary">vs {matchedOpponent?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatTime(timer)}</div>
              <div className="text-sm text-foreground-secondary capitalize">{currentPhase}</div>
            </div>
            <Button
              variant={micEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Debate Area */}
          <div className="lg:col-span-2">
            <Card className="neu-card h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  {currentPhase === 'opening' && 'Opening Statements'}
                  {currentPhase === 'rebuttal' && 'Rebuttal Phase'}
                  {currentPhase === 'conclusion' && 'Closing Arguments'}
                  {currentPhase === 'feedback' && 'Debate Feedback'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentPhase === 'feedback' ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                      <h3 className="text-2xl font-bold mb-2">Debate Complete!</h3>
                      <p className="text-foreground-secondary">Rate your opponent and provide feedback</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Rate your opponent</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className={`p-2 rounded-lg transition-colors ${
                                rating >= star ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            >
                              <Star className="w-6 h-6 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Feedback</label>
                        <Textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Share your thoughts on the debate..."
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <Button onClick={submitFeedback} className="flex-1">
                          Submit Feedback
                        </Button>
                        <Button variant="outline" onClick={quickRematch}>
                          Quick Rematch
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                        <MessageSquare className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Debate in Progress</h3>
                      <p className="text-foreground-secondary">
                        {currentPhase === 'opening' && 'Present your opening arguments'}
                        {currentPhase === 'rebuttal' && 'Address your opponent\'s points'}
                        {currentPhase === 'conclusion' && 'Summarize your case'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="neu-card h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg ${
                          msg.sender === 'You'
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <div className="text-xs opacity-70 mb-1">{msg.sender}</div>
                        <div>{msg.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReaction('👍')}
                    >
                      👍
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReaction('👏')}
                    >
                      👏
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReaction('😂')}
                    >
                      😂
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerMatch; 