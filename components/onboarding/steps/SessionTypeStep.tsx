'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SurveyAnswers, SessionType } from '@/lib/types'

const OPTIONS: { value: SessionType; label: string; description: string }[] = [
  { value: 'in_person', label: 'In-person', description: 'I want to meet face-to-face' },
  { value: 'online', label: 'Online', description: 'Video or phone sessions work for me' },
  { value: 'both', label: 'Either works', description: 'I am open to both formats' },
]

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
  onFinish: (email: string, password: string) => Promise<void>
  saving: boolean
}

export function SessionTypeStep({ answers, update, onFinish, saving }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col gap-4">
      {OPTIONS.map(({ value, label, description }) => {
        const selected = answers.session_type === value
        return (
          <button
            key={value}
            onClick={() => update('session_type', value)}
            aria-pressed={selected}
            className={cn(
              'w-full flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
              selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'
            )}
          >
            <div>
              <p className="font-semibold text-base text-gray-900">{label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            </div>
            <span
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 transition-colors',
                selected ? 'border-blue-600' : 'border-gray-300'
              )}
              aria-hidden="true"
            >
              {selected && <span className="w-3 h-3 rounded-full bg-blue-600" />}
            </span>
          </button>
        )
      })}

      {/* Account creation */}
      <div className="mt-2 border-t border-gray-100 pt-5 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900">Create your account</h2>
        <p className="text-sm text-gray-500 -mt-2">You'll see your matches right after.</p>

        <div className="flex flex-col gap-2">
          <label htmlFor="session-email" className="text-sm font-semibold text-gray-700">Email address</label>
          <input
            id="session-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="session-password" className="text-sm font-semibold text-gray-700">Password</label>
          <input
            id="session-password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
          />
        </div>

        <Button
          fullWidth
          disabled={!email || password.length < 8 || saving}
          onClick={() => onFinish(email, password)}
        >
          {saving ? 'Finding your matches…' : 'See my matches →'}
        </Button>
      </div>
    </div>
  )
}
