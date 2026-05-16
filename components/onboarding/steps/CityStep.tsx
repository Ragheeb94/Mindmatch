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
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="city-select" className="text-sm font-semibold text-gray-700">
          Your city
        </label>
        <select
          id="city-select"
          value={answers.city}
          onChange={e => update('city', e.target.value)}
          className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-base text-gray-900 focus:border-blue-600 focus:outline-none transition-colors bg-white appearance-none"
        >
          <option value="" disabled>Select your city…</option>
          {ONTARIO_CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <Button fullWidth onClick={onNext} disabled={!answers.city}>
        Continue →
      </Button>
    </div>
  )
}
