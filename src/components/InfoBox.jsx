export default function InfoBox({ label, value }) {
  return (
    <div className="info-box">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}