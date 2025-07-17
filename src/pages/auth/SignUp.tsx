import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

const SignUp = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Verba and start mastering the art of debate"
    >
      <AuthForm mode="signup" />
    </AuthLayout>
  );
};

export default SignUp;