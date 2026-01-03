import { AuthLayout } from "@/components/auth/auth-layout"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <AuthLayout title="Create an account" description="Start reviewing code with AI in seconds">
      <SignupForm />
    </AuthLayout>
  )
}
