import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSelector from '../components/LanguageSelector';
import TrailSelector from '../components/TrailSelector';
import GameMap from '../components/GameMap';
import NarrationModal from '../components/NarrationModal';
import '../game.css';

export default function GameFlow() {
  const { lang, setLang } = useLanguage();
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState({}); // Track attempts per question
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showNarration, setShowNarration] = useState(true);
  const [finalNarration, setFinalNarration] = useState(false);


  // Handler for trail selection - resets game state
  const handleTrailSelect = (trail) => {
    setSelectedTrail(trail);
    setCurrentQuestionIndex(0);
    setPoints(0);
    setAttempts({});
    setGameFinished(false);
    setStartTime(Date.now());
    setEndTime(null);
    setShowNarration(true);
    setFinalNarration(false);
  };

  // Step 1: Language selection
  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }

  // Step 2: Trail selection or finish screen
  if (!selectedTrail || gameFinished) {
    if (gameFinished) {
      const maxPoints = selectedTrail.questions.length * 3;
      const percentage = Math.round((points / maxPoints) * 100);
      let durationText = null;
      if (startTime && endTime) {
        const ms = endTime - startTime;
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        durationText = `${minutes} min ${remainingSeconds} s`;
      }
      if (finalNarration) {
        return (
          <NarrationModal
            avatar="/avatar.png"
            dialogId={999}
            lang={lang}
            onFinish={() => {
              setFinalNarration(false);
            }}
          />
        );
      }

      return (
        <div style={finishScreenStyle}>
          <div style={{
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            maxWidth: '500px'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>
              {percentage >= 80 ? '🏆' : percentage >= 50 ? '🎉' : '👍'}
            </div>
            <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '15px' }}>
              {percentage >= 80 ? 'Świetna robota!' : percentage >= 50 ? 'Dobra robota!' : 'Ukończono!'}
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '10px' }}>
              Trasa: <strong style={{ color: '#34495e' }}>{selectedTrail.title[lang]}</strong>
            </p>
            <div style={{
              margin: '30px 0',
              padding: '30px',
              backgroundColor: '#ecf0f1',
              borderRadius: '15px'
            }}>
              <h2 style={{
                color: points >= maxPoints * 0.8 ? '#27ae60' : points >= maxPoints * 0.5 ? '#f39c12' : '#3498db',
                fontSize: '4rem',
                margin: '0'
              }}>
                {points}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#7f8c8d', margin: '10px 0 0 0' }}>
                z {maxPoints} punktów ({percentage}%)
              </p>
              {durationText && (
                <p style={{
                  fontSize: '1.1rem',
                  color: '#2c3e50',
                  marginTop: '10px',
                  fontWeight: '500'
                }}>
                  Czas gry: <strong>{durationText}</strong>
                </p>
              )}
            </div>
            <button
              onClick={() => { setGameFinished(false); setSelectedTrail(null); }}
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2980b9';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(52,152,219,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3498db';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(52,152,219,0.3)';
              }}
            >
              🗺️ Wybierz nową trasę
            </button>
          </div>
        </div>
      );
    }

    return (
      <TrailSelector
        lang={lang}
        onSelectTrail={handleTrailSelect}
      />
    );
  }


  // Step 3: Game with map and questions
  const currentQuestion = selectedTrail.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === selectedTrail.questions.length - 1;

  const handleCorrectAnswer = () => {
    const questionId = currentQuestion.id;
    const attemptCount = attempts[questionId] || 0;

    // Award points based on attempt count
    if (attemptCount === 0) {
      setPoints(prev => prev + 3);
    } else if (attemptCount === 1) {
      setPoints(prev => prev + 1);
    }

    // Move to next question or finish game
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Zakończenie gry – najpierw narracja
      setEndTime(Date.now());
      setGameFinished(true);
      setFinalNarration(true);
    }
  };

  const handleWrongAnswer = () => {
    const questionId = currentQuestion.id;
    setAttempts(prev => ({
      ...prev,
      [questionId]: (prev[questionId] || 0) + 1
    }));
  };

  return (
    <>
      <GameMap
        trail={selectedTrail}
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={selectedTrail.questions.length}
        points={points}
        attempts={attempts[currentQuestion.id] || 0}
        lang={lang}
        onCorrectAnswer={handleCorrectAnswer}
        onWrongAnswer={handleWrongAnswer}
        onBackToTrails={() => setSelectedTrail(null)}
      />
    </>
  );
}

const finishScreenStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  maxWidth: '700px',
  margin: '0 auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f5f7fa'
};

const buttonStyle = {
  padding: '15px 35px',
  fontSize: '18px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  marginTop: '30px',
  fontWeight: '600',
  boxShadow: '0 4px 12px rgba(52,152,219,0.3)',
  transition: 'all 0.3s'
};

