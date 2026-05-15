import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SwipeDeck } from '@/components/discover/SwipeDeck'
import { BottomNav } from '@/components/ui/BottomNav'

export default async function DiscoverPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/onboarding')

  return (
    <main className="max-w-md mx-auto min-h-screen bg-blue-50 pb-20">
      <header className="bg-blue-500 px-6 py-4 flex items-center justify-center">
        <span className="text-white font-bold text-lg">Mind Match</span>
      </header>
      <div className="p-4">
        <SwipeDeck />
      </div>
      <BottomNav />
    </main>
  )
}
