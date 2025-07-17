import { useState, useEffect } from "react";
import { Trophy, Star, TrendingUp, TrendingDown, Eye, Download, Play, RotateCcw, Home, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const Verdict = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showChainOfThought, setShowChainOfThought] = useState(false);
  const navigate = useNavigate();

  const result = {
    winner: "Government",
    margin: "Narrow",
    confidence: 78,
    motion: "This House Would Ban All Forms of Political Advertising on Social Media"
  };

  const speakerScores = [
    {
      role: "Prime Minister",
      side: "Government",
      speaker: "You",
      logic: 4.2,
      style: 4.0,
      poi: 3.8,
      total: 82,
      feedback: "Strong opening with clear framework. Excellent use of examples. Consider improving POI responses."
    },
    {
      role: "Leader of Opposition",
      side: "Opposition", 
      speaker: "AI Opponent",
      logic: 3.9,
      style: 4.1,
      poi: 4.0,
      total: 79,
      feedback: "Good rebuttal strategy but missed key Government arguments. Strong delivery throughout."
    },
    {
      role: "Deputy PM",
      side: "Government",
      speaker: "AI Teammate",
      logic: 4.0,
      style: 3.8,
      poi: 3.9,
      total: 78,
      feedback: "Solid rebuilding of arguments. Could have engaged more with Opposition rebuttals."
    },
    {
      role: "Deputy LO",
      side: "Opposition",
      speaker: "AI Opponent",
      logic: 3.7,
      style: 3.9,
      poi: 3.8,
      total: 76,
      feedback: "Maintained Opposition line well but needed stronger new material."
    },
    {
      role: "Government Whip",
      side: "Government",
      speaker: "AI Teammate",
      logic: 4.3,
      style: 4.2,
      poi: 4.0,
      total: 85,
      feedback: "Excellent summary and comparison. Perfect adherence to whip speech rules."
    },
    {
      role: "Opposition Whip",
      side: "Opposition",
      speaker: "AI Opponent",
      logic: 3.8,
      style: 4.0,
      poi: 3.7,
      total: 77,
      feedback: "Good attempt at crystallizing but couldn't overcome Government's case strength."
    }
  ];

  const clashAnalysis = [
    {
      topic: "Democratic Integrity",
      govStrength: 85,
      oppStrength: 65,
      winner: "Government",
      reasoning: "Government provided stronger evidence on social media manipulation"
    },
    {
      topic: "Freedom of Speech",
      govStrength: 70,
      oppStrength: 80,
      winner: "Opposition", 
      reasoning: "Opposition effectively argued constitutional concerns"
    },
    {
      topic: "Practical Implementation",
      govStrength: 75,
      oppStrength: 70,
      winner: "Government",
      reasoning: "Government addressed enforceability concerns adequately"
    },
    {
      topic: "Economic Impact",
      govStrength: 60,
      oppStrength: 85,
      winner: "Opposition",
      reasoning: "Opposition highlighted significant industry disruption"
    }
  ];

  const chainOfThought = [
    "Analyzing argument strength across six speeches...",
    "Government established clear framework in PM speech",
    "Opposition challenged framework but not decisively",
    "Government rebuilt effectively in DPM speech",
    "Key clash: Democratic integrity vs. free speech",
    "Government's evidence on manipulation more compelling",
    "Opposition's economic arguments noted but insufficient",
    "Government maintained consistency throughout",
    "Whip speeches: Government clearer on case comparison",
    "Final assessment: Government wins on balance"
  ];

  useEffect(() => {
    // Trigger confetti animation for wins
    if (result.winner === "Government") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [result.winner]);

  const getStarRating = (score: number) => {
    return Math.round(score);
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent animate-bounce opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Result Banner */}
        <div className="text-center mb-8 animate-fade-in">
          <div className={`inline-flex items-center space-x-3 px-8 py-4 rounded-2xl mb-6 ${
            result.winner === "Government" 
              ? "bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30" 
              : "bg-gradient-to-r from-destructive/20 to-warning/20 border border-destructive/30"
          }`}>
            <Trophy className={`w-8 h-8 ${result.winner === "Government" ? "text-primary" : "text-destructive"}`} />
            <div>
              <div className="text-2xl font-bold text-gradient">
                {result.winner === "Government" ? "Victory!" : "Defeat"}
              </div>
              <div className="text-sm text-foreground-secondary">
                {result.winner} wins by {result.margin.toLowerCase()} margin ({result.confidence}% confidence)
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            Round Complete
          </h1>
          <p className="text-lg text-foreground-secondary max-w-3xl mx-auto">
            {result.motion}
          </p>
        </div>

        {/* Toggle Controls */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="flex items-center space-x-2">
            <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
            <span className="text-sm text-foreground">Clash Heatmap</span>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={showChainOfThought} onCheckedChange={setShowChainOfThought} />
            <span className="text-sm text-foreground">Chain of Thought</span>
          </div>
        </div>

        <Tabs defaultValue="scores" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-card-border max-w-sm sm:max-w-md mx-auto">
            <TabsTrigger value="scores" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Scores
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Analysis
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Speaker Scores Tab */}
          <TabsContent value="scores" className="space-y-6">
            <div className="grid gap-4">
              {speakerScores.map((speaker, index) => (
                <div key={index} className="neu-card p-4 sm:p-6 animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-4 lg:items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">{speaker.role}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          speaker.side === "Government" 
                            ? "bg-primary/20 text-primary" 
                            : "bg-accent/20 text-accent"
                        }`}>
                          {speaker.side}
                        </span>
                        {speaker.speaker === "You" && (
                          <span className="px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                            You
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <div className="text-center">
                        <div className="text-sm text-foreground-secondary mb-1">Logic</div>
                        <div className="flex justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < getStarRating(speaker.logic) 
                                  ? "text-primary fill-current" 
                                  : "text-muted-foreground"
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-xs text-foreground-secondary mt-1">{speaker.logic}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-foreground-secondary mb-1">Style</div>
                        <div className="flex justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < getStarRating(speaker.style) 
                                  ? "text-accent fill-current" 
                                  : "text-muted-foreground"
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-xs text-foreground-secondary mt-1">{speaker.style}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-foreground-secondary mb-1">POI</div>
                        <div className="flex justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < getStarRating(speaker.poi) 
                                  ? "text-secondary fill-current" 
                                  : "text-muted-foreground"
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-xs text-foreground-secondary mt-1">{speaker.poi}/5</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-gradient mb-1">{speaker.total}</div>
                      <div className="text-sm text-foreground-secondary">Total Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Clash Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {showHeatmap && (
              <div className="neu-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-6 text-gradient flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Clash Heatmap
                </h3>
                <div className="space-y-4">
                  {clashAnalysis.map((clash, index) => (
                    <div key={index} className="glass-card p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-foreground">{clash.topic}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          clash.winner === "Government" 
                            ? "bg-primary/20 text-primary" 
                            : "bg-accent/20 text-accent"
                        }`}>
                          {clash.winner} wins
                        </span>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2 mb-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-foreground">Government</span>
                            <span className="text-sm font-medium text-primary">{clash.govStrength}%</span>
                          </div>
                          <Progress value={clash.govStrength} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-foreground">Opposition</span>
                            <span className="text-sm font-medium text-accent">{clash.oppStrength}%</span>
                          </div>
                          <Progress value={clash.oppStrength} className="h-2" />
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground-secondary">{clash.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showChainOfThought && (
              <div className="neu-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-6 text-gradient flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  AI Judge Chain of Thought
                </h3>
                <div className="space-y-3">
                  {chainOfThought.map((thought, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-3 p-3 rounded-xl bg-card/30 animate-slide-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm text-foreground-secondary">{thought}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Individual Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            {speakerScores.filter(s => s.speaker === "You").map((speaker, index) => (
              <div key={index} className="neu-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">
                  Your Performance: {speaker.role}
                </h3>
                
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  <div>
                    <h4 className="font-semibold text-success mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Strengths
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-foreground-secondary">• Strong logical progression</div>
                      <div className="text-sm text-foreground-secondary">• Effective use of examples</div>
                      <div className="text-sm text-foreground-secondary">• Clear structure and signposting</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-warning mb-3 flex items-center">
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Areas for Improvement
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-foreground-secondary">• POI response timing</div>
                      <div className="text-sm text-foreground-secondary">• Statistical evidence depth</div>
                      <div className="text-sm text-foreground-secondary">• Rebuttal engagement</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-card/30">
                  <p className="text-foreground-secondary leading-relaxed">{speaker.feedback}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button className="btn-primary flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Replay Summary</span>
          </Button>
          <Button variant="outline" className="border-card-border hover:border-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-card-border hover:border-primary flex items-center space-x-2"
            onClick={() => navigate("/case-prep")}
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Round</span>
          </Button>
          <Button 
            variant="outline" 
            className="border-card-border hover:border-accent flex items-center space-x-2"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verdict;