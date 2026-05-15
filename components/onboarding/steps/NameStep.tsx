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
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={answers.name}
        onChange={e => update('name', e.target.value)}
        onKeyDown={e => e.key === 'Enter' && answers.name.trim() && onNext()}
        placeholder="Your first name"
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base focus:border-blue-500 outline-none bg-white"
        autoFocus
      />
      <Button fullWidth onClick={onNext} disabled={!answers.name.trim()}>
        Continue →
      </Button>
    </div>
  )
}
