import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import { ArrowRightOutlined, MenuOutlined } from '@ant-design/icons'
import styles from './SiteHeader.module.css'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand} aria-label="Civis home">
          <span className={styles.brandMark}>C</span>
          <span className={styles.brandName}>Civis</span>
        </NavLink>
        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions}>
          <Button
            className={styles.ctaButton}
            size="large"
            onClick={() => navigate('/contact')}
          >
            Request access
            <ArrowRightOutlined />
          </Button>
          <Button
            className={styles.menuButton}
            type="text"
            icon={<MenuOutlined />}
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>
      <Drawer
        placement="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        rootClassName={styles.drawer}
        closeIcon={null}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menu</span>
          <Button
            type="text"
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            Close
          </Button>
        </div>
        <nav className={styles.drawerNav} aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? `${styles.drawerLink} ${styles.drawerActive}` : styles.drawerLink
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.drawerCta}>
          <Button
            className={styles.drawerButton}
            size="large"
            onClick={() => {
              setMenuOpen(false)
              navigate('/contact')
            }}
          >
            Request access
            <ArrowRightOutlined />
          </Button>
          <p className={styles.drawerHint}>
            Trusted by teams crafting modern, human-centric cities.
          </p>
        </div>
      </Drawer>
      <div className={styles.glow} aria-hidden="true" />
    </header>
  )
}

export default SiteHeader
