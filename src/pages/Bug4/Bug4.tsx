import React, { useState } from 'react';
import { Button, Progress, message } from 'antd';
import { TrophyFilled, ClockCircleOutlined, CheckCircleFilled, GiftOutlined } from '@ant-design/icons';
import styles from './Bug4.module.css';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Combien y a-t-il de députés à l'Assemblée Nationale ?",
    options: ["577", "300", "Ça dépend de la marée", "Juste un seul (c'est lui qui décide)"]
  },
  {
    id: 2,
    text: "Quelle est la couleur des sièges de l'hémicycle ?",
    options: ["Rouge Passion", "Bleu République", "Jaune Poussin", "Vert comme mes plantes"]
  },
  {
    id: 3,
    text: "Que crie un huissier à l'ouverture de la séance ?",
    options: ["Monsieur le Président !", "À table !", "C'est l'heure du duel !", "Silence, ça tourne !"]
  },
  {
    id: 4,
    text: "Combien de temps dure le mandat d'un député ?",
    options: ["5 ans", "Le temps d'un claquement de doigts", "Jusqu'à la prochaine dissolution", "L'éternité"]
  },
  {
    id: 5,
    text: "Comment appelle-t-on le bâtiment où siègent les députés ?",
    options: ["Le Palais Bourbon", "Le Château de la République", "La Maison du Peuple (version chic)", "Le Parlementarium Deluxe"]
  },
  {
    id: 6,
    text: "Qui peut proposer une loi en France ?",
    options: ["Le gouvernement et les parlementaires", "Uniquement le Président", "Les citoyens via Twitter", "Le stagiaire le plus motivé"]
  },
  {
    id: 7,
    text: "Qu’est-ce qu’un amendement ?",
    options: ["Une modification d’un texte de loi", "Un discours très long", "Une excuse officielle", "Un sort lancé contre un projet de loi"]
  },
  {
    id: 8,
    text: "À quoi sert un scrutin public ?",
    options: ["À savoir qui a voté quoi", "À remplir le compte Instagram de l’Assemblée", "À tester les boutons de vote", "À créer des débats dans les familles"]
  },
  {
    id: 9,
    text: "Que signifie une abstention lors d’un vote ?",
    options: ["Ne pas se prononcer", "Être en pause café", "Être d’accord mais timidement", "Avoir perdu son badge"]
  },
  {
    id: 10,
    text: "Combien de chambres compte le Parlement français ?",
    options: ["Deux : Assemblée nationale et Sénat", "Une seule mais très grande", "Trois, comme un appart haussmannien", "Autant que nécessaire"]
  },
  {
    id: 11,
    text: "Que se passe-t-il si un député est absent lors d’un vote ?",
    options: ["Son vote n’est pas comptabilisé", "Il est remplacé par un doublure", "Il vote par pensée", "Il perd son tour"]
  },
  {
    id: 12,
    text: "À quoi sert une commission parlementaire ?",
    options: ["À examiner les textes de loi", "À décorer l’hémicycle", "À organiser les pauses déjeuner", "À compliquer les choses"]
  },
  {
    id: 13,
    text: "Qu’est-ce qu’une motion de censure ?",
    options: ["Un moyen de renverser le gouvernement", "Un vote pour changer le mobilier", "Une pétition très sérieuse", "Un sort de fin de partie"]
  },
  {
    id: 14,
    text: "Pourquoi le Sénat est-il souvent appelé la “chambre haute” ?",
    options: ["Pour des raisons historiques", "Parce qu’il est en altitude", "À cause du plafond", "Parce que les débats y sont philosophiques"]
  }
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleAnswer = () => {
    messageApi.open({
      type: 'success',
      content: 'Bonne réponse ! Quelle culture ! 👏',
      icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
      duration: 1.5,
    });

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextIndex);
      }, 400);
    } else {
      setTimeout(() => {
        setIsFinished(true);
      }, 400);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className={styles.container}>
      {contextHolder}
      
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--ink-strong)' }}>
          Le Grand Quiz Citoyen
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '1.1rem' }}>
          Prouvez votre connaissance infaillible des institutions (ou pas).
        </p>
      </header>

      <div className={styles.timerWrapper}>
        <div className={styles.timerBadge}>
          <ClockCircleOutlined />
          <span>05:00</span>
        </div>
      </div>

      {!isFinished ? (
        <div key={currentQuestion.id} className={`${styles.questionCard} ${styles.fadeIn}`}>
          <div className={styles.progressHeader}>
            <span className={styles.stepText}>Question en cours</span>
            <span className={styles.stepCount}>
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          
          <div style={{ width: '100%', marginBottom: '2rem' }}>
             <Progress percent={progressPercent} showInfo={false} strokeColor="var(--accent-strong)" trailColor="rgba(0,0,0,0.05)" size="small" />
          </div>

          <h2 className={styles.questionText}>{currentQuestion.text}</h2>

          <div className={styles.optionsGrid}>
            {currentQuestion.options.map((option, index) => (
              <button 
                key={index} 
                className={styles.optionBtn}
                onClick={handleAnswer}
              >
                <div className={styles.optionIndex}>{letters[index]}</div>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${styles.questionCard} ${styles.fadeIn}`} style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', 
            background: 'rgba(255, 215, 0, 0.1)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' 
          }}>
            <TrophyFilled style={{ fontSize: '3.5rem', color: '#ffd700' }} />
          </div>
          
          <h2 className={styles.resultScore}>20/20</h2>
          
          <p className={styles.resultText}>
            Incroyable ! Vous avez un sens politique inné.
            <br />
            <span style={{ fontSize: '0.9rem', opacity: 0.7 }}></span>
          </p>
          
          <Button 
            type="primary" 
            size="large" 
            onClick={restartQuiz} 
            icon={<GiftOutlined />}
            style={{ 
              padding: '0 2.5rem', 
              height: '56px', 
              borderRadius: '99px',
              fontSize: '1.1rem',
              background: 'var(--ink-strong)',
              border: 'none',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}
          >
            Retenter ma chance
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
