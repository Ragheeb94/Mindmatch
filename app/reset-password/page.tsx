'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { MindMatchLogo } from '@/components/ui/MindMatchLogo'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    // Role-based redirect after reset
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: userRow } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
      router.push(userRow?.role === 'therapist' ? '/therapist/dashboard' : '/discover')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      <header className="px-6 pt-14 pb-0">
        <div className="flex items-center gap-3 mb-8">
          <MindMatchLogo size={36} />
          <span className="font-bold text-gray-900 text-base">Mind Match</span>
        </div>
        <h1 className="text-[1.75rem] font-bold text-gray-900 leading-tight">Choose a new password</h1>
        <p className="text-gray-500 text-base mt-2">At least 8 characters.</p>
      </header>

      <div className="flex-1 px-6 py-8">
        {error && (
          <div role="alert" className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="new-password" className="text-sm font-semibold text-gray-700">New password</label>
            <input
              id="new-password"
              type="password"
              required
              placeholder="At least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              required
              placeholder="Same password again"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={password.length < 8 || !confirm || loading}
            className="press-scale w-full bg-blue-600 text-white font-bold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 mt-2"
          >
            {loading ? 'Saving…' : 'Set new password →'}
          </button>
        </form>
      </div>
    </div>
  )
}
