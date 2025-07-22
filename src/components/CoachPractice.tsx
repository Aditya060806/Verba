import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Shield, Zap, Timer } from "lucide-react";
import React from "react";

const CoachPractice = ({ practiceScenarios, startPractice }: any) => (
  <div className="p-4 space-y-4">
    <div className="text-center">
      <Target className="w-12 h-12 mx-auto mb-3 text-primary" />
      <h3 className="font-semibold mb-2">Practice Sessions</h3>
      <p className="text-sm text-foreground-secondary">Choose a practice mode to improve your debate skills</p>
    </div>
    <div className="space-y-3">
      {practiceScenarios.map((scenario: any) => (
        <Card key={scenario.id} className="p-4 hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
              {scenario.id === 'opening' && <Target className="w-5 h-5 text-primary" />}
              {scenario.id === 'rebuttal' && <Shield className="w-5 h-5 text-primary" />}
              {scenario.id === 'crossfire' && <Zap className="w-5 h-5 text-primary" />}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">{scenario.title}</h4>
              <p className="text-xs text-foreground-secondary mb-3">{scenario.description}</p>
              <Button size="sm" onClick={() => startPractice(scenario.id)} className="bg-gradient-to-r from-primary to-accent text-xs h-8">Start Practice</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
    <div className="pt-4 border-t border-card-border">
      <div className="text-center text-xs text-foreground-secondary">
        <Timer className="w-4 h-4 inline mr-1" />
        Practice sessions include real-time feedback and scoring
      </div>
    </div>
  </div>
);

export default CoachPractice; 