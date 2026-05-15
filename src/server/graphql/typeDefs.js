export const typeDefs = `#graphql
  enum CityCode {
    SEOUL
    TOKYO
    PARIS
    LONDON
  }

  type City {
    code: CityCode!
    name: String!
    country: String!
    path: String!
    latitude: Float!
    longitude: Float!
  }

  type HealthStatus {
    ok: Boolean!
    service: String!
    version: String!
  }

  type WeatherCondition {
    main: String!
    description: String!
    icon: String!
  }

  type CurrentWeather {
    temperature: Float!
    feelsLike: Float!
    humidity: Int!
    windSpeed: Float!
    condition: WeatherCondition!
    measuredAt: String!
  }

  type DailyForecast {
    date: String!
    minTemperature: Float!
    maxTemperature: Float!
    condition: WeatherCondition!
  }

  type WeatherMeta {
    source: String!
    updatedAt: String!
    stale: Boolean!
  }

  type WeatherReport {
    city: City!
    current: CurrentWeather!
    forecast: [DailyForecast!]!
    meta: WeatherMeta!
  }

  type Query {
    health: HealthStatus!
    version: String!
    weather(city: CityCode!): WeatherReport!
  }
`
