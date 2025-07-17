import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-card/50 hover:bg-secondary/20 transition-all duration-300 group hover:scale-110 active:scale-95"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-warning group-hover:text-accent transition-colors duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;