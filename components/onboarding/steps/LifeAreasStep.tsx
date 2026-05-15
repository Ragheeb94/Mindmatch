'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { SurveyAnswers } from '@/lib/types'

const OPTIONS = [
  'My relationships',
  'How I feel about myself',
  'Work or school stress',
  'A loss or major change',
  "I just feel off and I'm not sure why",
  'Something else',
]

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function LifeAreasStep({ answers, update, onNext }: Props) {
  function toggle(option: string) {
    const next = answers.life_areas.includes(option)
      ? answers.life_areas.filter(o => o !== option)
      : [...answers.life_areas, option]
    update('life_areas', next)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-500">Choose everything that feels true</p>
      {OPTIONS.map(option => (
        <button
          key={option}
          onClick={() => toggle(option)}
          className={cn(
            'w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors bg-white',
            answers.life_areas.includes(option)
              ? 'border-blue-500 text-blue-500'
              : 'border-gray-200 text-gray-600'
          )}
        >
          {option}
        </button>
      ))}
      <Button fullWidth onClick={onNext} disabled={answers.life_areas.length === 0}>
        Continue →
      </Button>
    </div>
  )
}
