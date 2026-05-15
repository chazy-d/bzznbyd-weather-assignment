function mapCondition(weatherItem) {
  const condition = weatherItem.weather?.[0]

  return {
    main: condition?.main || 'Unknown',
    description: condition?.description || 'No description',
    icon: condition?.icon || '',
  }
}

function getForecastDate(forecastItem) {
  return forecastItem.dt_txt.split(' ')[0]
}

function getForecastHour(forecastItem) {
  return Number(forecastItem.dt_txt.split(' ')[1]?.slice(0, 2))
}

function getMinTemperature(forecastItem) {
  return forecastItem.main?.temp_min ?? forecastItem.main?.temp
}

function getMaxTemperature(forecastItem) {
  return forecastItem.main?.temp_max ?? forecastItem.main?.temp
}

export function selectRepresentativeForecast(forecastItems) {
  if (!forecastItems.length) {
    return null
  }

  const middayForecast = forecastItems.find((item) => getForecastHour(item) === 12)
  const selectedForecast = middayForecast || forecastItems[Math.floor(forecastItems.length / 2)]

  return {
    condition: mapCondition(selectedForecast),
  }
}

function groupForecastByDate(forecastItems) {
  return forecastItems.reduce((groups, item) => {
    const date = getForecastDate(item)

    if (!groups[date]) {
      groups[date] = []
    }

    groups[date].push(item)
    return groups
  }, {})
}

function mapDailyForecast(date, forecastItems) {
  const minTemperature = Math.min(...forecastItems.map(getMinTemperature))
  const maxTemperature = Math.max(...forecastItems.map(getMaxTemperature))
  const representative = selectRepresentativeForecast(forecastItems)

  return {
    date,
    minTemperature,
    maxTemperature,
    condition: representative.condition,
  }
}

function mapCurrentWeather(currentWeather) {
  return {
    temperature: currentWeather.main.temp,
    feelsLike: currentWeather.main.feels_like,
    humidity: currentWeather.main.humidity,
    windSpeed: currentWeather.wind?.speed ?? 0,
    condition: mapCondition(currentWeather),
    measuredAt: new Date(currentWeather.dt * 1000).toISOString(),
  }
}

export function mapOpenWeatherReport({
  city,
  currentWeather,
  forecastWeather,
  source = 'openweather',
  updatedAt = new Date().toISOString(),
  stale = false,
}) {
  const forecastGroups = groupForecastByDate(forecastWeather.list || [])

  return {
    city,
    current: mapCurrentWeather(currentWeather),
    forecast: Object.entries(forecastGroups)
      .slice(0, 5)
      .map(([date, forecastItems]) => mapDailyForecast(date, forecastItems)),
    meta: {
      source,
      updatedAt,
      stale,
    },
  }
}
