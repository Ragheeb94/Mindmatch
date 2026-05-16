'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SurveyAnswers } from '@/lib/types'

const OPTIONS: { value: string | null; label: string }[] = [
  { value: 'female', label: 'Female therapist' },
  { value: 'male', label: 'Male therapist' },
  { value: 'non-binary', label: 'Non-binary therapist' },
  { value: null, label: 'No preference' },
]

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function GenderStep({ answers, update, onNext }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {OPTIONS.map(({ value, label }) => {
        const selected = answers.gender_preference === value
        return (
          <button
            key={label}
            onClick={() => update('gender_preference', value)}
            aria-pressed={selected}
            className={cn(
              'w-full flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left font-semibold text-base transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
              selected
                ? 'border-blue-600 bg-blue-50 text-gray-900'
                : 'border-gray-200 bg-white text-gray-900'
            )}
          >
            <span>{label}</span>
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
      <Button fullWidth onClick={onNext} className="mt-1">
        Continue →
      </Button>
    </div>
  )
}
