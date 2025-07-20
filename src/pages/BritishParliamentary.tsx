import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Users, 
  Clock, 
  Target, 
  Play, 
  BookOpen, 
  Trophy, 
  Star,
  ChevronRight,
  MessageSquare,
  Zap,
  Brain,
  Award,
  Timer,
  Volume2,
  VolumeX,
  Maximize,
  Pause,
  RotateCcw,
  Lightbulb,
  TrendingUp,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Activity,
  CheckCircle,
  Video
} from "lucide-react";
import ParticleBackground from "@/components/ui/particle-background";

const BritishParliamentary = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 720, // 12 minutes
    isMuted: false,
    showCaptions: true
  });

  const moduleData = {
    title: "British Parliamentary Format",
    description: "Master the world's most prestigious debate format used in international competitions",
    totalSections: 6,
    estimatedTime: "90 minutes",
    difficulty: "Intermediate",
    xpReward: 250,
    sections: [
      {
        title: "Introduction to BP Format",
        type: "video",
        content: "Comprehensive overview of the British Parliamentary debate format",
        duration: "12 min",
        xp: 30,
        description: "Learn the fundamentals of BP debate structure and team roles"
      },
      {
        title: "The Four Teams Structure",
        type: "theory",
        content: "Understanding Opening Government, Opening Opposition, Closing Government, and Closing Opposition",
        duration: "15 min",
        xp: 40,
        description: "Master the unique four-team dynamic of BP debates"
      },
      {
        title: "Speaker Roles & Time Allocations",
        type: "theory",
        content: "Detailed breakdown of each speaker's responsibilities and timing",
        duration: "18 min",
        xp: 45,
        description: "Understand each speaker's specific role and timing requirements"
      },
      {
        title: "Points of Information (POIs)",
        type: "interactive",
        content: "Master the art of giving and taking POIs effectively",
        duration: "12 min",
        xp: 35,
        description: "Practice the crucial skill of POIs in BP format"
      },
      {
        title: "Judging Criteria & Whip Speeches",
        type: "theory",
        content: "Understanding how BP debates are judged and the importance of whip speeches",
        duration: "15 min",
        xp: 40,
        description: "Learn how BP debates are evaluated and the role of whip speeches"
      },
      {
        title: "BP Practice Session",
        type: "practice",
        content: "Apply your knowledge in a simulated BP debate round",
        duration: "20 min",
        xp: 50,
        description: "Put your skills to the test in a realistic BP debate scenario"
      }
    ]
  };

  const bpMotions = [
    "This House Would ban social media for under 16s",
    "This House Believes that universities should prioritize STEM subjects over humanities",
    "This House Would implement a four-day working week",
    "This House Believes that wealthy nations should open their borders to climate refugees",
    "This House Would ban private schools",
    "This House Would legalize all drugs",
    "This House Believes that artificial intelligence poses a greater threat than benefit to humanity",
    "This House Would abolish the death penalty worldwide",
    "This House Would require companies to have a maximum wage ratio",
    "This House Believes that developed nations should accept unlimited climate refugees"
  ];

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "theory": return BookOpen;
      case "interactive": return MessageSquare;
      case "practice": return Play;
      default: return Target;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex]);
    }
    if (sectionIndex < moduleData.sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    }
  };

  const progress = (completedSections.length / moduleData.totalSections) * 100;

  return (
    <div className="min-h-screen bg-animated-gradient pt-20 relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-primary mr-4" />
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient">
              British Parliamentary
            </h1>
          </div>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto mb-6">
            {moduleData.description}
          </p>
          
          {/* Module Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 text-foreground-secondary">
              <Clock className="w-5 h-5" />
              <span>{moduleData.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground-secondary">
              <Target className="w-5 h-5" />
              <span>{moduleData.totalSections} sections</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground-secondary">
              <Trophy className="w-5 h-5" />
              <span>{moduleData.xpReward} XP</span>
            </div>
            <Badge variant="secondary">{moduleData.difficulty}</Badge>
          </div>

          {/* Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-foreground-secondary mt-2">
              {completedSections.length} of {moduleData.totalSections} sections completed
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <Card className="neu-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-heading">
                      {moduleData.sections[currentSection].title}
                    </CardTitle>
                    <p className="text-foreground-secondary mt-2">
                      {moduleData.sections[currentSection].description}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{moduleData.sections[currentSection].duration}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content based on section type */}
                {moduleData.sections[currentSection].type === "video" && (
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-4" />
                          <p>BP Format Introduction Video</p>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span>{formatTime(videoState.currentTime)}</span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <Volume2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <Maximize className="w-4 h-4" />
                            </Button>
                          </div>
                          <span>{formatTime(videoState.duration)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" onClick={() => setVideoState({...videoState, isPlaying: !videoState.isPlaying})}>
                        {videoState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span className="ml-2">{videoState.isPlaying ? "Pause" : "Play"}</span>
                      </Button>
                      <Button variant="outline">
                        <RotateCcw className="w-4 h-4" />
                        <span className="ml-2">Restart</span>
                      </Button>
                    </div>
                  </div>
                )}

                {moduleData.sections[currentSection].type === "theory" && (
                  <div className="space-y-4">
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-xl font-semibold mb-4">Key Concepts</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Opening Government</h4>
                            <p className="text-sm text-foreground-secondary">
                              Sets the framework and presents the initial case for the motion.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Opening Opposition</h4>
                            <p className="text-sm text-foreground-secondary">
                              Challenges the government's case and presents opposition arguments.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Closing Government</h4>
                            <p className="text-sm text-foreground-secondary">
                              Extends the government case with new arguments and analysis.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Closing Opposition</h4>
                            <p className="text-sm text-foreground-secondary">
                              Extends opposition arguments and provides strong rebuttals.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {moduleData.sections[currentSection].type === "interactive" && (
                  <div className="space-y-4">
                    <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2">POI Practice</h3>
                      <p className="text-foreground-secondary mb-4">
                        Practice giving and taking Points of Information in BP format
                      </p>
                      <Button onClick={() => navigate('/debate-arena')}>
                        Start POI Practice
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {moduleData.sections[currentSection].type === "practice" && (
                  <div className="space-y-4">
                    <div className="text-center p-8 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg">
                      <Play className="w-16 h-16 mx-auto mb-4 text-accent" />
                      <h3 className="text-xl font-semibold mb-2">BP Practice Round</h3>
                      <p className="text-foreground-secondary mb-4">
                        Apply your knowledge in a full BP debate simulation
                      </p>
                      <Button onClick={() => navigate('/debate-arena')}>
                        Start Practice Round
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={() => handleSectionComplete(currentSection)}
                    className="flex items-center space-x-2"
                  >
                    {completedSections.includes(currentSection) ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.min(moduleData.sections.length - 1, currentSection + 1))}
                    disabled={currentSection === moduleData.sections.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Outline */}
            <Card className="neu-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Course Outline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moduleData.sections.map((section, index) => {
                    const Icon = getSectionIcon(section.type);
                    const isCompleted = completedSections.includes(index);
                    const isCurrent = index === currentSection;
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          isCurrent ? 'bg-primary/10 border border-primary/20' :
                          isCompleted ? 'bg-green-50 border border-green-200' :
                          'hover:bg-card/50'
                        }`}
                        onClick={() => setCurrentSection(index)}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500 text-white' :
                          isCurrent ? 'bg-primary text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isCurrent ? 'text-primary' : 'text-foreground'
                          }`}>
                            {section.title}
                          </p>
                          <p className="text-xs text-foreground-secondary">
                            {section.duration} • {section.xp} XP
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sample Motions */}
            <Card className="neu-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Sample BP Motions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bpMotions.slice(0, 5).map((motion, index) => (
                    <div key={index} className="p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-colors cursor-pointer">
                      <p className="text-sm font-medium">{motion}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => navigate('/motion-vault')}>
                    View More Motions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="neu-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" onClick={() => navigate('/case-prep')}>
                  <Target className="w-4 h-4 mr-2" />
                  Case Preparation
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/debate-arena')}>
                  <Play className="w-4 h-4 mr-2" />
                  Practice Round
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/learning')}>
                  <Brain className="w-4 h-4 mr-2" />
                  More Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BritishParliamentary; 