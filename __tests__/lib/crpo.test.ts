import { parseCrpoResponse } from '@/lib/crpo'

describe('parseCrpoResponse', () => {
  it('returns verified for active registrant HTML', () => {
    const html = `
      <div class="registrant-status">Active</div>
      <div class="registrant-name">John Smith</div>
    `
    expect(parseCrpoResponse(html)).toBe('verified')
  })

  it('returns rejected for expired registrant HTML', () => {
    const html = `<div class="registrant-status">Expired</div>`
    expect(parseCrpoResponse(html)).toBe('rejected')
  })

  it('returns rejected for suspended registrant HTML', () => {
    const html = `<div class="registrant-status">Suspended</div>`
    expect(parseCrpoResponse(html)).toBe('rejected')
  })

  it('returns rejected when no registrant found', () => {
    const html = `<div class="no-results">No registrant found</div>`
    expect(parseCrpoResponse(html)).toBe('rejected')
  })

  it('returns pending for inactive registrant', () => {
    const html = `<div class="registrant-status">Inactive</div>`
    expect(parseCrpoResponse(html)).toBe('pending')
  })
})
