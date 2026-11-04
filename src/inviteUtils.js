export function getCountdown(targetIso, nowMs = Date.now()) {
  const diff = new Date(targetIso).getTime() - nowMs
  if (Number.isNaN(diff) || diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  }
}

export function buildGoogleCalendarUrl({ name, degree, startIso, endIso, venue, address, message }) {
  const fmt = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Lễ Tốt Nghiệp ${degree ? `${degree} ` : ''}${name}`,
    dates: `${fmt(startIso)}/${fmt(endIso)}`,
    location: `${venue}, ${address}`,
    details: message,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
