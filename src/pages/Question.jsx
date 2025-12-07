import { useState, memo } from "react";

export default function Question({ question, lang, attempts, onAnswer, onClose }) {
  const [selected, setSelected] = useState(null);
  const [clicked, setClicked] = useState([false, false, false, false]);
  const [counter, setCounter] = useState(0);

  const answers = question.answers;

  function handleAnswerClick(index) {
    const answer = answers[index];

    // do not count duplicate clicks
    let newCounter = counter;

    if (!clicked[index]) {
      const newClicked = [...clicked];
      newClicked[index] = true;
      setClicked(newClicked);
      newCounter = counter + 1;
      setCounter(newCounter);
    }

    setSelected(index);

    // decide correctness
    if (answer.isCorrect) {
      onAnswer(true);   // tell GameFlow you got it right
    } else {
      onAnswer(false);  // tell GameFlow you got it wrong
    }
  }

  return (
    <div className="question-modal">
      <div className="question-box">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{question[`question_${lang}`] || question.question}</h2>

        <div className="answers">
          {answers.map((ans, i) => (
            <button
              key={i}
              className="answer"
              onClick={() => handleAnswerClick(i)}
              style={{
                backgroundColor:
                  selected === i
                    ? ans.isCorrect
                      ? "green"
                      : "red"
                    : ""
              }}
            >
              {ans[`text_${lang}`] || ans.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
