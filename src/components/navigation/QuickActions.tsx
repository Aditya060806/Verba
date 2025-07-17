import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import ThemeToggle from "./ThemeToggle";
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

const QuickActions = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSignIn = () => {
    navigate('/auth/sign-in');
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Notifications */}
      <NotificationsDropdown />

      {/* Profile Menu / Sign In */}
      {isAuthenticated ? (
        <ProfileDropdown />
      ) : (
        <Button 
          onClick={handleSignIn}
          className="btn-primary text-sm font-medium"
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default QuickActions;