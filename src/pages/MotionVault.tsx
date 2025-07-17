import { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, ChevronRight, Target, Clock, Zap, Book, Globe, Gavel, Users, Cpu, Heart, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const MotionVault = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [expandedMotion, setExpandedMotion] = useState<number | null>(null);

  const themeIcons = {
    Ethics: Heart,
    Politics: Target,
    "International Relations": Globe,
    Technology: Cpu,
    Law: Gavel,
    Environment: TreePine,
    Economics: Book,
    Society: Users,
  };

  const motions = [
    {
      id: 1,
      title: "This House Would Ban All Forms of Political Advertising on Social Media",
      format: "BP",
      theme: "Politics",
      difficulty: "Intermediate",
      description: "A debate about regulating political advertising in the digital age, focusing on democracy, free speech, and technological influence.",
      cases: [
        "Democratic integrity and manipulation prevention",
        "Equal access to political discourse",
        "Platform accountability and regulation"
      ],
      oppositionLines: [
        "Freedom of speech and expression rights",
        "Practical enforcement challenges",
        "Alternative solutions to misinformation"
      ],
      stakeholders: ["Voters", "Political Parties", "Social Media Platforms", "Regulatory Bodies"],
      tags: ["social media", "democracy", "advertising", "free speech"]
    },
    {
      id: 2,
      title: "This House Believes That Artificial Intelligence Should Replace Human Judges in Criminal Courts",
      format: "AP",
      theme: "Technology",
      difficulty: "Advanced",
      description: "Examining the role of AI in judicial systems, considering bias, efficiency, and the nature of justice.",
      cases: [
        "Elimination of human bias and prejudice",
        "Consistent application of legal precedents",
        "Cost efficiency and access to justice"
      ],
      oppositionLines: [
        "Lack of empathy and contextual understanding",
        "Technical limitations and algorithmic bias",
        "Importance of human judgment in complex cases"
      ],
      stakeholders: ["Defendants", "Legal Professionals", "Society", "Tech Companies"],
      tags: ["AI", "justice", "courts", "bias", "technology"]
    },
    {
      id: 3,
      title: "This House Would Make Voting Mandatory in Democratic Elections",
      format: "WS",
      theme: "Politics",
      difficulty: "Beginner",
      description: "A foundational debate about democratic participation, civic duty, and electoral legitimacy.",
      cases: [
        "Enhanced democratic legitimacy through higher turnout",
        "Reduced influence of extreme political factions",
        "Civic duty and responsibility promotion"
      ],
      oppositionLines: [
        "Freedom includes the right not to participate",
        "Uninformed voting from reluctant participants",
        "Practical enforcement and penalty issues"
      ],
      stakeholders: ["Citizens", "Government", "Political Parties", "Electoral Commissions"],
      tags: ["voting", "democracy", "participation", "civic duty"]
    },
    {
      id: 4,
      title: "This House Would Allow Patents on Human Genes",
      format: "BP",
      theme: "Ethics",
      difficulty: "Advanced",
      description: "Exploring the intersection of intellectual property, medical research, and human dignity.",
      cases: [
        "Incentivizing medical research and innovation",
        "Protecting intellectual property rights",
        "Accelerating treatment development"
      ],
      oppositionLines: [
        "Human genetic material as common heritage",
        "Access barriers to medical treatments",
        "Ethical concerns about commodifying humanity"
      ],
      stakeholders: ["Patients", "Researchers", "Pharmaceutical Companies", "Society"],
      tags: ["genetics", "patents", "ethics", "medicine", "research"]
    },
    {
      id: 5,
      title: "This House Would Prioritize Climate Refugees Over Economic Migrants",
      format: "AP",
      theme: "International Relations",
      difficulty: "Intermediate",
      description: "Addressing migration policy in the context of climate change and global responsibility.",
      cases: [
        "Moral obligation to those displaced by climate change",
        "Involuntary vs voluntary migration distinction",
        "International responsibility for environmental damage"
      ],
      oppositionLines: [
        "Difficulty in defining and proving climate displacement",
        "Economic migrants' legitimate needs and rights",
        "Practical challenges in implementation"
      ],
      stakeholders: ["Climate Refugees", "Economic Migrants", "Host Countries", "International Organizations"],
      tags: ["climate", "migration", "refugees", "environment", "policy"]
    }
  ];

  const filteredMotions = useMemo(() => {
    return motions.filter((motion) => {
      const matchesSearch = motion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           motion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           motion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFormat = selectedFormat === "all" || motion.format === selectedFormat;
      const matchesTheme = selectedTheme === "all" || motion.theme === selectedTheme;
      const matchesDifficulty = selectedDifficulty === "all" || motion.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesFormat && matchesTheme && matchesDifficulty;
    });
  }, [searchTerm, selectedFormat, selectedTheme, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-success bg-success/20";
      case "Intermediate": return "text-warning bg-warning/20";
      case "Advanced": return "text-destructive bg-destructive/20";
      default: return "text-foreground-secondary bg-muted";
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "BP": return "text-primary bg-primary/20";
      case "AP": return "text-accent bg-accent/20";
      case "WS": return "text-secondary bg-secondary/20";
      default: return "text-foreground-secondary bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-4">
            Motion Vault
          </h1>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Discover and explore over 1000+ debate motions across all formats and themes
          </p>
        </div>

        {/* Filters */}
        <div className="neu-card p-6 mb-8 animate-slide-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
                <Input
                  placeholder="Search motions, themes, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card/50 border-card-border focus:border-primary/50"
                />
              </div>
            </div>

            {/* Format Filter */}
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="bg-card/50 border-card-border">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="BP">British Parliamentary</SelectItem>
                <SelectItem value="AP">Asian Parliamentary</SelectItem>
                <SelectItem value="WS">World Schools</SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Filter */}
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="bg-card/50 border-card-border">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Themes</SelectItem>
                <SelectItem value="Ethics">Ethics</SelectItem>
                <SelectItem value="Politics">Politics</SelectItem>
                <SelectItem value="International Relations">International Relations</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Law">Law</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Economics">Economics</SelectItem>
                <SelectItem value="Society">Society</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Button
              variant={selectedDifficulty === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("all")}
              className={selectedDifficulty === "all" ? "bg-primary text-primary-foreground" : "border-card-border"}
            >
              All Levels
            </Button>
            {["Beginner", "Intermediate", "Advanced"].map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className={selectedDifficulty === difficulty ? "bg-primary text-primary-foreground" : "border-card-border"}
              >
                {difficulty}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-foreground-secondary">
              Showing {filteredMotions.length} of {motions.length} motions
            </p>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Filters Active</span>
            </div>
          </div>
        </div>

        {/* Motion Cards */}
        <div className="space-y-6 stagger-animation">
          {filteredMotions.map((motion, index) => {
            const ThemeIcon = themeIcons[motion.theme as keyof typeof themeIcons] || Book;
            const isExpanded = expandedMotion === motion.id;

            return (
              <Collapsible key={motion.id} open={isExpanded} onOpenChange={() => setExpandedMotion(isExpanded ? null : motion.id)}>
                <div className="neu-card overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CollapsibleTrigger asChild>
                    <div className="p-6 cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <ThemeIcon className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                              {motion.title}
                            </h3>
                          </div>
                          <p className="text-foreground-secondary leading-relaxed mb-4">
                            {motion.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-primary transition-transform" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors" />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className={getFormatColor(motion.format)}>
                          {motion.format}
                        </Badge>
                        <Badge variant="outline" className="border-card-border">
                          {motion.theme}
                        </Badge>
                        <Badge className={getDifficultyColor(motion.difficulty)}>
                          {motion.difficulty}
                        </Badge>
                        {motion.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-6 pb-6 border-t border-card-border">
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        {/* Government Cases */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gradient flex items-center">
                            <Target className="w-5 h-5 mr-2" />
                            Example Cases
                          </h4>
                          <div className="space-y-3">
                            {motion.cases.map((case_, caseIndex) => (
                              <div key={caseIndex} className="glass-card p-3">
                                <p className="text-foreground text-sm">{case_}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Opposition Lines */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gradient flex items-center">
                            <Zap className="w-5 h-5 mr-2" />
                            Opposition Lines
                          </h4>
                          <div className="space-y-3">
                            {motion.oppositionLines.map((line, lineIndex) => (
                              <div key={lineIndex} className="glass-card p-3">
                                <p className="text-foreground text-sm">{line}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Stakeholders */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gradient flex items-center">
                            <Users className="w-5 h-5 mr-2" />
                            Key Stakeholders
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {motion.stakeholders.map((stakeholder) => (
                              <Badge key={stakeholder} variant="outline" className="border-primary/30">
                                {stakeholder}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gradient flex items-center">
                            <Book className="w-5 h-5 mr-2" />
                            Tags
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {motion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-card-border">
                        <Button className="btn-primary">
                          <Clock className="w-4 h-4 mr-2" />
                          Prep This Motion
                        </Button>
                        <Button variant="outline" className="border-card-border">
                          <Heart className="w-4 h-4 mr-2" />
                          Save to Favorites
                        </Button>
                        <Button variant="outline" className="border-card-border">
                          <Users className="w-4 h-4 mr-2" />
                          Practice Round
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>

        {/* No Results */}
        {filteredMotions.length === 0 && (
          <div className="neu-card p-12 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
              No motions found
            </h3>
            <p className="text-foreground-secondary">
              Try adjusting your filters or search terms to find relevant motions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MotionVault;