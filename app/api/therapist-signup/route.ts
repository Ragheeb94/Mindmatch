import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { userId, firstName, lastName, profileData, licenseNumber, therapistProfileId } = await req.json()
  const supabase = await createServiceClient()

  // Step 1: create user row
  if (userId && firstName) {
    const { error } = await supabase.from('users').upsert({
      id: userId,
      role: 'therapist',
      first_name: firstName,
      last_name: lastName ?? null,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  // Step 2: save therapist profile
  if (profileData && therapistProfileId === undefined) {
    const { data: row, error } = await supabase
      .from('therapist_profiles')
      .insert({
        user_id: profileData.userId,
        ...profileData.fields,
        crpo_status: 'pending',
        is_active: false,
      })
      .select('id')
      .single()

    if (error || !row) return NextResponse.json({ error: error?.message ?? 'Insert failed' }, { status: 500 })

    // Trigger CRPO verification async
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/crpo/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseNumber, therapistId: row.id }),
      })
    } catch (_) {}

    return NextResponse.json({ ok: true, profileId: row.id })
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}
