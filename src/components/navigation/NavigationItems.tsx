import { NavLink } from "react-router-dom";
import { FileText, Mic, Book, Brain, Users, Calendar } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

interface NavigationItemsProps {
  isMobile?: boolean;
}

const NavigationItems = ({ isMobile = false }: NavigationItemsProps) => {
  const { isAuthenticated } = useAuth();

  const navItems = [
    { path: "/daily-challenge", icon: Calendar, label: "Daily Challenge" },
    { path: "/motion-vault", icon: Book, label: "Motion Vault" },
    { path: "/learning", icon: Brain, label: "Learning" },
    ...(isAuthenticated ? [
      { path: "/case-prep", icon: FileText, label: "Case Prep" },
      { path: "/debate-arena", icon: Mic, label: "Debate Arena" },
      { path: "/peer-match", icon: Users, label: "Peer Match" },
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
              `flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 shadow-md bg-white/10 backdrop-blur-md border border-white/20 hover:scale-110 hover:shadow-neon focus:scale-110 focus:shadow-neon ${
                isActive ? "text-primary bg-primary/20 ring-2 ring-accent/60 shadow-neon" : "text-foreground-secondary"
              }`
            }
          >
            <item.icon className="w-5 h-5 transition-all duration-300 group-hover:text-accent group-focus:text-accent" />
            <span className="text-xs font-medium drop-shadow-glow">{item.label}</span>
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-link flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 shadow-md bg-white/10 backdrop-blur-md border border-white/20 hover:scale-110 hover:shadow-neon focus:scale-110 focus:shadow-neon ${
              isActive ? "text-primary bg-primary/20 ring-2 ring-accent/60 shadow-neon" : "text-foreground-secondary"
            }`
          }
        >
          <item.icon className="w-4 h-4 transition-all duration-300 group-hover:text-accent group-focus:text-accent" />
          <span className="text-sm font-medium drop-shadow-glow">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default NavigationItems;