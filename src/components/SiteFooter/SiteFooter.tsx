import { NavLink } from 'react-router-dom'
import { Button, Input } from 'antd'
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons'
import styles from './SiteFooter.module.css'

function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topBar}>
          <div className={styles.brandBlock}>
            <span className={styles.brandMark}>C</span>
            <div>
              <p className={styles.brandName}>Civis</p>
              <p className={styles.tagline}>
                Civic intelligence for bold city teams.
              </p>
            </div>
          </div>
          <div className={styles.socials} aria-label="Social links">
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
              <LinkedinFilled />
            </a>
            <a href="https://www.twitter.com" aria-label="Twitter">
              <TwitterOutlined />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram">
              <InstagramOutlined />
            </a>
            <a href="https://www.facebook.com" aria-label="Facebook">
              <FacebookFilled />
            </a>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.column}>
            <p className={styles.columnTitle}>Product</p>
            <NavLink to="/" className={styles.link}>
              Platform
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Solutions
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Case studies
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Pricing
            </NavLink>
          </div>

          <div className={styles.column}>
            <p className={styles.columnTitle}>Company</p>
            <NavLink to="/about" className={styles.link}>
              About
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Careers
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Press
            </NavLink>
            <NavLink to="/contact" className={styles.link}>
              Contact
            </NavLink>
          </div>

          <div className={styles.column}>
            <p className={styles.columnTitle}>Resources</p>
            <NavLink to="/" className={styles.link}>
              Insights
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Research
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Guides
            </NavLink>
            <NavLink to="/" className={styles.link}>
              Help center
            </NavLink>
          </div>

          <div className={`${styles.column} ${styles.newsletter}`}>
            <p className={styles.columnTitle}>Stay in the loop</p>
            <p className={styles.newsletterCopy}>
              Monthly updates on policy design, civic analytics, and urban UX.
            </p>
            <div className={styles.newsletterForm}>
              <Input
                className={styles.newsletterInput}
                placeholder="Work email"
                type="email"
                aria-label="Email address"
              />
              <Button className={styles.newsletterButton} size="large">
                Get updates
              </Button>
            </div>
            <p className={styles.disclaimer}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© {new Date().getFullYear()} Civis. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <NavLink to="/" className={styles.subtleLink}>
              Privacy
            </NavLink>
            <NavLink to="/" className={styles.subtleLink}>
              Terms
            </NavLink>
            <NavLink to="/" className={styles.subtleLink}>
              Security
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
