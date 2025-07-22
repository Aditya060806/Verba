import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import React from "react";

const CoachTips = ({ debateTips, currentTip, setCurrentTip }: any) => {
  const tip = debateTips[currentTip];
  const IconComponent = tip.icon;
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30">{tip.difficulty}</Badge>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-2">{tip.title}</h3>
          <p className="text-sm text-foreground-secondary leading-relaxed mb-3">{tip.content}</p>
          <div className="p-3 rounded-lg bg-card/50 border border-card-border mb-3">
            <div className="text-xs font-medium text-primary mb-1">Example:</div>
            <p className="text-xs text-foreground-secondary italic leading-relaxed">{tip.example}</p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-medium text-primary">Key Tips:</div>
            <ul className="space-y-1">
              {tip.tips.map((t: string, i: number) => (
                <li key={i} className="text-xs text-foreground-secondary flex items-start gap-2">
                  <Star className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-card-border">
          <Button variant="outline" size="sm" onClick={() => setCurrentTip((prev: number) => (prev - 1 + debateTips.length) % debateTips.length)} className="border-card-border hover:border-primary">Previous</Button>
          <span className="text-xs text-foreground-secondary">{currentTip + 1} of {debateTips.length}</span>
          <Button variant="outline" size="sm" onClick={() => setCurrentTip((prev: number) => (prev + 1) % debateTips.length)} className="border-card-border hover:border-primary">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default CoachTips; 