import { Outlet } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader/SiteHeader'
import SiteFooter from '../components/SiteFooter/SiteFooter'
import { DarkModeGlitch } from '../components/DarkModeGlitch/DarkModeGlitch'
import styles from './MainLayout.module.css'

function MainLayout() {
  return (
    <div className={styles.appShell}>
      <DarkModeGlitch />
      <SiteHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default MainLayout
