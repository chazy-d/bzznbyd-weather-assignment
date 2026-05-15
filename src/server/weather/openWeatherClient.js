import {
  createOpenWeatherStatusError,
  WeatherProviderError,
  WEATHER_ERROR_CODES,
} from './weatherErrors'

const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'
const DEFAULT_UNITS = 'metric'
const DEFAULT_LANG = 'en'
const DEFAULT_TIMEOUT_MS = 8000

function getOpenWeatherApiKey() {
  const apiKey = process.env.OPENWEATHER_API_KEY?.trim()

  if (!apiKey) {
    throw new WeatherProviderError(
      WEATHER_ERROR_CODES.MISSING_API_KEY,
      'OPENWEATHER_API_KEY is required to request weather data.'
    )
  }

  return apiKey
}

export function buildOpenWeatherUrl(endpoint, city, options = {}) {
  const apiKey = options.apiKey || getOpenWeatherApiKey()
  const url = new URL(`${OPEN_WEATHER_BASE_URL}/${endpoint}`)

  url.searchParams.set('lat', String(city.latitude))
  url.searchParams.set('lon', String(city.longitude))
  url.searchParams.set('appid', apiKey)
  url.searchParams.set('units', options.units || DEFAULT_UNITS)
  url.searchParams.set('lang', options.lang || DEFAULT_LANG)

  return url
}

async function readBodyText(response) {
  try {
    return await response.text()
  } catch {
    return ''
  }
}

async function requestOpenWeatherJson(endpoint, city, options = {}) {
  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  const fetchImpl = options.fetchImpl || fetch

  try {
    const url = buildOpenWeatherUrl(endpoint, city, options)
    const response = await fetchImpl(url, { signal: controller.signal })

    if (!response.ok) {
      const bodyText = await readBodyText(response)
      throw createOpenWeatherStatusError(response.status, response.statusText, bodyText)
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new WeatherProviderError(
        WEATHER_ERROR_CODES.TIMEOUT,
        'OpenWeather request timed out.',
        { timeoutMs }
      )
    }

    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export function fetchCurrentWeather(city, options = {}) {
  return requestOpenWeatherJson('weather', city, options)
}

export function fetchForecastWeather(city, options = {}) {
  return requestOpenWeatherJson('forecast', city, options)
}
