import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Statistic, Row, Col, Alert } from 'antd';
import { FireFilled, ClockCircleFilled, TrophyFilled } from '@ant-design/icons';
import styles from './Bug5.module.css';

const KIM_IMG_URL = "/images/kim.png";
type HoleStatus = 'empty' | 'up' | 'whacked';

const GAME_DURATION = 30;
const POP_UP_SPEED = 800;
const STAY_UP_DURATION = 700;

const WhackAKim: React.FC = () => {
  const [grid, setGrid] = useState<HoleStatus[]>(new Array(9).fill('empty'));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const timerIntervalRef = useRef<number | null>(null);
  const moleIntervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGrid(new Array(9).fill('empty'));
    
    clearIntervals();
    
    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    moleIntervalRef.current = window.setInterval(() => {
      popUpKim();
    }, POP_UP_SPEED);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    clearIntervals();
    setGrid(new Array(9).fill('empty'));
  };

  const clearIntervals = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (moleIntervalRef.current) clearInterval(moleIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    return () => clearIntervals();
  }, []);

  const popUpKim = () => {
    const randomIndex = Math.floor(Math.random() * 9);
    
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      if (newGrid[randomIndex] === 'empty') {
        newGrid[randomIndex] = 'up';
      }
      return newGrid;
    });

    timeoutRef.current = window.setTimeout(() => {
       setGrid((prevGrid) => {
         const newGrid = [...prevGrid];
         if (newGrid[randomIndex] === 'up') {
           newGrid[randomIndex] = 'empty';
         }
         return newGrid;
       });
    }, STAY_UP_DURATION);
  };

  const handleWhack = (index: number) => {
    if (!isPlaying) return;

    if (grid[index] === 'up') {
      setScore((prev) => prev + 1);
      
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[index] = 'whacked';
        return newGrid;
      });

      setTimeout(() => {
          setGrid((prevGrid) => {
              const newGrid = [...prevGrid];
              if (newGrid[index] === 'whacked') {
                  newGrid[index] = 'empty';
              }
              return newGrid;
          });
      }, 200);
    }
  };

  const getKimClass = (status: HoleStatus) => {
      switch(status) {
          case 'up': return styles.kimUp;
          case 'whacked': return styles.kimWhacked;
          default: return styles.kimDown;
      }
  }

  return (
    <div className={styles.gameContainer}>
      <Card 
        title={<><FireFilled style={{color:'#f5222d'}} /> Whack-a-Kim!</>}
        bordered={false} 
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '16px', background: 'rgba(255,255,255,0.9)' }}
      >
        
        <div className={styles.headerInfo}>
          <Statistic title="Score" value={score} prefix={<TrophyFilled style={{color: '#faad14'}} />} />
          <Statistic title="Temps" value={timeLeft} suffix="s" prefix={<ClockCircleFilled />} valueStyle={{ color: timeLeft < 10 ? '#cf1322' : 'inherit' }} />
        </div>

        {gameOver && (
             <Alert
             message={`Partie terminée ! Score final : ${score}`}
             description="Kim est rapide, mais vous l'êtes aussi."
             type="success"
             showIcon
             style={{ marginBottom: '1rem' }}
           />
        )}

        {!isPlaying && (
            <Button type="primary" size="large" onClick={startGame} shape="round" style={{ marginBottom: '1rem', height: '50px', fontSize: '1.2rem' }}>
                {gameOver ? 'Rejouer' : 'Commencer la partie'}
            </Button>
        )}

        <div className={styles.grid}>
          {grid.map((holeStatus, index) => (
            <div 
                key={index} 
                className={styles.holeContainer} 
                onClick={() => handleWhack(index)}
                onDragStart={(e) => e.preventDefault()}
            >
              <img 
                src={KIM_IMG_URL} 
                alt="Kim" 
                className={`${styles.kimImage} ${getKimClass(holeStatus)}`}
              />
            </div>
          ))}
        </div>

      </Card>
    </div>
  );
};

export default WhackAKim;