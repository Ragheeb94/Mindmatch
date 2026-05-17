import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SwipeDeck } from '@/components/discover/SwipeDeck'
import { BottomNav } from '@/components/ui/BottomNav'
import { MindMatchLogo } from '@/components/ui/MindMatchLogo'

export default async function DiscoverPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/onboarding')

  const { data: userRow } = await supabase
    .from('users')
    .select('first_name')
    .eq('id', user.id)
    .single()

  const firstName = userRow?.first_name

  return (
    <main className="max-w-md mx-auto min-h-screen bg-white pb-20">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <MindMatchLogo size={32} />
          <div>
            <p className="font-bold text-gray-900 text-sm leading-none">Mind Match</p>
            {firstName && (
              <p className="text-xs text-gray-400 mt-0.5">Hey {firstName} 👋</p>
            )}
          </div>
        </div>
        <span className="text-xl" aria-hidden="true">✨</span>
      </header>
      <div className="p-4">
        <SwipeDeck />
      </div>
      <BottomNav />
    </main>
  )
}
