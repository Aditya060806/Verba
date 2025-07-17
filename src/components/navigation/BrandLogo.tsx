import { Trophy } from "lucide-react";

const BrandLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Trophy className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
      </div>
      <span className="text-xl font-heading font-bold text-gradient">
        Verba
      </span>
    </div>
  );
};

export default BrandLogo;