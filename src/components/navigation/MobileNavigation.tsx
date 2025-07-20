import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import NavigationItems from "./NavigationItems";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSignIn = () => {
    navigate('/auth/sign-in');
  };

  return (
    <div className="md:hidden px-4 py-3 border-t border-white/10 bg-white/20 backdrop-blur-lg shadow-lg rounded-b-3xl animate-fade-slide-up relative">
      {/* Neon animated border for mobile nav */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full rounded-b-3xl border-b-4 border-gradient-to-r from-primary via-accent to-secondary animate-neon-glow" />
      </div>
      <div className="flex justify-between items-center relative z-10">
        <NavigationItems isMobile={true} />
        
        {/* Mobile Auth Button */}
        {!isAuthenticated && (
          <Button 
            onClick={handleSignIn}
            size="sm"
            className="btn-primary text-xs ml-2 drop-shadow-glow"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;