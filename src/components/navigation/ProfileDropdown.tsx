import { useNavigate } from "react-router-dom";
import { User, History, Trophy, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          className="relative h-10 px-3 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-medium transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_hsl(var(--primary-glow))]"
        >
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="hidden sm:block">{user?.firstName}</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 glass-card mt-2 bg-card border border-card-border shadow-lg z-50" 
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-foreground-secondary">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleProfileClick}
          className="cursor-pointer hover:bg-primary/10"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/past-rounds')}
          className="cursor-pointer hover:bg-primary/10"
        >
          <History className="mr-2 h-4 w-4" />
          <span>Past Rounds</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/leaderboard')}
          className="cursor-pointer hover:bg-primary/10"
        >
          <Trophy className="mr-2 h-4 w-4" />
          <span>Leaderboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer hover:bg-destructive/10 text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;