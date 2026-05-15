import { NextRequest, NextResponse } from 'next/server'
import { verifyCrpoLicense } from '@/lib/crpo'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { licenseNumber, therapistId } = body as Record<string, unknown>

  if (!licenseNumber || typeof licenseNumber !== 'string') {
    return NextResponse.json({ error: 'licenseNumber required' }, { status: 400 })
  }

  if (!therapistId || typeof therapistId !== 'string') {
    return NextResponse.json({ error: 'therapistId required' }, { status: 400 })
  }

  const result = await verifyCrpoLicense(licenseNumber.trim())

  // Supabase update will be wired in Task 3 when the server client is available
  // For now return the result — the caller can handle the update
  return NextResponse.json({ status: result, therapistId })
}
