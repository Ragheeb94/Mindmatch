import { TherapistPortalNav } from '@/components/ui/TherapistPortalNav'

export default function SubscriptionPage() {
  return (
    <>
      <TherapistPortalNav />
    <main className="max-w-md mx-auto p-6 min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Coming Soon</h1>
        <p className="text-gray-500 text-sm mt-2">
          Billing will be set up before launch. Your profile has been submitted for CRPO verification.
        </p>
      </div>

      <div className="w-full bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3">
        <p className="text-sm text-gray-700 font-semibold">What happens next:</p>
        <ul className="text-sm text-gray-600 flex flex-col gap-1.5">
          <li>✓ Your CRPO license is being verified</li>
          <li>✓ You will be notified when your profile goes live</li>
          <li>✓ Subscription pricing will be set up before launch</li>
        </ul>
      </div>

      <a
        href="/therapist/dashboard"
        className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl text-base text-center block"
      >
        Go to Dashboard
      </a>
    </main>
    </>
  )
}
