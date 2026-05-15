'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const SPECIALTIES = [
  'Anxiety', 'Depression', 'Trauma & PTSD', 'Relationships',
  'Family Conflict', 'Grief', 'Self Esteem', 'LGBTQ+',
  'ADHD', 'Borderline Personality (BPD)', 'Life Transitions',
  'Anger Management', 'Couples', 'Addiction',
]

const APPROACHES = [
  'CBT', 'DBT', 'EMDR', 'Somatic', 'Attachment-Based',
  'IFS', 'Emotionally Focused (EFT)', 'Person-Centered',
  'Mindfulness-Based (MBCT)', 'Trauma-Focused', 'Narrative',
  'Psychodynamic', 'Solution-Focused (SFBT)',
]

interface ProfileFormData {
  bio: string
  city: string
  years_experience: number
  fees_per_session: number
  sliding_scale: boolean
  session_type: 'in_person' | 'online' | 'both'
  gender: string
  specialties: string[]
  therapy_approaches: string[]
  client_focus_text: string
  license_number: string
  languages: string[]
  contact_email: string
}

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>
  onSubmit: (data: ProfileFormData) => Promise<void>
  submitLabel?: string
  saving?: boolean
}

export function ProfileForm({ initialData, onSubmit, submitLabel = 'Save', saving }: ProfileFormProps) {
  const [data, setData] = useState<ProfileFormData>({
    bio: '',
    city: '',
    years_experience: 1,
    fees_per_session: 120,
    sliding_scale: false,
    session_type: 'both',
    gender: '',
    specialties: [],
    therapy_approaches: [],
    client_focus_text: '',
    license_number: '',
    languages: ['English'],
    contact_email: '',
    ...initialData,
  })

  function update<K extends keyof ProfileFormData>(key: K, value: ProfileFormData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function toggleArray(key: 'specialties' | 'therapy_approaches', value: string) {
    const arr = data[key]
    update(key, arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value])
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={e => { e.preventDefault(); onSubmit(data) }}
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Contact email (shown to clients)</label>
        <input
          type="email"
          value={data.contact_email}
          onChange={e => update('contact_email', e.target.value)}
          placeholder="your@email.com"
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">CRPO License Number *</label>
        <input
          required
          value={data.license_number}
          onChange={e => update('license_number', e.target.value)}
          placeholder="e.g. RP001234"
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Bio (shown to clients)</label>
        <textarea
          value={data.bio}
          onChange={e => update('bio', e.target.value)}
          rows={4}
          placeholder="Describe your practice in plain language…"
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">I work with (plain language)</label>
        <textarea
          value={data.client_focus_text}
          onChange={e => update('client_focus_text', e.target.value)}
          rows={2}
          placeholder="e.g. Adults navigating anxiety, relationships, and life transitions."
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">City</label>
          <input
            required
            value={data.city}
            onChange={e => update('city', e.target.value)}
            placeholder="Toronto"
            className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Years of experience</label>
          <input
            type="number"
            min={0}
            value={data.years_experience}
            onChange={e => update('years_experience', Number(e.target.value))}
            className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Fee per session ($)</label>
        <input
          type="number"
          min={0}
          value={data.fees_per_session}
          onChange={e => update('fees_per_session', Number(e.target.value))}
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={data.sliding_scale}
            onChange={e => update('sliding_scale', e.target.checked)}
          />
          I offer sliding scale
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Session format</label>
        <select
          value={data.session_type}
          onChange={e => update('session_type', e.target.value as ProfileFormData['session_type'])}
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none bg-white"
        >
          <option value="in_person">In-person only</option>
          <option value="online">Online only</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Gender identity</label>
        <select
          value={data.gender}
          onChange={e => update('gender', e.target.value)}
          className="rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 outline-none bg-white"
        >
          <option value="">Prefer not to say</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary">Non-binary</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Specialties</label>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => toggleArray('specialties', s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold border-2 transition-colors ${
                data.specialties.includes(s)
                  ? 'border-blue-500 text-blue-500 bg-blue-50'
                  : 'border-gray-200 text-gray-500'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Therapy approaches</label>
        <div className="flex flex-wrap gap-2">
          {APPROACHES.map(a => (
            <button
              key={a}
              type="button"
              onClick={() => toggleArray('therapy_approaches', a)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold border-2 transition-colors ${
                data.therapy_approaches.includes(a)
                  ? 'border-blue-500 text-blue-500 bg-blue-50'
                  : 'border-gray-200 text-gray-500'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" fullWidth disabled={saving}>
        {saving ? 'Saving…' : submitLabel}
      </Button>
    </form>
  )
}
