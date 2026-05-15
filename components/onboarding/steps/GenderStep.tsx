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
      {OPTIONS.map(({ value, label }) => (
        <button
          key={label}
          onClick={() => update('gender_preference', value)}
          className={cn(
            'w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors bg-white',
            answers.gender_preference === value
              ? 'border-blue-500 text-blue-500'
              : 'border-gray-200 text-gray-600'
          )}
        >
          {label}
        </button>
      ))}
      <Button fullWidth onClick={onNext}>
        Continue →
      </Button>
    </div>
  )
}
