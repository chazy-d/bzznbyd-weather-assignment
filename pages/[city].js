import { useQuery } from '@apollo/client/react'
import dynamic from 'next/dynamic'
import { CITY_ROUTES, getCityByPath } from '../src/shared/cityRoutes'
import { CurrentWeatherCard } from '../src/features/weather/components/CurrentWeatherCard'
import { WeatherLayout } from '../src/features/weather/components/WeatherLayout'
import { WeatherStatus } from '../src/features/weather/components/WeatherStatus'
import {
  getWeatherQueryVariables,
  WEATHER_QUERY,
} from '../src/features/weather/graphql/queries'
import { getWeatherStatus } from '../src/features/weather/viewModel'
import styles from '../styles/Weather.module.css'

function ForecastLoading() {
  return (
    <section className={styles.forecastSection} aria-labelledby="forecast-title">
      <h2 id="forecast-title">5-day Forecast</h2>
      <p className={styles.forecastLoading}>Loading forecast panel...</p>
    </section>
  )
}

const ForecastList = dynamic(
  () =>
    import('../src/features/weather/components/ForecastList').then(
      (mod) => mod.ForecastList
    ),
  {
    loading: ForecastLoading,
  }
)

export default function CityWeatherPage({ city }) {
  const { data, error, loading } = useQuery(WEATHER_QUERY, {
    variables: getWeatherQueryVariables(city),
  })
  const report = data?.weather
  const status = getWeatherStatus({ loading, error, data })

  return (
    <WeatherLayout city={city}>
      <WeatherStatus status={status} />

      {report && (
        <div className={styles.dashboardGrid}>
          <CurrentWeatherCard report={report} />
          <ForecastList forecast={report.forecast} />
        </div>
      )}
    </WeatherLayout>
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
