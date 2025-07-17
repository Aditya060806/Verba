import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showStrength?: boolean;
  error?: string;
  name?: string;
}

const PasswordInput = ({ 
  value, 
  onChange, 
  placeholder = "Password", 
  showStrength = false,
  error,
  name = "password"
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return score;
  };

  const strength = getPasswordStrength(value);
  const strengthLabel = strength <= 2 ? 'Weak' : strength <= 4 ? 'Medium' : 'Strong';
  const strengthColor = strength <= 2 ? 'bg-destructive' : strength <= 4 ? 'bg-warning' : 'bg-success';

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          autoComplete={name === "password" ? "current-password" : "new-password"}
          className={`pr-12 ${error ? 'border-destructive' : ''}`}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-foreground-secondary" />
          ) : (
            <Eye className="h-4 w-4 text-foreground-secondary" />
          )}
        </Button>
      </div>
      
      {showStrength && value && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-secondary">Password strength</span>
            <span className={`text-xs font-medium ${
              strength <= 2 ? 'text-destructive' : strength <= 4 ? 'text-warning' : 'text-success'
            }`}>
              {strengthLabel}
            </span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${strengthColor}`}
              style={{ width: `${(strength / 6) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;