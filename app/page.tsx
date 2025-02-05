import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"
import { auth } from "@clerk/nextjs"

export default function LandingPage() {
  const { userId } = auth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
      <header className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Flame className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white">FireWatch</h1>
        </div>
        <div className="space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
          {userId ? (
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/register">Register</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
          Protect Your Property with Advanced Fire Monitoring
        </h2>
        <p className="text-lg sm:text-xl text-white mb-8 sm:mb-12">
          Real-time alerts, 24/7 monitoring, and instant emergency response.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/learn-more">Learn More</Link>
          </Button>
        </div>
      </main>
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Monitoring",
              description: "Get instant updates on temperature, smoke levels, and humidity.",
            },
            {
              title: "Smart Alerts",
              description: "Receive notifications on your device when potential risks are detected.",
            },
            { title: "24/7 Support", description: "Our team is always available to assist you with any concerns." },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

