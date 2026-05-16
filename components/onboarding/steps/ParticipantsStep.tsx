'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SurveyAnswers } from '@/lib/types'

const OPTIONS: { value: SurveyAnswers['participant_type']; label: string; description: string }[] = [
  { value: 'individual', label: 'Just me', description: 'Individual therapy' },
  { value: 'couples', label: 'Me and my partner', description: 'Couples therapy' },
  { value: 'family', label: 'Me and my family', description: 'Family therapy' },
]

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function ParticipantsStep({ answers, update, onNext }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {OPTIONS.map(({ value, label, description }) => {
        const selected = answers.participant_type === value
        return (
          <button
            key={value}
            onClick={() => update('participant_type', value)}
            aria-pressed={selected}
            className={cn(
              'w-full flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
              selected
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white'
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
      <Button fullWidth onClick={onNext} className="mt-1">
        Continue →
      </Button>
    </div>
  )
}
