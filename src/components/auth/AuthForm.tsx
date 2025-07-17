import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Sign up specific validations
    if (mode === 'signup') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const endpoint = mode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Store auth state for demo
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          firstName: formData.firstName || 'User',
          lastName: formData.lastName || ''
        }));

        toast({
          title: mode === 'signin' ? "Welcome back!" : "Account created!",
          description: mode === 'signin' ? "You've been successfully signed in." : "Your account has been created successfully.",
        });

        // Redirect to home page
        window.location.href = '/';
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: mode === 'signin' 
          ? "Invalid email or password. Please try again." 
          : "Email already in use or server error.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({
      email: 'user@gmail.com',
      firstName: 'Google',
      lastName: 'User'
    }));
    
    toast({
      title: "Welcome!",
      description: "You've been successfully signed in with Google.",
    });
    
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const handleGoogleError = (error: string) => {
    toast({
      title: "Google Sign-in failed",
      description: error,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <GoogleButton 
        text={`${mode === 'signin' ? 'Sign in' : 'Sign up'} with Google`}
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-foreground-secondary">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={errors.firstName ? 'border-destructive' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={errors.lastName ? 'border-destructive' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        )}

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground-secondary" />
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <PasswordInput
          value={formData.password}
          onChange={(password) => setFormData({...formData, password})}
          placeholder="Password"
          showStrength={mode === 'signup'}
          error={errors.password}
          name="password"
        />

        {mode === 'signup' && (
          <PasswordInput
            value={formData.confirmPassword}
            onChange={(confirmPassword) => setFormData({...formData, confirmPassword})}
            placeholder="Confirm password"
            error={errors.confirmPassword}
            name="confirm-password"
          />
        )}

        {mode === 'signin' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData({...formData, rememberMe: checked as boolean})
                }
              />
              <label htmlFor="remember" className="text-sm text-foreground-secondary">
                Remember me
              </label>
            </div>
            <Link 
              to="/auth/forgot-password" 
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
            </div>
          ) : (
            mode === 'signin' ? 'Sign In' : 'Create Account'
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-foreground-secondary">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <Link 
              to={mode === 'signin' ? '/auth/sign-up' : '/auth/sign-in'}
              className="text-primary hover:text-primary-dark transition-colors font-medium"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;