export const DEFAULT_WEATHER_CACHE_TTL_MS = 10 * 60 * 1000
export const DEFAULT_WEATHER_STALE_TTL_MS = 30 * 60 * 1000

function markReportAsStale(report) {
  return {
    ...report,
    meta: {
      ...report.meta,
      stale: true,
    },
  }
}

export function createWeatherCache({
  ttlMs = DEFAULT_WEATHER_CACHE_TTL_MS,
  staleTtlMs = DEFAULT_WEATHER_STALE_TTL_MS,
  now = () => Date.now(),
} = {}) {
  const entries = new Map()

  function getEntryAge(entry) {
    return now() - entry.storedAt
  }

  return {
    getFresh(key) {
      const entry = entries.get(key)

      if (!entry || getEntryAge(entry) > ttlMs) {
        return null
      }

      return entry.report
    },

    getStale(key) {
      const entry = entries.get(key)

      if (!entry || getEntryAge(entry) > ttlMs + staleTtlMs) {
        return null
      }

      return markReportAsStale(entry.report)
    },

    set(key, report) {
      entries.set(key, {
        report,
        storedAt: now(),
      })

      return report
    },

    clear() {
      entries.clear()
    },
  }
}
