'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SurveyAnswers } from '@/lib/types'

const OPTIONS = [
  'I pull away from people',
  "I can't stop thinking",
  'I feel it in my body',
  'My mood changes fast',
  'I go numb',
  'I get angry easily',
  'I stop taking care of myself',
]

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function PatternsStep({ answers, update, onNext }: Props) {
  function toggle(option: string) {
    const next = answers.patterns.includes(option)
      ? answers.patterns.filter(o => o !== option)
      : [...answers.patterns, option]
    update('patterns', next)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-500">Choose all that feel true</p>
      {OPTIONS.map(option => (
        <button
          key={option}
          onClick={() => toggle(option)}
          className={cn(
            'w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors bg-white',
            answers.patterns.includes(option)
              ? 'border-blue-500 text-blue-500'
              : 'border-gray-200 text-gray-600'
          )}
        >
          {option}
        </button>
      ))}
      <Button fullWidth onClick={onNext} disabled={answers.patterns.length === 0}>
        Continue →
      </Button>
    </div>
  )
}
