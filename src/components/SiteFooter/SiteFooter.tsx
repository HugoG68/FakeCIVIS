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
                Suivez l'impact de vos élus en temps réel.
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
      </div>
    </footer>
  )
}

export default SiteFooter
