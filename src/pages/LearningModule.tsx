import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Clock, 
  Target,
  Brain,
  MessageSquare,
  BookOpen,
  Video,
  Zap,
  Star,
  Trophy
} from "lucide-react";
import ParticleBackground from "@/components/ui/particle-background";
import ArgumentBuilder from "@/components/ArgumentBuilder";
import QuizComponent from "@/components/QuizComponent";

const LearningModule = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const moduleData = {
    title: "Debate Fundamentals",
    description: "Master the basics of argumentation and debate structure",
    totalSections: 8,
    estimatedTime: "75 minutes",
    difficulty: "Beginner",
    xpReward: 200,
    sections: [
      {
        title: "Introduction to Debating",
        type: "video",
        content: "Comprehensive introduction to 3v3 debating fundamentals",
        duration: "22 min",
        description: "Learn the core principles of competitive debating"
      },
      {
        title: "Debating Skills Overview",
        type: "video", 
        content: "Essential debating skills and techniques for beginners",
        duration: "8 min",
        description: "Master fundamental debating techniques"
      },
      {
        title: "How to Debate for Beginners",
        type: "video",
        content: "Practical guide to debating ideas constructively",
        duration: "15 min", 
        description: "Practical application of debate skills"
      },
      {
        title: "What is Debate?",
        type: "theory",
        content: "Introduction to debate as an art form and skill",
        duration: "8 min",
        description: "Understanding the philosophy of debate"
      },
      {
        title: "Argument Structure",
        type: "interactive",
        content: "Learn the basic components of a strong argument",
        duration: "12 min",
        description: "Build arguments using our interactive tool"
      },
      {
        title: "Types of Evidence",
        type: "reading",
        content: "Understanding different forms of evidence and their strength",
        duration: "10 min",
        description: "Learn to evaluate and use evidence effectively"
      },
      {
        title: "Practice Exercise",
        type: "quiz",
        content: "Test your understanding with interactive exercises",
        duration: "10 min",
        description: "Test your knowledge with our quiz"
      },
      {
        title: "AI Feedback Session",
        type: "ai-chat",
        content: "Get personalized feedback from our AI debate coach",
        duration: "5 min",
        description: "Get personalized feedback from our AI coach"
      }
    ]
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'youtube': return Video;
      case 'interactive': return Target;
      case 'reading': return BookOpen;
      case 'quiz': return Brain;
      case 'ai-chat': return MessageSquare;
      case 'theory': return BookOpen;
      default: return Play;
    }
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
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learning')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Learning
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <Card className="neu-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">{moduleData.title}</CardTitle>
                <CardDescription>{moduleData.description}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{moduleData.difficulty}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {moduleData.estimatedTime}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  {moduleData.sections.map((section, index) => {
                    const SectionIcon = getSectionIcon(section.type);
                    const isCompleted = completedSections.includes(index);
                    const isCurrent = index === currentSection;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => setCurrentSection(index)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          isCurrent 
                            ? 'bg-primary/10 border-2 border-primary/20' 
                            : isCompleted
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-card/50 border border-border hover:bg-card/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent
                              ? 'bg-primary text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <SectionIcon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground">
                              {section.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">{section.duration}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
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
                          <p>Video Content</p>
                          <p className="text-sm opacity-70">{moduleData.sections[currentSection].content}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Play Video
                      </Button>
                      <div className="text-sm text-muted-foreground">
                        Duration: {moduleData.sections[currentSection].duration}
                      </div>
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
                            <h4 className="font-semibold mb-2">What is Debate?</h4>
                            <p className="text-sm text-foreground-secondary">
                              Debate is a formal discussion on a particular topic where opposing arguments are put forward.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Why Debate Matters</h4>
                            <p className="text-sm text-foreground-secondary">
                              Debating develops critical thinking, public speaking, and analytical skills.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Debate Formats</h4>
                            <p className="text-sm text-foreground-secondary">
                              Different formats include Parliamentary, Policy, and Lincoln-Douglas debates.
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">The Art of Persuasion</h4>
                            <p className="text-sm text-foreground-secondary">
                              Learn to construct compelling arguments and present them effectively.
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
                      <Target className="w-16 h-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2">Argument Builder</h3>
                      <p className="text-foreground-secondary mb-4">
                        Use our interactive tool to build strong arguments
                      </p>
                    </div>
                    <ArgumentBuilder />
                  </div>
                )}

                {moduleData.sections[currentSection].type === "reading" && (
                  <div className="space-y-4">
                    <div className="prose prose-lg max-w-none">
                      <h3 className="text-xl font-semibold mb-4">Types of Evidence</h3>
                      <div className="space-y-4">
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Statistical Evidence</h4>
                            <p className="text-sm text-foreground-secondary">
                              Numbers, percentages, and data that support your claims. Example: "75% of studies show..."
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Expert Testimony</h4>
                            <p className="text-sm text-foreground-secondary">
                              Quotes from credible authorities in the field. Example: "According to Dr. Smith..."
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Historical Examples</h4>
                            <p className="text-sm text-foreground-secondary">
                              Past events that demonstrate your point. Example: "When this policy was implemented in 2020..."
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="neu-card">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-2">Case Studies</h4>
                            <p className="text-sm text-foreground-secondary">
                              Detailed analysis of specific instances. Example: "The case of Country X shows..."
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {moduleData.sections[currentSection].type === "quiz" && (
                  <div className="space-y-4">
                    <div className="text-center p-8 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg">
                      <Brain className="w-16 h-16 mx-auto mb-4 text-accent" />
                      <h3 className="text-xl font-semibold mb-2">Knowledge Check</h3>
                      <p className="text-foreground-secondary mb-4">
                        Test your understanding of debate fundamentals
                      </p>
                    </div>
                    <QuizComponent />
                  </div>
                )}

                {moduleData.sections[currentSection].type === "ai-chat" && (
                  <div className="space-y-4">
                    <div className="text-center p-8 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 text-secondary" />
                      <h3 className="text-xl font-semibold mb-2">AI Feedback Session</h3>
                      <p className="text-foreground-secondary mb-4">
                        Get personalized feedback from our AI debate coach
                      </p>
                      <Button onClick={() => navigate('/debate-arena')}>
                        Start AI Session
                        <ChevronRight className="w-4 h-4 ml-2" />
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
        </div>
      </div>
    </div>
  );
};

export default LearningModule; 