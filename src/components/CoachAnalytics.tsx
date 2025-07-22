import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, Timer, Brain, BarChart3, Target, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import React from "react";

const CoachAnalytics = ({ debateMetrics }: any) => (
  <div className="p-4 space-y-4">
    <div className="text-center">
      <BarChart3 className="w-12 h-12 mx-auto mb-3 text-primary" />
      <h3 className="font-semibold mb-2">Performance Analytics</h3>
      <p className="text-sm text-foreground-secondary">Track your debate improvement over time</p>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-3 text-center">
        <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
        <div className="text-lg font-bold text-gradient">{debateMetrics.totalSessions}</div>
        <div className="text-xs text-foreground-secondary">Total Sessions</div>
      </Card>
      <Card className="p-3 text-center">
        <TrendingUp className="w-6 h-6 mx-auto mb-2 text-success" />
        <div className="text-lg font-bold text-gradient">{debateMetrics.averageScore?.toFixed(1) ?? 0}</div>
        <div className="text-xs text-foreground-secondary">Avg Score</div>
      </Card>
      <Card className="p-3 text-center">
        <Timer className="w-6 h-6 mx-auto mb-2 text-accent" />
        <div className="text-lg font-bold text-gradient">{Math.round((debateMetrics.practiceTime ?? 0) / 60)}h</div>
        <div className="text-xs text-foreground-secondary">Practice Time</div>
      </Card>
      <Card className="p-3 text-center">
        <Brain className="w-6 h-6 mx-auto mb-2 text-secondary" />
        <div className="text-lg font-bold text-gradient">{debateMetrics.strongestAreas?.length ?? 0}</div>
        <div className="text-xs text-foreground-secondary">Strong Areas</div>
      </Card>
    </div>
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1"><span>Opening Statements</span><span>85%</span></div>
        <Progress value={85} className="h-2" />
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1"><span>Rebuttals</span><span>72%</span></div>
        <Progress value={72} className="h-2" />
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1"><span>Evidence Analysis</span><span>68%</span></div>
        <Progress value={68} className="h-2" />
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1"><span>Delivery Confidence</span><span>79%</span></div>
        <Progress value={79} className="h-2" />
      </div>
    </div>
    <div>
      <h4 className="font-medium text-sm mb-2 flex items-center"><Target className="w-4 h-4 mr-1 text-primary" />Focus Areas</h4>
      <div className="space-y-2">
        {['Evidence Quality', 'Counterargument Strength', 'Time Management'].map((area, index) => (
          <div key={area} className="flex items-center justify-between p-2 bg-card-secondary rounded-lg">
            <span className="text-xs">{area}</span>
            <Badge variant="outline" className="text-xs">Priority {index + 1}</Badge>
          </div>
        ))}
      </div>
    </div>
    <div className="pt-4 border-t border-card-border">
      <div className="text-center text-xs text-foreground-secondary">
        <Sparkles className="w-4 h-4 inline mr-1" />Data updated in real-time
      </div>
    </div>
  </div>
);

export default CoachAnalytics; 