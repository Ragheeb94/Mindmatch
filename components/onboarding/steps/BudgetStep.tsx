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
      <div className="bg-white rounded-xl p-6 text-center border-2 border-blue-500">
        <span className="text-4xl font-bold text-blue-500">${answers.budget_max}</span>
        <p className="text-sm text-gray-500 mt-1">max per session</p>
      </div>
      <input
        type="range"
        min={60}
        max={300}
        step={10}
        value={answers.budget_max}
        onChange={e => update('budget_max', Number(e.target.value))}
        className="w-full accent-blue-500"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>$60</span>
        <span>$300+</span>
      </div>
      <p className="text-xs text-gray-400 text-center">
        Therapists with sliding scale are also shown even if over budget.
      </p>
      <Button fullWidth onClick={onNext}>
        Continue →
      </Button>
    </div>
  )
}
