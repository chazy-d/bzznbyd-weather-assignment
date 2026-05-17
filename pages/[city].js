import { useQuery } from '@apollo/client/react'
import { CITY_ROUTES, getCityByPath } from '../src/shared/cityRoutes'
import { CurrentWeatherCard } from '../src/features/weather/components/CurrentWeatherCard'
import { ForecastList } from '../src/features/weather/components/ForecastList'
import { WeatherLayout } from '../src/features/weather/components/WeatherLayout'
import { WeatherStatus } from '../src/features/weather/components/WeatherStatus'
import {
  getWeatherQueryVariables,
  WEATHER_QUERY,
} from '../src/features/weather/graphql/queries'
import { getWeatherStatus } from '../src/features/weather/viewModel'
import styles from '../styles/Weather.module.css'

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
