'use client'
import { Button } from '@/components/ui/Button'
import type { SurveyAnswers } from '@/lib/types'

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function NameStep({ answers, update, onNext }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="first-name" className="text-sm font-semibold text-gray-700">
          First name
        </label>
        <input
          id="first-name"
          type="text"
          value={answers.name}
          onChange={e => update('name', e.target.value)}
          onKeyDown={e => e.key === 'Enter' && answers.name.trim() && onNext()}
          placeholder="e.g. Alex"
          autoComplete="given-name"
          className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
          autoFocus
        />
      </div>
      <Button fullWidth onClick={onNext} disabled={!answers.name.trim()}>
        Continue →
      </Button>
    </div>
  )
}
