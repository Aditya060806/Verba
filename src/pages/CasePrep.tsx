import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Target, Users, BookOpen, Zap, Sparkles, ChevronDown, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PrepTemplates from "@/components/PrepTemplates";
import DebateCoach from "@/components/DebateCoach";

const CasePrep = () => {
  const navigate = useNavigate();
  const [motion, setMotion] = useState("");
  const [format, setFormat] = useState("AP");
  const [side, setSide] = useState("Government");
  const [level, setLevel] = useState("Intermediate");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerated(true);
    setGenerating(false);
  };

  const sampleMotion = "This House Would Ban All Forms of Political Advertising on Social Media";

  const demoCase = {
    arguments: [
      {
        title: "Democratic Integrity",
        content: "Political advertising on social media undermines democratic processes through micro-targeting and echo chambers.",
        strength: 92
      },
      {
        title: "Misinformation Prevention",
        content: "Social media ads are vectors for spreading false information that voters cannot easily fact-check.",
        strength: 87
      },
      {
        title: "Equal Access",
        content: "Wealthy candidates gain unfair advantages through sophisticated ad campaigns, reducing electoral equality.",
        strength: 85
      }
    ],
    rebuttals: [
      {
        opposition: "Freedom of Speech Violation",
        response: "Political advertising is commercial speech with legitimate restrictions for public welfare.",
        effectiveness: 89
      },
      {
        opposition: "Practical Enforcement Issues",
        response: "Successful content moderation systems already exist and can be adapted for political content.",
        effectiveness: 82
      }
    ],
    examples: [
      {
        title: "Cambridge Analytica Scandal",
        description: "Demonstrated how political ads can manipulate voter behavior through psychological profiling.",
        relevance: 95
      },
      {
        title: "Brazil 2018 Elections",
        description: "WhatsApp misinformation campaigns significantly influenced electoral outcomes.",
        relevance: 88
      }
    ],
    stakeholders: [
      { name: "Voters", interest: "Access to accurate information", impact: "High" },
      { name: "Political Parties", interest: "Campaign effectiveness", impact: "High" },
      { name: "Social Media Platforms", interest: "Revenue and regulation", impact: "Medium" },
      { name: "Democracy Watchdogs", interest: "Electoral integrity", impact: "High" }
    ]
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Case Preparation
          </h1>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            AI-powered argument generation and case building for competitive debate
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="neu-card p-6 sticky top-24">
              <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center text-gradient">
                <Zap className="w-6 h-6 mr-2" />
                Setup Your Case
              </h2>

              {/* Motion Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Debate Motion
                </label>
                <Textarea
                  placeholder="Enter your debate motion or use our sample..."
                  value={motion || sampleMotion}
                  onChange={(e) => setMotion(e.target.value)}
                  className="min-h-[100px] bg-card/50 border-card-border focus:border-primary/50"
                />
              </div>

              {/* Format Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Format</label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="bg-card/50 border-card-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AP">Asian Parliamentary</SelectItem>
                      <SelectItem value="BP">British Parliamentary</SelectItem>
                      <SelectItem value="WS">World Schools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Side</label>
                  <Select value={side} onValueChange={setSide}>
                    <SelectTrigger className="bg-card/50 border-card-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Opposition">Opposition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Level Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-foreground">Skill Level</label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="bg-card/50 border-card-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate}
                disabled={generating}
                className="btn-primary w-full text-lg py-3"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Case
                  </>
                )}
              </Button>
              
              {/* Next Step CTA */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="text-center">
                  <Button 
                    onClick={() => navigate('/role-select')}
                    className="btn-primary w-full"
                  >
                    Next → Role Selection
                  </Button>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-card/30">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm text-foreground-secondary">Est. Time</div>
                  <div className="font-semibold text-primary">~2 mins</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-card/30">
                  <Trophy className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <div className="text-sm text-foreground-secondary">Success Rate</div>
                  <div className="font-semibold text-accent">94%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Prep Templates */}
          <div className="lg:col-span-1 order-3 lg:order-2">
            <PrepTemplates />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 order-1 lg:order-3">
            {generated ? (
              <div className="space-y-6 stagger-animation">
                {/* Arguments */}
                <div className="neu-card p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-4 flex items-center text-gradient">
                    <Target className="w-6 h-6 mr-2" />
                    Core Arguments
                  </h3>
                  <div className="space-y-4">
                    {demoCase.arguments.map((arg, index) => (
                      <div key={index} className="glass-card p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg text-foreground">{arg.title}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-accent font-medium">{arg.strength}%</div>
                            <div className="w-16 h-2 bg-card-border rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                                style={{ width: `${arg.strength}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-foreground-secondary leading-relaxed">{arg.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rebuttals */}
                <div className="neu-card p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-4 flex items-center text-gradient">
                    <Lightbulb className="w-6 h-6 mr-2" />
                    Rebuttals & Responses
                  </h3>
                  <div className="space-y-4">
                    {demoCase.rebuttals.map((rebuttal, index) => (
                      <div key={index} className="glass-card p-4">
                        <div className="mb-3">
                          <h4 className="font-semibold text-foreground mb-1">Opposition: {rebuttal.opposition}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-secondary font-medium">Effectiveness: {rebuttal.effectiveness}%</div>
                          </div>
                        </div>
                        <p className="text-foreground-secondary leading-relaxed">{rebuttal.response}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div className="neu-card p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-4 flex items-center text-gradient">
                    <BookOpen className="w-6 h-6 mr-2" />
                    Supporting Examples
                  </h3>
                   <div className="grid gap-4 sm:grid-cols-2">
                     {demoCase.examples.map((example, index) => (
                      <div key={index} className="glass-card p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{example.title}</h4>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {example.relevance}% relevant
                          </span>
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stakeholders */}
                <div className="neu-card p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-4 flex items-center text-gradient">
                    <Users className="w-6 h-6 mr-2" />
                    Stakeholder Analysis
                  </h3>
                   <div className="grid gap-4 sm:grid-cols-2">
                     {demoCase.stakeholders.map((stakeholder, index) => (
                      <div key={index} className="glass-card p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-foreground">{stakeholder.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            stakeholder.impact === "High" ? "bg-destructive/20 text-destructive" :
                            stakeholder.impact === "Medium" ? "bg-warning/20 text-warning" :
                            "bg-success/20 text-success"
                          }`}>
                            {stakeholder.impact} Impact
                          </span>
                        </div>
                        <p className="text-foreground-secondary text-sm">{stakeholder.interest}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="neu-card p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-4 text-gradient">
                  Ready to Build Your Case?
                </h3>
                <p className="text-foreground-secondary max-w-md mx-auto">
                  Enter your debate motion and preferences to generate comprehensive arguments, rebuttals, and supporting evidence.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced Debate Coach */}
      <DebateCoach />
    </div>
  );
};

export default CasePrep;