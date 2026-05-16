import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import type { Json } from '@/lib/supabase/types'

export async function POST(req: NextRequest) {
  const { userId, name, answers } = await req.json()

  if (!userId || !name || !answers) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { error: userError } = await supabase.from('users').upsert({
    id: userId,
    role: 'client',
    first_name: name,
  })

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  await supabase.from('client_surveys').upsert({
    user_id: userId,
    answers: answers as Json,
  })

  return NextResponse.json({ ok: true })
}
