import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent password reset instructions to your email address"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-success" />
          </div>
          
          <div className="space-y-2">
            <p className="text-foreground-secondary">
              Password reset instructions have been sent to:
            </p>
            <p className="font-medium text-foreground">{email}</p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full"
            >
              Try another email
            </Button>
            
            <Link to="/auth/sign-in">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email address and we'll send you reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-foreground-secondary" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              autoComplete="email"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Sending...
            </div>
          ) : (
            'Send reset instructions'
          )}
        </Button>

        <div className="text-center">
          <Link 
            to="/auth/sign-in"
            className="text-sm text-primary hover:text-primary-dark transition-colors font-medium inline-flex items-center"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;