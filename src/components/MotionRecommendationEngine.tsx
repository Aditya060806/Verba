import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, Target, Lightbulb, ArrowRight, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DebateMotion {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  estimatedTime: number;
  skillsTargeted: string[];
  aiConfidence: number;
  personalizedReason: string;
  trending: boolean;
}

const MotionRecommendationEngine = () => {
  const [recommendations, setRecommendations] = useState<DebateMotion[]>([]);
  const [selectedMotion, setSelectedMotion] = useState<string | null>(null);

  // Sample AI-generated recommendations
  const sampleMotions: DebateMotion[] = [
    {
      id: '1',
      title: 'This House Would Ban All Social Media for Under-16s',
      description: 'A timely motion exploring digital rights, child protection, and parental responsibility in the social media age.',
      difficulty: 'intermediate',
      category: 'Technology & Society',
      estimatedTime: 45,
      skillsTargeted: ['Evidence Analysis', 'Stakeholder Impact', 'Counter-arguments'],
      aiConfidence: 94,
      personalizedReason: 'Based on your recent improvement in evidence presentation, this motion will challenge your stakeholder analysis skills.',
      trending: true
    },
    {
      id: '2',
      title: 'This House Believes AI Will Make Traditional Education Obsolete',
      description: 'Explore the future of learning in an AI-dominated world and the role of human teachers.',
      difficulty: 'advanced',
      category: 'Education & Technology',
      estimatedTime: 50,
      skillsTargeted: ['Future Speculation', 'Technical Arguments', 'Value Hierarchies'],
      aiConfidence: 87,
      personalizedReason: 'Your strong analytical skills make you perfect for this complex technological debate.',
      trending: false
    },
    {
      id: '3',
      title: 'This House Would Implement Universal Basic Income',
      description: 'A classic economic policy debate examining poverty, work incentives, and social welfare.',
      difficulty: 'beginner',
      category: 'Economics & Policy',
      estimatedTime: 35,
      skillsTargeted: ['Economic Reasoning', 'Policy Analysis', 'Real-world Impact'],
      aiConfidence: 91,
      personalizedReason: 'Perfect for practicing economic arguments and building confidence with policy debates.',
      trending: false
    },
    {
      id: '4',
      title: 'This House Would Require Mandatory Climate Action from All Major Corporations',
      description: 'Environmental policy meets corporate responsibility in this urgent contemporary debate.',
      difficulty: 'expert',
      category: 'Environment & Business',
      estimatedTime: 60,
      skillsTargeted: ['Corporate Analysis', 'Environmental Science', 'Regulatory Framework'],
      aiConfidence: 89,
      personalizedReason: 'Your recent mastery of complex arguments suggests you\'re ready for expert-level corporate debates.',
      trending: true
    }
  ];

  useEffect(() => {
    // Simulate AI analysis and personalized recommendations
    const timer = setTimeout(() => {
      setRecommendations(sampleMotions);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/20 border-success/20';
      case 'intermediate': return 'text-primary bg-primary/20 border-primary/20';
      case 'advanced': return 'text-accent bg-accent/20 border-accent/20';
      case 'expert': return 'text-secondary bg-secondary/20 border-secondary/20';
      default: return 'text-foreground-secondary bg-muted/20 border-muted/20';
    }
  };

  const startPractice = (motionId: string) => {
    setSelectedMotion(motionId);
    // Here you would typically navigate to the practice session
    console.log('Starting practice with motion:', motionId);
  };

  return (
    <Card className="glass-ultra border border-primary/20">
      <CardHeader>
        <CardTitle className="text-gradient flex items-center">
          <Brain className="w-6 h-6 mr-2" />
          AI Motion Recommendations
          <div className="ml-auto">
            <Badge className="bg-accent/20 text-accent border-accent/20">
              Personalized
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <div className="loading-elegant w-full h-2 bg-muted rounded-full mb-4">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
            <p className="text-foreground-secondary">AI is analyzing your debate history to generate personalized recommendations...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((motion, index) => (
              <Card
                key={motion.id}
                className={`transition-all duration-300 hover:border-primary/40 cursor-pointer group relative overflow-hidden ${
                  selectedMotion === motion.id ? 'border-primary bg-primary/5' : 'border-border/20'
                }`}
                onClick={() => setSelectedMotion(motion.id)}
              >
                <CardContent className="p-6">
                  {/* Background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {motion.title}
                          </h3>
                          {motion.trending && (
                            <Badge className="bg-accent/20 text-accent border-accent/20 animate-pulse">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground-secondary mb-3 leading-relaxed">
                          {motion.description}
                        </p>
                      </div>
                      
                      <div className="ml-4 text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-accent">
                            {motion.aiConfidence}%
                          </span>
                        </div>
                        <div className="text-xs text-foreground-secondary">
                          AI Match
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getDifficultyColor(motion.difficulty)}>
                        {motion.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {motion.estimatedTime} min
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {motion.category}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-1 text-primary" />
                        Skills Targeted
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {motion.skillsTargeted.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs border-primary/20 text-primary/80"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 mb-4">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-accent mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-accent mb-1">
                            Why This Motion?
                          </div>
                          <div className="text-sm text-foreground-secondary">
                            {motion.personalizedReason}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-foreground-secondary">
                          Confidence Score
                        </span>
                        <Progress 
                          value={motion.aiConfidence} 
                          className="w-20 h-2"
                        />
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          startPractice(motion.id);
                        }}
                        className="group/btn"
                        size="sm"
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Start Practice
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI Insights
              </span>
            </div>
            <p className="text-sm text-foreground-secondary">
              Based on your recent performance, we recommend starting with the {recommendations[0]?.difficulty} level motion. 
              Your argument structure has improved by 23% this week, making you ready for more complex topics.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MotionRecommendationEngine;