import React from "react"
import he from 'he';

export default function Quiz(props) {
    const {question, answers, holdAnswer} = props

    const answersMap = answers.map((answer, index) => {
        console.log(answer)
        return (
        <p 
            key={answer.id} 
            style={{
                border: answer.isHeld ? "none" : "solid",
                backgroundColor: answer.isHeld ? "#D6DBF5" : "transparent"
            }} 
            className="quiz--answer"
            onClick={() => holdAnswer(answer.id)}>
            {he.decode(answer.text)}
        </p>
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