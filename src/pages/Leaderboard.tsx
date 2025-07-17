import { useState } from "react";
import { Trophy, Medal, Award, Star, Crown, Filter, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Leaderboard = () => {
  const [filterBy, setFilterBy] = useState("overall");
  const [timeFrame, setTimeFrame] = useState("all-time");

  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "Alexandra Chen",
      avatar: "AC",
      points: 3420,
      wins: 89,
      totalRounds: 102,
      winRate: 87.3,
      currentRank: "Master Adjudicator",
      rankColor: "text-accent bg-accent/20",
      badges: ["POI Master", "Whip Winner", "Debate Veteran"],
      trend: "up",
      change: "+12"
    },
    {
      id: 2,
      rank: 2,
      name: "Marcus Rodriguez",
      avatar: "MR",
      points: 3180,
      wins: 76,
      totalRounds: 89,
      winRate: 85.4,
      currentRank: "Master Adjudicator",
      rankColor: "text-accent bg-accent/20",
      badges: ["Consistent Performer", "Versatile Debater"],
      trend: "up",
      change: "+3"
    },
    {
      id: 3,
      rank: 3,
      name: "Priya Sharma",
      avatar: "PS",
      points: 2890,
      wins: 68,
      totalRounds: 81,
      winRate: 84.0,
      currentRank: "Final Table Expert",
      rankColor: "text-warning bg-warning/20",
      badges: ["POI Master", "Prep Enthusiast"],
      trend: "up",
      change: "+7"
    },
    {
      id: 4,
      rank: 4,
      name: "James Wilson",
      avatar: "JW",
      points: 2650,
      wins: 59,
      totalRounds: 73,
      winRate: 80.8,
      currentRank: "Final Table Expert",
      rankColor: "text-warning bg-warning/20",
      badges: ["Whip Winner", "Debate Veteran"],
      trend: "down",
      change: "-2"
    },
    {
      id: 5,
      rank: 5,
      name: "Sarah Kim",
      avatar: "SK",
      points: 2420,
      wins: 54,
      totalRounds: 67,
      winRate: 80.6,
      currentRank: "Final Table Expert",
      rankColor: "text-warning bg-warning/20",
      badges: ["Consistent Performer"],
      trend: "up",
      change: "+1"
    },
    {
      id: 6,
      rank: 6,
      name: "David Thompson",
      avatar: "DT",
      points: 2180,
      wins: 47,
      totalRounds: 61,
      winRate: 77.0,
      currentRank: "Tactical Strategist",
      rankColor: "text-primary bg-primary/20",
      badges: ["POI Master", "Versatile Debater"],
      trend: "same",
      change: "0"
    },
    {
      id: 7,
      rank: 7,
      name: "Elena Volkov",
      avatar: "EV",
      points: 1950,
      wins: 41,
      totalRounds: 55,
      winRate: 74.5,
      currentRank: "Tactical Strategist",
      rankColor: "text-primary bg-primary/20",
      badges: ["Prep Enthusiast"],
      trend: "up",
      change: "+4"
    },
    {
      id: 8,
      rank: 8,
      name: "You",
      avatar: "YU",
      points: 1250,
      wins: 18,
      totalRounds: 23,
      winRate: 78.3,
      currentRank: "Tactical Strategist",
      rankColor: "text-primary bg-primary/20",
      badges: ["POI Master", "Whip Winner"],
      trend: "up",
      change: "+15",
      isCurrentUser: true
    }
  ];

  const getTrophyIcon = (rank: number) => {
    switch (rank) {
      case 1: return { icon: Crown, color: "text-warning" };
      case 2: return { icon: Trophy, color: "text-foreground-secondary" };
      case 3: return { icon: Medal, color: "text-amber-600" };
      default: return { icon: Award, color: "text-foreground-secondary" };
    }
  };

  const getTrendIcon = (trend: string, change: string) => {
    const changeNum = parseInt(change);
    if (trend === "up" || changeNum > 0) {
      return <TrendingUp className="w-4 h-4 text-success" />;
    } else if (trend === "down" || changeNum < 0) {
      return <TrendingUp className="w-4 h-4 text-destructive rotate-180" />;
    }
    return <div className="w-4 h-4 rounded-full bg-muted"></div>;
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            See how you stack up against the best debaters on Verba
          </p>
        </div>

        {/* Filters */}
        <div className="neu-card p-6 mb-8 animate-slide-in-up">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Filter by:</span>
              </div>
              
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40 bg-card/50 border-card-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall Points</SelectItem>
                  <SelectItem value="wins">Total Wins</SelectItem>
                  <SelectItem value="winrate">Win Rate</SelectItem>
                  <SelectItem value="rounds">Rounds Played</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-32 bg-card/50 border-card-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 text-sm text-foreground-secondary">
              <Users className="w-4 h-4" />
              <span>{leaderboardData.length} active debaters</span>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {leaderboardData.slice(0, 3).map((user, index) => {
              const { icon: TrophyIcon, color } = getTrophyIcon(user.rank);
              const podiumHeight = index === 0 ? "h-32" : index === 1 ? "h-24" : "h-20";
              
              return (
                <div key={user.id} className={`order-${index === 0 ? '2' : index === 1 ? '1' : '3'} md:order-none`}>
                  <div className={`neu-card p-6 text-center hover:scale-105 transition-all duration-300 ${user.rank === 1 ? 'border-warning/30' : ''}`}>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${podiumHeight}`}>
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="mb-2">
                      <TrophyIcon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
                      <h3 className="font-heading font-bold text-lg text-foreground">{user.name}</h3>
                      <Badge className={user.rankColor}>{user.currentRank}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-gradient">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-foreground-secondary">points</div>
                      <div className="text-sm">
                        <span className="text-success font-medium">{user.winRate}%</span>
                        <span className="text-foreground-secondary"> win rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="neu-card overflow-hidden animate-slide-in-up">
          <div className="p-6 border-b border-card-border">
            <h3 className="text-xl font-heading font-semibold text-gradient">Full Rankings</h3>
          </div>
          
          <div className="divide-y divide-card-border">
            {leaderboardData.map((user) => {
              const { icon: TrophyIcon, color } = getTrophyIcon(user.rank);
              
              return (
                <div 
                  key={user.id} 
                  className={`p-6 hover:bg-card/30 transition-all duration-300 ${
                    user.isCurrentUser ? 'bg-primary/10 border-l-4 border-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="w-12 text-center">
                        {user.rank <= 3 ? (
                          <TrophyIcon className={`w-6 h-6 mx-auto ${color}`} />
                        ) : (
                          <span className="text-lg font-bold text-foreground-secondary">#{user.rank}</span>
                        )}
                      </div>

                      {/* Avatar & Name */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className={`font-bold ${
                            user.isCurrentUser ? 'bg-gradient-to-br from-primary to-accent text-white' : 'bg-card-secondary'
                          }`}>
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className={`font-semibold ${user.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                            {user.name}
                            {user.isCurrentUser && <span className="ml-2 text-sm text-primary">(You)</span>}
                          </h4>
                          <Badge className={user.rankColor}>{user.currentRank}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gradient">{user.points.toLocaleString()}</div>
                        <div className="text-xs text-foreground-secondary">Points</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">{user.winRate}%</div>
                        <div className="text-xs text-foreground-secondary">Win Rate</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{user.wins}</div>
                        <div className="text-xs text-foreground-secondary">Wins</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getTrendIcon(user.trend, user.change)}
                        <span className={`text-sm font-medium ${
                          user.trend === 'up' ? 'text-success' : 
                          user.trend === 'down' ? 'text-destructive' : 
                          'text-foreground-secondary'
                        }`}>
                          {user.change !== "0" && (user.change.startsWith('+') ? user.change : user.change)}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Stats */}
                    <div className="md:hidden text-right">
                      <div className="text-lg font-bold text-gradient">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-success">{user.winRate}% WR</div>
                    </div>
                  </div>

                  {/* Badges */}
                  {user.badges.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {user.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="text-xs border-primary/30">
                          <Star className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 neu-card p-8 text-center animate-fade-in">
          <h3 className="text-2xl font-heading font-bold mb-4 text-gradient">
            Ready to Climb the Rankings?
          </h3>
          <p className="text-foreground-secondary mb-6 max-w-2xl mx-auto">
            Practice more rounds, improve your win rate, and earn badges to boost your position on the leaderboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary">
              <Zap className="w-5 h-5 mr-2" />
              Start Practice Round
            </Button>
            <Button variant="outline" className="border-card-border">
              <Trophy className="w-5 h-5 mr-2" />
              View Your Stats
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;