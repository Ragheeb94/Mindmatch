'use client'
import { Button } from '@/components/ui/Button'
import type { SurveyAnswers } from '@/lib/types'

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function BudgetStep({ answers, update, onNext }: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Budget display */}
      <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-6 text-center">
        <span className="text-5xl font-bold text-blue-600">${answers.budget_max}</span>
        <p className="text-sm text-gray-500 mt-1 font-medium">max per session</p>
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-2">
        <input
          type="range"
          min={60}
          max={300}
          step={10}
          value={answers.budget_max}
          onChange={e => update('budget_max', Number(e.target.value))}
          className="w-full accent-blue-600 h-2 cursor-pointer"
          aria-label="Maximum budget per session"
          aria-valuemin={60}
          aria-valuemax={300}
          aria-valuenow={answers.budget_max}
        />
        <div className="flex justify-between text-sm text-gray-400 font-medium">
          <span>$60</span>
          <span>$300+</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Therapists with sliding scale are shown even if over budget.
      </p>

      <Button fullWidth onClick={onNext}>
        Continue →
      </Button>
    </div>
  )
}
