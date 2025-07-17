import { useState } from "react";
import { Bell, Trophy, Zap } from "lucide-react";

const NotificationsDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-3 rounded-xl bg-card/50 hover:bg-secondary/20 transition-all duration-300 group hover:scale-110 active:scale-95"
        title="Notifications"
      >
        <Bell className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors duration-300" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-16 w-80 glass-card p-4 animate-scale-in z-50 bg-card border border-card-border rounded-2xl shadow-lg">
          <h3 className="font-semibold text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Trophy className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Debate Won!</p>
                <p className="text-xs text-foreground-secondary">You scored 87/100 in your last round</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-secondary/10 border border-secondary/20">
              <Zap className="w-5 h-5 text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">New tip available</p>
                <p className="text-xs text-foreground-secondary">Check out advanced rebuttal techniques</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;