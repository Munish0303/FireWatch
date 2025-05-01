"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { format, subHours } from "date-fns"

interface SensorData {
  smoke: number
  temperature: number
  humidity: number
}

interface HistoricalDataPoint {
  time: string
  value: number
}

interface HistoricalData {
  smoke: HistoricalDataPoint[]
  temperature: HistoricalDataPoint[]
  humidity: HistoricalDataPoint[]
}

export function Dashboard() {
  const { user } = useUser()
  const [data, setData] = useState<SensorData>({
    smoke: 0,
    temperature: 0,
    humidity: 0,
  })

  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    smoke: [],
    temperature: [],
    humidity: [],
  })

  // Generate mock historical data for the last 5 hours
  const generateHistoricalData = () => {
    const now = new Date()
    const smokeData: HistoricalDataPoint[] = []
    const temperatureData: HistoricalDataPoint[] = []
    const humidityData: HistoricalDataPoint[] = []

    for (let i = 5; i >= 0; i--) {
      const time = subHours(now, i)
      const timeString = format(time, "HH:mm")

      smokeData.push({
        time: timeString,
        value: Math.floor(Math.random() * 100),
      })

      temperatureData.push({
        time: timeString,
        value: Math.floor(20 + Math.random() * 10),
      })

      humidityData.push({
        time: timeString,
        value: Math.floor(30 + Math.random() * 40),
      })
    }

    setHistoricalData({
      smoke: smokeData,
      temperature: temperatureData,
      humidity: humidityData,
    })
  }

  useEffect(() => {
    // Generate initial historical data
    generateHistoricalData()

    // Simulating real-time data updates
    const interval = setInterval(() => {
      const newSmoke = Math.random() * 100
      const newTemperature = 20 + Math.random() * 10
      const newHumidity = 30 + Math.random() * 40

      setData({
        smoke: newSmoke,
        temperature: newTemperature,
        humidity: newHumidity,
      })

      // Update historical data
      const now = new Date()
      const timeString = format(now, "HH:mm")

      setHistoricalData((prev) => {
        const updatedSmoke = [...prev.smoke.slice(-5), { time: timeString, value: newSmoke }]
        const updatedTemperature = [...prev.temperature.slice(-5), { time: timeString, value: newTemperature }]
        const updatedHumidity = [...prev.humidity.slice(-5), { time: timeString, value: newHumidity }]

        return {
          smoke: updatedSmoke,
          temperature: updatedTemperature,
          humidity: updatedHumidity,
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (!user) return null

  return (
    <div className="space-y-8">
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

      <h2 className="text-2xl font-bold mt-8 mb-4">Historical Data (Last 5 Hours)</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smoke Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Smoke Level History</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Smoke Level (%)",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData.smoke} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: "Time", position: "insideBottom", offset: -10 }} />
                  <YAxis label={{ value: "Smoke (%)", angle: -90, position: "insideLeft" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Temperature Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Temperature History</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Temperature (°C)",
                  color: "hsl(var(--destructive))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData.temperature} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: "Time", position: "insideBottom", offset: -10 }} />
                  <YAxis label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Humidity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Humidity History</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Humidity (%)",
                  color: "hsl(var(--secondary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData.humidity} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: "Time", position: "insideBottom", offset: -10 }} />
                  <YAxis label={{ value: "Humidity (%)", angle: -90, position: "insideLeft" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

