import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mic, MicOff, Play, Pause, SkipForward, Users, Clock, MessageSquare, Zap, Volume2, Hand, Brain, Settings, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SpeechNotesOverlay from "@/components/SpeechNotesOverlay";
import AdvancedAudioVisualizer from "@/components/AdvancedAudioVisualizer";
import ParticleBackground from "@/components/ui/particle-background";
import { generateDebateSpeech, generatePOI } from "@/lib/ai";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const DebateArena = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const format = location.state?.format || "AP";
  
  // Role/timing definitions for each format
  const formatSpeakers: Record<string, any[]> = {
    AP: [
      { role: "Prime Minister", side: "Government", time: 7, color: "primary" },
      { role: "Leader of Opposition", side: "Opposition", time: 7, color: "accent" },
      { role: "Deputy PM", side: "Government", time: 7, color: "primary" },
      { role: "Deputy LO", side: "Opposition", time: 7, color: "accent" },
      { role: "Government Whip", side: "Government", time: 7, color: "primary" },
      { role: "Opposition Whip", side: "Opposition", time: 7, color: "accent" }
    ],
    BP: [
      { role: "Prime Minister (OG)", side: "Opening Government", time: 7, color: "primary" },
      { role: "Leader of Opposition (OO)", side: "Opening Opposition", time: 7, color: "accent" },
      { role: "Deputy PM (OG)", side: "Opening Government", time: 7, color: "primary" },
      { role: "Deputy LO (OO)", side: "Opening Opposition", time: 7, color: "accent" },
      { role: "Member of Government (CG)", side: "Closing Government", time: 7, color: "primary" },
      { role: "Member of Opposition (CO)", side: "Closing Opposition", time: 7, color: "accent" },
      { role: "Government Whip (CG)", side: "Closing Government", time: 7, color: "primary" },
      { role: "Opposition Whip (CO)", side: "Closing Opposition", time: 7, color: "accent" }
    ],
    WSDC: [
      { role: "Speaker 1 (Prop)", side: "Proposition", time: 8, color: "primary" },
      { role: "Speaker 2 (Opp)", side: "Opposition", time: 8, color: "accent" },
      { role: "Speaker 3 (Prop)", side: "Proposition", time: 8, color: "primary" },
      { role: "Speaker 4 (Opp)", side: "Opposition", time: 8, color: "accent" },
      { role: "Reply (Prop)", side: "Proposition", time: 4, color: "primary" },
      { role: "Reply (Opp)", side: "Opposition", time: 4, color: "accent" }
    ]
  };
  
  const manualLinks: Record<string, string> = {
    AP: "/Malaysia UADC 2023 - Debate & Judging Handbook.pdf",
    BP: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf",
    WSDC: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf"
  };
  
  const speakers = formatSpeakers[format];
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [transcription, setTranscription] = useState("");
  const [poiRequested, setPoiRequested] = useState(false);
  const [aiSpeeches, setAiSpeeches] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [poiText, setPoiText] = useState<string | null>(null);
  const [poiLoading, setPoiLoading] = useState(false);
  const [poiError, setPoiError] = useState<string | null>(null);
  const [speechStatus, setSpeechStatus] = useState<string>("");
  
  // Enhanced context tracking
  const [debateContext, setDebateContext] = useState<any>({ 
    speeches: [], 
    pois: [], 
    currentSpeech: "",
    speechTime: 0,
    motion: "This House Would Ban All Forms of Political Advertising on Social Media",
    format,
    level: "Intermediate"
  });
  
  // Speech recognition setup
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.serviceURI = '';
      
      // Set a longer timeout for no-speech detection
      recognitionRef.current.grammars = null;
      
      // Enhanced language support for different accents
      const accentLanguages = [
        'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN', 'en-NZ', 'en-ZA'
      ];
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Clear any error status when speech is detected
        if (finalTranscript || interimTranscript) {
          setSpeechStatus("");
        }
        
        // Update transcription with both final and interim results
        setTranscription(prev => {
          const newTranscript = prev + finalTranscript;
          // Update debate context with current speech
          setDebateContext(ctx => ({
            ...ctx,
            currentSpeech: newTranscript,
            speechTime: timeElapsed
          }));
          return newTranscript;
        });
        
        // Show interim results
        if (interimTranscript) {
          setTranscription(prev => prev + interimTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        // Handle specific error types
        switch (event.error) {
          case 'no-speech':
            // Don't stop recording for no-speech, just show a message
            console.log('No speech detected. Please speak louder or check your microphone.');
            setSpeechStatus("No speech detected. Please speak louder or check your microphone.");
            // Clear status after 3 seconds
            setTimeout(() => setSpeechStatus(""), 3000);
            break;
          case 'audio-capture':
            console.error('No microphone found. Please check your microphone permissions.');
            setSpeechStatus("No microphone found. Please check your microphone permissions.");
            setIsRecording(false);
            isListeningRef.current = false;
            break;
          case 'not-allowed':
            console.error('Microphone permission denied. Please allow microphone access.');
            setSpeechStatus("Microphone permission denied. Please allow microphone access.");
            setIsRecording(false);
            isListeningRef.current = false;
            break;
          case 'network':
            console.error('Network error occurred. Please check your internet connection.');
            setSpeechStatus("Network error occurred. Please check your internet connection.");
            setIsRecording(false);
            isListeningRef.current = false;
            break;
          default:
            console.error('Speech recognition error:', event.error);
            setSpeechStatus(`Speech recognition error: ${event.error}`);
            setIsRecording(false);
            isListeningRef.current = false;
        }
      };
      
      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setSpeechStatus("Listening... Speak now!");
      };
      
      recognitionRef.current.onend = () => {
        if (isListeningRef.current) {
          // Restart if still supposed to be listening
          recognitionRef.current.start();
        }
      };
    }
  }, [timeElapsed]);
  
  // Timer for speech duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeElapsed < speakers[currentSpeaker]?.time * 60) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          // Update debate context with current speech time
          setDebateContext(ctx => ({
            ...ctx,
            speechTime: newTime
          }));
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeElapsed, currentSpeaker, speakers]);

  // Fetch AI speech for current speaker if AI (simulate: all except first speaker is AI)
  useEffect(() => {
    const fetchAiSpeech = async () => {
      if (currentSpeaker === 0) return; // Assume first speaker is human
      setAiLoading(true);
      setAiError(null);
      try {
        const speaker = speakers[currentSpeaker];
        const speech = await generateDebateSpeech({
          motion: debateContext.motion,
          format: debateContext.format,
          side: speaker.side,
          role: speaker.role,
          level: debateContext.level,
          context: debateContext
        });
        setAiSpeeches(prev => {
          const updated = [...prev];
          updated[currentSpeaker] = speech;
          return updated;
        });
        setDebateContext((ctx: any) => ({
          ...ctx,
          speeches: [...(ctx.speeches || []), { role: speaker.role, side: speaker.side, text: speech }]
        }));
      } catch (err: any) {
        setAiError(err.message || "Failed to generate AI speech.");
      } finally {
        setAiLoading(false);
      }
    };
    fetchAiSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSpeaker]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          isListeningRef.current = true;
          setIsRecording(true);
          setTranscription("");
          setSpeechStatus("Starting speech recognition...");
        } catch (error) {
          console.error('Failed to start speech recognition:', error);
          setSpeechStatus("Failed to start speech recognition. Please check microphone permissions.");
        }
      } else {
        // Fallback: simulate transcription
        setIsRecording(true);
        setTranscription("Honorable Speaker, the motion before us today represents a critical juncture in our democratic discourse...");
        setSpeechStatus("Speech recognition not available. Using fallback mode.");
      }
    } else {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        isListeningRef.current = false;
      }
      setIsRecording(false);
      setSpeechStatus("Recording stopped.");
      // Clear status after 2 seconds
      setTimeout(() => setSpeechStatus(""), 2000);
    }
  };

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSpeaker = () => {
    if (currentSpeaker < speakers.length - 1) {
      setCurrentSpeaker(currentSpeaker + 1);
      setTimeElapsed(0);
      setTranscription("");
      setIsRecording(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        isListeningRef.current = false;
      }
    }
  };

  // Handle POI request with enhanced context
  const requestPOI = async () => {
    setPoiRequested(true);
    setPoiLoading(true);
    setPoiError(null);
    setPoiText(null);
    try {
      const speaker = speakers[currentSpeaker];
      const poi = await generatePOI({
        motion: debateContext.motion,
        format: debateContext.format,
        side: speaker.side,
        role: speaker.role,
        context: {
          ...debateContext,
          currentSpeech: transcription,
          speechTime: timeElapsed
        }
      });
      setPoiText(poi);
      setDebateContext((ctx: any) => ({
        ...ctx,
        pois: [...(ctx.pois || []), { role: speaker.role, side: speaker.side, text: poi }]
      }));
    } catch (err: any) {
      setPoiError(err.message || "Failed to generate POI.");
    } finally {
      setPoiLoading(false);
    }
  };

  const handleFinishRound = () => {
    // Save debate context for adjudication
    (window as any).__DEBATE_CONTEXT__ = debateContext;
    navigate('/verdict');
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20 relative overflow-hidden">
      <ParticleBackground particleCount={30} />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Debate Arena
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto mb-6">
            {debateContext.motion}
          </p>
          <div className="flex justify-center space-x-4 items-center">
            <span className="px-4 py-2 rounded-xl bg-primary/20 text-primary font-medium">{format === "AP" ? "Asian Parliamentary" : format === "BP" ? "British Parliamentary" : "World Schools"}</span>
            <span className="px-4 py-2 rounded-xl bg-accent/20 text-accent font-medium">Live Round</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <BookOpen className="w-5 h-5 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <a href={manualLinks[format]} target="_blank" rel="noopener noreferrer" className="underline text-primary">View {format} Manual</a>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Speaker Order & Timer */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="neu-card p-6 mb-6">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center text-gradient">
                <Users className="w-5 h-5 mr-2" />
                Speaker Order
              </h3>
              <div className="space-y-3">
                {speakers.map((speaker, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      index === currentSpeaker 
                        ? `border-${speaker.color} bg-${speaker.color}/10 shadow-lg` 
                        : 'border-card-border bg-card/30'
                    } ${index < currentSpeaker ? 'opacity-60' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`font-semibold ${index === currentSpeaker ? `text-${speaker.color}` : 'text-foreground'}`}>
                          {speaker.role}
                        </div>
                        <div className="text-sm text-foreground-secondary">{speaker.side}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-lg">
                          {index === currentSpeaker ? formatTime(timeElapsed) : `${speaker.time}:00`}
                        </div>
                        {index === currentSpeaker && (
                          <Progress 
                            value={(timeElapsed / (speaker.time * 60)) * 100} 
                            className="w-20 h-2 mt-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="neu-card p-6">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Controls</h3>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button 
                    onClick={togglePlaying}
                    className={`flex-1 ${isPlaying ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isPlaying ? 'Pause' : 'Start'}
                  </Button>
                  <Button 
                    onClick={nextSpeaker}
                    variant="outline"
                    className="border-card-border hover:border-primary"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>

                <Button 
                  onClick={requestPOI}
                  className={`w-full ${poiRequested ? 'bg-warning text-warning-foreground' : 'btn-secondary'}`}
                >
                  <Hand className="w-5 h-5 mr-2" />
                  {poiRequested ? 'POI Requested' : 'Request POI'}
                </Button>

                <Button 
                  onClick={toggleRecording}
                  className={`w-full ${isRecording ? 'bg-destructive text-destructive-foreground animate-pulse-glow' : 'btn-secondary'}`}
                >
                  {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                
                {/* Speech Status Message */}
                {speechStatus && (
                  <div className={`p-3 rounded-lg text-sm text-center ${
                    speechStatus.includes('error') || speechStatus.includes('denied') || speechStatus.includes('found') 
                      ? 'bg-red-100 text-red-700 border border-red-300' 
                      : speechStatus.includes('Listening') 
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  }`}>
                    {speechStatus}
                  </div>
                )}
                
                <Button 
                  onClick={() => navigate('/peer-match')}
                  className="w-full btn-secondary mb-4"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Find Peer Match
                </Button>
                
                <Button 
                  onClick={handleFinishRound}
                  className="w-full btn-primary"
                >
                  Finish Round
                </Button>
              </div>
            </div>
          </div>

          {/* Main Arena */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            {/* Enhanced AI Avatar with Audio Visualizer */}
            <div className="neu-card p-8 text-center glass-ultra relative overflow-hidden">
              <div className="absolute inset-0 holographic opacity-5"></div>
              <div className="relative z-10">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto animate-pulse-glow liquid-morph">
                    {isPlaying ? <Brain className="w-16 h-16 text-white animate-pulse" /> : <Volume2 className="w-16 h-16 text-white" />}
                  </div>
                  {isPlaying && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="voice-wave-container">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className="voice-wave-bar"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Floating AI indicators */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/80 rounded-full flex items-center justify-center">
                    <Settings className="w-3 h-3 text-white animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-2 text-gradient">
                  AI {speakers[currentSpeaker]?.role}
                </h3>
                <p className="text-foreground-secondary mb-4">
                  Currently delivering {speakers[currentSpeaker]?.side} speech
                </p>
                <div className="text-lg font-mono text-primary neon-primary">
                  {formatTime(timeElapsed)} / {speakers[currentSpeaker]?.time}:00
                </div>
              </div>
            </div>

            {/* Advanced Audio Visualizer */}
            <AdvancedAudioVisualizer
              isRecording={isRecording}
              isPlaying={isPlaying}
              onToggleRecording={toggleRecording}
              onTogglePlayback={togglePlaying}
            />

            {/* Enhanced Live Transcription */}
            <div className="neu-card p-6 glass-ultra">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center text-gradient">
                <MessageSquare className="w-5 h-5 mr-2" />
                Live Transcription
                <div className="ml-auto">
                  {(isRecording || isPlaying) && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-xs text-accent">Live</span>
                    </div>
                  )}
                </div>
              </h3>
              <div className="bg-card/30 rounded-xl p-4 min-h-[200px] relative overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10">
                  {isRecording ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-primary">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse neon-primary"></div>
                        <span className="text-sm font-medium">Recording your speech...</span>
                        <div className="ml-auto flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-1 h-4 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">
                        {transcription}
                        <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse neon-primary"></span>
                      </p>
                    </div>
                  ) : isPlaying ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-secondary">
                        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">AI Speaking...</span>
                        <div className="ml-auto">
                          <Brain className="w-4 h-4 text-secondary animate-pulse" />
                        </div>
                      </div>
                      {aiLoading ? (
                        <p className="text-foreground leading-relaxed animate-pulse">Generating AI speech...</p>
                      ) : aiError ? (
                        <p className="text-red-600">{aiError}</p>
                      ) : (
                        <p className="text-foreground leading-relaxed">
                          {aiSpeeches[currentSpeaker] || "AI speech will appear here."}
                          <span className="inline-block w-2 h-5 bg-secondary ml-1 animate-pulse"></span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
                        <p className="text-muted-foreground">
                          Start the round or begin recording to see live transcription
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="neu-card p-4 text-center cursor-pointer motion-safe-hover transition-transform glass-ultra group">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary group-hover:animate-pulse" />
                <div className="text-sm text-foreground-secondary">Time Check</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <div className="neu-card p-4 text-center cursor-pointer motion-safe-hover transition-transform glass-ultra group">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-accent group-hover:animate-pulse" />
                <div className="text-sm text-foreground-secondary">Notes</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <div className="neu-card p-4 text-center cursor-pointer motion-safe-hover transition-transform glass-ultra group">
                <Users className="w-8 h-8 mx-auto mb-2 text-secondary group-hover:animate-pulse" />
                <div className="text-sm text-foreground-secondary">Observers</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <div className="neu-card p-4 text-center cursor-pointer motion-safe-hover transition-transform glass-ultra group relative">
                <Zap className="w-8 h-8 mx-auto mb-2 text-success group-hover:animate-pulse neon-primary" />
                <div className="text-sm text-foreground-secondary">AI Judge</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-success/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* POI Popup Simulation */}
        {poiRequested && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="neu-card p-6 max-w-md mx-4 animate-scale-in">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Point of Information</h3>
              {poiLoading ? (
                <p className="text-foreground-secondary mb-6 animate-pulse">Generating POI...</p>
              ) : poiError ? (
                <p className="text-red-600 mb-6">{poiError}</p>
              ) : (
                <p className="text-foreground-secondary mb-6">{poiText || "POI will appear here."}</p>
              )}
              <div className="flex space-x-4">
                <Button 
                  onClick={() => setPoiRequested(false)}
                  className="flex-1 btn-primary"
                >
                  Accept POI
                </Button>
                <Button 
                  onClick={() => setPoiRequested(false)}
                  variant="outline"
                  className="flex-1 border-card-border"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Speech Notes Overlay */}
        <SpeechNotesOverlay />
      </div>
    </div>
  );
};

export default DebateArena;