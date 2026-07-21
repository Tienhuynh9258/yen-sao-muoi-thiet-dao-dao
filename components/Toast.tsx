"use client"

import { useAppContext } from "@/app/context"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"

export function Toast() {
  const { toast } = useAppContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !toast) return null

  return (
    <div
      className={`fixed bottom-6 right-4 z-[100] flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg transition-all duration-300 ${
        toast.visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{
        borderColor: "#c8922a",
        backgroundColor: "#fff",
        boxShadow: "0 8px 20px rgba(26,10,0,0.12)",
      }}
    >
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{ backgroundColor: "#c8922a" }}
      >
        <Check className="h-4 w-4 text-white" />
      </div>
      <span
        className="max-w-[260px] text-sm font-medium leading-snug font-sans"
        style={{ color: "#1a0a00" }}
      >
        {toast.message}
      </span>
    </div>
  )
}
