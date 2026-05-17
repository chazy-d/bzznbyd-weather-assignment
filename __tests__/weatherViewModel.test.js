import {
  formatForecastSlotRange,
  formatForecastTime,
  formatForecastRange,
  formatObservationTime,
  formatTemperature,
  formatWeatherDate,
  formatWeatherDetail,
  getOpenWeatherIconUrl,
  getWeatherStatus,
} from '../src/features/weather/viewModel'

describe('weather view model helpers', () => {
  test('formats temperature values for compact weather cards', () => {
    expect(formatTemperature(27.4)).toBe('27°C')
    expect(formatTemperature(27.5)).toBe('28°C')
  })

  test('formats forecast temperature range', () => {
    expect(
      formatForecastRange({
        minTemperature: 16.4,
        maxTemperature: 28.6,
      })
    ).toBe('16° / 29°C')
  })

  test('formats observation time in a stable UTC label', () => {
    expect(formatObservationTime('2026-05-17T07:03:04.000Z')).toBe(
      'Updated May 17, 07:03 UTC'
    )
  })

  test('formats weather date labels', () => {
    expect(formatWeatherDate('2026-05-23')).toBe('May 23')
  })

  test('formats 3-hour forecast slot labels', () => {
    expect(formatForecastTime('2026-05-23T03:00:00.000Z')).toBe('03:00am')
    expect(
      formatForecastSlotRange({
        temperature: 18.4,
        feelsLike: 17.6,
      })
    ).toBe('18°C / 18°C')
  })

  test('formats weather detail text for the current card', () => {
    expect(
      formatWeatherDetail({
        feelsLike: 18.2,
        windSpeed: 3.33,
        humidity: 34,
        condition: {
          description: 'clear sky',
        },
      })
    ).toBe('Feels like 18°C clear sky · wind 3.3m/s · humidity 34%')
  })

  test('builds OpenWeather icon URLs from provider icon codes', () => {
    expect(getOpenWeatherIconUrl('10d')).toBe(
      'https://openweathermap.org/img/wn/10d@2x.png'
    )
    expect(getOpenWeatherIconUrl('')).toBe('')
  })

  test('returns one UI status at a time', () => {
    expect(getWeatherStatus({ loading: true })).toEqual({
      tone: 'loading',
      title: 'Loading weather data',
      message: 'Requesting the latest forecast from the GraphQL API.',
    })

    expect(getWeatherStatus({ error: { message: 'network failed' } })).toEqual({
      tone: 'error',
      title: 'Weather data is unavailable',
      message: 'network failed',
    })

    expect(getWeatherStatus({ data: { weather: null } })).toEqual({
      tone: 'empty',
      title: 'No weather report',
      message: 'The selected city did not return a weather report.',
    })
  })
})
