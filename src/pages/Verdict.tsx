import { useState, useEffect } from "react";
import { Trophy, Star, TrendingUp, TrendingDown, Eye, Download, Play, RotateCcw, Home, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useNavigate, useLocation } from "react-router-dom";
import { adjudicateDebate } from "@/lib/ai";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { BookOpen, Info } from "lucide-react";

const Verdict = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showChainOfThought, setShowChainOfThought] = useState(false);
  const navigate = useNavigate();
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState<string | null>(null);
  // Example: get debate context, format, roles from navigation or global state
  // For now, use placeholders (replace with real context from DebateArena)
  const debateContext = (window as any).__DEBATE_CONTEXT__ || { speeches: [], pois: [] };
  const location = useLocation();
  const format = location.state?.format || "AP";
  const manualLinks: Record<string, string> = {
    AP: "/Malaysia UADC 2023 - Debate & Judging Handbook.pdf",
    BP: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf",
    WSDC: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf"
  };
  const rubricTips: Record<string, string> = {
    AP: "AP Rubric: Matter (40), Manner (40), Method (20). See manual for details.",
    BP: "BP Rubric: Matter, Manner, Method, Role Fulfillment. See manual for details.",
    WSDC: "WSDC Rubric: Content, Style, Strategy, Reply. See manual for details."
  };
  const roles = [
    "Prime Minister", "Leader of Opposition", "Deputy PM", "Deputy LO", "Government Whip", "Opposition Whip"
  ];
  const manuals = [
    "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf",
    "/Malaysia UADC 2023 - Debate & Judging Handbook.pdf",
    "/WUDC Speaker, Chair, Panelist and Trainee Scales.pdf",
    "/APD Basics.pdf"
  ];
  useEffect(() => {
    const fetchAdjudication = async () => {
      setAiLoading(true);
      setAiError(null);
      try {
        const result = await adjudicateDebate({
          speeches: debateContext.speeches,
          format,
          roles,
          manuals
        });
        setAiResult(result);
      } catch (err: any) {
        setAiError(err.message || "Failed to get AI adjudication.");
      } finally {
        setAiLoading(false);
      }
    };
    fetchAdjudication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Trigger confetti animation for wins
    if (aiResult?.winner === "Government") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [aiResult?.winner]);

  const getStarRating = (score: number) => {
    return Math.round(score);
  };

  if (aiLoading) {
    return (
      <div className="min-h-screen bg-animated-gradient pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-heading font-semibold text-gradient">AI Judge Analyzing...</h2>
            <p className="text-foreground-secondary">Evaluating your debate performance with mathematical precision</p>
          </div>
        </div>
      </div>
    );
  }

  if (aiError) {
    return (
      <div className="min-h-screen bg-animated-gradient pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-semibold text-destructive mb-4">Adjudication Error</h2>
            <p className="text-foreground-secondary mb-4">{aiError}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div role="main" className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Debate Verdict
          </h1>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            AI-powered adjudication with mathematical precision
          </p>
        </div>

        {/* Winner Announcement */}
        {aiResult && (
          <div className="neu-card p-8 mb-8 text-center animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Trophy className="w-16 h-16 text-accent mr-4" />
              <div>
                <h2 className="text-3xl font-heading font-bold text-gradient">
                  {aiResult.winner} Wins!
                </h2>
                <p className="text-foreground-secondary capitalize">{aiResult.margin} margin</p>
              </div>
            </div>
            
            {/* Score Display */}
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{aiResult.governmentScore}</div>
                <div className="text-sm text-foreground-secondary">Government</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{aiResult.oppositionScore}</div>
                <div className="text-sm text-foreground-secondary">Opposition</div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Analysis */}
        {aiResult && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scores">Speaker Scores</TabsTrigger>
              <TabsTrigger value="clashes">Clash Analysis</TabsTrigger>
              <TabsTrigger value="feedback">Your Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Overall Feedback */}
                <div className="neu-card p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">Overall Assessment</h3>
                  <p className="text-foreground-secondary leading-relaxed mb-4">
                    {aiResult.overallFeedback}
                  </p>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground-secondary">
                      Based on {format} rubric and mathematical evaluation
                    </span>
                  </div>
                </div>

                {/* Chain of Thought */}
                <div className="neu-card p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-gradient">AI Reasoning</h3>
                  <div className="space-y-2">
                    {aiResult.chainOfThought.map((thought: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-foreground-secondary">{thought}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scores" className="space-y-6">
              <div className="grid gap-4">
                {aiResult.speakerScores.map((speaker: any, index: number) => (
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
                      
                      {/* Detailed Scores */}
                      <div className="lg:col-span-3">
                        <div className="grid gap-3 sm:grid-cols-5">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{speaker.matter}</div>
                            <div className="text-xs text-foreground-secondary">Matter</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-accent">{speaker.manner}</div>
                            <div className="text-xs text-foreground-secondary">Manner</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-secondary">{speaker.method}</div>
                            <div className="text-xs text-foreground-secondary">Method</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-warning">{speaker.roleFulfillment}</div>
                            <div className="text-xs text-foreground-secondary">Role</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-gradient">{speaker.totalScore}</div>
                            <div className="text-xs text-foreground-secondary">Total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clashes" className="space-y-6">
              <div className="grid gap-4">
                {aiResult.clashEvaluations.map((clash: any, index: number) => (
                  <div key={index} className="neu-card p-6 animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-foreground">{clash.topic}</h3>
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        Weight: {clash.weight}/10
                      </span>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2 mb-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Government</h4>
                        <div className="flex items-center space-x-2">
                          <Progress value={clash.governmentScore * 100} className="flex-1" />
                          <span className="text-sm font-medium">{Math.round(clash.governmentScore * 100)}%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-accent mb-2">Opposition</h4>
                        <div className="flex items-center space-x-2">
                          <Progress value={clash.oppositionScore * 100} className="flex-1" />
                          <span className="text-sm font-medium">{Math.round(clash.oppositionScore * 100)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground-secondary mb-2">{clash.reasoning}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {clash.evidence.map((evidence: string, i: number) => (
                        <span key={i} className="px-2 py-1 rounded-full bg-card/50 text-xs text-foreground-secondary">
                          {evidence}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              {aiResult.speakerScores.filter((s: any) => s.speaker === "You").map((speaker: any, index: number) => (
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
                        {speaker.strengths?.map((str: string, i: number) => (
                          <div key={i} className="text-sm text-foreground-secondary">• {str}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warning mb-3 flex items-center">
                        <TrendingDown className="w-4 h-4 mr-2" />
                        Areas for Improvement
                      </h4>
                      <div className="space-y-2">
                        {speaker.improvements?.map((imp: string, i: number) => (
                          <div key={i} className="text-sm text-foreground-secondary">• {imp}</div>
                        ))}
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
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={() => navigate('/debate-arena')} className="btn-primary">
            <RotateCcw className="w-4 h-4 mr-2" />
            New Round
          </Button>
          <Button onClick={() => navigate('/past-rounds')} variant="outline" className="border-card-border">
            <Eye className="w-4 h-4 mr-2" />
            View History
          </Button>
          <Button onClick={() => navigate('/')} variant="outline" className="border-card-border">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verdict;