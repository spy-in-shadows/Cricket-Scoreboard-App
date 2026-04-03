export default function ActionButton({ text, onClick, disabled }) {
  return (
    <button className="action-btn" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}