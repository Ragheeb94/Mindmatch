import type { SurveyAnswers, TherapistProfile } from './types'

const SPECIALTY_MAP: Record<string, string[]> = {
  'My relationships': ['Relationships', 'Family Conflict', 'Couples', 'Infidelity'],
  'How I feel about myself': ['Self Esteem', 'Body Image', 'Codependency'],
  'Work or school stress': ['Anxiety', 'Burnout', 'Life Transitions'],
  'A loss or major change': ['Grief', 'Life Transitions', 'Depression'],
  "I just feel off and I'm not sure why": ['Anxiety', 'Depression', 'Life Transitions'],
}

const PATTERN_MAP: Record<string, string[]> = {
  'I pull away from people': ['Attachment-Based', 'IFS', 'Relationships'],
  "I can't stop thinking": ['CBT', 'Mindfulness-Based', 'Anxiety'],
  'I feel it in my body': ['Somatic', 'EMDR', 'Trauma-Focused'],
  'My mood changes fast': ['DBT', 'Emotion-Focused'],
  'I go numb': ['Trauma-Focused', 'EMDR', 'Somatic'],
  'I get angry easily': ['DBT', 'IFS', 'Emotionally Focused'],
  "I stop taking care of myself": ['Person-Centered', 'Motivational'],
}

export function scoreTherapist(
  survey: SurveyAnswers,
  therapist: TherapistProfile
): number {
  let score = 0

  // Life areas → specialties (30 points)
  const wantedSpecialties = survey.life_areas.flatMap(a => SPECIALTY_MAP[a] ?? [])
  const specialtyMatches = wantedSpecialties.filter(s =>
    therapist.specialties.some(ts => ts.toLowerCase().includes(s.toLowerCase()))
  ).length
  score += Math.min(30, (specialtyMatches / Math.max(wantedSpecialties.length, 1)) * 30)

  // Patterns → approaches (20 points)
  const wantedApproaches = survey.patterns.flatMap(p => PATTERN_MAP[p] ?? [])
  const approachMatches = wantedApproaches.filter(a =>
    therapist.therapy_approaches.some(ta => ta.toLowerCase().includes(a.toLowerCase()))
  ).length
  score += Math.min(20, (approachMatches / Math.max(wantedApproaches.length, 1)) * 20)

  // Budget (20 points)
  if (therapist.fees_per_session <= survey.budget_max) {
    score += 20
  } else if (therapist.sliding_scale) {
    score += 10
  }

  // Gender preference (15 points)
  if (!survey.gender_preference) {
    score += 15
  } else if (therapist.gender === survey.gender_preference) {
    score += 15
  }

  // Session type (15 points)
  if (
    therapist.session_type === 'both' ||
    therapist.session_type === survey.session_type ||
    survey.session_type === 'both'
  ) {
    score += 15
  }

  return Math.round(score)
}

function passesHardFilters(survey: SurveyAnswers, therapist: TherapistProfile): boolean {
  if (survey.session_type === 'online') {
    // Client wants only online: exclude in-person-only therapists
    if (therapist.session_type === 'in_person') return false
  } else if (survey.session_type === 'in_person') {
    // Client wants only in-person: exclude online-only and other cities
    if (therapist.session_type === 'online') return false
    if (therapist.city.toLowerCase() !== survey.city.toLowerCase()) return false
  } else {
    // Client is open to both: in-person-only therapists must be in same city
    if (therapist.session_type === 'in_person') {
      if (therapist.city.toLowerCase() !== survey.city.toLowerCase()) return false
    }
  }
  return true
}

export function rankTherapists(
  survey: SurveyAnswers,
  therapists: TherapistProfile[]
): TherapistProfile[] {
  return therapists
    .filter(t => passesHardFilters(survey, t))
    .map(t => ({ therapist: t, score: scoreTherapist(survey, t) }))
    .sort((a, b) => b.score - a.score)
    .map(({ therapist }) => therapist)
}
