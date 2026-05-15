import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import type { TherapistProfile } from '@/lib/types'

interface FullProfileProps {
  therapist: TherapistProfile
  therapistName: string
}

export function FullProfile({ therapist, therapistName }: FullProfileProps) {
  const photo = therapist.photo_url ??
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80'

  const sessionLabel = {
    in_person: 'In-person only',
    online: 'Online only',
    both: 'In-person + Online',
  }[therapist.session_type]

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="relative h-64">
        <Image src={photo} alt="Therapist photo" fill className="object-cover" sizes="448px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge label="✓ CRPO Verified" className="bg-blue-500 text-white" />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{therapistName}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Registered Psychotherapist · {therapist.city}, ON</p>
        </div>

        <div className="h-px bg-gray-100" />

        <div>
          <p className="text-xs font-bold text-blue-500 tracking-widest mb-2">I WORK WITH</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {therapist.client_focus_text ?? 'Individuals, couples, and families navigating life transitions.'}
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="grid grid-cols-3 text-center gap-2">
          <div>
            <p className="text-lg font-bold text-blue-500">${therapist.fees_per_session}</p>
            <p className="text-xs text-gray-400">per session</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-500">{therapist.years_experience ?? '–'} yrs</p>
            <p className="text-xs text-gray-400">experience</p>
          </div>
          <div>
            <p className="text-sm font-bold text-blue-500">{sessionLabel}</p>
            <p className="text-xs text-gray-400">format</p>
          </div>
        </div>

        {therapist.sliding_scale && (
          <p className="text-xs text-blue-500 font-semibold text-center">
            Sliding scale available
          </p>
        )}

        <div className="h-px bg-gray-100" />

        <div>
          <p className="text-xs font-bold text-blue-500 tracking-widest mb-2">APPROACHES</p>
          <div className="flex flex-wrap gap-2">
            {therapist.therapy_approaches.map(a => (
              <Badge key={a} label={a} />
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-800 mb-1">Request a Free 15-Minute Consultation</p>
          <p>Reach out directly to {therapistName.split(' ')[0]} to see if you&apos;re a good fit before committing.</p>
        </div>

        <a
          href={therapist.contact_email ? `mailto:${therapist.contact_email}` : '#'}
          className="block w-full bg-blue-500 text-white text-center font-bold py-3 rounded-xl"
        >
          Contact {therapistName.split(' ')[0]}
        </a>
      </div>
    </div>
  )
}
