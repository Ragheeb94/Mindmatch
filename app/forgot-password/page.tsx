'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { MindMatchLogo } from '@/components/ui/MindMatchLogo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
        <header className="px-6 pt-14 pb-0">
          <div className="flex items-center gap-3 mb-8">
            <MindMatchLogo size={36} />
            <span className="font-bold text-gray-900 text-base">Mind Match</span>
          </div>
        </header>
        <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center gap-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl" aria-hidden="true">
            📬
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
            <p className="text-gray-500 text-base mt-3 leading-relaxed">
              We sent a password reset link to <span className="font-semibold text-gray-700">{email}</span>. Click it to choose a new password.
            </p>
          </div>
          <Link href="/login" className="text-sm text-blue-600 font-semibold">
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      <header className="px-6 pt-14 pb-0">
        <div className="flex items-center gap-3 mb-8">
          <MindMatchLogo size={36} />
          <span className="font-bold text-gray-900 text-base">Mind Match</span>
        </div>
        <h1 className="text-[1.75rem] font-bold text-gray-900 leading-tight">Forgot password?</h1>
        <p className="text-gray-500 text-base mt-2">Enter your email and we'll send you a reset link.</p>
      </header>

      <div className="flex-1 px-6 py-8">
        {error && (
          <div role="alert" className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="reset-email" className="text-sm font-semibold text-gray-700">Email address</label>
            <input
              id="reset-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={!email || loading}
            className="press-scale w-full bg-blue-600 text-white font-bold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 mt-2"
          >
            {loading ? 'Sending…' : 'Send reset link →'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/login" className="text-sm text-blue-600 font-semibold">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
