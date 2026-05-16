'use client'

import { useState, useEffect } from 'react'
import { MindMatchLogo } from './MindMatchLogo'

export function SplashScreen() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2300)
    return () => clearTimeout(t)
  }, [])

  if (gone) return null

  return (
    <div className="splash-out fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-4">
      <MindMatchLogo size={72} />
      <div className="text-center">
        <p className="text-blue-500 font-bold text-2xl tracking-tight">Mind Match</p>
        <p className="text-gray-400 text-sm mt-1">Ontario&apos;s therapist matching platform</p>
      </div>
    </div>
  )
}
