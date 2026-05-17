import styles from '../../../../styles/Weather.module.css'

export function WeatherStatus({ status }) {
  if (!status) {
    return null
  }

  return (
    <section
      className={`${styles.statusPanel} ${styles[status.tone]}`}
      aria-live="polite"
    >
      <p className={styles.statusTitle}>{status.title}</p>
      <p className={styles.statusMessage}>{status.message}</p>
    </section>
  )
}
