'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SurveyAnswers, SessionType } from '@/lib/types'

const OPTIONS: { value: SessionType; label: string; description: string }[] = [
  { value: 'in_person', label: 'In-person', description: 'I want to meet face-to-face' },
  { value: 'online', label: 'Online', description: 'Video or phone sessions work for me' },
  { value: 'both', label: 'Either works', description: 'I am open to both' },
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
      {OPTIONS.map(({ value, label, description }) => (
        <button
          key={value}
          onClick={() => update('session_type', value)}
          className={cn(
            'w-full rounded-xl border-2 px-4 py-3 text-left transition-colors bg-white',
            answers.session_type === value ? 'border-blue-500' : 'border-gray-200'
          )}
        >
          <p className={cn('font-semibold text-sm', answers.session_type === value ? 'text-blue-500' : 'text-gray-700')}>
            {label}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </button>
      ))}

      <div className="mt-2 border-t border-gray-200 pt-4 flex flex-col gap-3">
        <p className="text-sm font-semibold text-gray-700">Create your account to see your matches</p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none bg-white"
        />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none bg-white"
        />
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
