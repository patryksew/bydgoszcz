import { useState } from "react";



function Question({points, setPoints}) {
    const [selected, setSelected] = useState(null);

    function addPoints(value) {
        setPoints(prev => prev + value);
    }

    function handleAnswer(answer) {
        if(answer == "A"){
            setSelected(answer);
            addPoints(3);
        }
        else if(answer == "B")
        {
            setSelected(answer);
            addPoints(1);
        }
        else if(answer == "C")
        {
            setSelected(answer);
            addPoints(0);
        }
         else if(answer == "D")
        {
            setSelected(answer);
            addPoints(0);
        }
    }
  return (
    <div>
    <div className="points">Points = {points}
    </div>
    <div className="image">
        <img src = 'image.png' />
    </div>
    <div className="question">
        <p>Jaka rzeka przepływa przez Bydgoszcz?</p>
    </div>
    <div className= "answers">
        <button className="answer" onClick={() => handleAnswer("A")}
        style={{ backgroundColor: selected === "A" ? "green" : "" }}> A. Wisła</button>

        <button className="answer" onClick={() => handleAnswer("B")}
        style={{ backgroundColor: selected === "B" ? "red" : "" }}> B. Brda</button>

        <button className="answer" onClick={() => handleAnswer("C")}
        style={{ backgroundColor: selected === "C" ? "red" : "" }}> C. Odra</button>

        <button className="answer" onClick={() => handleAnswer("D")}
        style={{ backgroundColor: selected === "D" ? "red" : "" }}> D. Odra</button>
    </div>
    </div>
  );
}

export default Question;
