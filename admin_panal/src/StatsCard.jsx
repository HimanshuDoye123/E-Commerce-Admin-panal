export default function StatsCard({ title, value }) {
  return (
    <div style={{
      border: "1px solid #cccccc",
      padding: "20px",
      borderRadius: "10px",
      width: "200px",
      backgroundColor: "#a5c0b2",
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}