import './quiz.css'

function EndStat({ label, value }) {
    return (
      <div className="end-screen__stat">
        <div className="end-screen__stat-label">{label}</div>
        <div className="end-screen__stat-value">{value}</div>
      </div>
    );
  }
  
  /**
   * EndScreen renders the final game stats.
   * @param {object} props
   * @param {number} props.score
   * @param {number} props.bestScore
   * @param {() => void} props.onRetryClick A function to run when the retry button is clicked.
   * @param {number} props.playTime Total play time in seconds
   */
  function EndScreen({ score, bestScore, onRetryClick, playTime }) {
    const minutes = `${Math.floor(playTime / 60)}`.padStart(2, "0");
    const seconds = `${Math.floor(playTime % 60)}`.padStart(2, "0");
    const timeString = `${minutes}:${seconds}`;
  
    return (
      <div className="end-screen">
        <h1>Quiz Finito!</h1>
        <div
          className="end-screen__trophy"
          initial={{ rotate: 0, originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          🏆
        </div>
        <EndStat label="Punteggio" value={score} />
        {/* <EndStat label="Best Score" value={bestScore} /> */}
        <EndStat label="Tempo" value={timeString} />

        <button className="end-screen__button" onClick={onRetryClick}>
          Riprova
        </button>
      </div>
    );
  }
  
  export default EndScreen;