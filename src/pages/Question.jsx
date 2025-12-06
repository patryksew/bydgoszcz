import { useState } from "react";



function Question({points, setPoints}) {
    const [selected, setSelected] = useState(null);
    const [counter, setCounter] = useState(0);


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
        else if(answer == "B")
        {
            setSelected(answer);

        }
        else if(answer == "C")
        {
            setSelected(answer);
        }
         else if(answer == "D")
        {
            setSelected(answer);
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
