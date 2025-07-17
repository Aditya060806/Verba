import { useState } from 'react';
import { Bot, Settings, User, Briefcase, GraduationCap, Crown, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface AIPersonality {
  id: string;
  name: string;
  description: string;
  icon: any;
  traits: {
    formality: number;
    encouragement: number;
    intensity: number;
    expertise: number;
  };
  specialties: string[];
  color: string;
  avatar: string;
}

const AIPersonalitySelector = () => {
  const [selectedPersonality, setSelectedPersonality] = useState<string>('mentor');
  const [customTraits, setCustomTraits] = useState({
    formality: 70,
    encouragement: 80,
    intensity: 60,
    expertise: 90
  });

  const personalities: AIPersonality[] = [
    {
      id: 'mentor',
      name: 'The Mentor',
      description: 'Supportive and encouraging, focuses on building confidence while providing constructive feedback.',
      icon: GraduationCap,
      traits: { formality: 70, encouragement: 90, intensity: 50, expertise: 85 },
      specialties: ['Beginner guidance', 'Confidence building', 'Speech structure'],
      color: 'text-primary',
      avatar: '👨‍🏫'
    },
    {
      id: 'competitor',
      name: 'The Competitor',
      description: 'High-energy and challenging, pushes you to excel with competitive spirit and strategic insights.',
      icon: Crown,
      traits: { formality: 60, encouragement: 70, intensity: 95, expertise: 90 },
      specialties: ['Advanced tactics', 'Competitive strategy', 'Performance optimization'],
      color: 'text-accent',
      avatar: '🏆'
    },
    {
      id: 'professor',
      name: 'The Professor',
      description: 'Analytical and thorough, provides detailed academic-style feedback with deep theoretical knowledge.',
      icon: Briefcase,
      traits: { formality: 95, encouragement: 60, intensity: 70, expertise: 100 },
      specialties: ['Research methods', 'Argument analysis', 'Evidence evaluation'],
      color: 'text-secondary',
      avatar: '👩‍🔬'
    },
    {
      id: 'friend',
      name: 'The Friend',
      description: 'Casual and relatable, creates a comfortable learning environment with friendly, approachable feedback.',
      icon: Heart,
      traits: { formality: 30, encouragement: 100, intensity: 40, expertise: 75 },
      specialties: ['Anxiety reduction', 'Natural conversation', 'Confidence building'],
      color: 'text-success',
      avatar: '😊'
    },
    {
      id: 'innovator',
      name: 'The Innovator',
      description: 'Creative and forward-thinking, introduces cutting-edge techniques and unconventional strategies.',
      icon: Zap,
      traits: { formality: 50, encouragement: 80, intensity: 85, expertise: 95 },
      specialties: ['Creative arguments', 'Modern techniques', 'Innovation strategies'],
      color: 'text-warning',
      avatar: '🚀'
    }
  ];

  const selectedAI = personalities.find(p => p.id === selectedPersonality);

  return (
    <Card className="glass-ultra border border-primary/20">
      <CardHeader>
        <CardTitle className="text-gradient flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          AI Personality Selector
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personality Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalities.map((personality) => (
            <Card
              key={personality.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPersonality === personality.id
                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary-glow))]'
                  : 'border-border/20 hover:border-primary/40'
              }`}
              onClick={() => setSelectedPersonality(personality.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-3">{personality.avatar}</div>
                <h3 className={`font-semibold mb-2 ${personality.color}`}>
                  {personality.name}
                </h3>
                <p className="text-sm text-foreground-secondary mb-3 leading-relaxed">
                  {personality.description}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {personality.specialties.slice(0, 2).map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="outline"
                      className="text-xs border-border/20"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Personality Details */}
        {selectedAI && (
          <div className="neu-card p-6 animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">{selectedAI.avatar}</div>
              <div>
                <h3 className={`text-xl font-semibold ${selectedAI.color}`}>
                  {selectedAI.name}
                </h3>
                <p className="text-sm text-foreground-secondary">
                  Active AI Personality
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-gradient">
                  {selectedAI.traits.formality}%
                </div>
                <div className="text-xs text-foreground-secondary">Formality</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gradient">
                  {selectedAI.traits.encouragement}%
                </div>
                <div className="text-xs text-foreground-secondary">Encouragement</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gradient">
                  {selectedAI.traits.intensity}%
                </div>
                <div className="text-xs text-foreground-secondary">Intensity</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gradient">
                  {selectedAI.traits.expertise}%
                </div>
                <div className="text-xs text-foreground-secondary">Expertise</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Specialties</Label>
              <div className="flex flex-wrap gap-2">
                {selectedAI.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    className="bg-primary/20 text-primary border-primary/20"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom Tuning */}
        <div className="neu-card p-6">
          <h4 className="font-semibold mb-4 text-gradient">Fine-tune AI Behavior</h4>
          <div className="space-y-6">
            {Object.entries(customTraits).map(([trait, value]) => (
              <div key={trait} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm capitalize">{trait}</Label>
                  <span className="text-sm text-primary font-medium">{value}%</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(values) => 
                    setCustomTraits(prev => ({ ...prev, [trait]: values[0] }))
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-6 glass-ultra border border-primary/20 hover:border-primary/40"
            variant="outline"
          >
            Apply Custom Settings
          </Button>
        </div>

        {/* Preview Message */}
        <div className="neu-card p-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{selectedAI?.avatar}</div>
            <div className="flex-1">
              <div className="text-sm font-medium text-primary mb-1">
                {selectedAI?.name} Preview
              </div>
              <div className="text-sm text-foreground-secondary italic">
                "Hello! I'm excited to work with you today. Based on your selected personality, 
                I'll provide {selectedAI?.traits.encouragement > 70 ? 'encouraging and supportive' : 'direct and analytical'} feedback 
                while maintaining a {selectedAI?.traits.formality > 70 ? 'formal and professional' : 'casual and friendly'} tone. 
                Let's make this a great practice session!"
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPersonalitySelector;