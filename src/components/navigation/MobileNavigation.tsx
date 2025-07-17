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
    <div className="md:hidden px-4 py-3 border-t border-white/10">
      <div className="flex justify-between items-center">
        <NavigationItems isMobile={true} />
        
        {/* Mobile Auth Button */}
        {!isAuthenticated && (
          <Button 
            onClick={handleSignIn}
            size="sm"
            className="btn-primary text-xs ml-2"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;