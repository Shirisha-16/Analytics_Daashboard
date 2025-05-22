import { AuthForm } from "@/components/AuthForm"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthForm mode="signin" />
    </div>
  )
}