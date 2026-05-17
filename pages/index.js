import Head from 'next/head'
import { CITY_ROUTES } from '../src/shared/cityRoutes'
import { CitySelector } from '../src/features/weather/components/CitySelector'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Weather Assignment</title>
        <meta
          name="description"
          content="Bzznbyd frontend assignment weather dashboard"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.shell}>
        <section className={styles.hero} aria-labelledby="home-title">
          <p className={styles.eyebrow}>Bzznbyd FE Assignment</p>
          <h1 id="home-title" className={styles.title}>
            Weather Dashboard
          </h1>
          <p className={styles.description}>
            Select a city to view current weather and a 5-day forecast powered
            by the local GraphQL API and OpenWeather.
          </p>
        </section>

        <CitySelector cities={CITY_ROUTES} />
      </main>
    </div>
  )
}
