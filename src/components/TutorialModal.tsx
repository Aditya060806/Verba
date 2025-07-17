import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Target, Users, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal = ({ isOpen, onClose }: TutorialModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Play,
      title: "Welcome to Verba",
      content: "Your AI-powered debate training platform. Let's walk through how to master the art of debate with intelligent practice rounds.",
      image: "🎯"
    },
    {
      icon: Target,
      title: "Case Preparation",
      content: "Start by preparing your arguments. Enter a motion, select your format and side, then let AI generate comprehensive case materials including arguments, rebuttals, and examples.",
      image: "📚"
    },
    {
      icon: Users,
      title: "Role Selection",
      content: "Choose your speaking role (PM, LO, DPM, etc.) and skill level. Each role has specific strategies and responsibilities in the debate format.",
      image: "🎭"
    },
    {
      icon: Play,
      title: "Debate Arena",
      content: "Enter the live debate environment. Practice with AI opponents, manage your time, handle Points of Information, and deliver compelling speeches.",
      image: "🏟️"
    },
    {
      icon: Trophy,
      title: "Review & Improve",
      content: "After each round, receive detailed feedback, scores, and analysis. Track your progress and identify areas for improvement.",
      image: "📊"
    }
  ];

  const currentStepData = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-heading text-gradient">
              Getting Started
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-4xl">{currentStepData.image}</span>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-4 text-gradient flex items-center justify-center">
              <currentStepData.icon className="w-6 h-6 mr-2" />
              {currentStepData.title}
            </h3>
            <p className="text-foreground-secondary leading-relaxed max-w-md mx-auto">
              {currentStepData.content}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? 'bg-primary' : 
                  index < currentStep ? 'bg-primary/50' : 'bg-card-border'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-card-border hover:border-primary"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <span className="text-sm text-foreground-secondary">
              {currentStep + 1} of {steps.length}
            </span>

            <Button
              onClick={nextStep}
              className="btn-primary"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;