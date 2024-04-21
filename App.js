import React, {useState, useEffect} from "react"
import Quiz from "./components/Quiz"

export default function App() {
    const [beginQuiz, setBeginQuiz] = useState(false)
    const [quizzes, setQuizzes] = useState([])

    // need to change
    const isHeld = false
    

    const mainBackgroundSize = {
        backgroundSize: beginQuiz ? "20%, 20%" : "40%, 40%",
        height: beginQuiz ? "auto" : "100%"
    }
    
    function handleBegin() {
        setBeginQuiz(true)
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then(res => res.json())
            .then(data => setQuizzes(data.results))
    },[])

    const quizzesMap = quizzes.map(quiz => (
        <Quiz 
            question={quiz.question} 
            answers={quiz.correct_answer} 
            isHeld={isHeld}
        />
    ))

    return (
        <main style={mainBackgroundSize}>
            {beginQuiz ? (
            <div>
                {quizzesMap}
                {/* make this a if for clicked */}
                <button className="quiz--check--button">Check answers</button> 
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