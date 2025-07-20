import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lightbulb, Target, Users, BookOpen, Zap, Sparkles, ChevronDown, Clock, Trophy, Puzzle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrepTemplates from "@/components/PrepTemplates";
import ArgumentBuilder from "@/components/ArgumentBuilder";
import DebateCoach from "@/components/DebateCoach";


import { generateDebateCase } from "@/lib/ai";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const CasePrep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [format, setFormat] = useState(location.state?.format || "AP");
  const manualLinks: Record<string, string> = {
    AP: "/Malaysia UADC 2023 - Debate & Judging Handbook.pdf",
    BP: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf",
    WSDC: "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf"
  };
  const formatTips: Record<string, string> = {
    AP: "AP: 3 speakers per side, 7 min speeches, POIs allowed after 1st minute.",
    BP: "BP: 4 teams, 2 per side, 7 min speeches, no POIs during whip speeches.",
    WSDC: "WSDC: 3 speakers per side, 8 min speeches, reply speeches, POIs allowed."
  };
  const [motion, setMotion] = useState("");
  const [side, setSide] = useState("Government");
  const [level, setLevel] = useState("Intermediate");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [caseData, setCaseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setCaseData(null);
    try {
      // Pass manuals as context (paths to PDFs in /public)
      const manuals = [
        "/WUDC Debating & Judging Manual (Panama WUDC 2025).pdf",
        "/Malaysia UADC 2023 - Debate & Judging Handbook.pdf",
        "/WUDC Speaker, Chair, Panelist and Trainee Scales.pdf",
        "/APD Basics.pdf"
      ];
      const result = await generateDebateCase({
        motion: motion || sampleMotion,
        format,
        side,
        level,
        manuals
      });
      setCaseData(result);
      setGenerated(true);
    } catch (err: any) {
      setError(err.message || "Failed to generate case. Please try again later.");
      setGenerated(false);
    } finally {
      setGenerating(false);
    }
  };

  const sampleMotion = "This House Would Ban All Forms of Political Advertising on Social Media";



  return (
    <div role="main" className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Case Preparation
          </h1>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            AI-powered argument generation and case building for competitive debate
          </p>
          <div className="flex justify-center space-x-4 items-center mt-4">
            <span className="px-4 py-2 rounded-xl bg-primary/20 text-primary font-medium">{format === "AP" ? "Asian Parliamentary" : format === "BP" ? "British Parliamentary" : "World Schools"}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <BookOpen className="w-5 h-5 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <a href={manualLinks[format]} target="_blank" rel="noopener noreferrer" className="underline text-primary">View {format} Manual</a>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {formatTips[format]}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl border border-red-300 animate-fade-in">
            {error}
          </div>
        )}
        {/* Case Output */}
        {caseData && generated && !error && (
          <div className="mb-8 animate-fade-in">
            {/* Render arguments, rebuttals, examples, stakeholders, etc. from caseData */}
            {/* This will be filled in after Sarvam AI integration is live */}
            <pre className="bg-card/50 p-4 rounded-xl overflow-x-auto text-sm border border-card-border">
              {JSON.stringify(caseData, null, 2)}
            </pre>
          </div>
        )}

        <Tabs defaultValue="case-generator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="case-generator" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Case Generator</span>
            </TabsTrigger>
            <TabsTrigger value="argument-builder" className="flex items-center space-x-2">
              <Puzzle className="w-4 h-4" />
              <span>Argument Builder</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Templates</span>
            </TabsTrigger>

          </TabsList>

          <TabsContent value="case-generator" className="space-y-6">
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
                    {caseData?.arguments?.map((arg: any, index: number) => (
                      <div key={index} className="glass-card p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg text-foreground">{arg.title}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-accent font-medium">{arg.strength || 85}%</div>
                            <div className="w-16 h-2 bg-card-border rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                                style={{ width: `${arg.strength || 85}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-foreground-secondary leading-relaxed">{arg.content}</p>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-foreground-secondary">
                        Generate a case to see arguments here
                      </div>
                    )}
                  </div>
                </div>

                {/* Rebuttals */}
                <div className="neu-card p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-4 flex items-center text-gradient">
                    <Lightbulb className="w-6 h-6 mr-2" />
                    Rebuttals & Responses
                  </h3>
                  <div className="space-y-4">
                    {caseData?.rebuttals?.map((rebuttal: any, index: number) => (
                      <div key={index} className="glass-card p-4">
                        <div className="mb-3">
                          <h4 className="font-semibold text-foreground mb-1">Opposition: {rebuttal.opposition}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-secondary font-medium">Effectiveness: {rebuttal.effectiveness || 80}%</div>
                          </div>
                        </div>
                        <p className="text-foreground-secondary leading-relaxed">{rebuttal.response}</p>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-foreground-secondary">
                        Generate a case to see rebuttals here
                      </div>
                    )}
                  </div>
                </div>

                {/* Examples */}
                <div className="neu-card p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-4 flex items-center text-gradient">
                    <BookOpen className="w-6 h-6 mr-2" />
                    Supporting Examples
                  </h3>
                   <div className="grid gap-4 sm:grid-cols-2">
                     {caseData?.examples?.map((example: any, index: number) => (
                      <div key={index} className="glass-card p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{example.title}</h4>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {example.relevance || 85}% relevant
                          </span>
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed">{example.description}</p>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-foreground-secondary">
                        Generate a case to see examples here
                      </div>
                    )}
                  </div>
                </div>

                {/* Stakeholders */}
                <div className="neu-card p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-4 flex items-center text-gradient">
                    <Users className="w-6 h-6 mr-2" />
                    Stakeholder Analysis
                  </h3>
                   <div className="grid gap-4 sm:grid-cols-2">
                     {caseData?.stakeholders?.map((stakeholder: any, index: number) => (
                      <div key={index} className="glass-card p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-foreground">{stakeholder.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            stakeholder.impact === "High" ? "bg-destructive/20 text-destructive" :
                            stakeholder.impact === "Medium" ? "bg-warning/20 text-warning" :
                            "bg-success/20 text-success"
                          }`}>
                            {stakeholder.impact || "Medium"} Impact
                          </span>
                        </div>
                        <p className="text-foreground-secondary text-sm">{stakeholder.interest}</p>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-foreground-secondary">
                        Generate a case to see stakeholders here
                      </div>
                    )}
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
      </TabsContent>

      <TabsContent value="argument-builder" className="space-y-6">
        <ArgumentBuilder />
      </TabsContent>

      <TabsContent value="templates" className="space-y-6">
        <PrepTemplates />
      </TabsContent>
      

    </Tabs>
      </div>
      
      {/* Enhanced Debate Coach */}
      <DebateCoach />
    </div>
  );
};

export default CasePrep;