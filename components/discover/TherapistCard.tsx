import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import type { TherapistProfile } from '@/lib/types'

interface TherapistCardProps {
  therapist: TherapistProfile
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  const photo = therapist.photo_url ??
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80'

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative h-72">
        <Image
          src={photo}
          alt={`Photo of therapist`}
          fill
          className="object-cover"
          sizes="(max-width: 448px) 100vw, 448px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge label="✓ CRPO" variant="blue" className="bg-blue-500 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p className="font-bold text-lg leading-tight">{therapist.bio?.split('.')[0] ?? 'Registered Psychotherapist'}</p>
          <p className="text-white/80 text-sm mt-0.5">{therapist.city}, ON</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {therapist.specialties.slice(0, 3).map(s => (
            <Badge key={s} label={s} />
          ))}
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-gray-800">
            ${therapist.fees_per_session}
            <span className="text-gray-400 font-normal"> / session</span>
          </span>
          {therapist.sliding_scale && (
            <span className="text-blue-500 text-xs font-semibold">Sliding scale ✓</span>
          )}
        </div>
      </div>
    </div>
  )
}
