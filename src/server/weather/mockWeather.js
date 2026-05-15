import { getSupportedCityByCode } from './cities'

const mockConditions = {
  SEOUL: {
    current: {
      temperature: 22.4,
      feelsLike: 22.1,
      humidity: 48,
      windSpeed: 2.7,
      condition: {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
      measuredAt: '2026-05-15T09:00:00.000Z',
    },
    forecast: [
      ['2026-05-16', 17.8, 25.1, 'Clouds', 'few clouds', '02d'],
      ['2026-05-17', 18.2, 24.6, 'Rain', 'light rain', '10d'],
      ['2026-05-18', 16.9, 23.8, 'Clear', 'clear sky', '01d'],
      ['2026-05-19', 17.1, 24.2, 'Clouds', 'scattered clouds', '03d'],
      ['2026-05-20', 18.5, 25.8, 'Clear', 'clear sky', '01d'],
    ],
  },
  TOKYO: {
    current: {
      temperature: 24.2,
      feelsLike: 24.9,
      humidity: 61,
      windSpeed: 3.2,
      condition: {
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d',
      },
      measuredAt: '2026-05-15T09:00:00.000Z',
    },
    forecast: [
      ['2026-05-16', 19.8, 26.2, 'Rain', 'light rain', '10d'],
      ['2026-05-17', 20.1, 27.4, 'Clouds', 'broken clouds', '04d'],
      ['2026-05-18', 21.0, 28.1, 'Clear', 'clear sky', '01d'],
      ['2026-05-19', 21.6, 28.5, 'Clouds', 'few clouds', '02d'],
      ['2026-05-20', 22.0, 29.3, 'Rain', 'moderate rain', '10d'],
    ],
  },
  PARIS: {
    current: {
      temperature: 18.3,
      feelsLike: 17.8,
      humidity: 55,
      windSpeed: 4.1,
      condition: {
        main: 'Rain',
        description: 'light rain',
        icon: '10d',
      },
      measuredAt: '2026-05-15T09:00:00.000Z',
    },
    forecast: [
      ['2026-05-16', 12.7, 19.4, 'Rain', 'light rain', '10d'],
      ['2026-05-17', 11.9, 20.1, 'Clouds', 'scattered clouds', '03d'],
      ['2026-05-18', 13.3, 21.5, 'Clear', 'clear sky', '01d'],
      ['2026-05-19', 14.1, 22.0, 'Clouds', 'few clouds', '02d'],
      ['2026-05-20', 13.8, 21.2, 'Rain', 'light rain', '10d'],
    ],
  },
  LONDON: {
    current: {
      temperature: 16.8,
      feelsLike: 16.1,
      humidity: 66,
      windSpeed: 5.4,
      condition: {
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
      measuredAt: '2026-05-15T09:00:00.000Z',
    },
    forecast: [
      ['2026-05-16', 10.9, 17.3, 'Clouds', 'overcast clouds', '04d'],
      ['2026-05-17', 11.4, 18.0, 'Rain', 'light rain', '10d'],
      ['2026-05-18', 10.8, 17.8, 'Clouds', 'broken clouds', '04d'],
      ['2026-05-19', 12.2, 19.1, 'Clear', 'clear sky', '01d'],
      ['2026-05-20', 12.0, 18.7, 'Rain', 'light rain', '10d'],
    ],
  },
}

export function getMockWeatherReport(cityCode) {
  const city = getSupportedCityByCode(cityCode)
  const mockWeather = mockConditions[cityCode]

  if (!city || !mockWeather) {
    return null
  }

  return {
    city,
    current: mockWeather.current,
    forecast: mockWeather.forecast.map(
      ([date, minTemperature, maxTemperature, main, description, icon]) => ({
        date,
        minTemperature,
        maxTemperature,
        condition: {
          main,
          description,
          icon,
        },
      })
    ),
    meta: {
      source: 'mock',
      updatedAt: '2026-05-15T09:00:00.000Z',
      stale: false,
    },
  }
}
