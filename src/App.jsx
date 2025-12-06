import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Question from './Question.jsx'

function App() {
  const [points, setPoints] = useState(0);


  return (
    <div>
      <Question points={points} setPoints = {setPoints} />
    </div>
  )
}

export default App
