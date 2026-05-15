import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileFormClient } from './ProfileFormClient'

export default async function TherapistDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/therapist/signup')

  const { data: profile } = await supabase
    .from('therapist_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!profile) redirect('/therapist/signup')

  const statusColor = {
    verified: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50',
    rejected: 'text-red-600 bg-red-50',
  }[profile.crpo_status as string] ?? 'text-gray-600 bg-gray-50'

  const statusLabel = {
    verified: 'CRPO Verified',
    pending: 'CRPO Verification Pending',
    rejected: 'CRPO Verification Failed',
  }[profile.crpo_status as string] ?? 'Unknown'

  return (
    <main className="max-w-md mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {!profile.is_active && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-700">
          Your profile is not yet live. <a href="/therapist/subscription" className="underline font-semibold">Subscribe to go live →</a>
        </div>
      )}

      <ProfileFormClient profile={profile as unknown as Record<string, unknown>} />
    </main>
  )
}
