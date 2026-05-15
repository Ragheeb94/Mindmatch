import { parse } from 'node-html-parser'

export type CrpoResult = 'verified' | 'pending' | 'rejected'

export function parseCrpoResponse(html: string): CrpoResult {
  const root = parse(html)
  const statusEl = root.querySelector('.registrant-status')

  if (!statusEl) return 'rejected'

  const status = statusEl.text.trim().toLowerCase()

  if (status === 'active') return 'verified'
  if (status === 'inactive') return 'pending'
  return 'rejected'
}

export async function verifyCrpoLicense(licenseNumber: string): Promise<CrpoResult> {
  const sanitized = licenseNumber.trim()
  if (!/^[A-Za-z0-9\-]{1,20}$/.test(sanitized)) return 'rejected'

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const formData = new URLSearchParams()
    formData.append('registration_number', sanitized)

    const response = await fetch('https://www.crpo.ca/find-a-registrant/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (compatible; MindMatch/1.0)',
      },
      body: formData.toString(),
      signal: controller.signal,
    })

    if (!response.ok) return 'rejected'

    const html = await response.text()
    return parseCrpoResponse(html)
  } catch {
    return 'rejected'
  } finally {
    clearTimeout(timeout)
  }
}
