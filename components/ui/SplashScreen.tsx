'use client'

import { useState, useEffect } from 'react'
import { MindMatchLogo } from './MindMatchLogo'

const SESSION_KEY = 'mm_splash_shown'
const DURATION = 3500
const FADE_DURATION = 400

export function SplashScreen() {
  // Start as null so we don't flash the splash for returning users
  const [visible, setVisible] = useState<boolean | null>(null)

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY)
    if (alreadyShown) {
      setVisible(false)
      return
    }

    // First visit this session — show splash
    sessionStorage.setItem(SESSION_KEY, '1')
    setVisible(true)

    const t = setTimeout(() => setVisible(false), DURATION + FADE_DURATION)
    return () => clearTimeout(t)
  }, [])

  // Not yet determined (SSR) or already shown — render nothing
  if (!visible) return null

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
