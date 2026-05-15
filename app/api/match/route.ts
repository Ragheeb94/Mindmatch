import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rankTherapists } from '@/lib/matching'
import type { SurveyAnswers, TherapistProfile } from '@/lib/types'

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: surveyRow, error: surveyError } = await supabase
    .from('client_surveys')
    .select('answers')
    .eq('user_id', user.id)
    .single()

  if (surveyError || !surveyRow) {
    return NextResponse.json({ error: 'Survey not found' }, { status: 404 })
  }

  const { data: seenRows, error: seenError } = await supabase
    .from('swipe_history')
    .select('therapist_id')
    .eq('client_id', user.id)

  if (seenError) console.error('swipe_history fetch failed', seenError)
  const seenIds = new Set((seenRows ?? []).map(r => r.therapist_id))

  const { data: therapists, error: therapistsError } = await supabase
    .from('therapist_profiles')
    .select('*, users(first_name, last_name)')
    .eq('is_active', true)
    .eq('crpo_status', 'verified')

  if (therapistsError) console.error('therapist_profiles fetch failed', therapistsError)

  const unseen = (therapists ?? []).filter(t => !seenIds.has(t.id))

  try {
    // jsonb returned as Json type from Supabase, runtime shape matches SurveyAnswers
    const ranked = rankTherapists(surveyRow.answers as unknown as SurveyAnswers, unseen as unknown as TherapistProfile[])

    // Attach display name to each therapist
    const withNames = ranked.map(t => {
      const raw = unseen.find(u => u.id === t.id)
      const user = raw?.users as { first_name: string; last_name: string | null } | null
      const displayName = user
        ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`
        : 'Registered Psychotherapist'
      return { ...t, displayName }
    })

    return NextResponse.json({ therapists: withNames })
  } catch {
    return NextResponse.json({ error: 'Matching failed' }, { status: 500 })
  }
}
