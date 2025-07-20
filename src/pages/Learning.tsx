import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Target, Users, Brain, Trophy, Zap, Clock, Star, ChevronRight, Play, Award, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizComponent from "@/components/QuizComponent";
import ParticleBackground from "@/components/ui/particle-background";

const Learning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const learningModules = [
    {
      id: "fundamentals",
      title: "Debate Fundamentals",
      description: "Master the basics of argumentation and debate structure",
      icon: Target,
      progress: 85,
      lessons: 12,
      duration: "2 hours",
      difficulty: "Beginner",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "parliamentary",
      title: "Parliamentary Formats",
      description: "Learn AP, BP, and World Schools debate formats",
      icon: Users,
      progress: 60,
      lessons: 18,
      duration: "3 hours",
      difficulty: "Intermediate",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "advanced",
      title: "Advanced Techniques",
      description: "Master rebuttals, POIs, and advanced argumentation",
      icon: Brain,
      progress: 30,
      lessons: 15,
      duration: "4 hours",
      difficulty: "Advanced",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "judging",
      title: "Debate Judging",
      description: "Learn how to evaluate and judge debate rounds",
      icon: Award,
      progress: 45,
      lessons: 10,
      duration: "2.5 hours",
      difficulty: "Intermediate",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const achievements = [
    { name: "First Debate", description: "Complete your first debate round", earned: true, icon: Trophy },
    { name: "Quiz Master", description: "Score 90%+ on any quiz", earned: true, icon: Star },
    { name: "Argument Builder", description: "Build 10 complete arguments", earned: false, icon: Target },
    { name: "Format Expert", description: "Complete all format modules", earned: false, icon: Users },
    { name: "Grandmaster", description: "Achieve 100% in all modules", earned: false, icon: Brain }
  ];

  const recentActivity = [
    { type: "quiz", title: "Completed Debate Fundamentals Quiz", score: "85%", time: "2 hours ago" },
    { type: "module", title: "Started Parliamentary Formats", progress: "Lesson 3/18", time: "1 day ago" },
    { type: "practice", title: "Practice Round - AP Format", result: "Won", time: "2 days ago" },
    { type: "achievement", title: "Earned 'Quiz Master' Badge", score: "", time: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-animated-gradient pt-20 relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Learning Center
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Master the art of debate through structured learning modules, interactive quizzes, and real-world practice
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Modules</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="neu-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">12</h3>
                  <p className="text-foreground-secondary">Lessons Completed</p>
                </CardContent>
              </Card>
              
              <Card className="neu-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">85%</h3>
                  <p className="text-foreground-secondary">Average Score</p>
                </CardContent>
              </Card>
              
              <Card className="neu-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">8.5h</h3>
                  <p className="text-foreground-secondary">Time Spent</p>
                </CardContent>
              </Card>
              
              <Card className="neu-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">3</h3>
                  <p className="text-foreground-secondary">Achievements</p>
                </CardContent>
              </Card>
            </div>

            {/* Featured Modules */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-gradient">Featured Modules</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {learningModules.slice(0, 2).map((module) => (
                  <Card key={module.id} className="neu-card hover:shadow-xl transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant={module.difficulty === "Beginner" ? "default" : module.difficulty === "Intermediate" ? "secondary" : "destructive"}>
                          {module.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <p className="text-foreground-secondary">{module.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between text-sm text-foreground-secondary">
                          <span>{module.lessons} lessons</span>
                          <span>{module.duration}</span>
                        </div>
                        <Button className="w-full" onClick={() => navigate("/module/fundamentals")}>
                          Start Module
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-gradient">Recent Activity</h2>
              <Card className="neu-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "quiz" ? "bg-blue-100 text-blue-600" :
                            activity.type === "module" ? "bg-purple-100 text-purple-600" :
                            activity.type === "practice" ? "bg-green-100 text-green-600" :
                            "bg-yellow-100 text-yellow-600"
                          }`}>
                            {activity.type === "quiz" ? <Brain className="w-4 h-4" /> :
                             activity.type === "module" ? <BookOpen className="w-4 h-4" /> :
                             activity.type === "practice" ? <Play className="w-4 h-4" /> :
                             <Trophy className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-foreground-secondary">{activity.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.score && <span className="text-sm font-medium text-primary">{activity.score}</span>}
                          {activity.progress && <span className="text-sm text-foreground-secondary">{activity.progress}</span>}
                          {activity.result && <span className="text-sm font-medium text-green-600">{activity.result}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-gradient">Learning Modules</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {learningModules.map((module) => (
                  <Card key={module.id} className="neu-card hover:shadow-xl transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant={module.difficulty === "Beginner" ? "default" : module.difficulty === "Intermediate" ? "secondary" : "destructive"}>
                          {module.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <p className="text-foreground-secondary">{module.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between text-sm text-foreground-secondary">
                          <span>{module.lessons} lessons</span>
                          <span>{module.duration}</span>
                        </div>
                        <Button className="w-full">
                          {module.progress > 0 ? "Continue Learning" : "Start Learning"}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-8">
            <QuizComponent />
          </TabsContent>

          <TabsContent value="progress" className="space-y-8">
            {/* Achievements */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-gradient">Achievements</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={`neu-card ${achievement.earned ? 'border-primary/50' : 'opacity-60'}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-gradient-to-r from-primary to-accent' : 'bg-muted'
                      }`}>
                        <achievement.icon className={`w-8 h-8 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                      </div>
                      <h3 className="font-semibold mb-2">{achievement.name}</h3>
                      <p className="text-sm text-foreground-secondary">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge className="mt-3" variant="default">
                          Earned
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Learning Path */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-gradient">Learning Path</h2>
              <Card className="neu-card">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {learningModules.map((module, index) => (
                      <div key={module.id} className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${module.color}`}>
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-foreground-secondary">{module.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{module.progress}%</div>
                          <Progress value={module.progress} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learning; 