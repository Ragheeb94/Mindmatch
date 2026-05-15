'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function TherapistPortalNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const links = [
    { href: '/therapist/dashboard', label: 'Dashboard' },
    { href: '/therapist/subscription', label: 'Subscription' },
  ]

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-md mx-auto">
      <span className="text-blue-500 font-bold text-lg">Mind Match</span>
      <nav className="flex items-center gap-4">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              pathname === link.href ? 'text-blue-500' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors"
        >
          Logout
        </button>
      </nav>
    </header>
  )
}
