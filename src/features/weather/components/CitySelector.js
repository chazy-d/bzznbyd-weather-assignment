import Link from 'next/link'
import styles from '../../../../styles/Home.module.css'

export function CitySelector({ cities }) {
  return (
    <nav className={styles.cityNav} aria-label="City weather pages">
      {cities.map((city) => (
        <Link key={city.code} href={`/${city.path}`}>
          <a className={styles.cityLink}>{city.name}</a>
        </Link>
      ))}
    </nav>
  )
}
