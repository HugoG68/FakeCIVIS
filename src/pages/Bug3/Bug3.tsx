import { useEffect, useRef } from 'react'
import styles from './Bug3.module.css'

const deputies = [
  { name: 'Martine Etienne', slug: 'martine-etienne' },
  { name: 'Nicolas Thierry', slug: 'nicolas-thierry' },
  { name: 'Yael Braun Pivet', slug: 'yael-braun-pivet' },
  { name: 'Mathilde Panot', slug: 'mathilde-panot' },
  { name: 'Marine Le Pen', slug: 'marine-le-pen' },
  { name: 'Olivier Marleix', slug: 'olivier-marleix' },
  { name: 'Eric Ciotti', slug: 'eric-ciotti' },
  { name: 'Clementine Autain', slug: 'clementine-autain' },
  { name: 'Sandrine Rousseau', slug: 'sandrine-rousseau' },
  { name: 'Francois Ruffin', slug: 'francois-ruffin' },
  { name: 'Adrien Quatennens', slug: 'adrien-quatennens' },
  { name: 'Alexis Corbiere', slug: 'alexis-corbiere' },
  { name: 'Charles de Courson', slug: 'charles-de-courson' },
  { name: 'Boris Vallaud', slug: 'boris-vallaud' },
  { name: 'Sebastien Chenu', slug: 'sebastien-chenu' },
  { name: 'Aurelien Pradie', slug: 'aurelien-pradie' },
  { name: 'Daniele Obono', slug: 'daniele-obono' },
  { name: 'Louis Boyard', slug: 'louis-boyard' },
  { name: 'Philippe Brun', slug: 'philippe-brun' },
  { name: 'Benjamin Haddad', slug: 'benjamin-haddad' },
  { name: 'Gerald Darmanin', slug: 'gerald-darmanin' },
  { name: 'Manuel Bompard', slug: 'manuel-bompard' },
  { name: 'David Guiraud', slug: 'david-guiraud' },
  { name: 'Jean Luc Melenchon', slug: 'jean-luc-melenchon' },
  { name: 'Aurore Berge', slug: 'aurore-berge' },
  { name: 'Caroline Fiat', slug: 'caroline-fiat' },
  { name: 'Olivia Gregoire', slug: 'olivia-gregoire' },
  { name: 'Elisabeth Borne', slug: 'elisabeth-borne' },
  { name: 'Eric Coquerel', slug: 'eric-coquerel' },
  { name: 'Fabien Roussel', slug: 'fabien-roussel' },
  { name: 'Sacha Houlié', slug: 'sacha-houlie' },
  { name: 'Thomas Portes', slug: 'thomas-portes' },
  { name: 'Sebastien Delogu', slug: 'sebastien-delogu' },
  { name: 'Julien Bayou', slug: 'julien-bayou' },
  { name: 'Jerome Guedj', slug: 'jerome-guedj' },
  { name: 'Elodie Jacquier Laforge', slug: 'elodie-jacquier-laforge' },
  { name: 'Olivier Dussopt', slug: 'olivier-dussopt' },
  { name: 'Claudia Rouaux', slug: 'claudia-rouaux' },
  { name: 'Valerie Rabault', slug: 'valerie-rabault' },
  { name: 'Agnes Firmin Le Bodo', slug: 'agnes-firmin-le-bodo' },
  { name: 'Anne Genetet', slug: 'anne-genetet' },
  { name: 'Annie Vidal', slug: 'annie-vidal' },
  { name: 'Anne Laure Blin', slug: 'anne-laure-blin' },
  { name: 'Christophe Blanchet', slug: 'christophe-blanchet' },
  { name: 'Danielle Brulebois', slug: 'danielle-brulebois' },
  { name: 'Marie Christine Dalloz', slug: 'marie-christine-dalloz' },
  { name: 'Jean Rene Cazeneuve', slug: 'jean-rene-cazeneuve' },
  { name: 'Lionel Causse', slug: 'lionel-causse' },
  { name: 'Pieyre Alexandre Anglade', slug: 'pieyre-alexandre-anglade' },
  { name: 'Jean Paul Lecoq', slug: 'jean-paul-lecoq' },
  { name: 'Andre Chassaigne', slug: 'andre-chassaigne' },
  { name: 'Olivier Faure', slug: 'olivier-faure' },
  { name: 'Marie Noelle Battistel', slug: 'marie-noelle-battistel' },
  { name: 'Jean Luc Warsmann', slug: 'jean-luc-warsmann' },
  { name: 'Frederique Meunier', slug: 'frederique-meunier' },
  { name: 'Jean Louis Bricout', slug: 'jean-louis-bricout' },
  { name: 'Pascale Martin', slug: 'pascale-martin' },
  { name: 'Guillaume Gouffier Cha', slug: 'guillaume-gouffier-cha' },
  { name: 'Roland Lescure', slug: 'roland-lescure' },
  { name: 'Melanie Thomin', slug: 'melanie-thomin' },
  { name: 'Sebastien Jumel', slug: 'sebastien-jumel' },
  { name: 'Antoine Armand', slug: 'antoine-armand' },
  { name: 'Anne Cecile Violland', slug: 'anne-cecile-violland' },
  { name: 'Erwan Balanant', slug: 'erwan-balanant' },
  { name: 'Charlotte Parmentier Lecocq', slug: 'charlotte-parmentier-lecocq' },
  { name: 'Philippe Gosselin', slug: 'philippe-gosselin' },
  { name: 'Jean Christophe Lagarde', slug: 'jean-christophe-lagarde' },
  { name: 'Nicolas Dupont Aignan', slug: 'nicolas-dupont-aignan' }
]

const defaultInfos = [
  'Depute a l\'Assemblee nationale',
  'Legislature en cours'
]

function Bug3() {
  const pageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) return

    let targetScroll = window.scrollY
    let rafId = 0
    let isAnimating = false

    const animateScroll = () => {
      const current = window.scrollY
      const delta = targetScroll - current
      if (Math.abs(delta) < 0.5) {
        window.scrollTo(0, targetScroll)
        isAnimating = false
        return
      }
      const step = delta * 0.03
      const jitter = Math.sin(performance.now() / 45) * 0.7
      const rollbackBase = Math.sin(performance.now() / 120) * -2.0
      const rollbackPulse = Math.sin(performance.now() / 260) * -3.2
      const rollbackKick = Math.sin(performance.now() / 520) < -0.65 ? -6 : 0
      const rollbackDrag = Math.sin(performance.now() / 980) < -0.6 ? -12 : 0
      window.scrollTo(
        0,
        current + step + jitter + rollbackBase + rollbackPulse + rollbackKick + rollbackDrag
      )
      rafId = window.requestAnimationFrame(animateScroll)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey) return
      event.preventDefault()
      const maxScroll = Math.max(0, document.body.scrollHeight - window.innerHeight)
      targetScroll = Math.min(maxScroll, Math.max(0, targetScroll + event.deltaY * 0.22))
      if (!isAnimating) {
        isAnimating = true
        rafId = window.requestAnimationFrame(animateScroll)
      }
    }

    page.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      page.removeEventListener('wheel', onWheel)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={styles.page} ref={pageRef}>
      <header className={styles.header}>
        <h1 className={styles.title}>Deputes francais</h1>
        <p className={styles.subtitle}>
          Une selection de deputes avec leur photo, leur nom et quelques
          informations publiques. Mets a jour la liste si un profil manque.
        </p>
      </header>

      <section className={styles.grid}>
        {deputies.map((depute) => (
          <article key={depute.slug} className={styles.card}>
            <div className={styles.photoFrame}>
              <img
                className={styles.photo}
                src={`https://www.nosdeputes.fr/depute/photo/${depute.slug}/160`}
                alt={depute.name}
                loading="lazy"
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.name}>{depute.name}</h3>
              <ul className={styles.infoList}>
                {defaultInfos.map((info) => (
                  <li key={info}>{info}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Bug3
