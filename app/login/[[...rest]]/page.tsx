import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      <SignIn
        signUpUrl="/signup"
        redirectUrl="/dashboard"
      />
    </AuthLayout>
  );
}
