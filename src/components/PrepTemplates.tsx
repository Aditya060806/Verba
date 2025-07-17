import { useState } from "react";
import { Globe, Heart, Cpu, TreePine, Scale, ChevronRight, Edit3, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const PrepTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<number | null>(null);
  const [templateValues, setTemplateValues] = useState<{ [key: string]: string }>({});

  const templates = [
    {
      id: 1,
      title: "International Relations",
      icon: Globe,
      color: "primary",
      description: "For motions involving countries, diplomacy, and global governance",
      fields: {
        stakeholders: "State actors: [Country A], [Country B], [International Organizations]\nNon-state actors: [NGOs], [Multinational Corporations], [Citizens]",
        framing: "National Interest vs Global Cooperation\nSovereignty vs International Law\nSecurity vs Human Rights",
        arguments: "1. National Security Implications\n   - [Specific security concerns]\n   - [Regional stability effects]\n\n2. Economic Consequences\n   - [Trade impacts]\n   - [Development implications]\n\n3. Diplomatic Relations\n   - [Alliance effects]\n   - [International standing]",
        rebuttals: "Opposition Argument: [Common counter-argument]\nOur Response: [Your rebuttal]\n\nOpposition Argument: [Another counter]\nOur Response: [Your counter-rebuttal]",
        examples: "Historical Precedent: [Relevant historical example]\nCurrent Events: [Recent news/developments]\nCase Studies: [Specific country/region examples]"
      }
    },
    {
      id: 2,
      title: "Ethics and Morality",
      icon: Heart,
      color: "accent",
      description: "For motions involving moral principles, rights, and ethical dilemmas",
      fields: {
        stakeholders: "Primary Stakeholders: [Directly affected individuals/groups]\nSecondary Stakeholders: [Society, families, institutions]\nMoral Agents: [Those making decisions]",
        framing: "Individual Rights vs Collective Good\nConsequentialism vs Deontological Ethics\nAutonomy vs Paternalism\nLiberty vs Equality",
        arguments: "1. Moral Principle\n   - [Core ethical principle]\n   - [Why this principle matters]\n\n2. Practical Consequences\n   - [Real-world outcomes]\n   - [Who benefits/suffers]\n\n3. Precedent and Consistency\n   - [Moral consistency]\n   - [Slippery slope considerations]",
        rebuttals: "Moral Counter: [Opposition's ethical argument]\nOur Response: [Your ethical counter]\n\nPractical Counter: [Opposition's practical concern]\nOur Response: [Your practical rebuttal]",
        examples: "Philosophical Framework: [Relevant ethical theory]\nReal-world Case: [Actual ethical dilemma]\nComparative Analysis: [Similar moral issues]"
      }
    },
    {
      id: 3,
      title: "Technology and Society",
      icon: Cpu,
      color: "secondary",
      description: "For motions about technological innovation, digital rights, and tech governance",
      fields: {
        stakeholders: "Tech Companies: [Platform owners, developers]\nUsers: [Consumers, content creators]\nGovernment: [Regulators, policymakers]\nSociety: [Affected communities, future generations]",
        framing: "Innovation vs Regulation\nPrivacy vs Efficiency\nAccess vs Control\nProgress vs Precaution",
        arguments: "1. Technological Benefits\n   - [Efficiency gains]\n   - [Innovation potential]\n\n2. Social Impact\n   - [Democratization effects]\n   - [Quality of life improvements]\n\n3. Economic Considerations\n   - [Market dynamics]\n   - [Economic growth/disruption]",
        rebuttals: "Tech Risks: [Opposition's safety concerns]\nOur Response: [Mitigation strategies]\n\nPractical Limits: [Implementation challenges]\nOur Response: [Feasibility arguments]",
        examples: "Tech Precedent: [Similar technology adoption]\nCurrent Trends: [Recent developments]\nComparative Analysis: [Different regulatory approaches]"
      }
    },
    {
      id: 4,
      title: "Environmental Policy",
      icon: TreePine,
      color: "success",
      description: "For motions about climate change, conservation, and environmental protection",
      fields: {
        stakeholders: "Environmental: [Wildlife, ecosystems, future generations]\nEconomic: [Industries, workers, consumers]\nCommunities: [Local populations, indigenous groups]\nGlobal: [International community, developing nations]",
        framing: "Economic Growth vs Environmental Protection\nShort-term Costs vs Long-term Benefits\nLocal vs Global Impact\nHuman Needs vs Natural Rights",
        arguments: "1. Environmental Urgency\n   - [Climate science evidence]\n   - [Ecological consequences]\n\n2. Economic Transition\n   - [Green economy opportunities]\n   - [Cost of inaction]\n\n3. Social Justice\n   - [Environmental equity]\n   - [Intergenerational responsibility]",
        rebuttals: "Economic Burden: [Opposition's cost concerns]\nOur Response: [Economic benefits/necessities]\n\nPractical Feasibility: [Implementation challenges]\nOur Response: [Technological solutions/precedents]",
        examples: "Scientific Evidence: [Climate data/research]\nPolicy Precedent: [Successful environmental policies]\nCase Studies: [Countries/regions with relevant experience]"
      }
    },
    {
      id: 5,
      title: "Human Rights",
      icon: Scale,
      color: "warning",
      description: "For motions involving fundamental rights, freedoms, and human dignity",
      fields: {
        stakeholders: "Rights Holders: [Individuals/groups claiming rights]\nDuty Bearers: [Government, institutions]\nSociety: [Community, cultural groups]\nVulnerable Groups: [Minorities, marginalized populations]",
        framing: "Individual Rights vs Collective Security\nFreedom vs Order\nEquality vs Liberty\nUniversal vs Cultural Rights",
        arguments: "1. Fundamental Rights\n   - [Core human dignity argument]\n   - [Inalienable nature of rights]\n\n2. Social Progress\n   - [Advancement of civilization]\n   - [Protection of vulnerable groups]\n\n3. Legal Framework\n   - [International law obligations]\n   - [Constitutional principles]",
        rebuttals: "Cultural Relativism: [Opposition's cultural argument]\nOur Response: [Universal human dignity]\n\nSecurity Concerns: [Safety vs rights trade-off]\nOur Response: [Rights as foundation of security]",
        examples: "International Law: [Relevant conventions/treaties]\nHistorical Progress: [Rights movements/victories]\nComparative Analysis: [Different legal systems/approaches]"
      }
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "text-primary bg-primary/20 border-primary/30";
      case "accent": return "text-accent bg-accent/20 border-accent/30";
      case "secondary": return "text-secondary bg-secondary/20 border-secondary/30";
      case "success": return "text-success bg-success/20 border-success/30";
      case "warning": return "text-warning bg-warning/20 border-warning/30";
      default: return "text-foreground bg-muted border-muted";
    }
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(selectedTemplate === templateId ? null : templateId);
    setEditingTemplate(null);
  };

  const handleEdit = (templateId: number) => {
    setEditingTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newValues: { [key: string]: string } = {};
      Object.entries(template.fields).forEach(([field, value]) => {
        newValues[`${templateId}-${field}`] = templateValues[`${templateId}-${field}`] || value;
      });
      setTemplateValues(prev => ({ ...prev, ...newValues }));
    }
  };

  const handleSave = () => {
    setEditingTemplate(null);
    // Here you would typically save to localStorage or send to a backend
  };

  const handleReset = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const resetValues: { [key: string]: string } = {};
      Object.entries(template.fields).forEach(([field, value]) => {
        resetValues[`${templateId}-${field}`] = value;
      });
      setTemplateValues(prev => ({ ...prev, ...resetValues }));
    }
  };

  const updateFieldValue = (key: string, value: string) => {
    setTemplateValues(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="neu-card p-6 sticky top-24">
      <h2 className="text-xl font-heading font-semibold mb-6 flex items-center text-gradient">
        <Edit3 className="w-5 h-5 mr-2" />
        Prep Templates
      </h2>

      <div className="space-y-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          const isEditing = editingTemplate === template.id;

          return (
            <Collapsible key={template.id} open={isSelected} onOpenChange={() => handleTemplateSelect(template.id)}>
              <div className="group">
                <CollapsibleTrigger asChild>
                  <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    isSelected ? getColorClasses(template.color) : "border-card-border bg-card/30 hover:bg-card/50"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <template.icon className={`w-5 h-5 ${isSelected ? `text-${template.color}` : "text-foreground-secondary"}`} />
                        <div>
                          <h3 className="font-medium text-foreground">{template.title}</h3>
                          <p className="text-sm text-foreground-secondary">{template.description}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-4 space-y-6 p-4 rounded-xl bg-card/20 border border-card-border">
                    {/* Action Buttons */}
                    {!isEditing ? (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleEdit(template.id)}
                          className="btn-primary"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReset(template.id)}
                          className="border-card-border"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Reset
                        </Button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={handleSave}
                          className="btn-primary"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEditingTemplate(null)}
                          className="border-card-border"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}

                    {/* Template Fields */}
                    {Object.entries(template.fields).map(([field, defaultValue]) => {
                      const fieldKey = `${template.id}-${field}`;
                      const currentValue = templateValues[fieldKey] || defaultValue;

                      return (
                        <div key={field} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="capitalize">
                              {field.replace(/([A-Z])/g, ' $1').trim()}
                            </Badge>
                          </div>
                          {isEditing ? (
                            <Textarea
                              value={currentValue}
                              onChange={(e) => updateFieldValue(fieldKey, e.target.value)}
                              className="min-h-[120px] bg-card/50 border-card-border focus:border-primary/50 font-mono text-sm"
                              placeholder={`Enter ${field}...`}
                            />
                          ) : (
                            <div className="glass-card p-3">
                              <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                                {currentValue}
                              </pre>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>

      {/* Usage Tip */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <h4 className="font-medium text-foreground mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-foreground-secondary">
          Customize these templates based on your debate style and save them for quick case preparation. 
          Each template provides a structured approach to different motion types.
        </p>
      </div>
    </div>
  );
};

export default PrepTemplates;