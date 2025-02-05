"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"

interface SensorData {
  smoke: number
  temperature: number
  humidity: number
}

export function Dashboard() {
  const { user } = useUser()
  const [data, setData] = useState<SensorData>({
    smoke: 0,
    temperature: 0,
    humidity: 0,
  })

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      setData({
        smoke: Math.random() * 100,
        temperature: 20 + Math.random() * 10,
        humidity: 30 + Math.random() * 40,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!user) return null

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Smoke Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.smoke.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.temperature.toFixed(1)}°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.humidity.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

