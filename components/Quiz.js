import React from "react"
import he from 'he';

export default function Quiz(props) {
    const {question, answers, holdAnswer, selectedAnswer} = props

    const answersMap = answers.map((answer) => {
        return (
        <button 
            key={answer.id} 
            style={{
                border: answer.isHeld ? "none" : "solid",
                backgroundColor: answer.isHeld ? "#D6DBF5" : "transparent",
                cursor: selectedAnswer ? "default" : "pointer"
            }} 
            className="quiz--answer"
            onClick={() => { if (!selectedAnswer || selectedAnswer === answer.id) holdAnswer(answer.id) }}
            >
            {he.decode(answer.text)}
        </button>
        )
    })

    return (
        <div className="quiz--container">
            <h2 className="quiz--question">{he.decode(question)}</h2>
            <div className="quiz--answer--container">
                {answersMap}
            </div>
            <div className="quiz--line"></div>
        </div>
    )
}