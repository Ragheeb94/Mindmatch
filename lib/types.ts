export type SessionType = 'in_person' | 'online' | 'both'
export type CrpoStatus = 'verified' | 'pending' | 'rejected'
export type SwipeAction = 'skip' | 'save'

export interface SurveyAnswers {
  name: string
  city: string
  life_areas: string[]
  patterns: string[]
  participant_type: 'individual' | 'couples' | 'family'
  gender_preference: string | null
  budget_max: number
  session_type: SessionType
}

export interface TherapistProfile {
  id: string
  user_id: string
  license_number: string
  crpo_status: CrpoStatus
  photo_url: string | null
  bio: string | null
  years_experience: number | null
  session_type: SessionType
  city: string
  fees_per_session: number
  sliding_scale: boolean
  languages: string[]
  gender: string | null
  specialties: string[]
  client_focus_text: string | null
  therapy_approaches: string[]
  is_active: boolean
  contact_email: string | null
}
