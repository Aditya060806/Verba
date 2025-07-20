import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Lightbulb, Trophy, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'tip' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
  priority: 'low' | 'medium' | 'high';
}

const SmartNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Sample smart notifications
  const sampleNotifications: Notification[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You\'ve mastered the opening statement technique. Keep up the excellent work!',
      timestamp: new Date(),
      priority: 'high',
      action: {
        label: 'View Progress',
        onClick: () => console.log('View progress')
      }
    },
    {
      id: '2',
      type: 'tip',
      title: 'Smart Tip',
      message: 'Your rebuttal timing could improve. Try practicing with the 2-minute countdown feature.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      priority: 'medium',
      action: {
        label: 'Practice Now',
        onClick: () => console.log('Start practice')
      }
    },
    {
      id: '3',
      type: 'info',
      title: 'Weekly Challenge',
      message: 'New debate topic available: "The Future of Artificial Intelligence in Education"',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      priority: 'medium'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Practice Reminder',
      message: 'You haven\'t practiced in 2 days. Regular practice maintains your debate skills.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'low'
    }
  ];

  useEffect(() => {
    // Simulate receiving notifications
    const timer = setTimeout(() => {
      setNotifications(sampleNotifications);
    }, 1000);

    // Add new notifications periodically
    const interval = setInterval(() => {
      const encouragements = [
        'Your speech pattern analysis shows improvement!',
        'Great job maintaining eye contact during practice!',
        'Your argument structure is becoming more sophisticated.',
        'Excellent use of evidence in your last speech!'
      ];

      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'success',
        title: 'Performance Update',
        message: encouragements[Math.floor(Math.random() * encouragements.length)],
        timestamp: new Date(),
        priority: 'low'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'tip': return Lightbulb;
      case 'achievement': return Trophy;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      case 'tip': return 'text-accent';
      case 'achievement': return 'text-secondary';
      default: return 'text-foreground';
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => 
    Date.now() - n.timestamp.getTime() < 5 * 60 * 1000
  ).length;

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size="sm"
        className="relative hover:bg-card-secondary"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-accent text-accent-foreground rounded-full flex items-center justify-center animate-pulse"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed top-20 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-slide-in-right">
      <Card className="glass-ultra border border-primary/20 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-border/20">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-gradient flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Smart Notifications
            </h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-foreground-secondary">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);
                const isRecent = Date.now() - notification.timestamp.getTime() < 5 * 60 * 1000;

                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:border-primary/30 group relative ${
                      isRecent 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'bg-card/30 border-border/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`${colorClass} mt-1`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-foreground truncate">
                            {notification.title}
                          </h4>
                          <Button
                            onClick={() => removeNotification(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto hover:text-destructive"
                            aria-label="Close notification"
                            title="Close notification"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-foreground-secondary mt-1 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-foreground-secondary">
                            {notification.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          
                          {notification.action && (
                            <Button
                              onClick={notification.action.onClick}
                              size="sm"
                              variant="outline"
                              className="text-xs border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>

                        {isRecent && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-border/20">
            <Button
              onClick={() => setNotifications([])}
              variant="outline"
              size="sm"
              className="w-full border-border/20 hover:border-primary/40"
            >
              Clear All
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SmartNotifications;