import { useState, useEffect } from 'react';
import { TrendingUp, Target, Clock, Award, Zap, Brain, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatItem {
  icon: any;
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  progress?: number;
}

const RealTimeStats = () => {
  const [stats, setStats] = useState<StatItem[]>([
    {
      icon: Award,
      label: 'Current Streak',
      value: 12,
      change: '+2 today',
      trend: 'up',
      color: 'text-accent',
      progress: 75
    },
    {
      icon: Target,
      label: 'Speech Accuracy',
      value: '94%',
      change: '+3% this week',
      trend: 'up',
      color: 'text-primary',
      progress: 94
    },
    {
      icon: Clock,
      label: 'Avg Response Time',
      value: '2.3s',
      change: '-0.5s faster',
      trend: 'up',
      color: 'text-secondary',
      progress: 78
    },
    {
      icon: Brain,
      label: 'AI Confidence',
      value: '97%',
      change: 'Excellent',
      trend: 'up',
      color: 'text-success',
      progress: 97
    },
    {
      icon: Zap,
      label: 'Energy Level',
      value: 'High',
      change: 'Peak performance',
      trend: 'up',
      color: 'text-warning',
      progress: 88
    },
    {
      icon: Users,
      label: 'Global Rank',
      value: '#847',
      change: '+23 positions',
      trend: 'up',
      color: 'text-accent',
      progress: 85
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          progress: Math.min(100, (stat.progress || 0) + Math.random() * 2 - 1)
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="glass-ultra border border-white/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
        >
          <CardContent className="p-6">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  stat.trend === 'up' 
                    ? 'bg-success/20 text-success' 
                    : stat.trend === 'down' 
                    ? 'bg-destructive/20 text-destructive'
                    : 'bg-muted/20 text-muted-foreground'
                }`}>
                  {stat.change}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground-secondary">
                    {stat.label}
                  </div>
                </div>

                {stat.progress && (
                  <div className="space-y-2">
                    <Progress 
                      value={stat.progress} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-foreground-secondary">
                      <span>Progress</span>
                      <span>{Math.round(stat.progress)}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sparkle effect for high-performing stats */}
              {stat.progress && stat.progress > 90 && (
                <div className="absolute top-2 right-2">
                  <Star className="w-4 h-4 text-accent animate-pulse" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RealTimeStats;