'use client'
import { Button } from '@/components/ui/Button'
import type { SurveyAnswers } from '@/lib/types'

const ONTARIO_CITIES = [
  'Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton',
  'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor',
  'Richmond Hill', 'Oakville', 'Burlington', 'Sudbury', 'Oshawa',
  'Barrie', 'St. Catharines', 'Cambridge', 'Kingston', 'Milton',
  'Guelph', 'Thunder Bay', 'Waterloo', 'Pickering', 'Ajax',
]

interface Props {
  answers: SurveyAnswers
  update: <K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) => void
  onNext: () => void
}

export function CityStep({ answers, update, onNext }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">Select your city in Ontario</p>
      <select
        value={answers.city}
        onChange={e => update('city', e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base focus:border-blue-500 outline-none bg-white"
      >
        <option value="">Select your city…</option>
        {ONTARIO_CITIES.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <Button fullWidth onClick={onNext} disabled={!answers.city}>
        Continue →
      </Button>
    </div>
  )
}
