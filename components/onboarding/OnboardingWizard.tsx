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

export function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<SurveyAnswers>(defaultAnswers)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  function update<K extends keyof SurveyAnswers>(key: K, value: SurveyAnswers[K]) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function next() {
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
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

    router.push('/discover')
  }

  const stepProps = { answers, update, onNext: next }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      <div className="bg-blue-500 px-6 pt-6 pb-0">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-bold text-lg">Mind Match</span>
          <span className="text-white/80 text-sm">Step {step} of {TOTAL_STEPS}</span>
        </div>
        <ProgressBar current={step} total={TOTAL_STEPS} />
        <div className="py-5">
          <h1 className="text-white text-xl font-bold">{STEP_TITLES[step]}</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 bg-blue-50">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
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
