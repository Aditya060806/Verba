import { useState } from "react";
import { User, Clock, Lightbulb, Play, ChevronDown, Target, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const RoleSelect = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [format, setFormat] = useState("AP");
  // Role definitions for each format
  const formatRoles: Record<string, any[]> = {
    AP: [
      { value: "pm", name: "Prime Minister", side: "Government", order: 1, description: "Opens the debate for the Government side. Sets the framework and presents the first arguments.", strategy: "Focus on defining the motion clearly, establishing your framework, and presenting 2-3 strong arguments with clear reasoning.", color: "primary" },
      { value: "lo", name: "Leader of Opposition", side: "Opposition", order: 2, description: "Opens the debate for the Opposition side. Challenges the Government's case and presents counter-arguments.", strategy: "Challenge the Government's definition if necessary, rebut their arguments systematically, and present your own case.", color: "accent" },
      { value: "dpm", name: "Deputy Prime Minister", side: "Government", order: 3, description: "Strengthens the Government case and responds to Opposition challenges.", strategy: "Rebuild and strengthen your team's arguments, respond to Opposition rebuttals, and introduce new material if needed.", color: "primary" },
      { value: "dlo", name: "Deputy Leader of Opposition", side: "Opposition", order: 4, description: "Reinforces Opposition case and challenges Government rebuttals.", strategy: "Strengthen Opposition arguments, respond to Government rebuilds, and continue systematic rebuttal.", color: "accent" },
      { value: "gw", name: "Government Whip", side: "Government", order: 5, description: "Summarizes and crystallizes the debate for the Government.", strategy: "No new arguments! Focus on comparing cases, identifying key clashes, and explaining why Government wins.", color: "primary" },
      { value: "ow", name: "Opposition Whip", side: "Opposition", order: 6, description: "Delivers the final speech for the Opposition.", strategy: "No new arguments! Compare cases, highlight Opposition's strongest points, and explain why Opposition wins the debate.", color: "accent" }
    ],
    BP: [
      { value: "pm", name: "Prime Minister (OG)", side: "Opening Government", order: 1, description: "Opens the debate for Opening Government.", strategy: "Define the motion, set the debate, and present OG's case.", color: "primary" },
      { value: "lo", name: "Leader of Opposition (OO)", side: "Opening Opposition", order: 2, description: "Opens for Opening Opposition.", strategy: "Challenge OG's definition, present OO's case.", color: "accent" },
      { value: "dpm", name: "Deputy Prime Minister (OG)", side: "Opening Government", order: 3, description: "Supports OG, rebuts OO.", strategy: "Rebuild OG, rebut OO, add new material.", color: "primary" },
      { value: "dlo", name: "Deputy Leader of Opposition (OO)", side: "Opening Opposition", order: 4, description: "Supports OO, rebuts OG.", strategy: "Rebuild OO, rebut OG, add new material.", color: "accent" },
      { value: "mg", name: "Member of Government (CG)", side: "Closing Government", order: 5, description: "Introduces new extension for CG.", strategy: "Present extension, rebut CO, compare benches.", color: "primary" },
      { value: "mo", name: "Member of Opposition (CO)", side: "Closing Opposition", order: 6, description: "Introduces new extension for CO.", strategy: "Present extension, rebut CG, compare benches.", color: "accent" },
      { value: "gw", name: "Government Whip (CG)", side: "Closing Government", order: 7, description: "Summarizes for CG.", strategy: "No new arguments! Compare benches, crystallize debate.", color: "primary" },
      { value: "ow", name: "Opposition Whip (CO)", side: "Closing Opposition", order: 8, description: "Summarizes for CO.", strategy: "No new arguments! Compare benches, crystallize debate.", color: "accent" }
    ],
    WSDC: [
      { value: "sp1", name: "Speaker 1", side: "Proposition", order: 1, description: "Opens for Proposition.", strategy: "Define motion, present case.", color: "primary" },
      { value: "sp2", name: "Speaker 2", side: "Opposition", order: 2, description: "Opens for Opposition.", strategy: "Challenge definition, present case.", color: "accent" },
      { value: "sp3", name: "Speaker 3", side: "Proposition", order: 3, description: "Supports Proposition.", strategy: "Rebut, rebuild, add new material.", color: "primary" },
      { value: "sp4", name: "Speaker 4", side: "Opposition", order: 4, description: "Supports Opposition.", strategy: "Rebut, rebuild, add new material.", color: "accent" },
      { value: "reply1", name: "Reply (Prop)", side: "Proposition", order: 5, description: "Reply speech for Proposition.", strategy: "Summarize, compare, no new arguments.", color: "primary" },
      { value: "reply2", name: "Reply (Opp)", side: "Opposition", order: 6, description: "Reply speech for Opposition.", strategy: "Summarize, compare, no new arguments.", color: "accent" }
    ]
  };
  const manualLinks: Record<string, string> = {
    AP: "/Malaysia UADC 2023 - Debate & Judging Handbook.pdf",
    BP: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf",
    WSDC: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf"
  };
  const roles = formatRoles[format];
  const navigate = useNavigate();

  const skillLevels = [
    {
      value: "beginner",
      name: "Beginner",
      description: "New to debate, learning the basics",
      features: ["Basic argument structure", "Simple examples", "Fundamental techniques"]
    },
    {
      value: "intermediate",
      name: "Intermediate",
      description: "Some debate experience, building skills",
      features: ["Advanced argumentation", "Strategic thinking", "Clash analysis"]
    },
    {
      value: "advanced",
      name: "Advanced",
      description: "Experienced debater, refining mastery",
      features: ["Complex case analysis", "Meta-argumentation", "Advanced strategy"]
    }
  ];

  const selectedRoleData = roles.find(role => role.value === selectedRole);
  const selectedSkillData = skillLevels.find(level => level.value === skillLevel);

  const handleStartDebate = async () => {
    if (!selectedRole || !skillLevel) return;
    
    setIsStarting(true);
    setCountdown(3);
    
    // Countdown animation
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Navigate to debate arena
    // Pass format to debate arena (could use context, navigation state, or global store)
    navigate("/debate-arena", { state: { format } });
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Role Selection
          </h1>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Choose your role, format, and skill level to begin your debate round
          </p>
        </div>
        {/* Format Selection */}
        <div className="flex justify-center mb-8">
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-64 bg-card/50 border-card-border h-12">
              <SelectValue placeholder="Choose debate format..." />
              <ChevronDown className="w-4 h-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AP">Asian Parliamentary</SelectItem>
              <SelectItem value="BP">British Parliamentary</SelectItem>
              <SelectItem value="WSDC">World Schools</SelectItem>
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <BookOpen className="w-5 h-5 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <a href={manualLinks[format]} target="_blank" rel="noopener noreferrer" className="underline text-primary">View {format} Manual</a>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Role Selection */}
          <div className="neu-card p-6">
            <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center text-gradient">
              <User className="w-6 h-6 mr-2" />
              Select Your Role
            </h2>

            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full mb-4 bg-card/50 border-card-border h-12">
                <SelectValue placeholder="Choose your speaking role..." />
                <ChevronDown className="w-4 h-4 opacity-50" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value} className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-${role.color}`}></div>
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-muted-foreground">{role.side} • Speaking {role.order}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedRoleData && (
              <div className="glass-card p-4 animate-slide-in-up">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg text-foreground">{selectedRoleData.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full bg-${selectedRoleData.color}/20 text-${selectedRoleData.color} text-sm font-medium`}>
                      {selectedRoleData.side}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-muted/20 text-muted-foreground text-sm">
                      #{selectedRoleData.order}
                    </span>
                  </div>
                </div>
                <p className="text-foreground-secondary text-sm mb-4">{selectedRoleData.description}</p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="border-card-border hover:border-primary">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Role Tips
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-gradient">{selectedRoleData.name} Strategy</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-foreground-secondary leading-relaxed">{selectedRoleData.strategy}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          {/* Skill Level Selection */}
          <div className="neu-card p-6">
            <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center text-gradient">
              <Target className="w-6 h-6 mr-2" />
              Skill Level
            </h2>

            <Select value={skillLevel} onValueChange={setSkillLevel}>
              <SelectTrigger className="w-full mb-4 bg-card/50 border-card-border h-12">
                <SelectValue placeholder="Choose your skill level..." />
                <ChevronDown className="w-4 h-4 opacity-50" />
              </SelectTrigger>
              <SelectContent>
                {skillLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="py-3">
                    <div>
                      <div className="font-medium">{level.name}</div>
                      <div className="text-sm text-muted-foreground">{level.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedSkillData && (
              <div className="glass-card p-4 animate-slide-in-up">
                <h3 className="font-semibold text-lg text-foreground mb-3">{selectedSkillData.name}</h3>
                <p className="text-foreground-secondary text-sm mb-4">{selectedSkillData.description}</p>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground mb-2">You'll practice:</div>
                  {selectedSkillData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-foreground-secondary">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Motion Display */}
        <div className="neu-card p-6 mt-8 max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-heading font-semibold mb-4 flex items-center justify-center text-gradient">
            <BookOpen className="w-5 h-5 mr-2" />
            Debate Motion
          </h3>
          <p className="text-lg text-foreground mb-6">
            "This House Would Ban All Forms of Political Advertising on Social Media"
          </p>
          <div className="flex justify-center space-x-4">
            <span className="px-4 py-2 rounded-xl bg-primary/20 text-primary font-medium">Asian Parliamentary</span>
            <span className="px-4 py-2 rounded-xl bg-secondary/20 text-secondary font-medium">7 minutes per speaker</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center mt-8">
          {isStarting ? (
            <div className="animate-fade-in">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
                <span className="text-4xl font-bold text-white">{countdown}</span>
              </div>
              <p className="text-xl text-gradient font-semibold">Starting debate round...</p>
            </div>
          ) : (
            <Button 
              onClick={handleStartDebate}
              disabled={!selectedRole || !skillLevel}
              className="btn-primary text-xl px-12 py-4 animate-float"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Debate Round
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          <div className="neu-card p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-sm text-foreground-secondary">Estimated Duration</div>
            <div className="font-semibold text-primary">45 minutes</div>
          </div>
          <div className="neu-card p-4 text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-accent" />
            <div className="text-sm text-foreground-secondary">AI Difficulty</div>
            <div className="font-semibold text-accent">Adaptive</div>
          </div>
          <div className="neu-card p-4 text-center">
            <User className="w-6 h-6 mx-auto mb-2 text-secondary" />
            <div className="text-sm text-foreground-secondary">Format</div>
            <div className="font-semibold text-secondary">Asian Parliamentary</div>
          </div>
          <div className="neu-card p-4 text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-success" />
            <div className="text-sm text-foreground-secondary">Success Rate</div>
            <div className="font-semibold text-success">87%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;