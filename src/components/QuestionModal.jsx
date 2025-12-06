import { useState } from 'react';

export default function QuestionModal({ question, lang, attempts, onAnswer, onClose }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questionText = lang === 'en' ? question.question_en : question.question;

  const handleAnswerClick = (answer, index) => {
    setSelectedAnswer(index);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(answer.isCorrect);
      if (answer.isCorrect) {
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setShowResult(false);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={onClose} />

      {/* Modal */}
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>❓ Pytanie</h2>
          <button
            onClick={onClose}
            style={closeButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          >
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          {/* Question image */}
          {question.image && (
            <div style={imageContainerStyle}>
              <img
                src={`/images/${question.image}`}
                alt="Question"
                style={imageStyle}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Question text */}
          <h3 style={questionTextStyle}>{questionText}</h3>

          {/* Points info */}
          <p style={pointsInfoStyle}>
            {attempts === 0 && '🌟 3 punkty za poprawną odpowiedź!'}
            {attempts === 1 && '⭐ 1 punkt za poprawną odpowiedź!'}
            {attempts >= 2 && '💡 Brak punktów, ale spróbuj odpowiedzieć poprawnie!'}
          </p>

          {/* Attempts info */}
          {attempts > 0 && (
            <p style={attemptsInfoStyle}>
              🔄 Próba {attempts + 1}
            </p>
          )}

          {/* Answers */}
          <div style={answersContainerStyle}>
            {question.answers.map((answer, index) => {
              const answerText = lang === 'en' ? answer.text_en : answer.text;
              const isSelected = selectedAnswer === index;
              const isCorrect = answer.isCorrect;

              let buttonStyle = answerButtonStyle;
              if (showResult && isSelected) {
                buttonStyle = isCorrect ? correctAnswerStyle : wrongAnswerStyle;
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerClick(answer, index)}
                  style={buttonStyle}
                  disabled={showResult}
                  onMouseEnter={(e) => {
                    if (!showResult) {
                      e.currentTarget.style.borderColor = '#3498db';
                      e.currentTarget.style.backgroundColor = '#f0f8ff';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showResult) {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {String.fromCharCode(65 + index)}. {answerText}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 2000,
  backdropFilter: 'blur(3px)'
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  zIndex: 2001,
  maxWidth: '650px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
  animation: 'slideIn 0.3s ease-out'
};

const headerStyle = {
  padding: '25px 30px',
  borderBottom: '2px solid #ecf0f1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#3498db',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  color: 'white'
};

const closeButtonStyle = {
  background: 'rgba(255,255,255,0.2)',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: 'white',
  padding: '5px',
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'all 0.2s'
};

const contentStyle = {
  padding: '30px'
};

const imageContainerStyle = {
  marginBottom: '25px',
  textAlign: 'center',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#f8f9fa'
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '250px',
  borderRadius: '12px',
  objectFit: 'cover'
};

const questionTextStyle = {
  fontSize: '22px',
  marginBottom: '20px',
  color: '#2c3e50',
  fontWeight: '600',
  lineHeight: '1.5'
};

const pointsInfoStyle = {
  fontSize: '15px',
  color: '#27ae60',
  fontWeight: 'bold',
  marginBottom: '15px',
  padding: '12px',
  backgroundColor: '#e8f8f5',
  borderRadius: '10px',
  textAlign: 'center',
  border: '2px solid #27ae60'
};

const attemptsInfoStyle = {
  fontSize: '14px',
  color: '#e67e22',
  marginBottom: '20px',
  padding: '10px',
  backgroundColor: '#fef5e7',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: '500'
};

const answersContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const answerButtonStyle = {
  padding: '18px 20px',
  fontSize: '16px',
  border: '2px solid #e0e0e0',
  borderRadius: '12px',
  backgroundColor: 'white',
  cursor: 'pointer',
  transition: 'all 0.2s',
  textAlign: 'left',
  fontWeight: '500',
  color: '#2c3e50',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const correctAnswerStyle = {
  ...answerButtonStyle,
  backgroundColor: '#27ae60',
  color: 'white',
  borderColor: '#27ae60',
  transform: 'scale(1.02)',
  boxShadow: '0 4px 12px rgba(39,174,96,0.3)'
};

const wrongAnswerStyle = {
  ...answerButtonStyle,
  backgroundColor: '#e74c3c',
  color: 'white',
  borderColor: '#e74c3c',
  animation: 'shake 0.5s'
};

