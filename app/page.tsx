import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <header className="px-6 pt-10 pb-2 max-w-md mx-auto w-full animate-fade-up">
        <span className="text-blue-500 font-bold text-2xl tracking-tight">Mind Match</span>
        <p className="text-gray-400 text-xs mt-0.5">Ontario&apos;s therapist matching platform</p>
      </header>

      {/* Hero */}
      <section className="px-6 pt-10 pb-6 max-w-md mx-auto w-full animate-fade-up-delay-1">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Find the right therapist.<br />
          <span className="text-blue-500">For you.</span>
        </h1>
        <p className="text-gray-500 mt-3 text-base">
          Who are you here as?
        </p>
      </section>

      {/* Role selection cards */}
      <section className="px-6 max-w-md mx-auto w-full flex flex-col gap-4">
        {/* Client card */}
        <Link
          href="/onboarding"
          className="press-scale block bg-blue-500 rounded-2xl p-6 shadow-lg shadow-blue-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 text-2xl">
              🧠
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-snug">I&apos;m looking for therapy</p>
              <p className="text-white/75 text-sm mt-1 leading-relaxed">
                Answer 8 quick questions. Get matched with verified Ontario therapists who fit your needs.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-white/60 text-xs">Free · No account needed to start</span>
            <span className="bg-white text-blue-500 font-bold text-sm px-4 py-2 rounded-xl">
              Start →
            </span>
          </div>
        </Link>

        {/* Therapist card */}
        <Link
          href="/therapist/signup"
          className="press-scale block bg-white border-2 border-blue-100 rounded-2xl p-6 animate-fade-up-delay-2"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-2xl">
              🩺
            </div>
            <div>
              <p className="text-gray-900 font-bold text-lg leading-snug">I&apos;m a therapist</p>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                Create a profile and get discovered by clients actively searching for your specialty.
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-gray-400 text-xs">CRPO verification included</span>
            <span className="bg-blue-500 text-white font-bold text-sm px-4 py-2 rounded-xl">
              List your practice →
            </span>
          </div>
        </Link>
      </section>

      {/* Divider */}
      <div className="px-6 max-w-md mx-auto w-full mt-12 animate-fade-up-delay-3">
        <div className="border-t border-gray-100" />
      </div>

      {/* Phone mockup */}
      <section className="px-6 pt-10 pb-6 max-w-md mx-auto w-full animate-fade-up-delay-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">What it looks like</p>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-blue-500 px-5 py-3">
            <span className="text-white font-bold text-sm">Mind Match</span>
          </div>
          <div className="relative h-52">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
              alt="Example therapist profile"
              fill
              className="object-cover"
              sizes="384px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              ✓ CRPO
            </div>
            <div className="absolute bottom-3 left-4 text-white">
              <p className="font-bold text-sm">Registered Psychotherapist</p>
              <p className="text-white/80 text-xs">Toronto, ON · $120/session</p>
            </div>
          </div>
          <div className="p-4 flex justify-center gap-5">
            <div className="w-11 h-11 rounded-full bg-gray-50 shadow flex items-center justify-center text-red-400 font-bold text-lg">✕</div>
            <div className="w-11 h-11 rounded-full bg-gray-50 shadow flex items-center justify-center text-gray-400 text-lg">ℹ</div>
            <div className="w-11 h-11 rounded-full bg-blue-500 shadow flex items-center justify-center text-white text-lg">♡</div>
          </div>
        </div>
      </section>

      {/* How it works (client path) */}
      <section className="px-6 pb-14 max-w-md mx-auto w-full animate-fade-up-delay-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">For clients</p>
        <div className="flex flex-col gap-5">
          {[
            { n: '1', title: 'Tell us what you\'re going through', body: 'Answer 8 plain-language questions. No clinical labels.' },
            { n: '2', title: 'See your matches', body: 'CRPO-verified Ontario therapists ranked by fit.' },
            { n: '3', title: 'Connect when ready', body: 'Reach out directly for a free 15-minute consultation.' },
          ].map(({ n, title, body }) => (
            <div key={n} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                {n}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-400 text-sm mt-0.5">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/onboarding"
          className="press-scale mt-8 w-full bg-blue-500 text-white font-bold py-4 rounded-xl text-base text-center block"
        >
          Get started — it&apos;s free
        </Link>
        <p className="text-xs text-gray-400 text-center mt-2">Takes less than 3 minutes</p>
      </section>

    </main>
  )
}
