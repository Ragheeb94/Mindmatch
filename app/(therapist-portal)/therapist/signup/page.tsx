'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ProfileForm } from '@/components/therapist/ProfileForm'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { MindMatchLogo } from '@/components/ui/MindMatchLogo'

const TOTAL_STEPS = 2

const STEP_TITLES: Record<number, string> = {
  1: 'Join as a Therapist',
  2: 'Build your profile',
}

const STEP_SUBTITLES: Record<number, string> = {
  1: 'Free to set up. Subscription required to go live.',
  2: "This is what clients will see. Your CRPO license will be verified automatically.",
}

export default function TherapistSignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  function back() {
    if (step === 1) {
      router.push('/')
    } else {
      setStep(s => s - 1)
    }
  }

  async function createAccount(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError || !data.user) {
      setError(signUpError?.message ?? 'Failed to create account. Please try again.')
      setSaving(false)
      return
    }

    const res = await fetch('/api/therapist-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: data.user.id, firstName, lastName }),
    })

    if (!res.ok) {
      setError('Account created but profile setup failed. Please try again.')
      setSaving(false)
      return
    }

    setUserId(data.user.id)
    setSaving(false)
    setStep(2)
  }

  async function saveProfile(profileData: any) {
    if (!userId) return
    setSaving(true)
    setError(null)

    const res = await fetch('/api/therapist-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileData: { userId, fields: profileData },
        licenseNumber: profileData.license_number,
      }),
    })

    if (!res.ok) {
      setError('Failed to save profile. Please try again.')
      setSaving(false)
      return
    }

    setSaving(false)
    router.push('/therapist/subscription')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      <ProgressBar current={step} total={TOTAL_STEPS} />

      <div className="flex justify-between items-center px-6 pt-6 pb-0">
        <button
          onClick={back}
          className="text-gray-900 font-semibold text-sm flex items-center gap-1 py-2 pr-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Go back"
        >
          ← Back
        </button>
        <span className="text-gray-400 text-sm" aria-live="polite">{step} of {TOTAL_STEPS}</span>
      </div>

      <header className="px-6 pt-7 pb-1">
        <div className="flex items-center gap-3 mb-4">
          <MindMatchLogo size={36} />
          <span className="font-bold text-gray-900 text-base">Mind Match</span>
        </div>
        <h1 className="text-[1.75rem] font-bold text-gray-900 leading-tight">
          {STEP_TITLES[step]}
        </h1>
        <p className="text-gray-500 text-base mt-2">{STEP_SUBTITLES[step]}</p>
      </header>

      <div className="flex-1 px-6 py-6">
        {error && (
          <div role="alert" className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={createAccount} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="first-name" className="text-sm font-semibold text-gray-700">First name</label>
                <input
                  id="first-name"
                  required
                  placeholder="First name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  className="rounded-2xl border-2 border-gray-200 px-4 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="last-name" className="text-sm font-semibold text-gray-700">Last name</label>
                <input
                  id="last-name"
                  placeholder="Optional"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="family-name"
                  className="rounded-2xl border-2 border-gray-200 px-4 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="therapist-email" className="text-sm font-semibold text-gray-700">Email address</label>
              <input
                id="therapist-email"
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="therapist-password" className="text-sm font-semibold text-gray-700">Password</label>
              <input
                id="therapist-password"
                required
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={!firstName || !email || password.length < 8 || saving}
              className="press-scale w-full bg-blue-600 text-white font-bold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 mt-2"
            >
              {saving ? 'Creating account…' : 'Continue →'}
            </button>
          </form>
        )}

        {step === 2 && (
          <ProfileForm onSubmit={saveProfile} saving={saving} submitLabel="Verify & Continue →" />
        )}
      </div>
    </div>
  )
}
