import { useState } from "react";
import { Plus, MessageCircle, Zap, BookOpen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      icon: Zap,
      label: "Quick Practice",
      action: () => navigate("/case-prep"),
      className: "bg-gradient-to-r from-primary to-accent text-primary-foreground"
    },
    {
      icon: MessageCircle,
      label: "Debate Arena",
      action: () => navigate("/debate-arena"),
      className: "bg-gradient-to-r from-secondary to-secondary-dark text-secondary-foreground"
    },
    {
      icon: BookOpen,
      label: "Past Rounds",
      action: () => navigate("/past-rounds"),
      className: "bg-gradient-to-r from-accent to-accent-dark text-accent-foreground"
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-4 animate-scale-in z-50">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 justify-end"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                marginBottom: index < actions.length - 1 ? '8px' : '0'
              }}
            >
              <div className="glass-card px-3 py-2 rounded-xl shadow-md bg-background/95 backdrop-blur-sm border">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {action.label}
                </span>
              </div>
              <button
                aria-label={action.label}
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={`w-12 h-12 rounded-full ${action.className} flex items-center justify-center shadow-lg hover:scale-125 active:scale-95 transition-all duration-300 animate-slide-in-up border border-white/10 shadow-neon relative overflow-hidden`}
              >
                <action.icon className="w-5 h-5" />
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:scale-125 active:scale-95 transition-all duration-300 flex items-center justify-center hover:shadow-neon focus:shadow-neon relative overflow-hidden group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      </button>
    </div>
  );
};

export default FloatingActionButton;