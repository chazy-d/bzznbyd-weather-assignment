import Head from 'next/head'
import Image from 'next/image'
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
          <h1 id="home-title" className={styles.title}>
            <span>Welcome to</span>
            <strong>Weather App!</strong>
          </h1>
          <p className={styles.description}>
            Choose a city from the list below to check the weather.
          </p>
          <CitySelector cities={CITY_ROUTES} />
        </section>

        <div className={styles.earthWrap} aria-hidden="true">
          <Image
            src="/assets/earth.png"
            alt=""
            width={430}
            height={321}
            priority
          />
        </div>
      </main>
    </div>
  )
}
