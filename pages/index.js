import Head from 'next/head'
import Link from 'next/link'
import { CITY_ROUTES } from '../src/shared/cityRoutes'
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
            Select a city to open the weather detail route. GraphQL, Apollo,
            and OpenWeather integration will be added in the next commits.
          </p>
        </section>

        <nav className={styles.cityNav} aria-label="City weather pages">
          {CITY_ROUTES.map((city) => (
            <Link key={city.code} href={`/${city.path}`}>
              <a className={styles.cityLink}>{city.name}</a>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  )
}
