import Head from 'next/head'
import Image from 'next/image'
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
        <header className={styles.hero}>
          <Link href="/">
            <a className={styles.logoLink} aria-label="Back to city selection">
              <Image
                src="/assets/earth.png"
                alt=""
                width={68}
                height={51}
                priority
              />
            </a>
          </Link>
          <h1 id="city-title" className={styles.title}>
            Weather Information for {city.name}
          </h1>
        </header>

        {children}
      </main>
    </div>
  )
}
