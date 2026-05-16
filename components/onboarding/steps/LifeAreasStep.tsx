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
      {OPTIONS.map(option => {
        const selected = answers.life_areas.includes(option)
        return (
          <button
            key={option}
            onClick={() => toggle(option)}
            aria-pressed={selected}
            className={cn(
              'w-full flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left font-semibold text-base transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
              selected
                ? 'border-blue-600 bg-blue-50 text-gray-900'
                : 'border-gray-200 bg-white text-gray-900'
            )}
          >
            <span>{option}</span>
            {/* Checkmark circle */}
            <span
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 transition-colors',
                selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
              )}
              aria-hidden="true"
            >
              {selected && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </button>
        )
      })}
      <Button
        fullWidth
        onClick={onNext}
        disabled={answers.life_areas.length === 0}
        className="mt-1"
      >
        Continue →
      </Button>
    </div>
  )
}
