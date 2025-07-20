import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Trophy, Zap, TrendingUp, Users, Clock, Target, ChevronRight, Sparkles, BookOpen, Mic, Brain, Star, Calendar } from "lucide-react";
import GlossaryModal from "@/components/GlossaryModal";
import TutorialModal from "@/components/TutorialModal";
import EnhancedButton from "@/components/EnhancedButton";
import ProgressIndicator from "@/components/ProgressIndicator";
import UserRankBadge from "@/components/UserRankBadge";
import ParticleBackground from "@/components/ui/particle-background";
import RealTimeStats from "@/components/RealTimeStats";
import SmartNotifications from "@/components/SmartNotifications";
import AIPersonalitySelector from "@/components/AIPersonalitySelector";
import MotionRecommendationEngine from "@/components/MotionRecommendationEngine";

const Home = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);

  useEffect(() => {
    setWelcomeAnimation(true);
  }, []);

  const handleTutorialClose = () => {
    setShowTutorial(false);
  };

  const handleQuickStart = async () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      navigate("/case-prep");
    }, 1000);
  };

  const stats = [
    { icon: Trophy, label: "Debates Won", value: "127", progress: 85, color: "text-accent" },
    { icon: Target, label: "Win Rate", value: "84%", progress: 84, color: "text-primary" },
    { icon: Clock, label: "Practice Hours", value: "156", progress: 78, color: "text-secondary" },
    { icon: Users, label: "Global Rank", value: "#1,242", progress: 92, color: "text-success" },
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Get real-time feedback on your arguments, delivery, and strategy",
      gradient: "from-primary to-accent",
    },
    {
      icon: Users,
      title: "Multi-Format Support",
      description: "Practice Asian Parliamentary, British Parliamentary, and World Schools",
      gradient: "from-secondary to-primary",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Monitor your improvement with detailed analytics and insights",
      gradient: "from-accent to-secondary",
    },
  ];

  return (
    <div role="main" className="min-h-screen bg-animated-gradient pt-20 relative overflow-hidden">
      <ParticleBackground />
      <SmartNotifications />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section with Enhanced Effects */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block mb-6 transform-3d">
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-gradient leading-tight parallax-card">
              Master the Art
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse-glow opacity-60 liquid-morph"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/30 rounded-full float-physics"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 magnetic-hover">
            of <span className="text-glow neon-primary">Debate</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            AI <span className="text-primary">▪︎</span> POI <span className="text-accent">▪︎</span> Judge <span className="text-secondary">▪︎</span> Without Limits
          </p>

          {/* Quick Access Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="glass-ultra px-4 py-2 rounded-full text-sm text-primary flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Voice Recognition</span>
            </div>
            <div className="glass-ultra px-4 py-2 rounded-full text-sm text-accent flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>AI Analysis</span>
            </div>
            <div className="glass-ultra px-4 py-2 rounded-full text-sm text-secondary flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Real-time Feedback</span>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <EnhancedButton
              variant="primary"
              size="lg"
              icon={Play}
              loading={isLoading}
              onClick={handleQuickStart}
              className="group morph-button holographic"
            >
              Start Practice
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="lg"
              icon={Brain}
              onClick={() => navigate("/learning")}
              className="micro-bounce"
            >
              Start Learning
            </EnhancedButton>

            <EnhancedButton
              variant="outline"
              size="lg"
              icon={Trophy}
              onClick={() => navigate("/past-rounds")}
              className="interactive-press"
            >
              Past Rounds
            </EnhancedButton>

            <EnhancedButton
              variant="outline"
              size="lg"
              icon={Calendar}
              onClick={() => navigate("/daily-challenge")}
              className="interactive-press"
            >
              Daily Challenge
            </EnhancedButton>
          </div>
        </div>

        {/* Real-time Statistics Dashboard */}
        <RealTimeStats />

        {/* Enhanced User Stats and Rank */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-animation">
          {stats.map((stat, index) => (
            <div key={index} className="neu-card p-6 text-center group motion-safe-hover transition-all duration-300 relative overflow-hidden glass-ultra">
              <div className="relative z-10">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform animate-glow`} />
                <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-foreground-secondary mb-3">{stat.label}</div>
                <ProgressIndicator 
                  value={stat.progress} 
                  size="sm" 
                  variant="primary"
                  showPercentage={false}
                />
              </div>
              {/* Enhanced background effects */}
              <div className="absolute top-2 right-2 opacity-30">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <UserRankBadge />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-heading font-bold text-center mb-12 text-gradient">
            Why Choose Verba?
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-animation">
            {features.map((feature, index) => (
              <div key={index} className="debate-card group glass-ultra parallax-card">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform liquid-morph`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h4>
                <p className="text-foreground-secondary leading-relaxed">{feature.description}</p>
                
                {/* Enhanced interactive elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star className="w-4 h-4 text-accent animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Personality Selector */}
        <div className="mb-16">
          <AIPersonalitySelector />
        </div>

        {/* Motion Recommendation Engine */}
        <div className="mb-16">
          <MotionRecommendationEngine />
        </div>



        {/* Enhanced Quick Start Section */}
        <div className="neu-card p-8 text-center animate-fade-in glass-ultra relative overflow-hidden">
          <div className="absolute inset-0 holographic opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-heading font-bold mb-4 text-gradient">
              Ready to Begin Your Debate Journey?
            </h3>
            <p className="text-foreground-secondary mb-6 max-w-2xl mx-auto">
              Join thousands of debaters improving their skills with AI-powered practice sessions, 
              real-time feedback, and comprehensive performance analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                variant="primary"
                size="md"
                icon={Zap}
                onClick={() => navigate("/debate-arena")}
                className="morph-button"
              >
                Enter Arena
              </EnhancedButton>
              <EnhancedButton
                variant="secondary"
                size="md"
                icon={TrendingUp}
                onClick={() => navigate("/profile")}
                className="micro-bounce"
              >
                View Analytics
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="fixed top-32 left-8 w-4 h-4 bg-primary/30 rounded-full float-physics liquid-morph"></div>
      <div className="fixed top-48 right-12 w-6 h-6 bg-accent/30 rounded-full float-physics" style={{ animationDelay: "1s" }}></div>
      <div className="fixed bottom-32 left-16 w-3 h-3 bg-secondary/30 rounded-full float-physics liquid-morph" style={{ animationDelay: "2s" }}></div>
      <div className="fixed top-1/2 left-4 w-2 h-2 bg-primary/40 rounded-full float-physics" style={{ animationDelay: "3s" }}></div>
      <div className="fixed bottom-48 right-8 w-5 h-5 bg-accent/25 rounded-full float-physics liquid-morph" style={{ animationDelay: "4s" }}></div>

      {/* Floating Components */}
      <GlossaryModal />
      <TutorialModal isOpen={showTutorial} onClose={handleTutorialClose} />
    </div>
  );
};

export default Home;