import { resolvers } from '../src/server/graphql/resolvers'
import { getWeatherReport } from '../src/server/weather/weatherService'

jest.mock('../src/server/weather/weatherService', () => ({
  getWeatherReport: jest.fn(),
}))

const serviceReport = {
  city: {
    code: 'SEOUL',
    path: 'Seoul',
    name: 'Seoul',
    country: 'KR',
    latitude: 37.5665,
    longitude: 126.978,
  },
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

describe('weather resolver', () => {
  beforeEach(() => {
    getWeatherReport.mockReset()
  })

  test('delegates weather query to weatherService with supported city metadata', async () => {
    getWeatherReport.mockResolvedValue(serviceReport)

    const result = await resolvers.Query.weather(null, { city: 'SEOUL' })

    expect(result).toBe(serviceReport)
    expect(getWeatherReport).toHaveBeenCalledTimes(1)
    expect(getWeatherReport).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'SEOUL',
        name: 'Seoul',
        country: 'KR',
      })
    )
  })
})
