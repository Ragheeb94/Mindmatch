import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mind Match — Find Your Therapist',
  description: 'Match with the right therapist in Ontario. Swipe through verified, CRPO-licensed therapists tailored to what you are going through.',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  )
}
