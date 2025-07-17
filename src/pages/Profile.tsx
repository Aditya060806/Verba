import { useState } from "react";
import { User, Trophy, TrendingUp, Settings, Download, Edit, Award, BarChart3, Target, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  
  const userProfile = {
    name: "Alex Chen",
    email: "alex.chen@university.edu",
    university: "Stanford University",
    debateClub: "Stanford Debate Society",
    memberSince: "September 2023",
    rank: "Advanced Debater",
    rankProgress: 75,
    nextRank: "Expert Debater"
  };

  const achievements = [
    { icon: Trophy, title: "First Victory", description: "Won your first debate round", date: "Jan 2024", rarity: "Common" },
    { icon: Target, title: "Perfect Score", description: "Achieved a perfect 100 score", date: "Jan 2024", rarity: "Rare" },
    { icon: Zap, title: "Speed Demon", description: "Completed 10 rounds in one day", date: "Dec 2023", rarity: "Epic" },
    { icon: Award, title: "Consistency King", description: "Won 10 rounds in a row", date: "Dec 2023", rarity: "Legendary" },
  ];

  const analytics = {
    totalRounds: 127,
    wins: 107,
    winRate: 84,
    avgScore: 87,
    favoriteFormat: "Asian Parliamentary",
    strongestSide: "Government",
    improvementAreas: ["Economic Arguments", "Statistical Analysis"],
    recentTrend: "Improving"
  };

  const performanceData = [
    { month: "Sep", score: 65, rounds: 8 },
    { month: "Oct", score: 72, rounds: 15 },
    { month: "Nov", score: 78, rounds: 22 },
    { month: "Dec", score: 84, rounds: 31 },
    { month: "Jan", score: 87, rounds: 51 },
  ];

  const settings = {
    preferredFormat: "Asian Parliamentary",
    skillLevel: "Advanced",
    notifications: true,
    darkMode: true,
    autoSave: true
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Profile
          </h1>
          <p className="text-xl text-foreground-secondary">
            Track your progress and customize your experience
          </p>
        </div>

        {/* Profile Header */}
        <div className="neu-card p-8 mb-8 animate-slide-in-up">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-heading font-bold text-gradient mb-2">{userProfile.name}</h2>
              <p className="text-foreground-secondary mb-1">{userProfile.email}</p>
              <p className="text-foreground-secondary mb-3">{userProfile.university} • {userProfile.debateClub}</p>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                    {userProfile.rank}
                  </span>
                  <span className="text-sm text-foreground-secondary">
                    Member since {userProfile.memberSince}
                  </span>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setEditMode(!editMode)}
              variant="outline" 
              className="border-card-border hover:border-primary"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Rank Progress */}
          <div className="mt-6 p-4 rounded-xl bg-card/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress to {userProfile.nextRank}</span>
              <span className="text-sm text-primary font-medium">{userProfile.rankProgress}%</span>
            </div>
            <Progress value={userProfile.rankProgress} className="h-3" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-card/50 border border-card-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Quick Stats */}
              <div className="neu-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-card/30">
                    <Trophy className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold text-accent">{analytics.wins}</div>
                    <div className="text-sm text-foreground-secondary">Wins</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-card/30">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">{analytics.winRate}%</div>
                    <div className="text-sm text-foreground-secondary">Win Rate</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-card/30">
                    <BarChart3 className="w-6 h-6 mx-auto mb-2 text-secondary" />
                    <div className="text-2xl font-bold text-secondary">{analytics.avgScore}</div>
                    <div className="text-sm text-foreground-secondary">Avg Score</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-card/30">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-success" />
                    <div className="text-2xl font-bold text-success">{analytics.totalRounds}</div>
                    <div className="text-sm text-foreground-secondary">Rounds</div>
                  </div>
                </div>
              </div>

              {/* Performance Trend */}
              <div className="neu-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Performance Trend</h3>
                <div className="space-y-3">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{data.month}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 h-2 bg-card-border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                            style={{ width: `${data.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-primary font-medium w-8">{data.score}</span>
                        <span className="text-xs text-foreground-secondary w-12">{data.rounds} rounds</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="neu-card p-6">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Debate Preferences</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <div className="text-sm text-foreground-secondary mb-1">Favorite Format</div>
                  <div className="font-semibold text-primary">{analytics.favoriteFormat}</div>
                </div>
                <div>
                  <div className="text-sm text-foreground-secondary mb-1">Strongest Side</div>
                  <div className="font-semibold text-accent">{analytics.strongestSide}</div>
                </div>
                <div>
                  <div className="text-sm text-foreground-secondary mb-1">Recent Trend</div>
                  <div className="font-semibold text-success flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {analytics.recentTrend}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="neu-card p-6 hover:scale-105 transition-transform animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      achievement.rarity === "Legendary" ? "bg-gradient-to-r from-accent to-primary" :
                      achievement.rarity === "Epic" ? "bg-gradient-to-r from-primary to-secondary" :
                      achievement.rarity === "Rare" ? "bg-gradient-to-r from-secondary to-accent" :
                      "bg-gradient-to-r from-card to-card-secondary"
                    }`}>
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          achievement.rarity === "Legendary" ? "bg-accent/20 text-accent" :
                          achievement.rarity === "Epic" ? "bg-primary/20 text-primary" :
                          achievement.rarity === "Rare" ? "bg-secondary/20 text-secondary" :
                          "bg-muted/20 text-muted-foreground"
                        }`}>
                          {achievement.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-secondary mb-2">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="neu-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Improvement Areas</h3>
                <div className="space-y-4">
                  {analytics.improvementAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-card/30">
                      <span className="text-foreground">{area}</span>
                      <span className="text-sm text-warning">Focus Area</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="neu-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Download Reports</h3>
                <div className="space-y-3">
                  <Button className="w-full btn-secondary flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Performance Report (PDF)</span>
                  </Button>
                  <Button className="w-full btn-secondary flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Round History (CSV)</span>
                  </Button>
                  <Button className="w-full btn-secondary flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Achievement Report</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="neu-card p-6">
              <h3 className="text-xl font-heading font-semibold mb-6 text-gradient">Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Email Notifications</div>
                    <div className="text-sm text-foreground-secondary">Receive updates about new features and rounds</div>
                  </div>
                  <Switch checked={settings.notifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Auto-save Progress</div>
                    <div className="text-sm text-foreground-secondary">Automatically save your debate progress</div>
                  </div>
                  <Switch checked={settings.autoSave} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Advanced Analytics</div>
                    <div className="text-sm text-foreground-secondary">Enable detailed performance tracking</div>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;