import Link from 'next/link'
import { SplashScreen } from '@/components/ui/SplashScreen'
import { MindMatchLogo } from '@/components/ui/MindMatchLogo'

const PARTICLES = [
  { emoji: '🧠', left: '12%', top: '55%', cls: 'particle-d1' },
  { emoji: '💙', left: '78%', top: '60%', cls: 'particle-d2' },
  { emoji: '✨', left: '55%', top: '65%', cls: 'particle-d3' },
  { emoji: '🌿', left: '30%', top: '58%', cls: 'particle-d4' },
  { emoji: '💬', left: '88%', top: '50%', cls: 'particle-d5' },
  { emoji: '🌸', left: '5%',  top: '70%', cls: 'particle-d6' },
]

export default function LandingPage() {
  return (
    <>
      <SplashScreen />

      <main className="fixed inset-0 bg-white flex flex-col max-w-md mx-auto overflow-hidden">

        {/* Morphing blobs */}
        <div
          className="blob-1 absolute -top-20 -right-20 w-72 h-72 bg-blue-100 opacity-70"
          style={{ filter: 'blur(56px)' }}
          aria-hidden="true"
        />
        <div
          className="blob-2 absolute -bottom-12 -left-12 w-64 h-64 bg-blue-50 opacity-80"
          style={{ filter: 'blur(48px)' }}
          aria-hidden="true"
        />
        <div
          className="blob-1 absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-100 opacity-40"
          style={{ filter: 'blur(40px)', animationDelay: '3s' }}
          aria-hidden="true"
        />

        {/* Floating emoji particles */}
        {PARTICLES.map(({ emoji, left, top, cls }) => (
          <span
            key={emoji + left}
            className={`particle ${cls} absolute text-2xl select-none pointer-events-none`}
            style={{ left, top }}
            aria-hidden="true"
          >
            {emoji}
          </span>
        ))}

        {/* Logo header */}
        <header className="relative px-8 pt-16 pb-0 animate-fade-up">
          <div className="flex items-center gap-3">
            {/* Pulsing ring behind logo */}
            <div className="relative">
              <div
                className="logo-ping absolute inset-0 rounded-2xl bg-blue-400"
                aria-hidden="true"
              />
              <MindMatchLogo size={44} />
            </div>
            <div>
              <p className="text-gray-900 font-bold text-xl tracking-tight leading-none">Mind Match</p>
              <p className="text-gray-400 text-xs mt-0.5">Ontario, Canada</p>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="relative flex-1 flex flex-col justify-center px-8 animate-fade-up-delay-1">
          <h1 className="text-[2.6rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
            Find the right<br />
            therapist.<br />
            <span className="text-blue-500">For you.</span>
          </h1>
          <p className="text-gray-400 text-base mt-5 leading-relaxed max-w-xs">
            Tell us what you&apos;re going through. We&apos;ll match you with CRPO-verified Ontario therapists who fit.
          </p>

          {/* Trust pills */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {['✓ CRPO Verified', '✓ Ontario Licensed', '✓ Free to match'].map(t => (
              <span key={t} className="text-xs text-blue-500 font-semibold bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <footer className="relative px-8 pb-12 flex flex-col gap-3 animate-fade-up-delay-2">
          <Link
            href="/onboarding"
            className="press-scale btn-shimmer w-full text-white font-bold text-base py-4 rounded-2xl text-center shadow-lg shadow-blue-200"
          >
            I&apos;m looking for therapy
          </Link>
          <Link
            href="/therapist/signup"
            className="press-scale w-full bg-white text-blue-600 font-bold text-base py-4 rounded-2xl text-center border-2 border-blue-200"
          >
            I&apos;m a therapist 🩺
          </Link>
          <p className="text-xs text-gray-400 text-center mt-1">
            Free for clients · Licensed therapists only
          </p>
          <Link
            href="/login"
            className="text-sm text-gray-400 text-center mt-1 underline underline-offset-2"
          >
            Already have an account? Sign in
          </Link>
        </footer>

      </main>
    </>
  )
}
