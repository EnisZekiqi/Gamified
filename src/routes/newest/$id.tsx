import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect } from 'react'
import reactquiz from './../../quizzes/react.json'
import javascriptquiz from './../../quizzes/javascript.json'
import cssquiz from './../../quizzes/css.json'
import { Link } from '@tanstack/react-router'
export const Route = createFileRoute('/newest/$id')({
  component: RouteComponent,
   loader: ({ params }) => ({ id: params.id }),
})


type QuizData = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

function RouteComponent() {

  const { id } = Route.useParams()
  const number = Number(id)

  // Normalize to an array of questions for all sources (some JSONs have { results: [...] })
  const [questions, setQuestions] = useState<QuizData[] | null>(null)
  const [indexValue, setIndexValue] = useState(0)

  // Initialize questions once when `number` changes
  useEffect(() => {
    setIndexValue(0)
    if (number === 1) {
      // reactquiz may have a `results` property
      // @ts-ignore
      setQuestions(reactquiz.results ?? reactquiz.results ?? reactquiz)
    } else if (number === 2) {
      // @ts-ignore
      setQuestions(javascriptquiz.results ?? javascriptquiz)
    } else if (number === 3) {
      // @ts-ignore
      setQuestions(cssquiz.results ?? cssquiz)
    } else {
      setQuestions(null)
    }
  }, [number])

  const currentQuestion = questions ? questions[indexValue] : undefined

  // Don't compute answers until we have a current question
  const allAnswers = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort()
    : []

  const [choose, setChoose] = useState<string>('')

    const handleAnswerChange=(answer:string)=>{
        setChoose(answer);
    }

    const [alert,setAlert]=useState<string>('');
    const handleAnswer=()=>{
        if (!currentQuestion) {
          setAlert('No question loaded.');
          return
        }

        const isCorrect = choose === currentQuestion.correct_answer;
        console.log(`Selected: ${choose}, Correct: ${currentQuestion.correct_answer}`);
        setAlert(isCorrect ? 'Correct answer!' : `Wrong answer! The correct answer was: ${currentQuestion.correct_answer}`);

        setTimeout(() => {
            setAlert('');
        }, 3000);

        // Go to next question if available
        if(choose.trim() === ''){
          setAlert('Please select an answer before proceeding.');
        } else {
          if (questions && indexValue < questions.length - 1) {
           setTimeout(() => {
             setIndexValue(indexValue + 1);
           }, 3000);
            setChoose('');
        
       const updateXp = {
        xp: isCorrect ? 115 : 0, // Award 10 XP for correct answers
      };

      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.xp = (parsedData.xp || 0) + updateXp.xp;
       
        localStorage.setItem('userData', JSON.stringify(parsedData));
      }  
        
        } else {
            setAlert('Quiz finished! Well done.');
          }
        }

      setTimeout(() => {
        setAlert('');
      }, 3000);
    }


  if (!questions || questions.length === 0) {
    return <div className="p-8">Loading quiz...</div>
  }

  return  <div className="p-8 h-[70vh] overflow-y-auto flex flex-col items-center justify-between w-full">
        <h1 className="text-2xl font-semibold mb-12 w-full text-start">
          Category: {currentQuestion?.category}
        </h1>
  
        <div className="mb-6 p-4 flex flex-col items-center">
          <h2
            className="text-2xl font-medium mb-2"
            dangerouslySetInnerHTML={{ __html: currentQuestion?.question ?? '' }}
          ></h2>
  
          <ul className="grid grid-cols-2 gap-4 list-disc list-inside items-start justify-center w-full mt-8">
            {allAnswers.map((answer, ansIndex) => (
              <li
                key={ansIndex}
                className="list-none text-lg font-base text-start text-black/70 hover:text-black transition-all duration-200"
              >
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${indexValue}`}
                    value={answer}
                    checked={choose === answer}
                    onChange={() => handleAnswerChange(answer)}
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ul>
          {alert && <div className="mt-4 text-md font-medium">{alert}</div>}
        </div>
  
        <div className="flex items-center justify-between w-full">
          <button><Link to="/quiz">Back to other Quizes</Link></button>
          <button
            onClick={handleAnswer}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
          >
            {indexValue < (questions ? questions.length - 1 : 0) ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
}
