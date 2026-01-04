import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Start reviewing code with AI in seconds"
    >
      <SignUp
        signInUrl="/login"
        redirectUrl="/dashboard"
      />
    </AuthLayout>
  );
}
