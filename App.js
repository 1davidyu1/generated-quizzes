import React, {useState, useEffect} from "react"
import Quiz from "./components/Quiz"
import ScoredQuiz from "./components/scoredQuiz"
import {nanoid} from "nanoid"
import { shuffle } from './utils/shuffle'

export default function App() {
    const [beginQuiz, setBeginQuiz] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const mainBackgroundSize = {
        backgroundSize: beginQuiz ? "20%, 20%" : "40%, 40%",
        height: beginQuiz ? "auto" : "100%"
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => createQuizzes(data.results))
    },[])

    useEffect(() => {
        const correctAnswers = quizzes.reduce((acc, quiz) => {
            // Assuming each quiz has an 'answers' array
            return acc + quiz.answers.reduce((answerAcc, answer) => {
                return answerAcc + (answer.isHeld && answer.isCorrect ? 1 : 0);
            }, 0);
        }, 0);
    
        setCorrectAnswersCount(correctAnswers);
    }, [quizzes]);
    

    function createQuizzes(rawQuizzes) {
        const cleanedQuizzes = rawQuizzes.map(rawQuiz => {
            let answers = rawQuiz.incorrect_answers.map(incorrectAnswer => ({
                id: nanoid(), 
                text: incorrectAnswer,
                isHeld: false,
                isCorrect: false

            }));
    
            answers.push({
                id: nanoid(),
                text: rawQuiz.correct_answer,
                isHeld: false,
                isCorrect: true 
            });
    
            answers = shuffle(answers);
    
            return {
                question: rawQuiz.question,
                answers: answers,
                selectedAnswer: ""
            };
        });
        setQuizzes(cleanedQuizzes);
    }

    function holdAnswer(answerId) {
        setQuizzes(prevQuizzes => prevQuizzes.map(quiz => {
            let newSelectedAnswer = quiz.selectedAnswer
            const answers = quiz.answers.map(answer => {
                if (answer.id === answerId) {
                    const isNowHeld = !answer.isHeld;
                    newSelectedAnswer = isNowHeld ? answer.id : (quiz.selectedAnswer === answer.id ? "" : quiz.selectedAnswer);
                    return {
                        id: answer.id,
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        isHeld: isNowHeld 
                    };
                }
                return answer; 
            });
    
            return {
                question: quiz.question,
                answers: answers,
                selectedAnswer: newSelectedAnswer
            };
        }));
    }

    function handleBegin() {
        setBeginQuiz(true)
    }

    function handleEnd() {
        setBeginQuiz(false)
        setEndQuiz(true)
    }

    function handleReset() {
        setBeginQuiz(false)
        setEndQuiz(false)
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

    const scoredQuizzesMap = quizzes.map((quiz, index) => (
        <ScoredQuiz 
            key={index}
            question={quiz.question}
            answers={quiz.answers}
            selectedAnswer={quiz.selectedAnswer}
        />
    ))

    console.log(correctAnswersCount)

    return (
        <main style={mainBackgroundSize}>

            {(!beginQuiz && !endQuiz ) &&
            <div className="begin--container">
                <h1 className="begin--header">QNA</h1>
                <h4 className="begin--description">Test your knowledge</h4>
                <button className="begin--button" onClick={handleBegin}>Start quiz</button>
            </div>
            }

            {(beginQuiz && !endQuiz) && 
            <div>
                {quizzesMap}
                <button className="quiz--check--button" onClick={handleEnd}>Check answers</button> 
            </div>
            }

            {(!beginQuiz && endQuiz ) &&
            <div>
                {scoredQuizzesMap}
                <div className="quiz--correct--container">
                    <h2>You scored {correctAnswersCount}/5 correct answers</h2>
                    <button className="quiz--again--button" onClick={handleReset}>Play again</button> 
                </div>
            </div>
            }
            
        </main>
    )
}