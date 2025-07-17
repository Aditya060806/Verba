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
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={`w-12 h-12 rounded-full ${action.className} flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 animate-slide-in-up border border-white/10`}
              >
                <action.icon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_30px_hsl(var(--primary-glow))]"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;