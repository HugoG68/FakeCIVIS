import { NavLink } from 'react-router-dom'
import styles from './SiteHeader.module.css'

function SiteHeader() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>C</span>
          <span className={styles.brandName}>Civis</span>
        </div>
        <nav className={styles.nav}>
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>
        <NavLink to="/contact" className={styles.cta}>
          Request access
        </NavLink>
      </div>
    </header>
  )
}

export default SiteHeader
