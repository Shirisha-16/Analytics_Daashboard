import  {AuthForm} from '@/components/AuthForm'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthForm mode="signup" />
    </div>
  )
}