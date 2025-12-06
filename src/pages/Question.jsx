import { useState } from "react";
import { translations } from "../data/translations";

function Question({points, setPoints, lang}) {
    const [selected, setSelected] = useState(null);
    const [counter, setCounter] = useState(0);
    const t = translations[lang] || translations.pl;

    function addPoints(counter) {

        if(counter == 1)
        {
            setPoints(prev => prev + 3);
            setCounter(5);
        }
        else if(counter == 2)
            setPoints(prev => prev + 1);
    }

    function handleAnswer(answer) {
        const newCounter = counter + 1;
        setCounter(newCounter);
        if(answer == "A"){
            setSelected(answer);
            addPoints(newCounter);

        }
        else if(answer === "B")
        {
            setSelected(answer);

        }
        else if(answer === "C")
        {
            setSelected(answer);
        }
         else if(answer === "D")
        {
            setSelected(answer);
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
