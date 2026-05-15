import { scoreTherapist, rankTherapists } from '@/lib/matching'
import type { SurveyAnswers, TherapistProfile } from '@/lib/types'

const baseSurvey: SurveyAnswers = {
  name: 'Alex',
  city: 'Toronto',
  life_areas: ['My relationships'],
  patterns: ['I pull away from people'],
  participant_type: 'individual',
  gender_preference: null,
  budget_max: 150,
  session_type: 'both',
}

const baseTherapist: TherapistProfile = {
  id: '1',
  user_id: 'u1',
  license_number: 'RP001',
  crpo_status: 'verified',
  photo_url: null,
  bio: null,
  years_experience: 5,
  session_type: 'both',
  city: 'Toronto',
  fees_per_session: 120,
  sliding_scale: false,
  languages: ['English'],
  gender: 'female',
  specialties: ['Relationships', 'Anxiety'],
  client_focus_text: 'I work with individuals',
  therapy_approaches: ['Attachment-Based', 'CBT'],
  is_active: true,
  contact_email: null,
}

describe('scoreTherapist', () => {
  it('returns a score between 0 and 100', () => {
    const score = scoreTherapist(baseSurvey, baseTherapist)
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('scores higher when specialties match life areas', () => {
    const matched = { ...baseTherapist, specialties: ['Relationships'] }
    const unmatched = { ...baseTherapist, specialties: ['Sports Performance'] }
    expect(scoreTherapist(baseSurvey, matched)).toBeGreaterThan(
      scoreTherapist(baseSurvey, unmatched)
    )
  })

  it('scores higher when fee is within budget', () => {
    const affordable = { ...baseTherapist, fees_per_session: 100 }
    const expensive = { ...baseTherapist, fees_per_session: 200 }
    expect(scoreTherapist(baseSurvey, affordable)).toBeGreaterThan(
      scoreTherapist(baseSurvey, expensive)
    )
  })

  it('scores higher when gender matches preference', () => {
    const survey = { ...baseSurvey, gender_preference: 'female' }
    const matched = { ...baseTherapist, gender: 'female' }
    const unmatched = { ...baseTherapist, gender: 'male' }
    expect(scoreTherapist(survey, matched)).toBeGreaterThan(
      scoreTherapist(survey, unmatched)
    )
  })

  it('does not penalise when no gender preference', () => {
    const survey = { ...baseSurvey, gender_preference: null }
    const score = scoreTherapist(survey, baseTherapist)
    expect(score).toBeGreaterThan(0)
  })

  it('scores higher when session type matches', () => {
    const survey = { ...baseSurvey, session_type: 'online' as const }
    const onlineTherapist = { ...baseTherapist, session_type: 'online' as const }
    const inPersonTherapist = { ...baseTherapist, session_type: 'in_person' as const }
    expect(scoreTherapist(survey, onlineTherapist)).toBeGreaterThan(
      scoreTherapist(survey, inPersonTherapist)
    )
  })
})

describe('rankTherapists', () => {
  it('returns therapists sorted by score descending', () => {
    const lowMatch: TherapistProfile = {
      ...baseTherapist,
      id: '2',
      specialties: ['Sports Performance'],
      fees_per_session: 300,
    }
    const ranked = rankTherapists(baseSurvey, [lowMatch, baseTherapist])
    expect(ranked[0].id).toBe(baseTherapist.id)
  })

  it('excludes therapists from different cities when session_type is in_person', () => {
    const survey = { ...baseSurvey, session_type: 'in_person' as const }
    const otherCity = { ...baseTherapist, id: '2', city: 'Ottawa', session_type: 'in_person' as const }
    const ranked = rankTherapists(survey, [otherCity, baseTherapist])
    expect(ranked.some(t => t.id === otherCity.id)).toBe(false)
  })

  it('includes online therapists from any city', () => {
    const survey = { ...baseSurvey, session_type: 'online' as const }
    const otherCity = { ...baseTherapist, id: '2', city: 'Ottawa', session_type: 'online' as const }
    const ranked = rankTherapists(survey, [otherCity])
    expect(ranked).toHaveLength(1)
  })
})
