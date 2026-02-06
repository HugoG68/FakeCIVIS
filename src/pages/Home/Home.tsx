import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './Home.module.css';

const recentVotes = [
  { id: 1, day: '06', month: 'FEB', title: "Loi sur la transition énergétique", status: 'Adopté', chambre: 'Assemblée' },
  { id: 2, day: '05', month: 'FEB', title: "Amendement budget sécurité sociale", status: 'Rejeté', chambre: 'Sénat' },
  { id: 3, day: '03', month: 'FEB', title: "Protection des données numériques", status: 'Adopté', chambre: 'Assemblée' },
];

const BOYARD_IMG = "https://www.nosdeputes.fr/depute/photo/louis-boyard/150";
const ATTAL_IMG = "https://www.nosdeputes.fr/depute/photo/gabriel-attal/150";

const Home: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDropping, setIsDropping] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('civis_visited');
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const timeline = [
      { time: 0, pct: 0, drop: false },
      { time: 800, pct: 20, drop: false },
      { time: 1500, pct: 45, drop: false },
      { time: 2200, pct: 70, drop: false },
      { time: 2800, pct: 85, drop: false },
      { time: 3500, pct: 99, drop: false },
      { time: 4500, pct: 12, drop: true },
      { time: 5000, pct: 15, drop: true },
      { time: 5500, pct: 15, drop: true },
      { time: 6000, pct: 42, drop: true },
      { time: 6200, pct: 38, drop: true },
      { time: 7000, pct: 60, drop: true },
      { time: 7500, pct: 55, drop: true },
      { time: 8500, pct: 90, drop: false },
      { time: 9500, pct: 99, drop: false },
      { time: 10500, pct: 100, drop: false },
    ];

    timeline.forEach(step => {
      setTimeout(() => {
        setProgress(step.pct);
        setIsDropping(step.drop);
      }, step.time);
    });

    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('civis_visited', 'true');
    }, 11000);

  }, []);

  return (
    <main style={{ minHeight: '80vh' }}>

      {isLoading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loaderContent}>
            <div className={`${styles.loaderSpinner} ${isDropping ? styles.spinnerRed : ''}`} />

            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBarFill} ${isDropping ? styles.barRed : ''}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className={`${styles.percentDisplay} ${isDropping ? styles.textRed : ''}`}>
              {progress}%
            </div>
          </div>
        </div>
      )}

      <section className={styles.heroSection}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Suivez l'impact de <br />
            <span className={styles.gradientText}>vos élus</span> en temps réel.
          </h1>
          <p className={styles.heroSubtitle}>
            Civis centralise les données parlementaires pour une démocratie plus transparente. 
            Accédez aux votes, analysez les tendances et donnez votre avis.
          </p>

          <div className={styles.searchContainer}>
            <SearchOutlined style={{ fontSize: '1.2rem', color: 'var(--ink-muted)', marginLeft: '1rem' }} />
            <Input 
              placeholder="Rechercher un député, une loi, un thème..." 
              className={styles.customInput}
            />
            <Button type="primary" className={styles.searchButton}>
              Explorer
            </Button>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.mainGrid}>
          
          {/* COLONNE GAUCHE (Scrutins) */}
          <div className={styles.card}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Derniers Scrutins</h2>
              <Button type="text" className="subtleLink">Voir tout l'historique <ArrowRightOutlined /></Button>
            </div>

            <div className={styles.listContainer}>
              {recentVotes.map(vote => (
                <div key={vote.id} className={styles.listItem}>
                  <div className={styles.dateBox}>
                    <span style={{ fontSize: '1.1rem' }}>{vote.day}</span>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>{vote.month}</span>
                  </div>
                  <div className={styles.itemContent} style={{ flex: 1 }}>
                    <div style={{ marginBottom: '0.4rem' }}>
                      <span className={`${styles.tag} ${styles.tagBlue}`} style={{ marginRight: '0.5rem' }}>
                        {vote.chambre}
                      </span>
                      <span className={`${styles.tag} ${vote.status === 'Adopté' ? styles.tagGreen : styles.tagRed}`}>
                        {vote.status}
                      </span>
                    </div>
                    <h4>{vote.title}</h4>
                  </div>
                  <Button shape="circle" icon={<ArrowRightOutlined />} style={{ border: 'none', background: 'transparent' }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            
            <div className={`${styles.card} ${styles.deputyDayCard}`}>
              <div className={styles.sectionHeader} style={{ justifyContent: 'center', border: 'none', marginBottom: 0 }}>
                <h2 className={styles.sectionTitle}>Député du Jour</h2>
              </div>
              
              <img
                src={isHovered ? ATTAL_IMG : BOYARD_IMG}
                alt="Député du jour"
                className={`${styles.deputyPhoto} ${isHovered ? styles.bugEffect : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />

              <h3 className={styles.deputyName}>
                Louis Boyard
              </h3>
              <span className={styles.deputyRole}>
                La France Insoumise
              </span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;