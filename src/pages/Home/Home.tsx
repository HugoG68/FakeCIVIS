import styles from './Home.module.css'

function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Public service, private speed</p>
              <h1 className={styles.title}>
                Build cities that move faster than tomorrow.
              </h1>
              <p className={styles.subtitle}>
                Civis turns civic data into clear decisions: zoning clarity,
                transport rhythms, and budget-ready insight without the noise.
              </p>
              <div className={styles.heroActions}>
                <button className={styles.primary}>Book a demo</button>
                <button className={styles.secondary}>View the playbook</button>
              </div>
              <div className={styles.stats}>
                <div>
                  <p className={styles.statValue}>42%</p>
                  <p className={styles.statLabel}>Faster project cycles</p>
                </div>
                <div>
                  <p className={styles.statValue}>3 weeks</p>
                  <p className={styles.statLabel}>Average launch window</p>
                </div>
                <div>
                  <p className={styles.statValue}>18</p>
                  <p className={styles.statLabel}>City pilots live</p>
                </div>
              </div>
            </div>
            <div className={styles.heroCard}>
              <div className={styles.cardHeader}>Realtime civic pulse</div>
              <div className={styles.cardBody}>
                <div className={styles.pulseRow}>
                  <span>Mobility</span>
                  <span className={styles.pulseValue}>+12%</span>
                </div>
                <div className={styles.pulseRow}>
                  <span>Permits</span>
                  <span className={styles.pulseValue}>-8%</span>
                </div>
                <div className={styles.pulseRow}>
                  <span>Community</span>
                  <span className={styles.pulseValue}>+31%</span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                Updated 10 minutes ago
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>From signal to street-ready</h2>
            <p>
              Blend policy context, citizen sentiment, and infrastructure
              readiness into a single operating picture.
            </p>
          </div>
          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <h3>Policy radar</h3>
              <p>Map every regulation to its real-world impact.</p>
            </article>
            <article className={styles.featureCard}>
              <h3>Capital planning</h3>
              <p>Know which projects unlock the biggest leverage.</p>
            </article>
            <article className={styles.featureCard}>
              <h3>Stakeholder sync</h3>
              <p>Bring agencies and residents into the same view.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready for your next city sprint?</h2>
            <p>
              We help teams prototype, validate, and launch with confidence.
            </p>
          </div>
          <button className={styles.primary}>Start a pilot</button>
        </div>
      </section>
    </div>
  )
}

export default Home
