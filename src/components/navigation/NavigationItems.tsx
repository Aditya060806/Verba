import { NavLink } from "react-router-dom";
import { Home, FileText, Mic, User, Book, Target } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

interface NavigationItemsProps {
  isMobile?: boolean;
}

const NavigationItems = ({ isMobile = false }: NavigationItemsProps) => {
  const { isAuthenticated } = useAuth();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/motion-vault", icon: Book, label: "Motion Vault" },
    { path: "/leaderboard", icon: Target, label: "Leaderboard" },
    ...(isAuthenticated ? [
      { path: "/case-prep", icon: FileText, label: "Case Prep" },
      { path: "/debate-arena", icon: Mic, label: "Debate Arena" },
      { path: "/profile", icon: User, label: "Profile" },
    ] : [])
  ];

  if (isMobile) {
    return (
      <div className="flex justify-center flex-1 space-x-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                isActive ? "text-primary bg-primary/10" : "text-foreground-secondary"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-link flex items-center space-x-2 transition-all duration-300 ${
              isActive ? "active" : ""
            }`
          }
        >
          <item.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default NavigationItems;