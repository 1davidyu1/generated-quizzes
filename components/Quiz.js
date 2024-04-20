import React from "react"

export default function Quiz(props) {

    const quizAnswerStyle = {
        border: props.isHeld ? "none" : "solid",
        backgroundColor: props.isHeld ? "#D6DBF5" : "transparent"
    }

    return (
        <div>
            <h2>{props.question}</h2>
            <div className="quiz--answer--container">
                <p style={quizAnswerStyle} className="quiz--answer">{props.answers}</p>
            </div>
            <div className="quiz--line"></div>
            {/* make this a if for clicked */}
            <button className="quiz--check--button">Check answers</button> 
        </div>
    )
}