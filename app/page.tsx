import Link from 'next/link'
import { SplashScreen } from '@/components/ui/SplashScreen'
import { MindMatchLogo } from '@/components/ui/MindMatchLogo'

export default function LandingPage() {
  return (
    <>
      <SplashScreen />

      <main className="fixed inset-0 bg-white flex flex-col max-w-md mx-auto overflow-hidden">

        {/* Decorative background blobs */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100 opacity-60"
          style={{ filter: 'blur(64px)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-blue-50 opacity-80"
          style={{ filter: 'blur(48px)' }}
          aria-hidden="true"
        />

        {/* Logo header */}
        <header className="relative px-8 pt-16 pb-0 animate-fade-up">
          <div className="flex items-center gap-3">
            <MindMatchLogo size={44} />
            <div>
              <p className="text-gray-900 font-bold text-xl tracking-tight leading-none">Mind Match</p>
              <p className="text-gray-400 text-xs mt-0.5">Ontario, Canada</p>
            </div>
          </div>
        </header>

        {/* Hero — grows to fill center */}
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
              <span key={t} className="text-xs text-blue-500 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Role CTAs — pinned to bottom, Hinge-style */}
        <footer className="relative px-8 pb-12 flex flex-col gap-3 animate-fade-up-delay-2">
          <Link
            href="/onboarding"
            className="press-scale w-full bg-blue-500 text-white font-bold text-base py-4 rounded-2xl text-center"
          >
            I&apos;m looking for therapy
          </Link>
          <Link
            href="/therapist/signup"
            className="press-scale w-full bg-white text-blue-500 font-bold text-base py-4 rounded-2xl text-center border-2 border-blue-200"
          >
            I&apos;m a therapist
          </Link>
          <p className="text-xs text-gray-400 text-center mt-1">
            Free for clients · Licensed therapists only
          </p>
        </footer>

      </main>
    </>
  )
}
