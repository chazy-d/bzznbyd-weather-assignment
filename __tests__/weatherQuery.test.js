import {
  getWeatherQueryVariables,
  WEATHER_QUERY,
} from '../src/features/weather/graphql/queries'

describe('weather query helpers', () => {
  test('maps supported city route metadata to GraphQL CityCode variable', () => {
    expect(
      getWeatherQueryVariables({
        code: 'SEOUL',
        path: 'Seoul',
        name: 'Seoul',
      })
    ).toEqual({ city: 'SEOUL' })
  })

  test('selects WeatherReport fields needed by the first connected page state', () => {
    const printedQuery = WEATHER_QUERY.loc.source.body

    expect(printedQuery).toContain('query WeatherReport($city: CityCode!)')
    expect(printedQuery).toContain('weather(city: $city)')
    expect(printedQuery).toContain('current')
    expect(printedQuery).toContain('forecast')
    expect(printedQuery).toContain('meta')
  })
})
