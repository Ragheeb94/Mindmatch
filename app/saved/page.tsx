import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'

export default async function SavedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/onboarding')

  const { data: saved, error: savedError } = await supabase
    .from('swipe_history')
    .select('therapist_id, therapist_profiles(*, users(first_name, last_name))')
    .eq('client_id', user.id)
    .eq('action', 'save')
    .order('created_at', { ascending: false })

  if (savedError) console.error('saved therapists fetch failed', savedError)

  const profiles = (saved ?? []).map(r => {
    const p = r.therapist_profiles as any
    if (!p) return null
    const u = p.users as { first_name: string; last_name: string | null } | null
    const name = u ? `${u.first_name}${u.last_name ? ' ' + u.last_name : ''}` : 'Registered Psychotherapist'
    return { ...p, displayName: name }
  }).filter(Boolean) as any[]

  return (
    <main className="max-w-md mx-auto min-h-screen bg-blue-50">
      <header className="bg-blue-500 px-6 py-4 flex justify-between items-center">
        <a href="/discover" className="text-white/80 text-sm">← Back</a>
        <span className="text-white font-bold text-lg">Saved</span>
        <div className="w-12" />
      </header>

      <div className="p-4 flex flex-col gap-3">
        {profiles.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            No saved therapists yet. Go back and heart someone!
          </p>
        )}

        {profiles.map((profile: any) => {
          const photo = profile.photo_url ??
            'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80'
          return (
            <Link
              key={profile.id}
              href={`/therapist/${profile.id}`}
              className="bg-white rounded-xl p-3 flex gap-3 items-center shadow-sm"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={photo} alt="Therapist" fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {profile.displayName}
                </p>
                <p className="text-xs text-gray-500">{profile.city}, ON · ${profile.fees_per_session}/session</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {(profile.specialties ?? []).slice(0, 2).map((s: string) => (
                    <Badge key={s} label={s} className="text-xs py-0.5 px-2" />
                  ))}
                </div>
              </div>
              {profile.crpo_status === 'verified' && (
                <span className="text-blue-500 text-xs font-semibold flex-shrink-0">CRPO ✓</span>
              )}
            </Link>
          )
        })}
      </div>
    </main>
  )
}
