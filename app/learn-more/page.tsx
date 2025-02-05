import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Flame, Shield, Bell, Activity } from "lucide-react"

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-500">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Flame className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white">FireWatch</h1>
        </Link>
        <Button asChild variant="secondary">
          <Link href="/register">Register Now</Link>
        </Button>
      </header>
      <main className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Learn More About FireWatch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <Shield className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Advanced Protection</h3>
            <p>
              FireWatch uses state-of-the-art sensors and AI algorithms to detect potential fire hazards before they
              become dangerous. Our system monitors temperature, smoke levels, and other key indicators 24/7.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <Bell className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Instant Alerts</h3>
            <p>
              Receive immediate notifications on your smartphone or other devices when our system detects any anomalies.
              This rapid response time can be crucial in preventing fire damage and saving lives.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <Activity className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Real-time Monitoring</h3>
            <p>
              Access your property's fire safety status anytime, anywhere. Our user-friendly dashboard provides
              real-time data and historical trends, allowing you to stay informed about your property's fire safety at
              all times.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <Flame className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Emergency Response</h3>
            <p>
              In case of an emergency, FireWatch automatically alerts local fire services, reducing response times and
              potentially saving lives and property. Our system provides critical information to first responders,
              enhancing their ability to address the situation effectively.
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/register">Get Started with FireWatch</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

