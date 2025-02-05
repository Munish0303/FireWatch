import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-500 flex items-center justify-center px-4 py-12">
      <SignIn />
    </div>
  )
}

