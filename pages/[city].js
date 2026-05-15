import Head from 'next/head'
import Link from 'next/link'
import { CITY_ROUTES, getCityByPath } from '../src/shared/cityRoutes'
import styles from '../styles/Home.module.css'

export default function CityWeatherPage({ city }) {
  return (
    <div className={styles.page}>
      <Head>
        <title>{`${city} Weather`}</title>
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
            {city}
          </h1>
          <p className={styles.description}>
            This route is ready for the GraphQL weather query. Current weather
            and 5-day forecast cards will be connected after the API contract is
            defined.
          </p>
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
      city: city.name,
    },
  }
}
