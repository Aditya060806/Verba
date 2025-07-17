import { useState, useEffect } from "react";
import { Trophy, Award, Star, Target, Crown, Zap, Users, Mic, Hand, Medal } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserStats {
  roundsPlayed: number;
  roundsWon: number;
  rolesPlayed: string[];
  poisHandled: number;
  whipWins: number;
  prepSessions: number;
  totalPoints: number;
}

interface BadgeType {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  earned: boolean;
  progress?: number;
  target?: number;
}

interface RankInfo {
  title: string;
  icon: any;
  color: string;
  minPoints: number;
  benefits: string[];
}

const UserRankBadge = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    roundsPlayed: 23,
    roundsWon: 18,
    rolesPlayed: ["Prime Minister", "Leader of Opposition", "Deputy PM", "Government Whip"],
    poisHandled: 12,
    whipWins: 3,
    prepSessions: 8,
    totalPoints: 1250
  });

  const ranks: RankInfo[] = [
    {
      title: "Novice Debater",
      icon: Star,
      color: "text-foreground-secondary bg-muted",
      minPoints: 0,
      benefits: ["Basic analytics", "Practice rounds"]
    },
    {
      title: "Rising Speaker",
      icon: Mic,
      color: "text-success bg-success/20",
      minPoints: 500,
      benefits: ["Advanced templates", "POI training"]
    },
    {
      title: "Tactical Strategist",
      icon: Target,
      color: "text-primary bg-primary/20",
      minPoints: 1000,
      benefits: ["Strategy insights", "Motion vault access"]
    },
    {
      title: "Final Table Expert",
      icon: Trophy,
      color: "text-warning bg-warning/20",
      minPoints: 2000,
      benefits: ["Elite coaching", "Tournament prep"]
    },
    {
      title: "Master Adjudicator",
      icon: Crown,
      color: "text-accent bg-accent/20",
      minPoints: 3500,
      benefits: ["Judge training", "Mentor access"]
    }
  ];

  const badges: BadgeType[] = [
    {
      id: "poi-master",
      title: "POI Master",
      description: "Handle 10 Points of Information",
      icon: Hand,
      color: "text-primary bg-primary/20",
      earned: userStats.poisHandled >= 10,
      progress: userStats.poisHandled,
      target: 10
    },
    {
      id: "whip-winner",
      title: "Whip Winner",
      description: "Win a debate as Whip speaker",
      icon: Zap,
      color: "text-accent bg-accent/20",
      earned: userStats.whipWins >= 1,
      progress: userStats.whipWins,
      target: 1
    },
    {
      id: "prep-enthusiast",
      title: "Prep Enthusiast",
      description: "Complete 5 preparation sessions",
      icon: Users,
      color: "text-secondary bg-secondary/20",
      earned: userStats.prepSessions >= 5,
      progress: userStats.prepSessions,
      target: 5
    },
    {
      id: "debate-veteran",
      title: "Debate Veteran",
      description: "Play 20 debate rounds",
      icon: Medal,
      color: "text-warning bg-warning/20",
      earned: userStats.roundsPlayed >= 20,
      progress: userStats.roundsPlayed,
      target: 20
    },
    {
      id: "consistent-performer",
      title: "Consistent Performer",
      description: "Maintain 75% win rate over 15 rounds",
      icon: Target,
      color: "text-success bg-success/20",
      earned: userStats.roundsPlayed >= 15 && (userStats.roundsWon / userStats.roundsPlayed) >= 0.75,
      progress: Math.round((userStats.roundsWon / userStats.roundsPlayed) * 100),
      target: 75
    },
    {
      id: "versatile-debater",
      title: "Versatile Debater",
      description: "Play all speaking roles",
      icon: Star,
      color: "text-destructive bg-destructive/20",
      earned: userStats.rolesPlayed.length >= 6,
      progress: userStats.rolesPlayed.length,
      target: 6
    }
  ];

  const getCurrentRank = () => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (userStats.totalPoints >= ranks[i].minPoints) {
        return { rank: ranks[i], level: i };
      }
    }
    return { rank: ranks[0], level: 0 };
  };

  const getNextRank = () => {
    const currentLevel = getCurrentRank().level;
    return currentLevel < ranks.length - 1 ? ranks[currentLevel + 1] : null;
  };

  const getProgressToNextRank = () => {
    const currentRank = getCurrentRank().rank;
    const nextRank = getNextRank();
    
    if (!nextRank) return 100;
    
    const currentProgress = userStats.totalPoints - currentRank.minPoints;
    const totalNeeded = nextRank.minPoints - currentRank.minPoints;
    
    return Math.min(100, Math.round((currentProgress / totalNeeded) * 100));
  };

  const currentRank = getCurrentRank().rank;
  const nextRank = getNextRank();
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="neu-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-gradient flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Your Progress
        </h3>
        <Badge className={currentRank.color}>
          <currentRank.icon className="w-4 h-4 mr-1" />
          {currentRank.title}
        </Badge>
      </div>

      {/* Current Rank Display */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse-glow">
          <currentRank.icon className="w-12 h-12 text-primary" />
        </div>
        <h4 className="text-lg font-semibold text-foreground mb-2">{currentRank.title}</h4>
        <p className="text-sm text-foreground-secondary">{userStats.totalPoints} points earned</p>
      </div>

      {/* Progress to Next Rank */}
      {nextRank && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground">Progress to {nextRank.title}</span>
            <span className="text-sm text-primary font-medium">{getProgressToNextRank()}%</span>
          </div>
          <Progress value={getProgressToNextRank()} className="h-3 mb-2" />
          <p className="text-xs text-foreground-secondary">
            {nextRank.minPoints - userStats.totalPoints} points until next rank
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl bg-card/30">
          <div className="text-lg font-bold text-primary">{userStats.roundsWon}/{userStats.roundsPlayed}</div>
          <div className="text-xs text-foreground-secondary">Win Rate</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-card/30">
          <div className="text-lg font-bold text-accent">{earnedBadges.length}/{badges.length}</div>
          <div className="text-xs text-foreground-secondary">Badges</div>
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h5 className="text-sm font-medium text-foreground mb-3">🏆 Earned Badges</h5>
          <div className="grid grid-cols-2 gap-2">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="group relative">
                <div className={`p-3 rounded-xl ${badge.color} border border-current/30 text-center transition-all duration-300 hover:scale-105`}>
                  <badge.icon className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-xs font-medium">{badge.title}</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Badges */}
      {availableBadges.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-foreground mb-3">🎯 Available Badges</h5>
          <div className="space-y-3">
            {availableBadges.slice(0, 3).map((badge) => (
              <div key={badge.id} className="flex items-center space-x-3 p-3 rounded-xl bg-card/20 border border-card-border">
                <div className={`w-8 h-8 rounded-lg ${badge.color} flex items-center justify-center opacity-60`}>
                  <badge.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{badge.title}</div>
                  <div className="text-xs text-foreground-secondary">{badge.description}</div>
                  {badge.progress !== undefined && badge.target && (
                    <div className="mt-1">
                      <Progress value={(badge.progress / badge.target) * 100} className="h-1" />
                      <div className="text-xs text-foreground-secondary mt-1">
                        {badge.progress}/{badge.target}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rank Benefits */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <h5 className="text-sm font-medium text-foreground mb-2">Current Rank Benefits</h5>
        <ul className="text-xs text-foreground-secondary space-y-1">
          {currentRank.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <Star className="w-3 h-3 mr-2 text-primary" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserRankBadge;