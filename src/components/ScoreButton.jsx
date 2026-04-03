export default function ScoreButton({ value, onClick, disabled }) {
  return (
    <button className="score-btn" onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
}