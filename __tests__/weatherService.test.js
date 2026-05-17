import { WeatherProviderError, WEATHER_ERROR_CODES } from '../src/server/weather/weatherErrors'
import { createWeatherService } from '../src/server/weather/weatherService'

const city = {
  code: 'SEOUL',
  path: 'Seoul',
  name: 'Seoul',
  country: 'KR',
  latitude: 37.5665,
  longitude: 126.978,
}

const currentWeather = {
  main: { temp: 20.5 },
}

const forecastWeather = {
  list: [],
}

const mappedReport = {
  city,
  current: {
    temperature: 20.5,
    feelsLike: 20.1,
    humidity: 68,
    windSpeed: 2.4,
    condition: {
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
    measuredAt: '2026-05-15T16:08:52.000Z',
  },
  forecast: [],
  meta: {
    source: 'openweather',
    updatedAt: '2026-05-16T00:00:00.000Z',
    stale: false,
  },
}

function createServiceTestContext() {
  let nowMs = Date.parse('2026-05-16T00:00:00.000Z')
  const fetchCurrentWeather = jest.fn().mockResolvedValue(currentWeather)
  const fetchForecastWeather = jest.fn().mockResolvedValue(forecastWeather)
  const mapOpenWeatherReport = jest.fn().mockReturnValue(mappedReport)
  const service = createWeatherService({
    fetchCurrentWeather,
    fetchForecastWeather,
    mapOpenWeatherReport,
    now: () => new Date(nowMs),
    cacheTtlMs: 60_000,
    staleTtlMs: 5 * 60_000,
  })

  return {
    service,
    fetchCurrentWeather,
    fetchForecastWeather,
    mapOpenWeatherReport,
    advanceTime(ms) {
      nowMs += ms
    },
  }
}

describe('weatherService', () => {
  test('fetches current and forecast once, maps them, and reuses fresh cache', async () => {
    const {
      service,
      fetchCurrentWeather,
      fetchForecastWeather,
      mapOpenWeatherReport,
    } = createServiceTestContext()

    const firstReport = await service.getWeatherReport(city)
    const secondReport = await service.getWeatherReport(city)

    expect(firstReport).toEqual(mappedReport)
    expect(secondReport).toEqual(mappedReport)
    expect(fetchCurrentWeather).toHaveBeenCalledTimes(1)
    expect(fetchForecastWeather).toHaveBeenCalledTimes(1)
    expect(mapOpenWeatherReport).toHaveBeenCalledWith({
      city,
      currentWeather,
      forecastWeather,
      source: 'openweather',
      updatedAt: '2026-05-16T00:00:00.000Z',
      stale: false,
    })
  })

  test('returns stale cached report when provider fails after fresh ttl', async () => {
    const { service, fetchCurrentWeather, advanceTime } = createServiceTestContext()

    await service.getWeatherReport(city)
    advanceTime(90_000)
    fetchCurrentWeather.mockRejectedValueOnce(
      new WeatherProviderError(WEATHER_ERROR_CODES.TIMEOUT, 'timeout')
    )

    const staleReport = await service.getWeatherReport(city)

    expect(staleReport.meta).toEqual({
      ...mappedReport.meta,
      stale: true,
    })
  })

  test('throws provider error when there is no stale cache', async () => {
    const { service, fetchCurrentWeather } = createServiceTestContext()
    const providerError = new WeatherProviderError(WEATHER_ERROR_CODES.TIMEOUT, 'timeout')
    fetchCurrentWeather.mockRejectedValueOnce(providerError)

    await expect(service.getWeatherReport(city)).rejects.toBe(providerError)
  })
})
