import { useState, useEffect } from "react";
import { User, Trophy, TrendingUp, Settings, Download, Edit, Award, BarChart3, Target, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  
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

  // Scaffold: fetch user stats, badges, and round history (replace with backend/local storage integration)
  // For now, use static data
  useEffect(() => {
    setHistory([
      { date: "2024-01-15", format: "AP", role: "PM", result: "Win", score: 89 },
      { date: "2024-01-12", format: "BP", role: "CO", result: "Loss", score: 78 },
      { date: "2024-01-10", format: "AP", role: "DLO", result: "Win", score: 92 },
      { date: "2024-01-08", format: "WSDC", role: "Speaker 2", result: "Win", score: 85 },
    ]);
  }, []);
  // Badge/achievement tooltips
  const achievementDescriptions: Record<string, string> = {
    "First Victory": "Won your first debate round.",
    "Perfect Score": "Achieved a perfect 100 score.",
    "Speed Demon": "Completed 10 rounds in one day.",
    "Consistency King": "Won 10 rounds in a row."
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
            <div className="neu-card p-6">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Achievements & Badges</h3>
              <div className="flex flex-wrap gap-4">
                {achievements.map((ach, idx) => (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center p-4 rounded-xl bg-card/30 border border-card-border shadow hover:scale-105 transition-transform cursor-pointer">
                        <ach.icon className="w-8 h-8 mb-2 text-primary" />
                        <div className="font-semibold text-primary mb-1">{ach.title}</div>
                        <div className="text-xs text-foreground-secondary mb-1">{ach.date}</div>
                        <div className="text-xs text-muted-foreground">{ach.rarity}</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {achievementDescriptions[ach.title] || ach.description}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="neu-card p-6 mb-6">
              <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Round History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-foreground-secondary">
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Format</th>
                      <th className="px-4 py-2">Role</th>
                      <th className="px-4 py-2">Result</th>
                      <th className="px-4 py-2">Score</th>
                      <th className="px-4 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((round, idx) => (
                      <tr key={idx} className="hover:bg-card/20 transition-all">
                        <td className="px-4 py-2">{round.date}</td>
                        <td className="px-4 py-2">{round.format}</td>
                        <td className="px-4 py-2">{round.role}</td>
                        <td className={`px-4 py-2 font-semibold ${round.result === 'Win' ? 'text-success' : 'text-destructive'}`}>{round.result}</td>
                        <td className="px-4 py-2">{round.score}</td>
                        <td className="px-4 py-2">
                          <Button size="sm" variant="outline" className="border-card-border text-xs px-2 py-1 h-auto" onClick={() => window.location.href = '/past-rounds'}>
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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