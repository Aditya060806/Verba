import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

const SignIn = () => {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue your debate journey"
    >
      <AuthForm mode="signin" />
    </AuthLayout>
  );
};

export default SignIn;