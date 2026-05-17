import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../../styles/Weather.module.css'

export function WeatherLayout({ city, children }) {
  return (
    <div className={styles.page}>
      <Head>
        <title>{`${city.name} Weather`}</title>
        <meta
          name="description"
          content={`${city.name} weather dashboard powered by GraphQL and OpenWeather`}
        />
      </Head>

      <main className={styles.shell}>
        <Link href="/">
          <a className={styles.backLink}>Back to cities</a>
        </Link>

        <section className={styles.hero} aria-labelledby="city-title">
          <p className={styles.eyebrow}>Weather Detail</p>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="city-title" className={styles.title}>
                {city.name}
              </h1>
              <p className={styles.description}>
                GraphQL response rendered from the local API route, with server-side
                OpenWeather integration behind the resolver.
              </p>
            </div>
            <dl className={styles.cityMeta}>
              <div>
                <dt>Country</dt>
                <dd>{city.country}</dd>
              </div>
              <div>
                <dt>Route</dt>
                <dd>/{city.path}</dd>
              </div>
            </dl>
          </div>
        </section>

        {children}
      </main>
    </div>
  )
}
