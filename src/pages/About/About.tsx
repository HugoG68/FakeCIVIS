import styles from './About.module.css'

function About() {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.eyebrow}>About Civis</p>
            <h1>We build the civic operating system.</h1>
            <p className={styles.lead}>
              Cities are complex. Our job is to translate complexity into
              momentum, so teams can focus on delivery, not dashboards.
            </p>
          </div>
          <div className={styles.panel}>
            <h2>What we value</h2>
            <ul>
              <li>Clarity before consensus.</li>
              <li>Evidence over noise.</li>
              <li>Outcomes that citizens can feel.</li>
            </ul>
          </div>
        </div>
        <div className={styles.metrics}>
          <div>
            <p className={styles.metricValue}>12k</p>
            <p className={styles.metricLabel}>Policy signals connected</p>
          </div>
          <div>
            <p className={styles.metricValue}>95%</p>
            <p className={styles.metricLabel}>Stakeholder alignment</p>
          </div>
          <div>
            <p className={styles.metricValue}>24/7</p>
            <p className={styles.metricLabel}>Operations visibility</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
