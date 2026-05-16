'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { MindMatchLogo } from '@/components/ui/MindMatchLogo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError || !data.user) {
      setError(signInError?.message ?? 'Sign in failed. Please try again.')
      setLoading(false)
      return
    }

    // Look up role to redirect correctly
    const { data: userRow } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single()

    const role = userRow?.role
    if (role === 'therapist') {
      router.push('/therapist/dashboard')
    } else {
      router.push('/discover')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      <header className="px-6 pt-14 pb-0">
        <div className="flex items-center gap-3 mb-8">
          <MindMatchLogo size={36} />
          <span className="font-bold text-gray-900 text-base">Mind Match</span>
        </div>
        <h1 className="text-[1.75rem] font-bold text-gray-900 leading-tight">Welcome back</h1>
        <p className="text-gray-500 text-base mt-2">Sign in to your account.</p>
      </header>

      <div className="flex-1 px-6 py-8">
        {error && (
          <div role="alert" className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="login-email" className="text-sm font-semibold text-gray-700">Email address</label>
            <input
              id="login-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="login-password" className="text-sm font-semibold text-gray-700">Password</label>
            <input
              id="login-password"
              type="password"
              required
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password || loading}
            className="press-scale w-full bg-blue-600 text-white font-bold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 mt-2"
          >
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-2">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/" className="text-blue-600 font-semibold">Get started</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
