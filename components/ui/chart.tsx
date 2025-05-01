"use client"

import { ReactNode } from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps {
  children: ReactNode
  config: ChartConfig
  className?: string
}

interface TooltipData {
  payload?: Array<{
    value: number
  }>
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  return (
    <div
      className={className}
      style={
        {
          "--color-value": config.value.color,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

export function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipData["payload"] }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
          <span className="font-bold text-muted-foreground">{payload[0].value.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export const ChartTooltipContent = ChartTooltip 