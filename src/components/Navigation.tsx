import BrandLogo from "./navigation/BrandLogo";
import NavigationItems from "./navigation/NavigationItems";
import QuickActions from "./navigation/QuickActions";
import MobileNavigation from "./navigation/MobileNavigation";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <BrandLogo />

          {/* Navigation Items */}
          <NavigationItems />

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </nav>
  );
};

export default Navigation;