'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SurveyAnswers } from '@/lib/types'

const OPTIONS: { value: SurveyAnswers['participant_type']; label: string }[] = [
  { value: 'individual', label: 'Just me' },
  { value: 'couples', label: 'Me and my partner' },
  { value: 'family', label: 'Me and my family' },
]

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function ParticipantsStep({ answers, update, onNext }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => update('participant_type', value)}
          className={cn(
            'w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors bg-white',
            answers.participant_type === value
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
