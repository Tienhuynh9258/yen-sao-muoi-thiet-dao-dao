"use client"

import { useRef, useState, useEffect, useCallback } from "react"

interface DualRangeSliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  onCommit?: (value: [number, number]) => void
}

const formatVND = (n: number) =>
  `${n.toLocaleString("vi-VN")} VNĐ`

export function DualRangeSlider({
  min,
  max,
  step = 50_000,
  value,
  onChange,
  onCommit,
}: DualRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<"min" | "max" | null>(null)

  const percentage = (v: number) => ((v - min) / (max - min)) * 100

  const valueFromX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return min
      let p = (clientX - rect.left) / rect.width
      p = Math.max(0, Math.min(1, p))
      let v = min + p * (max - min)
      v = Math.round(v / step) * step
      return Math.max(min, Math.min(max, v))
    },
    [min, max, step]
  )

  const handleMove = useCallback(
    (clientX: number) => {
      if (!dragging) return
      const v = valueFromX(clientX)
      if (dragging === "min") {
        if (v > value[1] - step) onChange([Math.max(min, value[1] - step), value[1]])
        else onChange([v, value[1]])
      } else {
        if (v < value[0] + step) onChange([value[0], Math.min(max, value[0] + step)])
        else onChange([value[0], v])
      }
    },
    [dragging, min, max, step, value, onChange, valueFromX]
  )

  const handlePointerDown = (e: React.PointerEvent, thumb: "min" | "max") => {
    e.preventDefault()
    setDragging(thumb)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: PointerEvent) => handleMove(e.clientX)
    const onUp = () => {
      if (dragging && onCommit) onCommit(value)
      setDragging(null)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [dragging, handleMove, value, onCommit])

  return (
    <div className="select-none touch-none">
      <div className="flex items-center justify-between text-xs font-sans font-semibold mb-2" style={{ color: "#1a0a00" }}>
        <span>{formatVND(value[0])}</span>
        <span>-</span>
        <span>{formatVND(value[1])}</span>
      </div>

      <div ref={trackRef} className="relative h-2 w-full rounded-full cursor-pointer" style={{ backgroundColor: "#f2eee8" }}>
        {/* Selected bar */}
        <div
          className="absolute top-0 h-full rounded-full"
          style={{
            left: `${percentage(value[0])}%`,
            width: `${percentage(value[1]) - percentage(value[0])}%`,
            backgroundColor: "#c8922a",
          }}
        />
        {/* Min thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 bg-white cursor-grab active:cursor-grabbing active:scale-110 transition-transform"
          style={{
            left: `${percentage(value[0])}%`,
            borderColor: "#c8922a",
            boxShadow: dragging === "min" ? "0 0 0 3px rgba(200,146,42,0.25)" : "0 1px 3px rgba(0,0,0,0.12)",
          }}
          onPointerDown={(e) => handlePointerDown(e, "min")}
        />
        {/* Max thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 bg-white cursor-grab active:cursor-grabbing active:scale-110 transition-transform"
          style={{
            left: `${percentage(value[1])}%`,
            borderColor: "#c8922a",
            boxShadow: dragging === "max" ? "0 0 0 3px rgba(200,146,42,0.25)" : "0 1px 3px rgba(0,0,0,0.12)",
          }}
          onPointerDown={(e) => handlePointerDown(e, "max")}
        />
      </div>
    </div>
  )
}
