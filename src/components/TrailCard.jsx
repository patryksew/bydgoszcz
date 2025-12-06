export default function TrailCard({ trail, lang }) {
  return (
    <div style={cardStyle}>
      <img src={trail.image} alt="" style={imageStyle} />

      <h2>{trail.title[lang]}</h2>
      <p>{trail.description[lang]}</p>

      <p><b>⏱ {trail.time}</b></p>
      <p><b>📏 {trail.distance}</b></p>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "10px",
  width: "280px",
  margin: "15px",
  textAlign: "center"
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px"
};
