import React, {useState, useEffect} from "react"
import Quiz from "./components/Quiz"
import {nanoid} from "nanoid"
import { shuffle } from './utils/shuffle'

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
            .then(data => createQuizzes(data.results))
    },[])

    console.log(quizzes)

    function createQuizzes(rawQuizzes) {
        const cleanedQuizzes = rawQuizzes.map(rawQuiz => {
            let answers = rawQuiz.incorrect_answers.map(incorrectAnswer => ({
                id: nanoid(), 
                text: incorrectAnswer,
                isHeld: false,
                isCorrect: false // Indicate that this is not the correct answer

            }));
    
            answers.push({
                id: nanoid(),
                text: rawQuiz.correct_answer,
                isHeld: false,
                isCorrect: true // Indicate that this is the correct answer
            });
    
            answers = shuffle(answers);
    
            return {
                question: rawQuiz.question,
                answers: answers,
                selectedAnswer: false
            };
        });
        setQuizzes(cleanedQuizzes);
    }
    
    
    function holdAnswer(answerId) {
        console.log(answerId);
        setQuizzes(prevQuizzes => prevQuizzes.map(quiz => {
            // Map over answers to update them based on the clicked answer ID
            const answers = quiz.answers.map(answer => ({
                id: answer.id,
                text: answer.text,
                isCorrect: answer.isCorrect,
                isHeld: answer.id === answerId ? !answer.isHeld : answer.isHeld
            }));
    
            const selectedAnswer = answers.some(answer => answer.isHeld);
    
            return {
                question: quiz.question,
                answers: answers,
                selectedAnswer: selectedAnswer
            };
        }));
    }
    
    

    function handleBegin() {
        setBeginQuiz(true)
    }

    const quizzesMap = quizzes.map((quiz, index) => (
        <Quiz 
            key={index}
            question={quiz.question}
            answers={quiz.answers}
            holdAnswer={holdAnswer}
            selectedAnswer={quiz.selectedAnswer}
        />
    ))

    return (
        <main style={mainBackgroundSize}>
            {beginQuiz ? (
            <div>
                {quizzesMap}
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