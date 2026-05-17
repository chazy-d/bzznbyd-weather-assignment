const timeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
})

export function formatTemperature(value) {
  return `${Math.round(value)}°C`
}

export function formatForecastRange(forecast) {
  return `${Math.round(forecast.minTemperature)}° / ${Math.round(
    forecast.maxTemperature
  )}°C`
}

export function formatObservationTime(value) {
  return `Updated ${timeFormatter.format(new Date(value))} UTC`
}

export function getWeatherStatus({ loading, error, data }) {
  if (loading) {
    return {
      tone: 'loading',
      title: 'Loading weather data',
      message: 'Requesting the latest forecast from the GraphQL API.',
    }
  }

  if (error) {
    return {
      tone: 'error',
      title: 'Weather data is unavailable',
      message: error.message,
    }
  }

  if (!data?.weather) {
    return {
      tone: 'empty',
      title: 'No weather report',
      message: 'The selected city did not return a weather report.',
    }
  }

  if (data.weather.meta.stale) {
    return {
      tone: 'stale',
      title: 'Showing recently cached weather',
      message: 'The latest provider request failed, so this report may be stale.',
    }
  }

  return null
}
