import "./GameEndScreen.css";

export default function GameEndScreen({ score, time, onRestart, onBackToRoutes }) {
  return (
    <div className="end-container">
      <h1 className="end-title">🎉 Gratulacje! 🎉</h1>

      <p className="end-subtitle">Ukończyłeś trasę!</p>

      <div className="end-box">
        <p className="end-stat"><strong>⭐ Wynik:</strong> {score} punktów</p>
        <p className="end-stat"><strong>⏱️ Czas ukończenia:</strong> {time}</p>
      </div>

      <button 
        className="end-btn end-btn-primary"
        onClick={onRestart}
      >
        🔄 Zagraj ponownie
      </button>

      <button 
        className="end-btn end-btn-secondary"
        onClick={onBackToRoutes}
      >
        ⬅️ Wróć do wyboru trasy
      </button>
    </div>
  );
}
