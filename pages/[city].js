import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from '@apollo/client/react'
import { CITY_ROUTES, getCityByPath } from '../src/shared/cityRoutes'
import {
  getWeatherQueryVariables,
  WEATHER_QUERY,
} from '../src/features/weather/graphql/queries'
import styles from '../styles/Home.module.css'

export default function CityWeatherPage({ city }) {
  const { data, error, loading } = useQuery(WEATHER_QUERY, {
    variables: getWeatherQueryVariables(city),
  })
  const report = data?.weather

  return (
    <div className={styles.page}>
      <Head>
        <title>{`${city.name} Weather`}</title>
        <meta
          name="description"
          content="Selected city weather detail route"
        />
      </Head>

      <main className={styles.shell}>
        <Link href="/">
          <a className={styles.backLink}>Back to cities</a>
        </Link>

        <section className={styles.hero} aria-labelledby="city-title">
          <p className={styles.eyebrow}>Weather Detail</p>
          <h1 id="city-title" className={styles.title}>
            {city.name}
          </h1>
          <p className={styles.description}>
            Current weather and 5-day forecast are loaded through the local
            GraphQL endpoint.
          </p>
        </section>

        <section className={styles.weatherPanel} aria-live="polite">
          {loading && <p className={styles.statusText}>Loading weather data...</p>}

          {error && (
            <p className={styles.errorText}>
              Failed to load weather data. {error.message}
            </p>
          )}

          {report && (
            <div className={styles.weatherSummary}>
              <p className={styles.eyebrow}>Current</p>
              <p className={styles.temperature}>
                {Math.round(report.current.temperature)}°C
              </p>
              <p className={styles.description}>
                {report.current.condition.description} · Humidity{' '}
                {report.current.humidity}%
              </p>
              <p className={styles.metaText}>
                Source: {report.meta.source}
                {report.meta.stale ? ' · stale' : ''}
              </p>
              <ul className={styles.forecastPreview} aria-label="5-day forecast">
                {report.forecast.map((forecast) => (
                  <li key={forecast.date}>
                    <strong>{forecast.date}</strong>
                    <span>
                      {Math.round(forecast.minTemperature)}° /{' '}
                      {Math.round(forecast.maxTemperature)}°C
                    </span>
                    <span>{forecast.condition.main}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export function getStaticPaths() {
  return {
    paths: CITY_ROUTES.map((city) => ({ params: { city: city.path } })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const city = getCityByPath(params.city)

  return {
    props: {
      city,
    },
  }
}
