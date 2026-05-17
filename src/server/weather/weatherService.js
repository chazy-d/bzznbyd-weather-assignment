import {
  fetchCurrentWeather as defaultFetchCurrentWeather,
  fetchForecastWeather as defaultFetchForecastWeather,
} from './openWeatherClient'
import { mapOpenWeatherReport as defaultMapOpenWeatherReport } from './weatherMapper'
import { createWeatherCache } from './weatherCache'

function getCityCacheKey(city) {
  return city.code
}

export function createWeatherService({
  fetchCurrentWeather = defaultFetchCurrentWeather,
  fetchForecastWeather = defaultFetchForecastWeather,
  mapOpenWeatherReport = defaultMapOpenWeatherReport,
  cache,
  cacheTtlMs,
  staleTtlMs,
  now = () => new Date(),
} = {}) {
  const weatherCache =
    cache ||
    createWeatherCache({
      ttlMs: cacheTtlMs,
      staleTtlMs,
      now: () => now().getTime(),
    })

  async function getWeatherReport(city) {
    const cacheKey = getCityCacheKey(city)
    const cachedReport = weatherCache.getFresh(cacheKey)

    if (cachedReport) {
      return cachedReport
    }

    try {
      const [currentWeather, forecastWeather] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecastWeather(city),
      ])
      const updatedAt = now().toISOString()
      const report = mapOpenWeatherReport({
        city,
        currentWeather,
        forecastWeather,
        source: 'openweather',
        updatedAt,
        stale: false,
      })

      return weatherCache.set(cacheKey, report)
    } catch (error) {
      const staleReport = weatherCache.getStale(cacheKey)

      if (staleReport) {
        return staleReport
      }

      throw error
    }
  }

  return {
    getWeatherReport,
    clearCache: weatherCache.clear,
  }
}

export const weatherService = createWeatherService()

export function getWeatherReport(city) {
  return weatherService.getWeatherReport(city)
}
