import React from "react"
import he from 'he';
import { shuffle } from '../utils/shuffle'

export default function Quiz(props) {

    const { question, correct_answer, incorrect_answers } = props.qna;
    let answers = [correct_answer, ...incorrect_answers];
    answers = shuffle(answers) 

    const quizAnswerStyle = {
        border: props.isHeld ? "none" : "solid",
        backgroundColor: props.isHeld ? "#D6DBF5" : "transparent"
    }

    const answersMap = answers.map((answer, index) => {
        return (
        <p key={index} style={quizAnswerStyle} onClick={props.holdAnswer} className="quiz--answer">
            {he.decode(answer)}
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