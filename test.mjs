import assert from 'node:assert/strict'
import { buildGoogleCalendarUrl, getCountdown } from './src/inviteUtils.js'

const start = '2026-11-29T14:00:00+07:00'
const now = new Date('2026-11-28T12:30:00+07:00').getTime()
assert.deepEqual(getCountdown(start, now), { days: 1, hours: 1, minutes: 30, seconds: 0 })
assert.equal(getCountdown(start, new Date(start).getTime()), null)

const url = buildGoogleCalendarUrl({
  name: 'Lê Hiếu',
  startIso: '2026-11-29T14:00:00+07:00',
  endIso: '2026-11-29T17:30:00+07:00',
  venue: 'Hội trường A',
  address: 'TP.HCM',
  message: 'Chung vui nhé!',
})
assert.ok(url.includes('dates=20261129T070000Z%2F20261129T103000Z'))
console.log('ok')
