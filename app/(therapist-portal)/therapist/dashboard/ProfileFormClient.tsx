'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfileForm } from '@/components/therapist/ProfileForm'
import { createClient } from '@/lib/supabase/client'

export function ProfileFormClient({ profile }: { profile: Record<string, unknown> }) {
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  async function handleSave(data: any) {
    setSaving(true)
    setSaveError(null)
    setSaved(false)
    const supabase = createClient()
    const { error } = await supabase
      .from('therapist_profiles')
      .update(data)
      .eq('id', profile.id as string)
    setSaving(false)
    if (error) {
      setSaveError('Failed to save changes. Please try again.')
    } else {
      setSaved(true)
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
      {saved && <p className="text-green-600 text-sm font-semibold">Changes saved!</p>}
      <ProfileForm
        initialData={profile as any}
        onSubmit={handleSave}
        saving={saving}
        submitLabel="Save changes"
      />
    </div>
  )
}
