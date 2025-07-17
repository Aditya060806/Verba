import { useState } from "react";
import { Search, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const GlossaryModal = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const glossaryTerms = [
    {
      term: "Asian Parliamentary (AP)",
      definition: "A debate format featuring 6 speakers, 3 on each side, with 7-minute speeches and Points of Information."
    },
    {
      term: "British Parliamentary (BP)",  
      definition: "A 4-team debate format with Opening Government, Opening Opposition, Closing Government, and Closing Opposition."
    },
    {
      term: "World Schools",
      definition: "A debate format combining prepared and impromptu motions, featuring 8-minute speeches and reply speeches."
    },
    {
      term: "Point of Information (POI)",
      definition: "A brief question or challenge that can be offered during an opponent's speech, lasting 15-20 seconds."
    },
    {
      term: "Motion",
      definition: "The statement or topic being debated, usually starting with 'This House Would' or 'This House Believes'."
    },
    {
      term: "Framework",
      definition: "The interpretation and parameters set for the debate, including definitions and scope."
    },
    {
      term: "Rebuttal",
      definition: "Arguments that directly challenge and respond to points made by the opposing side."
    },
    {
      term: "Clash",
      definition: "The direct engagement between opposing arguments where teams address each other's points."
    },
    {
      term: "Substantive Speech",
      definition: "Main speeches in a debate where new arguments are presented (not whip speeches)."
    },
    {
      term: "Whip Speech",
      definition: "Final speeches in AP format that summarize and compare cases without introducing new arguments."
    },
    {
      term: "Case Split",
      definition: "How a team divides their arguments between speakers to avoid overlap and ensure coverage."
    },
    {
      term: "Stakeholder Analysis",
      definition: "Examining different groups affected by the motion and their interests."
    }
  ];

  const filteredTerms = glossaryTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-card-border hover:border-primary">
          <BookOpen className="w-4 h-4 mr-2" />
          Debate Glossary
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading text-gradient flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Debate Glossary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/50 border-card-border"
            />
          </div>

          {/* Terms List */}
          <div className="space-y-4">
            {filteredTerms.map((item, index) => (
              <div key={index} className="glass-card p-4">
                <h3 className="font-semibold text-lg text-gradient mb-2">{item.term}</h3>
                <p className="text-foreground-secondary leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-foreground-secondary">No terms found matching your search.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlossaryModal;