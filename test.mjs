import assert from 'node:assert/strict'
import { buildGoogleCalendarUrl, getCountdown } from './src/inviteUtils.js'

const start = '2026-11-28T09:00:00Z'
const now = new Date('2026-11-27T07:30:00Z').getTime()
assert.deepEqual(getCountdown(start, now), { days: 1, hours: 1, minutes: 30, seconds: 0 })
assert.equal(getCountdown(start, new Date(start).getTime()), null)

const url = buildGoogleCalendarUrl({
  name: 'Lê Hiếu',
  startIso: '2026-11-28T02:00:00Z',
  endIso: '2026-11-28T05:00:00Z',
  venue: 'Hội trường A',
  address: 'TP.HCM',
  message: 'Chung vui nhé!',
})
assert.ok(url.includes('dates=20261128T020000Z%2F20261128T050000Z'))
console.log('ok')
