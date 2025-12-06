import TrailCard from "../components/TrailCard";
import { trails } from "../data/trails";
import { translations } from "../data/translations";

export default function Trails({ lang }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>{translations[lang].chooseTrail}</h1>

      <div style={listStyle}>
        {trails.map(trail => (
          <TrailCard key={trail.id} trail={trail} lang={lang} />
        ))}
      </div>
    </div>
  );
}

const listStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};
