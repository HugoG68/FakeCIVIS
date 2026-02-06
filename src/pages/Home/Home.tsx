import React from 'react';
import { Input, Button, Progress } from 'antd';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './Home.module.css';

// Mock Data
const recentVotes = [
  { id: 1, day: '06', month: 'FEB', title: "Loi sur la transition énergétique", status: 'Adopté', chambre: 'Assemblée' },
  { id: 2, day: '05', month: 'FEB', title: "Amendement budget sécurité sociale", status: 'Rejeté', chambre: 'Sénat' },
  { id: 3, day: '03', month: 'FEB', title: "Protection des données numériques", status: 'Adopté', chambre: 'Assemblée' },
];

const polls = [
  { id: 1, question: "Faut-il interdire les trottinettes en libre service ?", votes: 1250, pour: 70 },
  { id: 2, question: "Priorité aux commerces de proximité ?", votes: 3400, pour: 45 },
];

const Home: React.FC = () => {
  return (
    <main style={{ minHeight: '80vh' }}>
      
      {/* HERO SECTION */}
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

      {/* MAIN CONTENT */}
      <div className="container">
        <div className={styles.mainGrid}>
          
          {/* GAUCHE : DERNIERS SCRUTINS */}
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

          {/* DROITE : SONDAGES */}
          <div className={styles.card} style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.8), rgba(246, 213, 168, 0.2))' }}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Vos Avis</h2>
            </div>
            
            {polls.map(poll => (
              <div key={poll.id} className={styles.pollItem}>
                <span className={styles.pollQuestion}>{poll.question}</span>
                <Progress 
                  percent={poll.pour} 
                  strokeColor={{ '0%': 'var(--accent-strong)', '100%': 'var(--accent-cool)' }} 
                  trailColor="rgba(15, 18, 26, 0.06)"
                  showInfo={false}
                  size="small"
                />
                <div className={styles.pollStats}>
                  <span>{poll.pour}% Favorables</span>
                  <span>{poll.votes} votes</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Button size="large" className={styles.searchButton} style={{ width: '100%' }}>
                Participer aux débats
              </Button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Home;