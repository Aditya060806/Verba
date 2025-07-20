import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, Crown, Filter, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Leaderboard = () => {
  const [filterBy, setFilterBy] = useState("overall");
  const [timeFrame, setTimeFrame] = useState("all-time");
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Scaffold: fetch leaderboard data (replace with backend/local storage integration)
  useEffect(() => {
    async function fetchLeaderboardData() {
      // TODO: Replace with real backend/local storage fetch
      const data = [
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
      setLeaderboardData(data);
      setCurrentUser(data.find((u: any) => u.isCurrentUser));
    }
    fetchLeaderboardData();
  }, []);

  // Progress to next rank (scaffold logic)
  const getNextRankProgress = (user: any) => {
    // Example: 1000 points per rank
    const pointsForNext = 1000;
    const current = user?.points || 0;
    return Math.min(100, ((current % pointsForNext) / pointsForNext) * 100);
  };

  // Badge tooltips
  const badgeDescriptions: Record<string, string> = {
    "POI Master": "Awarded for outstanding POI performance.",
    "Whip Winner": "Awarded for best whip speeches.",
    "Debate Veteran": "Awarded for 50+ rounds played.",
    "Consistent Performer": "Awarded for high win rate.",
    "Versatile Debater": "Awarded for excelling in multiple roles.",
    "Prep Enthusiast": "Awarded for top case prep scores."
  };

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
              const heatmapBg = index === 0
                ? "bg-gradient-to-br from-yellow-300/30 via-accent/20 to-primary/20 animate-gradient-move"
                : index === 1
                ? "bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/10 animate-gradient-move"
                : "bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 animate-gradient-move";
              return (
                <div key={user.id} className={`order-${index === 0 ? '2' : index === 1 ? '1' : '3'} md:order-none`}>
                  <div className={`neu-card p-6 text-center hover:scale-105 transition-all duration-300 ${user.rank === 1 ? 'border-warning/30' : ''} relative overflow-hidden ${heatmapBg}`}>
                    {/* Animated heatmap overlay */}
                    <div className="absolute inset-0 pointer-events-none z-0 animate-gradient-move opacity-40" />
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${podiumHeight} shadow-neon`}>
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <TrophyIcon className={`w-8 h-8 ${color} shadow-neon animate-bounce-slow`} />
                    </div>
                    <h2 className="text-xl font-bold text-gradient drop-shadow-glow mb-1">{user.name}</h2>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Badge className={`rounded-full px-3 py-1 text-xs font-semibold shadow-neon animate-pulse ${user.rankColor}`}>{user.currentRank}</Badge>
                      <span className="text-sm text-muted-foreground">#{user.rank}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {user.badges.map((badge: string, i: number) => (
                        <span key={i} className="inline-block px-2 py-1 rounded-lg bg-white/10 text-xs font-medium text-accent shadow-neon animate-bounce-slow" title={badgeDescriptions[badge]}>{badge}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-lg font-bold text-primary drop-shadow-glow">{user.points} pts</span>
                      {getTrendIcon(user.trend, user.change)}
                      <span className="text-xs text-muted-foreground">{user.change}</span>
                    </div>
                    {/* Animated progress bar for next rank */}
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-gradient-move transition-all duration-1000" style={{ width: `${getNextRankProgress(user)}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="neu-card p-6 animate-slide-in-up">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-foreground-secondary">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Points</th>
                  <th className="px-4 py-2">Wins</th>
                  <th className="px-4 py-2">Win Rate</th>
                  <th className="px-4 py-2">Badges</th>
                  <th className="px-4 py-2">Progress</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, idx) => {
                  const { icon: TrophyIcon, color: trophyColor } = getTrophyIcon(user.rank);
                  return (
                    <tr
                      key={user.id}
                      className={`transition-all duration-200 ${user.isCurrentUser ? 'bg-primary/10 font-bold' : ''}`}
                    >
                      <td className="px-4 py-2 text-center">
                        <TrophyIcon className={`w-6 h-6 mx-auto ${trophyColor}`} />
                        <div className="text-xs">#{user.rank}</div>
                      </td>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                        {user.isCurrentUser && <Badge className="bg-success/20 text-success ml-2">You</Badge>}
                      </td>
                      <td className="px-4 py-2 text-center font-semibold">{user.points}</td>
                      <td className="px-4 py-2 text-center">{user.wins}</td>
                      <td className="px-4 py-2 text-center">{user.winRate}%</td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {user.badges.map((badge: string, i: number) => (
                            <Badge
                              key={i}
                              className="bg-card/30 border border-card-border text-xs px-2 py-1"
                              title={badgeDescriptions[badge] || badge}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="w-32">
                          <div className="h-2 rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                              style={{ width: `${getNextRankProgress(user)}%` }}
                            />
                          </div>
                          <div className="text-xs text-foreground-secondary mt-1">
                            {getNextRankProgress(user)}% to next rank
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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