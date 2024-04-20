import React, {useState, useEffect} from "react"
import Quiz from "./components/Quiz"

export default function App() {
    const [beginQuiz, setBeginQuiz] = useState(false)
    const [questions, setQuestions] = useState([])

    console.log(questions)

    // need to change
    const question = "What is?"
    const answers = "somelarge"
    const isHeld = false
    

    const mainBackgroundSize = {
        backgroundSize: beginQuiz ? "20%, 20%" : "40%, 40%"
    }
    
    function handleBegin() {
        setBeginQuiz(true)
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    },[])

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