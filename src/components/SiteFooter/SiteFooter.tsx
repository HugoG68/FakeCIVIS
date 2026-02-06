import styles from './SiteFooter.module.css'

function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div>
            <p className={styles.brand}>Civis</p>
            <p className={styles.tagline}>
              Civic intelligence for bold city teams.
            </p>
          </div>
          <div className={styles.meta}>
            <span>hello@civis.example</span>
            <span>+33 1 84 00 00 00</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
