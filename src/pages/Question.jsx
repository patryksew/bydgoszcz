import { useState } from "react";
import { translations } from "../data/translations";

function Question({points, setPoints, lang}) {
    const [selected, setSelected] = useState(null);
    const t = translations[lang] || translations.pl;

    function addPoints(value) {
        setPoints(prev => prev + value);
    }

    function handleAnswer(answer) {
        if(answer === "A"){
            setSelected(answer);
            addPoints(3);
        }
        else if(answer === "B")
        {
            setSelected(answer);
            addPoints(1);
        }
        else if(answer === "C")
        {
            setSelected(answer);
            addPoints(0);
        }
         else if(answer === "D")
        {
            setSelected(answer);
            addPoints(0);
        }
    }
  return (
    <div style={{ padding: "20px" }}>
    <div className="points">{t.points} = {points}
    </div>
    <div className="question">
        <p>{t.questionText}</p>
    </div>
    <div className= "answers">
        <button className="answer" onClick={() => handleAnswer("A")}
        style={{ backgroundColor: selected === "A" ? "green" : "" }}> A. {t.answerA}</button>

        <button className="answer" onClick={() => handleAnswer("B")}
        style={{ backgroundColor: selected === "B" ? "red" : "" }}> B. {t.answerB}</button>

        <button className="answer" onClick={() => handleAnswer("C")}
        style={{ backgroundColor: selected === "C" ? "red" : "" }}> C. {t.answerC}</button>

        <button className="answer" onClick={() => handleAnswer("D")}
        style={{ backgroundColor: selected === "D" ? "red" : "" }}> D. {t.answerD}</button>
    </div>
    </div>
  );
}

export default Question;
