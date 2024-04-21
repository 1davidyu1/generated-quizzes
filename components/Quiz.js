import React from "react"
import he from 'he';

export default function Quiz(props) {

    // shuffle array
    const correctAnswer = props.qna.correct_answer
    const incorrectAnswers = props.qna.incorrect_answers
    const answers = [correctAnswer, ...incorrectAnswers];

    const quizAnswerStyle = {
        border: props.isHeld ? "none" : "solid",
        backgroundColor: props.isHeld ? "#D6DBF5" : "transparent"
    }

    console.log(answers)
    const answersMap = answers.map((answer, index) => {
        return (
        <p key={index} style={quizAnswerStyle} className="quiz--answer">
            {he.decode(answer)}
        </p>
        )
    })

    return (
        <div className="quiz--container">
            <h2 className="quiz--question">{he.decode(props.qna.question)}</h2>
            <div className="quiz--answer--container">
                {answersMap}
            </div>
            <div className="quiz--line"></div>
        </div>
    )
}