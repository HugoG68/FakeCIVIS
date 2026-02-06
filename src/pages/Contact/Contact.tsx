import styles from './Contact.module.css'

function Contact() {
  return (
    <section className={styles.contact}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.eyebrow}>Contact</p>
            <h1>Tell us about your city sprint.</h1>
            <p className={styles.lead}>
              Share your timeline and goals. We will follow up with a tailored
              pilot plan within 48 hours.
            </p>
            <div className={styles.details}>
              <p>hello@civis.example</p>
              <p>+33 1 84 00 00 00</p>
              <p>Paris, France</p>
            </div>
          </div>
          <form className={styles.form}>
            <label>
              Name
              <input type="text" placeholder="Your full name" />
            </label>
            <label>
              Organization
              <input type="text" placeholder="City or agency" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@agency.gov" />
            </label>
            <label>
              Message
              <textarea rows={4} placeholder="What do you need?" />
            </label>
            <button type="submit" className={styles.primary}>
              Send request
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
