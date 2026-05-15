'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ProfileForm } from '@/components/therapist/ProfileForm'

export default function TherapistSignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [step, setStep] = useState<'account' | 'profile'>('account')
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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

    const { error: insertError } = await supabase.from('users').insert({
      id: data.user.id,
      role: 'therapist',
      first_name: firstName,
      last_name: lastName || null,
    })
    if (insertError) {
      setError('Account created but profile setup failed. Please contact support.')
      setSaving(false)
      return
    }

    setUserId(data.user.id)
    setSaving(false)
    setStep('profile')
  }

  async function saveProfile(profileData: any) {
    if (!userId) return
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const { data: profileRow, error: insertError } = await supabase
      .from('therapist_profiles')
      .insert({
        user_id: userId,
        ...profileData,
        crpo_status: 'pending',
        is_active: false,
      })
      .select('id')
      .single()

    if (insertError || !profileRow) {
      setError('Failed to save profile. Please try again.')
      setSaving(false)
      return
    }

    // Trigger CRPO verification
    try {
      await fetch('/api/crpo/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          licenseNumber: profileData.license_number,
          therapistId: profileRow.id,
        }),
      })
    } catch (err) {
      console.error('CRPO verification fetch failed', err)
    }

    setSaving(false)
    router.push('/therapist/subscription')
  }

  if (step === 'account') {
    return (
      <main className="max-w-md mx-auto p-6 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Join as a Therapist</h1>
        <p className="text-gray-500 text-sm mb-6">Free to set up. Subscription required to go live.</p>
        <form onSubmit={createAccount} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)}
              className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none" />
            <input placeholder="Last name (optional)" value={lastName} onChange={e => setLastName(e.target.value)}
              className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none" />
          </div>
          <input required type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
            className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none" />
          <input required type="password" placeholder="Password (min 8 characters)" value={password} onChange={e => setPassword(e.target.value)}
            className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={saving}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl disabled:opacity-50">
            {saving ? 'Creating account…' : 'Continue →'}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="max-w-md mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h1>
      <p className="text-gray-500 text-sm mb-6">This is what clients will see. Your CRPO license will be verified automatically.</p>
      <ProfileForm onSubmit={saveProfile} saving={saving} submitLabel="Verify & Continue →" />
    </main>
  )
}
