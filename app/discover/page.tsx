import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SwipeDeck } from '@/components/discover/SwipeDeck'

export default async function DiscoverPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/onboarding')

  return (
    <main className="max-w-md mx-auto min-h-screen bg-blue-50">
      <header className="bg-blue-500 px-6 py-4 flex justify-between items-center">
        <span className="text-white font-bold text-lg">Mind Match</span>
        <a href="/saved" className="text-white/80 text-sm">Saved</a>
      </header>
      <div className="p-4">
        <SwipeDeck />
      </div>
    </main>
  )
}
