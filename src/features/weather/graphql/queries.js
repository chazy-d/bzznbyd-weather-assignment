import { gql } from '@apollo/client'

export const WEATHER_QUERY = gql`
  query WeatherReport($city: CityCode!) {
    weather(city: $city) {
      city {
        code
        name
        country
        path
      }
      current {
        temperature
        feelsLike
        humidity
        windSpeed
        condition {
          main
          description
          icon
        }
        measuredAt
      }
      forecast {
        date
        minTemperature
        maxTemperature
        condition {
          main
          description
          icon
        }
      }
      meta {
        source
        updatedAt
        stale
      }
    }
  }
`

export function getWeatherQueryVariables(city) {
  return {
    city: city.code,
  }
}
