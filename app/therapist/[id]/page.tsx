import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { FullProfile } from '@/components/therapist/FullProfile'
import type { TherapistProfile } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function TherapistProfilePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('therapist_profiles')
    .select('*, users(first_name, last_name)')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!profile) notFound()

  const user = profile.users as { first_name: string; last_name: string | null } | null
  const name = user
    ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`
    : 'Therapist'

  return (
    <main>
      <div className="max-w-md mx-auto px-4 py-4">
        <a href="/discover" className="text-blue-500 text-sm font-semibold">← Back</a>
      </div>
      <FullProfile therapist={profile as unknown as TherapistProfile} therapistName={name} />
    </main>
  )
}
