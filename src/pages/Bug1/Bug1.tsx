import { useEffect, useRef } from 'react'
import useDinoGame from './DinoGame'
import styles from './Bug1.module.css'

function Bug1() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const {
    sceneRef,
    dinoY,
    obstacles,
    score,
    isRunning,
    hasStarted,
    jump,
    handleSceneKeyDown,
  } = useDinoGame()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }
    audio.volume = 0.35
    if (hasStarted) {
      audio.play().catch(() => undefined)
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [hasStarted])

  useEffect(() => () => audioRef.current?.pause(), [])

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.gameHud}>
          <span className={styles.status}>
            {!hasStarted
              ? 'Appuyez sur Espace pour commencer'
              : isRunning
                ? 'Appuyez sur Espace pour sauter'
                : 'Appuyez sur Espace pour rejouer'}
          </span>
          <span className={styles.score}>Score {score}</span>
        </div>
        <div
          className={styles.dinoScene}
          ref={sceneRef}
          onClick={jump}
          role="button"
          tabIndex={0}
          onKeyDown={handleSceneKeyDown}
          aria-label="Jeu du dinosaure"
        >
          <audio
            ref={audioRef}
            src="/music/Barcelonnette%20-%20F%C3%AAtes%20Latino%20Mexicaines%202019.mp4"
            loop
            preload="auto"
          />
          <div
            className={styles.dino}
            style={{
              transform: `translate(-50%, -${dinoY}px)`,
              backgroundImage: "url('/images/trump.png?v=2')",
            }}
            aria-hidden="true"
          />
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className={
                obstacle.kind === 'mexique'
                  ? `${styles.obstacle} ${styles.obstacleAlt}`
                  : styles.obstacle
              }
              style={{
                width: `${obstacle.width}px`,
                height: `${obstacle.height}px`,
                transform: `translateX(${obstacle.x}px)`,
              }}
              aria-hidden="true"
            />
          ))}
          <div className={styles.ground} aria-hidden="true" />
        </div>
        <h1 className={styles.title}>Aucun accès à internet</h1>
        <p className={styles.subtitle}>Voici quelques conseils :</p>
        <ul className={styles.list}>
          <li>Éteignez votre ordinateur</li>
          <li>Vérifier qu'il n'y a pas d'intrus sur votre réseau</li>
        </ul>
        <p className={styles.errorCode}>ERR_INTERNET_DISCONNECTED</p>
      </div>
    </div>
  )
}

export default Bug1
