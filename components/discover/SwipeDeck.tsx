'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { TherapistCard } from './TherapistCard'
import { ActionButtons } from './ActionButtons'
import { createClient } from '@/lib/supabase/client'
import type { TherapistProfile } from '@/lib/types'

export function SwipeDeck() {
  const [therapists, setTherapists] = useState<TherapistProfile[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/match')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load matches')
        return r.json()
      })
      .then(d => { setTherapists(d.therapists ?? []); setLoading(false) })
      .catch(() => { setTherapists([]); setLoading(false) })
  }, [])

  async function recordSwipe(action: 'skip' | 'save') {
    const current = therapists[index]
    if (!current) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('swipe_history').upsert({
      client_id: user.id,
      therapist_id: current.id,
      action,
    })

    if (error) console.error('swipe_history upsert failed', error)

    if (action === 'save') {
      const name = (current as any).displayName ?? 'Therapist'
      toast.success(`${name} saved!`, { duration: 2000 })
    }

    setIndex(i => i + 1)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Finding your matches…</p>
      </div>
    )
  }

  const current = therapists[index]

  if (!current) {
    return (
      <div className="text-center py-16 flex flex-col items-center gap-4">
        <p className="text-2xl">You&apos;ve seen everyone!</p>
        <p className="text-gray-400 text-sm">Check your saved therapists or come back later.</p>
        <Link href="/saved" className="text-blue-500 font-semibold underline">
          View saved therapists
        </Link>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col gap-4">
        <Link href={`/therapist/${current.id}`}>
          <TherapistCard
            therapist={current}
            therapistName={(current as any).displayName}
          />
        </Link>
        <ActionButtons
          onSkip={() => recordSwipe('skip')}
          onInfo={() => router.push(`/therapist/${current.id}`)}
          onSave={() => recordSwipe('save')}
        />
        <p className="text-center text-xs text-gray-400">
          {therapists.length - index - 1} more matches
        </p>
      </div>
    </>
  )
}
