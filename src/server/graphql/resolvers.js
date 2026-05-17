import { getSupportedCityByCode } from '../weather/cities'
import { getWeatherReport } from '../weather/weatherService'

const appVersion = '0.1.0'

export const resolvers = {
  Query: {
    health: () => ({
      ok: true,
      service: 'bzznbyd-weather-assignment',
      version: appVersion,
    }),
    version: () => appVersion,
    weather: (_, { city }) => {
      const supportedCity = getSupportedCityByCode(city)

      if (!supportedCity) {
        throw new Error(`Unsupported city: ${city}`)
      }

      return getWeatherReport(supportedCity)
    },
  },
}
