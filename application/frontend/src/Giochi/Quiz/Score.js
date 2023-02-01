import './quiz.css'

function Stat({ label, value }) {
    return (
      <li className="stats_container">
        <div className="stats_label">{label}:</div>
        <div className="stats_value">{value}</div>
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