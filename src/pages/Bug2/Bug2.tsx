import React, { useState } from 'react';
import { Button, Progress, message } from 'antd';
import { LikeOutlined, DislikeOutlined, MehOutlined, CheckCircleFilled } from '@ant-design/icons';
import styles from './Bug2.module.css';

// --- TYPES ---
interface Poll {
  id: number;
  category: string;
  question: string;
  votes: { yes: number; no: number; neutral: number };
  userChoice: 'YES' | 'NO' | 'NEUTRAL' | null; // Pour savoir si l'user a déjà voté
}

const initialPolls: Poll[] = [
  {
    id: 1,
    category: "Démocratie & participation citoyenne",
    question: "Faut-il rendre le vote obligatoire ?",
    votes: { yes: 120, no: 15, neutral: 5 },
    userChoice: null
  },
  {
    id: 2,
    category: "Logement & urbanisme",
    question: "Faut-il limiter les locations de courte durée type Airbnb ?",
    votes: { yes: 45, no: 890, neutral: 30 },
    userChoice: null
  },
  {
    id: 3,
    category: "Environnement & transition écologique",
    question: "Faut-il interdire certains produits polluants même s’ils sont populaires ?",
    votes: { yes: 300, no: 280, neutral: 100 },
    userChoice: null
  },
  {
    id: 4,
    category: "Travail & économie",
    question: "Le SMIC est-il suffisant pour vivre décemment ?",
    votes: { yes: 12, no: 5000, neutral: 0 },
    userChoice: null
  },
  {
    id: 5,
    category: "Société & culture",
    question: "Faut-il instaurer une journée nationale de la sieste au travail ?",
    votes: { yes: 1500, no: 10, neutral: 5 },
    userChoice: null
  },
  {
    id: 6,
    category: "Technologie & innovation",
    question: "Faut-il interdire les réseaux sociaux pour les moins de 16 ans ?",
    votes: { yes: 800, no: 600, neutral: 200 },
    userChoice: null
  }
];

const Polls: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [messageApi, contextHolder] = message.useMessage();

  const handleVote = (id: number, type: 'YES' | 'NO' | 'NEUTRAL') => {
    
    let invertedType: 'YES' | 'NO' | 'NEUTRAL' = 'NEUTRAL';
    let feedbackText = "";

    if (type === 'YES') {
      invertedType = 'NO';
      feedbackText = "Vote CONTRE enregistré ! (Bien joué)";
    } else if (type === 'NO') {
      invertedType = 'YES';
      feedbackText = "Vote POUR enregistré ! (Merci du soutien)";
    } else {
      invertedType = 'NEUTRAL';
      feedbackText = "Vote neutre pris en compte.";
    }

    setPolls(prevPolls => prevPolls.map(poll => {
      if (poll.id !== id) return poll;

      return {
        ...poll,
        votes: {
          ...poll.votes,
          [type.toLowerCase()]: poll.votes[type.toLowerCase() as keyof typeof poll.votes]
        },
        votes: {
            yes: poll.votes.yes + (invertedType === 'YES' ? 1 : 0),
            no: poll.votes.no + (invertedType === 'NO' ? 1 : 0),
            neutral: poll.votes.neutral + (invertedType === 'NEUTRAL' ? 1 : 0),
        },
        userChoice: invertedType
      };
    }));

    messageApi.open({
      type: 'success',
      content: feedbackText,
      icon: <CheckCircleFilled style={{ color: 'var(--accent-strong)' }} />,
    });
  };

  const getPercent = (val: number, total: number) => total === 0 ? 0 : Math.round((val / total) * 100);

  return (
    <div className={styles.container}>
      {contextHolder}
      
      <header className={styles.header}>
        <h1 className={styles.title}>Les Grands Débats de la Nation</h1>
        <p className={styles.subtitle}>
          Parce que la démocratie, c'est aussi décider des choses qui fâchent vraiment.
          Exprimez-vous en toute conscience.
        </p>
      </header>

      <div className={styles.grid}>
        {polls.map(poll => {
          const totalVotes = poll.votes.yes + poll.votes.no + poll.votes.neutral;
          const hasVoted = poll.userChoice !== null;

          return (
            <div key={poll.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryTag}>{poll.category}</span>
                <h3 className={styles.question}>{poll.question}</h3>
              </div>

              {!hasVoted ? (
                <div className={styles.actions}>
                  <button 
                    className={`${styles.voteButton} ${styles.btnYes}`}
                    onClick={() => handleVote(poll.id, 'YES')}
                    aria-label="Voter Pour"
                  >
                    <LikeOutlined style={{ fontSize: '1.2rem' }} />
                  </button>
                  
                  <button 
                    className={`${styles.voteButton} ${styles.btnNeutral}`}
                    onClick={() => handleVote(poll.id, 'NEUTRAL')}
                    aria-label="Vote Neutre"
                  >
                    <MehOutlined style={{ fontSize: '1.2rem' }} />
                  </button>

                  <button 
                    className={`${styles.voteButton} ${styles.btnNo}`}
                    onClick={() => handleVote(poll.id, 'NO')}
                    aria-label="Voter Contre"
                  >
                    <DislikeOutlined style={{ fontSize: '1.2rem' }} />
                  </button>
                </div>
              ) : (
                <div className={styles.results}>
                  
                  <div className={styles.resultRow}>
                    <div className={styles.resultLabel}>
                      <span>Pour</span>
                      <span>{getPercent(poll.votes.yes, totalVotes)}%</span>
                    </div>
                    <Progress
                      percent={getPercent(poll.votes.yes, totalVotes)}
                      showInfo={false}
                      strokeColor="var(--accent-cool)"
                      size="small"
                    />
                  </div>

                  <div className={styles.resultRow}>
                    <div className={styles.resultLabel}>
                      <span>Contre</span>
                      <span>{getPercent(poll.votes.no, totalVotes)}%</span>
                    </div>
                    <Progress
                      percent={getPercent(poll.votes.no, totalVotes)}
                      showInfo={false}
                      strokeColor="var(--accent-strong)"
                      size="small"
                    />
                  </div>

                  <div className={styles.resultRow}>
                    <div className={styles.resultLabel}>
                      <span>Sans avis (les lâches)</span>
                      <span>{getPercent(poll.votes.neutral, totalVotes)}%</span>
                    </div>
                    <Progress
                      percent={getPercent(poll.votes.neutral, totalVotes)}
                      showInfo={false}
                      strokeColor="var(--accent-soft)"
                      size="small"
                    />
                  </div>

                  <div className={styles.voteNotice}>
                    Votre vote <strong>{poll.userChoice === 'YES' ? 'POUR' : poll.userChoice === 'NO' ? 'CONTRE' : 'NEUTRE'}</strong> a été comptabilisé.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Polls;