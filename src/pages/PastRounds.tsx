import { useState } from "react";
import { Trophy, Clock, TrendingUp, TrendingDown, Play, Eye, Download, Filter, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PastRounds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFormat, setFilterFormat] = useState("all");
  const [filterResult, setFilterResult] = useState("all");

  const rounds = [
    {
      id: 1,
      motion: "This House Would Ban All Forms of Political Advertising on Social Media",
      format: "Asian Parliamentary",
      side: "Government",
      result: "Win",
      score: 87,
      date: "2024-01-15",
      duration: "42 mins",
      opponents: ["AI Opposition Team"],
      judge: "AI Judge Alpha",
      feedback: "Excellent argumentation with strong evidence. Consider improving rebuttal timing.",
      highlights: ["Strong opening", "Compelling examples", "Effective POI responses"],
      areas: ["Rebuttal timing", "Statistical analysis"]
    },
    {
      id: 2,
      motion: "This House Would Implement Universal Basic Income",
      format: "British Parliamentary",
      side: "Opposition",
      result: "Loss",
      score: 72,
      date: "2024-01-12",
      duration: "38 mins",
      opponents: ["AI Government Team", "AI Closing Gov", "AI Closing Opp"],
      judge: "AI Judge Beta",
      feedback: "Good clash but need stronger economic analysis. Well-structured arguments.",
      highlights: ["Clear structure", "Good clash", "Confident delivery"],
      areas: ["Economic analysis", "Statistical backing", "Conclusion strength"]
    },
    {
      id: 3,
      motion: "This House Would Abolish Nuclear Weapons",
      format: "World Schools",
      side: "Government",
      result: "Win",
      score: 91,
      date: "2024-01-10",
      duration: "45 mins",
      opponents: ["AI Opposition Team"],
      judge: "AI Judge Gamma",
      feedback: "Outstanding performance with exceptional research and delivery.",
      highlights: ["Exceptional research", "Powerful delivery", "Strategic POIs", "Strong closing"],
      areas: ["Minor timing adjustments"]
    },
    {
      id: 4,
      motion: "This House Would Require Parental Licenses",
      format: "Asian Parliamentary",
      side: "Opposition",
      result: "Win",
      score: 83,
      date: "2024-01-08",
      duration: "40 mins",
      opponents: ["AI Government Team"],
      judge: "AI Judge Alpha",
      feedback: "Creative arguments with good philosophical grounding.",
      highlights: ["Creative arguments", "Philosophical depth", "Good rebuttals"],
      areas: ["Example diversity", "Time management"]
    }
  ];

  const filteredRounds = rounds.filter(round => {
    const matchesSearch = round.motion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         round.format.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = filterFormat === "all" || round.format.includes(filterFormat);
    const matchesResult = filterResult === "all" || round.result.toLowerCase() === filterResult;
    
    return matchesSearch && matchesFormat && matchesResult;
  });

  const stats = {
    totalRounds: rounds.length,
    wins: rounds.filter(r => r.result === "Win").length,
    winRate: Math.round((rounds.filter(r => r.result === "Win").length / rounds.length) * 100),
    avgScore: Math.round(rounds.reduce((sum, r) => sum + r.score, 0) / rounds.length)
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Past Rounds
          </h1>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Track your debate performance and review past rounds
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger-animation">
          <div className="neu-card p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-accent" />
            <div className="text-2xl font-bold text-gradient">{stats.wins}</div>
            <div className="text-sm text-foreground-secondary">Wins</div>
          </div>
          <div className="neu-card p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
            <div className="text-2xl font-bold text-gradient">{stats.winRate}%</div>
            <div className="text-sm text-foreground-secondary">Win Rate</div>
          </div>
          <div className="neu-card p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-secondary" />
            <div className="text-2xl font-bold text-gradient">{stats.totalRounds}</div>
            <div className="text-sm text-foreground-secondary">Total Rounds</div>
          </div>
          <div className="neu-card p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-success" />
            <div className="text-2xl font-bold text-gradient">{stats.avgScore}</div>
            <div className="text-sm text-foreground-secondary">Avg Score</div>
          </div>
        </div>

        {/* Filters */}
        <div className="neu-card p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search motions or formats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card/50 border-card-border"
                />
              </div>
            </div>
            <Select value={filterFormat} onValueChange={setFilterFormat}>
              <SelectTrigger className="sm:w-48 bg-card/50 border-card-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="Asian">Asian Parliamentary</SelectItem>
                <SelectItem value="British">British Parliamentary</SelectItem>
                <SelectItem value="World">World Schools</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger className="sm:w-48 bg-card/50 border-card-border">
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="win">Wins</SelectItem>
                <SelectItem value="loss">Losses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rounds List */}
        <div className="space-y-6">
          {filteredRounds.map((round, index) => (
            <div key={round.id} className="debate-card animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Round Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                        {round.motion}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                          {round.format}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                          {round.side}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          round.result === "Win" 
                            ? "bg-success/20 text-success" 
                            : "bg-destructive/20 text-destructive"
                        }`}>
                          {round.result}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient mb-1">{round.score}</div>
                      <div className="text-sm text-foreground-secondary">Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-foreground-secondary">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(round.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{round.duration}</span>
                    </div>
                  </div>

                  <p className="text-foreground-secondary mb-4">{round.feedback}</p>

                  {/* Highlights & Areas for Improvement */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-success mb-2 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Highlights
                      </h4>
                      <div className="space-y-1">
                        {round.highlights.map((highlight, i) => (
                          <div key={i} className="text-sm text-foreground-secondary">
                            • {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warning mb-2 flex items-center">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        Areas to Improve
                      </h4>
                      <div className="space-y-1">
                        {round.areas.map((area, i) => (
                          <div key={i} className="text-sm text-foreground-secondary">
                            • {area}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-3 lg:mt-0 mt-4">
                  <Button className="btn-primary flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Replay Round</span>
                  </Button>
                  <Button variant="outline" className="border-card-border hover:border-primary flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </Button>
                  <Button variant="outline" className="border-card-border hover:border-secondary flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRounds.length === 0 && (
          <div className="neu-card p-12 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-heading font-semibold mb-2 text-gradient">
              No rounds found
            </h3>
            <p className="text-foreground-secondary">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastRounds;