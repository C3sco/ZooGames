import './quiz.css'

function Stat({ label, value }) {
    return (
      <li className="stats__stat-container">
        <div className="stats__stat-label">{label}:</div>
        <div className="stats__stat-value">{value}</div>
      </li>
    );
  }
  
  function Score({ score, questionNumber, totalQuestions }) {
    return (
      <ul className="stats">
        <Stat label="Punteggio" value={score} />
        <Stat label="Domanda" value={`${questionNumber} / ${totalQuestions}`} />
      </ul>
    );
  }
  
  export default Score;