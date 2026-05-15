import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-3xl mx-auto">
        <span className="text-blue-500 font-bold text-xl">Mind Match</span>
        <Link
          href="/therapist/signup"
          className="text-sm text-blue-500 font-semibold border-2 border-blue-500 rounded-full px-4 py-1.5"
        >
          List your practice
        </Link>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-16 pb-12 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Find the therapist<br />who gets <span className="text-blue-500">you.</span>
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Tell us what you&apos;re going through. We&apos;ll show you verified Ontario therapists who are the right fit.
        </p>
        <Link
          href="/onboarding"
          className="inline-block mt-8 bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-base"
        >
          Find my match →
        </Link>
        <p className="text-xs text-gray-400 mt-3">Free for clients. No account needed to start.</p>
      </section>

      {/* Phone mockup strip */}
      <div className="bg-blue-50 py-12 px-6">
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-blue-500 px-5 py-4">
              <span className="text-white font-bold">Mind Match</span>
            </div>
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Therapist"
                fill
                className="object-cover"
                sizes="384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                ✓ CRPO
              </div>
              <div className="absolute bottom-3 left-4 text-white">
                <p className="font-bold">Registered Psychotherapist</p>
                <p className="text-white/80 text-sm">Toronto, ON · $120/session</p>
              </div>
            </div>
            <div className="p-4 flex justify-center gap-5">
              <div className="w-11 h-11 rounded-full bg-gray-50 shadow flex items-center justify-center text-red-400 font-bold text-lg">✕</div>
              <div className="w-11 h-11 rounded-full bg-gray-50 shadow flex items-center justify-center text-gray-400 text-lg">ℹ</div>
              <div className="w-11 h-11 rounded-full bg-blue-500 shadow flex items-center justify-center text-white text-lg">♡</div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="px-6 py-14 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">How it works</h2>
        <div className="flex flex-col gap-8">
          {[
            { n: '1', title: 'Tell us what you\'re going through', body: 'Answer 8 plain-language questions. No clinical labels. No confusing jargon.' },
            { n: '2', title: 'See your matches', body: 'We show you CRPO-verified Ontario therapists ranked by how well they fit your answers.' },
            { n: '3', title: 'Connect when you\'re ready', body: 'Save therapists you like and reach out directly for a free 15-minute consultation.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center flex-shrink-0">
                {n}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-gray-500 text-sm mt-1">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section className="bg-blue-500 px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to find your match?</h2>
        <p className="text-white/80 text-sm mt-2">It takes less than 3 minutes.</p>
        <Link
          href="/onboarding"
          className="inline-block mt-6 bg-white text-blue-500 font-bold px-8 py-4 rounded-xl text-base"
        >
          Get started — it&apos;s free
        </Link>
      </section>
    </main>
  )
}
