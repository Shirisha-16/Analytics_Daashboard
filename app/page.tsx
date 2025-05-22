import Link from 'next/link'
import Image from 'next/image' // Import the Image component from Next.js
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation' // Import redirect for server-side redirection

// Import the image asset. Next.js handles static assets in the 'public' folder.
// Assuming your image is in the 'public' folder, you can reference it directly.
// If not, you'd need to adjust the path or place it in 'public'.
const lightModeLogo = '/lightModeLogo.jpeg'; // e.g., public/Logo-Light.jpeg
const darkModeLogo = '/darkModeLogo.jpeg';

export default async function Home() {
  const session = await getServerSession(authOptions)

  // If a session exists, redirect to the dashboard
  if (session) {
    redirect('/daashboard') // Redirect to the new dashboard route
  }

  // If no session, display the welcome/sign-in/sign-up content
  return (
    <main className="flex flex-col lg:flex-row min-h-screen justify-center items-center p-4 gap-8">
      <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center">
        <Image
          src={lightModeLogo}
          alt="Colorful clouds and finance icons"
           width={500} 
          height={300}
          className="max-w-xs bg-cover sm:max-w-sm md:max-w-md lg:max-w-full h-auto rounded-lg shadow-lg dark:hidden"
          priority 
        />
        <Image
          src={darkModeLogo}
          alt="App Logo (Dark Mode)"
          width={500} // Placeholder: Replace with actual image width
          height={300} // Placeholder: Replace with actual image height
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-auto rounded-lg shadow-lg hidden dark:block"
          priority // Prioritize loading this image
        />
      </div>
      <div className="flex flex-col items-center lg:items-start gap-8 text-center lg:text-left w-full lg:w-1/2">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Your App</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/signin"
            className="rounded-md bg-pink-400 px-6 py-3 text-white hover:bg-pink-500 transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-md border-2 border-pink-400 px-6 py-3 text-pink-400 hover:bg-pink-50 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  )
}