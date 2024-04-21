import React, {useState, useEffect} from "react"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"

export default function App() {
    const [beginQuiz, setBeginQuiz] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    const isHeld = false

    const mainBackgroundSize = {
        backgroundSize: beginQuiz ? "20%, 20%" : "40%, 40%",
        height: beginQuiz ? "auto" : "100%"
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuizzes(data.results))
    },[])

    // function createQuizzes(prevQuizzes) {
    //     const newQuizzes = prevQuizzes.map(quiz => ({
    //         ...quiz,
    //         isHeld: false
    //     }));
    //     setQuizzes(newQuizzes);
    // }
    

    function handleBegin() {
        setBeginQuiz(true)
    }

    const quizzesMap = quizzes.map((quiz, index) => (
        <Quiz 
            key={index}
            qna={quiz}
            isHeld={isHeld}
            // holdAnswer={() => holdAnswer(index)}
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
                <h1 className="begin--header">QNA</h1>
                <h4 className="begin--description">Test your knowledge</h4>
                <button className="begin--button" onClick={handleBegin}>Start quiz</button>
            </div>
            )}
        </main>
    )
}