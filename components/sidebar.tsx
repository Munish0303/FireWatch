"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import { AlertOctagon, ClipboardList, Phone, Flame } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-card border-r flex flex-col p-4">
      <div className="flex items-center space-x-2 mb-6">
        <Flame className="h-6 w-6 text-red-500" />
        <h2 className="text-lg font-semibold">FireWatch</h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mb-4" variant="destructive">
            <AlertOctagon className="mr-2 h-4 w-4" />
            Emergency
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emergency Contact</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <Phone className="h-12 w-12 text-destructive" />
            <p className="text-xl font-semibold">Fire Station Number (India)</p>
            <p className="text-3xl font-bold text-destructive">101</p>
            <p className="text-sm text-muted-foreground text-center">
              In case of emergency, immediately call this number for assistance.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <Button className="w-full" variant="outline" asChild>
        <Link href="/logs">
          <ClipboardList className="mr-2 h-4 w-4" />
          View Logs
        </Link>
      </Button>
    </div>
  )
}

