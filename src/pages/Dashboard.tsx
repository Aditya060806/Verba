import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Zap, 
  Clock, 
  Star, 
  Users, 
  Play,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Brain,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Medal
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Current Level", value: "7", icon: Trophy, color: "text-yellow-600" },
    { label: "XP Points", value: "2,340", icon: Star, color: "text-purple-600" },
    { label: "Debates Won", value: "15", icon: Target, color: "text-green-600" },
    { label: "Study Streak", value: "12 days", icon: Zap, color: "text-orange-600" }
  ];

  const learningModules = [
    {
      id: 1,
      title: "Debate Fundamentals",
      description: "Learn the basics of argumentation and debate structure",
      progress: 85,
      duration: "45 min",
      difficulty: "Beginner",
      unlocked: true
    },
    {
      id: 2,
      title: "British Parliamentary Format",
      description: "Master the BP format used in World Championships",
      progress: 60,
      duration: "60 min",
      difficulty: "Intermediate",
      unlocked: true
    },
    {
      id: 3,
      title: "Advanced Rebuttals",
      description: "Craft powerful responses to opponent arguments",
      progress: 30,
      duration: "50 min",
      difficulty: "Advanced",
      unlocked: true
    },
    {
      id: 4,
      title: "Fallacy Detection",
      description: "Identify and counter logical fallacies effectively",
      progress: 0,
      duration: "40 min",
      difficulty: "Intermediate",
      unlocked: false
    }
  ];

  const achievements = [
    { title: "First Debate", description: "Completed your first practice debate", earned: true, icon: Trophy },
    { title: "Streak Master", description: "Maintained a 7-day learning streak", earned: true, icon: Zap },
    { title: "Perfect Score", description: "Scored 100% on a module quiz", earned: true, icon: Star },
    { title: "Fallacy Hunter", description: "Detected 10 logical fallacies", earned: false, icon: Brain },
    { title: "Tournament Champion", description: "Won your first tournament", earned: false, icon: Medal },
    { title: "Peer Mentor", description: "Helped 5 other debaters", earned: false, icon: Users }
  ];

  const recentActivity = [
    { action: "Completed Daily Challenge", time: "2 hours ago", points: "+25" },
    { action: "Won Debate vs AI", time: "1 day ago", points: "+50" },
    { action: "Finished BP Module", time: "2 days ago", points: "+100" },
    { action: "Achieved 7-day streak", time: "3 days ago", points: "+75" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-gray-600">
            Ready to continue your debate mastery journey? You're doing great!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  Learning Modules
                </CardTitle>
                <CardDescription>
                  Continue your learning journey with our structured modules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningModules.map((module) => (
                  <div 
                    key={module.id}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      module.unlocked ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${module.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                          {module.title}
                        </h3>
                        <p className={`text-sm ${module.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {module.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={module.difficulty === 'Beginner' ? 'secondary' : 
                                     module.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                          {module.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                        <span>{module.progress}% complete</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/learning-module/${module.id}`)}
                        disabled={!module.unlocked}
                        className={module.unlocked ? 
                          "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" :
                          ""
                        }
                      >
                        {module.unlocked ? (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            {module.progress > 0 ? 'Continue' : 'Start'}
                          </>
                        ) : (
                          '🔒 Locked'
                        )}
                      </Button>
                    </div>
                    
                    {module.unlocked && (
                      <div className="mt-3">
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={() => navigate('/debate-arena')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Start Debate
                </Button>
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => navigate('/daily-challenge')}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Daily Challenge
                </Button>
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => navigate('/peer-match')}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Find Peer Match
                </Button>
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  onClick={() => navigate('/case-prep')}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Case Preparation
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <achievement.icon className={`w-4 h-4 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">{activity.points}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Debates Completed</span>
                  <span className="text-sm font-bold text-gray-900">8/10</span>
                </div>
                <Progress value={80} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Learning Time</span>
                  <span className="text-sm font-bold text-gray-900">6.5/10 hrs</span>
                </div>
                <Progress value={65} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Challenges Solved</span>
                  <span className="text-sm font-bold text-gray-900">5/7</span>
                </div>
                <Progress value={71} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Ready for a Challenge?</h2>
                  <p className="text-indigo-100 mb-4">
                    Test your fallacy detection skills with today's daily challenge
                  </p>
                  <Button 
                    onClick={() => navigate('/daily-challenge')}
                    className="bg-white text-indigo-600 hover:bg-gray-100"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Take Daily Challenge
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="hidden md:block">
                  <Brain className="w-24 h-24 text-white/20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 