"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Filter } from "lucide-react"
import { format } from "date-fns"
import { useAuth, useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore"

export default function LogsPage() {
  const { userId, isLoaded } = useAuth()
  const { user } = useUser()
  
  useEffect(() => {
    if (isLoaded && !userId) {
      redirect("/sign-in")
    }
  }, [userId, isLoaded])

  const [date, setDate] = useState<Date>()
  const [month, setMonth] = useState<string>()
  const [year, setYear] = useState<string>()
  const [logs, setLogs] = useState<Array<{
    logid: string;
    email: string;
    fire_detected: boolean;
    image_url: string;
    timestamp: Date;
  }>>([])

  // Fetch logs for the current user
  useEffect(() => {
    const fetchLogs = async () => {
      if (!user?.emailAddresses?.[0]?.emailAddress) return;
      
      const userEmail = user.emailAddresses[0].emailAddress;
      console.log('Fetching logs for email:', userEmail); // Debug log

      const logsRef = collection(db, "fire_detection_logs");
      const q = query(
        logsRef,
        where("email", "==", userEmail)
      );

      try {
        const querySnapshot = await getDocs(q);
        console.log('Query snapshot size:', querySnapshot.size);
        const userLogs = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Log data:', data);
          return {
            logid: doc.id,
            email: data.email || '',
            fire_detected: data.fire_detected || false,
            image_url: data.image_url || '',
            timestamp: data.timestamp instanceof Timestamp 
              ? data.timestamp.toDate() 
              : new Date(data.timestamp)
          };
        });
        console.log('Processed logs:', userLogs);
        setLogs(userLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [user]);

  // Filter logs based on selected date, month, and year
  const filteredLogs = logs.filter((log) => {
    console.log('Filtering log:', {
      logDate: log.timestamp,
      selectedDate: date,
      selectedMonth: month ? parseInt(month) : undefined,
      selectedYear: year
    });

    const logDate = log.timestamp;
    
    if (date) {
      const selectedDate = new Date(date);
      return (
        logDate.getDate() === selectedDate.getDate() &&
        logDate.getMonth() === selectedDate.getMonth() &&
        logDate.getFullYear() === selectedDate.getFullYear()
      );
    }

    if (month) {
      // Convert month string to number and subtract 1 to match JavaScript's 0-based months
      return logDate.getMonth() === (parseInt(month) - 1);
    }

    if (year) {
      return logDate.getFullYear() === parseInt(year);
    }

    return true;
  });

  const clearFilters = () => {
    setDate(undefined)
    setMonth(undefined)
    setYear(undefined)
  }

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    // Clear month filter when specific date is selected
    if (newDate) {
      setMonth(undefined)
    }
  }

  const handleMonthSelect = (newMonth: string) => {
    setMonth(newMonth)
    // Clear specific date when month is selected
    setDate(undefined)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6 flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Logs
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filter by Date</h4>
                    <Calendar mode="single" selected={date} onSelect={handleDateSelect} className="rounded-md border" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filter by Month</h4>
                    <Select value={month} onValueChange={handleMonthSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {format(new Date(2024, i, 1), "MMMM")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filter by Year</h4>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2023, 2024, 2025, 2026].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
          <ScrollArea className="h-[calc(100vh-200px)] border rounded-md">
            <div className="p-4">
              {filteredLogs.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No logs found
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.logid} className="text-sm py-2 border-b last:border-b-0 flex items-center justify-between">
                    <div>
                      [{format(log.timestamp, "dd-MM-yy HH:mm:ss")}] Fire Detected: {log.fire_detected ? "Yes" : "No"}
                    </div>
                    {log.image_url && (
                      <a 
                        href={log.image_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 underline ml-4"
                      >
                        View Image
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}

