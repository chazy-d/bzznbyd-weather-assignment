import { formatForecastRange } from '../viewModel'
import styles from '../../../../styles/Weather.module.css'

function formatForecastDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`))
}

function ForecastCard({ forecast }) {
  return (
    <li className={styles.forecastCard}>
      <span className={styles.forecastDate}>{formatForecastDate(forecast.date)}</span>
      <strong>{formatForecastRange(forecast)}</strong>
      <span>{forecast.condition.main}</span>
    </li>
  )
}

export function ForecastList({ forecast }) {
  return (
    <section className={styles.forecastSection} aria-labelledby="forecast-title">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Forecast</p>
        <h2 id="forecast-title">5-day outlook</h2>
      </div>
      <ul className={styles.forecastGrid} aria-label="5-day forecast">
        {forecast.map((item) => (
          <ForecastCard key={item.date} forecast={item} />
        ))}
      </ul>
    </section>
  )
}
