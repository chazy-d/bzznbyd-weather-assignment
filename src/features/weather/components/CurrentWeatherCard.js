import Image from 'next/image'
import {
  formatObservationTime,
  formatWeatherDetail,
  formatTemperature,
  getOpenWeatherIconUrl,
} from '../viewModel'
import styles from '../../../../styles/Weather.module.css'

export function CurrentWeatherCard({ report }) {
  const { current, meta } = report
  const iconUrl = getOpenWeatherIconUrl(current.condition.icon)

  return (
    <section className={styles.currentCard} aria-labelledby="current-weather-title">
      <div className={styles.weatherIconBadge} aria-hidden="true">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt=""
            width={72}
            height={72}
            unoptimized
          />
        )}
      </div>

      <div className={styles.currentMeta}>
        <p className={styles.observedAt}>{formatObservationTime(current.measuredAt)}</p>
        <h2 id="current-weather-title">
          {report.city.name}, {report.city.country}
        </h2>
        <p className={styles.sourceBadge}>Source: {meta.source}</p>
      </div>

      <div className={styles.currentMeasure}>
        <p className={styles.temperature}>{formatTemperature(current.temperature)}</p>
        <p className={styles.conditionText}>{formatWeatherDetail(current)}</p>
      </div>
    </section>
  )
}
