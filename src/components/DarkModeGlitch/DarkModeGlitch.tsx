import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './DarkModeGlitch.module.css';
import WhackAKim from '../../pages/Bug5/Bug5';

export const DarkModeGlitch: React.FC = () => {
  const { isDarkMode, isGlitching } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      if (!audioRef.current) {
        audioRef.current = new Audio('/music/kim.mp3');
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isDarkMode]);

  if (!isDarkMode) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 1000, overflow: 'auto', padding: '20px' }}>
      <WhackAKim />
      {isGlitching && (
        <div className={styles.glitchOverlay} />
      )}
    </div>
  );
};
