import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, Modal, Progress, Select, message } from 'antd';
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
  const [debateOpen, setDebateOpen] = useState(false);
  const [glitchPulse, setGlitchPulse] = useState(false);
  const [fieldOrder, setFieldOrder] = useState<string[]>([]);

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

  const debateCategories = [
    'Democratie & participation citoyenne',
    'Logement & urbanisme',
    'Environnement & transition ecologique',
    'Travail & economie',
    'Societe & culture',
    'Technologie & innovation'
  ];

  const debateFields = useMemo(
    () => [
      { key: 'title', label: 'Titre du debat' },
      { key: 'category', label: 'Categorie' },
      { key: 'context', label: 'Contexte' },
      { key: 'urgency', label: 'Urgence' },
      { key: 'scope', label: 'Zone concernee' }
    ],
    []
  );

  const getPercent = (val: number, total: number) => total === 0 ? 0 : Math.round((val / total) * 100);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    const intervalId = window.setInterval(() => {
      setGlitchPulse(true);
      window.setTimeout(() => setGlitchPulse(false), 420);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!debateOpen) return;
    setFieldOrder(debateFields.map((field) => field.key));

    const shuffle = (list: string[]) => {
      const next = [...list];
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    };

    const intervalId = window.setInterval(() => {
      setFieldOrder((prev) => shuffle(prev));
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [debateFields, debateOpen]);

  return (
    <div className={styles.container}>
      {contextHolder}
      
      <header className={styles.header}>
        <h1 className={styles.title}>Les Grands Débats de la Nation</h1>
        <p className={styles.subtitle}>
          Parce que la démocratie, c'est aussi décider des choses qui fâchent vraiment.
          Exprimez-vous en toute conscience.
        </p>
        <Button
          className={styles.debateButton}
          size="large"
          onClick={() => setDebateOpen(true)}
        >
          Créer un débat
        </Button>
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

      <Modal
        open={debateOpen}
        centered
        onCancel={() => setDebateOpen(false)}
        footer={null}
        className={styles.debateModal}
        title="Créer un débat"
      >
        <Form
          layout="vertical"
          className={`${styles.debateForm} ${glitchPulse ? styles.debateFormGlitch : ''}`}
          onFinish={() => {
            messageApi.success('Debat enregistre. Merci pour votre proposition.');
            setDebateOpen(false);
          }}
        >
          {(fieldOrder.length ? fieldOrder : debateFields.map((field) => field.key)).map((fieldKey) => {
            switch (fieldKey) {
              case 'title':
                return (
                  <Form.Item
                    key={fieldKey}
                    label="Titre du debat"
                    name="debateTitle"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Ex: Faut-il limiter les locations courte duree ?" />
                  </Form.Item>
                );
              case 'category':
                return (
                  <Form.Item
                    key={fieldKey}
                    label="Categorie"
                    name="category"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Choisir une categorie">
                      {debateCategories.map((option) => (
                        <Select.Option key={option} value={option}>
                          {option}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                );
              case 'context':
                return (
                  <Form.Item
                    key={fieldKey}
                    label="Contexte"
                    name="context"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={3} placeholder="Donne un peu de contexte." />
                  </Form.Item>
                );
              case 'urgency':
                return (
                  <Form.Item
                    key={fieldKey}
                    label="Urgence"
                    name="urgency"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Choisir un niveau">
                      <Select.Option value="low">Faible</Select.Option>
                      <Select.Option value="medium">Moyenne</Select.Option>
                      <Select.Option value="high">Elevee</Select.Option>
                    </Select>
                  </Form.Item>
                );
              case 'scope':
                return (
                  <Form.Item
                    key={fieldKey}
                    label="Zone concernee"
                    name="scope"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Choisir une zone">
                      <Select.Option value="local">Locale</Select.Option>
                      <Select.Option value="regional">Regionale</Select.Option>
                      <Select.Option value="national">Nationale</Select.Option>
                    </Select>
                  </Form.Item>
                );
              default:
                return null;
            }
          })}
          <Form.Item>
            <Button className={styles.debateSubmit} htmlType="submit" size="large">
              Publier le debat
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Polls;