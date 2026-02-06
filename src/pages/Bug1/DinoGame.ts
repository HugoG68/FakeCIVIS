import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'

type Obstacle = {
  id: number
  x: number
  width: number
  height: number
  kind: 'barbele' | 'mexique'
}

const GRAVITY = 2200
const JUMP_VELOCITY = 840

const useDinoGame = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const velocityRef = useRef(0)
  const dinoYRef = useRef(0)
  const obstaclesRef = useRef<Obstacle[]>([])
  const spawnRef = useRef(0.9)
  const idRef = useRef(1)
  const isRunningRef = useRef(false)
  const hasStartedRef = useRef(false)
  const scoreRef = useRef(0)

  const [dinoY, setDinoY] = useState(0)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [score, setScore] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const resetGame = () => {
    dinoYRef.current = 0
    velocityRef.current = 0
    obstaclesRef.current = []
    spawnRef.current = 0.8
    scoreRef.current = 0
    isRunningRef.current = true
    hasStartedRef.current = true
    setDinoY(0)
    setObstacles([])
    setScore(0)
    setIsRunning(true)
    setHasStarted(true)
  }

  const jump = () => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true
      setHasStarted(true)
      isRunningRef.current = true
      setIsRunning(true)
      velocityRef.current = JUMP_VELOCITY
      return
    }
    if (!isRunningRef.current) {
      resetGame()
      velocityRef.current = JUMP_VELOCITY
      return
    }
    if (dinoYRef.current <= 1) {
      velocityRef.current = JUMP_VELOCITY
    }
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault()
        jump()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const step = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time
      }
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.033)
      lastTimeRef.current = time

      if (isRunningRef.current && hasStartedRef.current) {
        const sceneWidth = sceneRef.current?.offsetWidth ?? 360
        const speed = 240 + scoreRef.current * 2

        velocityRef.current -= GRAVITY * delta
        dinoYRef.current += velocityRef.current * delta
        if (dinoYRef.current < 0) {
          dinoYRef.current = 0
          velocityRef.current = 0
        }

        const rawDifficulty = Math.min(scoreRef.current / 300, 1)
        const difficulty = rawDifficulty * rawDifficulty
        spawnRef.current -= delta
        if (spawnRef.current <= 0) {
          const kind = Math.random() < 0.6 ? 'barbele' : 'mexique'
          const width = kind === 'mexique' ? 120 : 92
          const height = kind === 'mexique' ? 68 : 52
          obstaclesRef.current = [
            ...obstaclesRef.current,
            { id: idRef.current++, x: sceneWidth + 20, width, height, kind },
          ]
          const minGap = 0.55
          const maxGap = 1.25
          const baseGap = maxGap - (maxGap - minGap) * difficulty
          spawnRef.current = baseGap + Math.random() * 0.25
        }

        obstaclesRef.current = obstaclesRef.current
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - speed * delta,
          }))
          .filter((obstacle) => obstacle.x + obstacle.width > 80)

        const dinoWidth = 40
        const dinoHeight = 42
        const dinoLeftPercent = 0.22
        const dinoX = sceneWidth * dinoLeftPercent - dinoWidth / 2

        const hit = obstaclesRef.current.some((obstacle) => {
          const hitWidth = obstacle.kind === 'mexique' ? obstacle.width * 0.6 : obstacle.width
          const hitHeight =
            obstacle.kind === 'mexique' ? obstacle.height * 0.6 : obstacle.height
          const hitX = obstacle.x + (obstacle.width - hitWidth) / 2
          const overlapX = dinoX < hitX + hitWidth && dinoX + dinoWidth > hitX
          const overlapY = dinoYRef.current < hitHeight
          return overlapX && overlapY
        })

        if (hit) {
          isRunningRef.current = false
          setIsRunning(false)
        } else {
          scoreRef.current += delta * 10
          setScore(Math.floor(scoreRef.current))
        }

        setDinoY(dinoYRef.current)
        setObstacles(obstaclesRef.current)
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const handleSceneKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' || event.key === 'ArrowUp') {
      event.preventDefault()
      jump()
    }
  }

  return {
    sceneRef,
    dinoY,
    obstacles,
    score,
    isRunning,
    hasStarted,
    jump,
    handleSceneKeyDown,
  }
}

export type { Obstacle }
export default useDinoGame
