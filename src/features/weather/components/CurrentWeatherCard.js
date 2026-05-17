import {
  formatObservationTime,
  formatTemperature,
} from '../viewModel'
import styles from '../../../../styles/Weather.module.css'

export function CurrentWeatherCard({ report }) {
  const { current, meta } = report

  return (
    <section className={styles.currentCard} aria-labelledby="current-weather-title">
      <div className={styles.cardHeader}>
        <p className={styles.eyebrow}>Current</p>
        <p className={styles.sourceBadge}>{meta.source}</p>
      </div>

      <h2 id="current-weather-title" className={styles.temperature}>
        {formatTemperature(current.temperature)}
      </h2>

      <p className={styles.conditionText}>{current.condition.description}</p>

      <dl className={styles.metricGrid}>
        <div>
          <dt>Feels like</dt>
          <dd>{formatTemperature(current.feelsLike)}</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{current.humidity}%</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{current.windSpeed.toFixed(1)} m/s</dd>
        </div>
      </dl>

      <p className={styles.updatedAt}>{formatObservationTime(current.measuredAt)}</p>
    </section>
  )
}
