import React, {useState, useEffect} from "react"
import Quiz from "./components/Quiz"

export default function App() {
    const [beginQuiz, setBeginQuiz] = useState(false)

    // need to change
    const question = "What is?"
    const answers = "somelarge"
    const isHeld = false

    function handleBegin() {
        setBeginQuiz(true)
    }

    const mainBackgroundSize = {
        backgroundSize: beginQuiz ? "20%, 20%" : "40%, 40%"
    }

    return (
        <main style={mainBackgroundSize}>
            {beginQuiz ? (
            <div>
                <Quiz question={question} answers={answers} isHeld={isHeld}/>
            </div>
            ) : (
            <div className="begin--container">
                <h1 className="begin--header">Quizzical</h1>
                <h4 className="begin--description">Test your knowledge</h4>
                <button className="begin--button" onClick={handleBegin}>Start quiz</button>
            </div>
            )}
        </main>
    )
}