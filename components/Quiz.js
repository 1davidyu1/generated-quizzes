import React from "react"
import he from 'he';

export default function Quiz(props) {

    const quizAnswerStyle = {
        border: props.isHeld ? "none" : "solid",
        backgroundColor: props.isHeld ? "#D6DBF5" : "transparent"
    }

    return (
        <div>
            <h2>{he.decode(props.question)}</h2>
            <div className="quiz--answer--container">
                <p style={quizAnswerStyle} className="quiz--answer">{he.decode(props.answers)}</p>
            </div>
            <div className="quiz--line"></div>
        </div>
    )
}