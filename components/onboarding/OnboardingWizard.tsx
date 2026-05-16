'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { NameStep } from './steps/NameStep'
import { CityStep } from './steps/CityStep'
import { LifeAreasStep } from './steps/LifeAreasStep'
import { PatternsStep } from './steps/PatternsStep'
import { ParticipantsStep } from './steps/ParticipantsStep'
import { GenderStep } from './steps/GenderStep'
import { BudgetStep } from './steps/BudgetStep'
import { SessionTypeStep } from './steps/SessionTypeStep'
import { createClient } from '@/lib/supabase/client'
import type { SurveyAnswers } from '@/lib/types'
import type { Json } from '@/lib/supabase/types'

const TOTAL_STEPS = 8

const defaultAnswers: SurveyAnswers = {
  name: '',
  city: '',
  life_areas: [],
  patterns: [],
  participant_type: 'individual',
  gender_preference: null,
  budget_max: 150,
  session_type: 'both',
}

const STEP_TITLES: Record<number, string> = {
  1: "What's your first name?",
  2: 'Where are you located?',
  3: "What's been weighing on you lately?",
  4: 'When things get hard, what does that look like?',
  5: 'Who do you want to work on this with?',
  6: 'Do you have a therapist gender preference?',
  7: "What's your budget per session?",
  8: 'In-person or online?',
}

const STEP_SUBTITLES: Record<number, string> = {
  1: "We'll use this to personalize your experience.",
  2: 'We show you therapists near you.',
  3: 'Choose everything that feels true.',
  4: 'Choose all that apply.',
  5: 'Who will be attending sessions?',
  6: 'You can always change this later.',
  7: 'Therapists with sliding scale are included even if over budget.',
  8: 'You can do both — just let us know your preference.',
}

export function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<SurveyAnswers>(defaultAnswers)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()

  function update<K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function next() {
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }

  function back() {
    if (step === 1) {
      router.push('/')
    } else {
      setStep(s => s - 1)
    }
  }

  async function finish(email: string, password: string) {
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError || !data.user) {
      setError(signUpError?.message ?? 'Sign up failed. Please try again.')
      setSaving(false)
      return
    }

    const { error: userError } = await supabase.from('users').insert({
      id: data.user.id,
      role: 'client',
      first_name: answers.name,
    })

    if (userError) {
      setError('Account created but profile save failed. Please contact support.')
      setSaving(false)
      return
    }

    await supabase.from('client_surveys').insert({
      user_id: data.user.id,
      answers: answers as unknown as Json,
    })

    if (data.session) {
      router.push('/discover')
    } else {
      setConfirmed(true)
      setSaving(false)
    }
  }

  const stepProps = { answers, update, onNext: next }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center max-w-md mx-auto px-6 text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl" aria-hidden="true">
          📬
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="text-gray-500 text-base mt-3 leading-relaxed">
            We sent a confirmation link to your email. Click it and you&apos;ll be taken to your matches.
          </p>
        </div>
        <p className="text-sm text-gray-400">
          You can close this tab — just click the link in your email when you&apos;re ready.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">

      {/* Progress bar — at very top, no padding */}
      <ProgressBar current={step} total={TOTAL_STEPS} />

      {/* Nav row */}
      <div className="flex justify-between items-center px-6 pt-6 pb-0">
        <button
          onClick={back}
          className="text-gray-900 font-semibold text-sm flex items-center gap-1 py-2 pr-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Go back"
        >
          ← Back
        </button>
        <span className="text-gray-400 text-sm" aria-live="polite">{step} of {TOTAL_STEPS}</span>
      </div>

      {/* Question heading */}
      <header className="px-6 pt-7 pb-1">
        <h1 className="text-[1.75rem] font-bold text-gray-900 leading-tight">
          {STEP_TITLES[step]}
        </h1>
        <p className="text-gray-500 text-base mt-2">
          {STEP_SUBTITLES[step]}
        </p>
      </header>

      {/* Step content */}
      <div className="flex-1 px-6 py-6">
        {error && (
          <div role="alert" className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}
        {step === 1 && <NameStep {...stepProps} />}
        {step === 2 && <CityStep {...stepProps} />}
        {step === 3 && <LifeAreasStep {...stepProps} />}
        {step === 4 && <PatternsStep {...stepProps} />}
        {step === 5 && <ParticipantsStep {...stepProps} />}
        {step === 6 && <GenderStep {...stepProps} />}
        {step === 7 && <BudgetStep {...stepProps} />}
        {step === 8 && (
          <SessionTypeStep
            {...stepProps}
            onFinish={finish}
            saving={saving}
          />
        )}
      </div>
    </div>
  )
}
