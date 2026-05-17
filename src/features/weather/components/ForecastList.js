import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  formatForecastSlotRange,
  formatForecastTime,
  formatForecastRange,
  formatWeatherDate,
  getOpenWeatherIconUrl,
} from '../viewModel'
import styles from '../../../../styles/Weather.module.css'

function ForecastIcon({ icon }) {
  const iconUrl = getOpenWeatherIconUrl(icon)

  return (
    <span className={styles.forecastIcon} aria-hidden="true">
      {iconUrl && (
        <Image
          src={iconUrl}
          alt=""
          width={48}
          height={48}
          unoptimized
        />
      )}
    </span>
  )
}

function ForecastRow({ forecast, expanded, onToggle }) {
  const entries = forecast.items?.length ? forecast.items : []

  return (
    <li className={styles.forecastItem}>
      <button
        className={styles.forecastButton}
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <span>{formatWeatherDate(forecast.date)}</span>
        <span className={expanded ? styles.chevronOpen : styles.chevron} />
      </button>

      {expanded && (
        <div className={styles.forecastDetail}>
          {entries.map((entry) => (
            <div key={entry.measuredAt} className={styles.forecastSlot}>
              <ForecastIcon icon={entry.condition.icon} />
              <strong className={styles.forecastTime}>
                {formatForecastTime(entry.measuredAt)}
              </strong>
              <div className={styles.forecastSummary}>
                <p>{entry.condition.description}</p>
                <strong>{formatForecastSlotRange(entry)}</strong>
              </div>
            </div>
          ))}

          {!entries.length && (
            <div className={styles.forecastSlot}>
              <ForecastIcon icon={forecast.condition.icon} />
              <strong className={styles.forecastTime}>
                {formatWeatherDate(forecast.date)}
              </strong>
              <div className={styles.forecastSummary}>
                <p>{forecast.condition.description}</p>
                <strong>{formatForecastRange(forecast)}</strong>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

export function ForecastList({ forecast }) {
  const [expandedDate, setExpandedDate] = useState(forecast[0]?.date || null)

  useEffect(() => {
    setExpandedDate((current) => {
      const currentDateStillExists = forecast.some((item) => item.date === current)

      return currentDateStillExists ? current : forecast[0]?.date || null
    })
  }, [forecast])

  return (
    <section className={styles.forecastSection} aria-labelledby="forecast-title">
      <h2 id="forecast-title">5-day Forecast</h2>
      <ul className={styles.forecastList} aria-label="5-day forecast">
        {forecast.map((item) => (
          <ForecastRow
            key={item.date}
            forecast={item}
            expanded={expandedDate === item.date}
            onToggle={() =>
              setExpandedDate((current) =>
                current === item.date ? null : item.date
              )
            }
          />
        ))}
      </ul>
    </section>
  )
}
