export const WEATHER_ERROR_CODES = {
  MISSING_API_KEY: 'MISSING_API_KEY',
  TIMEOUT: 'TIMEOUT',
  AUTH_FAILED: 'AUTH_FAILED',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMITED: 'RATE_LIMITED',
  UPSTREAM_ERROR: 'UPSTREAM_ERROR',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
}

export class WeatherProviderError extends Error {
  constructor(code, message, details = {}) {
    super(message)
    this.name = 'WeatherProviderError'
    this.code = code
    this.details = details
  }
}

export function isWeatherProviderError(error) {
  return error instanceof WeatherProviderError
}

export function createOpenWeatherStatusError(status, statusText, bodyText) {
  if (status === 401) {
    return new WeatherProviderError(
      WEATHER_ERROR_CODES.AUTH_FAILED,
      'OpenWeather authentication failed.',
      { status, statusText }
    )
  }

  if (status === 404) {
    return new WeatherProviderError(
      WEATHER_ERROR_CODES.NOT_FOUND,
      'OpenWeather could not find weather data for the requested city.',
      { status, statusText }
    )
  }

  if (status === 429) {
    return new WeatherProviderError(
      WEATHER_ERROR_CODES.RATE_LIMITED,
      'OpenWeather rate limit was reached.',
      { status, statusText }
    )
  }

  return new WeatherProviderError(
    WEATHER_ERROR_CODES.UPSTREAM_ERROR,
    'OpenWeather returned an unexpected error response.',
    {
      status,
      statusText,
      bodyPreview: bodyText ? bodyText.slice(0, 240) : '',
    }
  )
}
