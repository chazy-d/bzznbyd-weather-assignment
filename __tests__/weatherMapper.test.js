import {
  mapOpenWeatherReport,
  selectRepresentativeForecast,
} from '../src/server/weather/weatherMapper'

const city = {
  code: 'SEOUL',
  path: 'Seoul',
  name: 'Seoul',
  country: 'KR',
  latitude: 37.5665,
  longitude: 126.978,
}

const currentWeather = {
  dt: 1778861332,
  main: {
    temp: 20.5,
    feels_like: 20.1,
    humidity: 68,
  },
  wind: {
    speed: 2.4,
  },
  weather: [
    {
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
}

const forecastWeather = {
  list: [
    {
      dt_txt: '2026-05-16 00:00:00',
      main: { temp_min: 15.2, temp_max: 17.4, temp: 16.3 },
      weather: [{ main: 'Clouds', description: 'few clouds', icon: '02n' }],
    },
    {
      dt_txt: '2026-05-16 12:00:00',
      main: { temp_min: 18.1, temp_max: 23.6, temp: 22.8 },
      weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
    },
    {
      dt_txt: '2026-05-16 21:00:00',
      main: { temp_min: 16.7, temp_max: 19.2, temp: 18.1 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01n' }],
    },
    {
      dt_txt: '2026-05-17 00:00:00',
      main: { temp_min: 14.8, temp_max: 16.1, temp: 15.5 },
      weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04n' }],
    },
    {
      dt_txt: '2026-05-17 12:00:00',
      main: { temp_min: 17.3, temp_max: 24.4, temp: 23.9 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    },
  ],
}

describe('weatherMapper', () => {
  test('maps OpenWeather current and forecast responses into WeatherReport', () => {
    const report = mapOpenWeatherReport({
      city,
      currentWeather,
      forecastWeather,
      source: 'openweather',
      updatedAt: '2026-05-16T00:00:00.000Z',
      stale: false,
    })

    expect(report.city).toEqual(city)
    expect(report.current).toEqual({
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
    })
    expect(report.forecast).toEqual([
      {
        date: '2026-05-16',
        minTemperature: 15.2,
        maxTemperature: 23.6,
        condition: {
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
        items: [
          {
            measuredAt: '2026-05-16T00:00:00.000Z',
            temperature: 16.3,
            feelsLike: 16.3,
            humidity: 0,
            windSpeed: 0,
            condition: {
              main: 'Clouds',
              description: 'few clouds',
              icon: '02n',
            },
          },
          {
            measuredAt: '2026-05-16T12:00:00.000Z',
            temperature: 22.8,
            feelsLike: 22.8,
            humidity: 0,
            windSpeed: 0,
            condition: {
              main: 'Rain',
              description: 'light rain',
              icon: '10d',
            },
          },
          {
            measuredAt: '2026-05-16T21:00:00.000Z',
            temperature: 18.1,
            feelsLike: 18.1,
            humidity: 0,
            windSpeed: 0,
            condition: {
              main: 'Clear',
              description: 'clear sky',
              icon: '01n',
            },
          },
        ],
      },
      {
        date: '2026-05-17',
        minTemperature: 14.8,
        maxTemperature: 24.4,
        condition: {
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
        items: [
          {
            measuredAt: '2026-05-17T00:00:00.000Z',
            temperature: 15.5,
            feelsLike: 15.5,
            humidity: 0,
            windSpeed: 0,
            condition: {
              main: 'Clouds',
              description: 'broken clouds',
              icon: '04n',
            },
          },
          {
            measuredAt: '2026-05-17T12:00:00.000Z',
            temperature: 23.9,
            feelsLike: 23.9,
            humidity: 0,
            windSpeed: 0,
            condition: {
              main: 'Clear',
              description: 'clear sky',
              icon: '01d',
            },
          },
        ],
      },
    ])
    expect(report.meta).toEqual({
      source: 'openweather',
      updatedAt: '2026-05-16T00:00:00.000Z',
      stale: false,
    })
  })

  test('selects midday forecast as the daily representative condition when available', () => {
    const representative = selectRepresentativeForecast(forecastWeather.list)

    expect(representative.condition).toEqual({
      main: 'Rain',
      description: 'light rain',
      icon: '10d',
    })
  })
})
