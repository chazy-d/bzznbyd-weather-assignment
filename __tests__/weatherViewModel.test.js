import {
  formatForecastRange,
  formatObservationTime,
  formatTemperature,
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
