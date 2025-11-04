import { getCategoryID } from '@/api/fetch'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const Route = createFileRoute('/quiz/$id')({
  component: QuizDetail,
  loader: ({ params }) => ({ id: params.id }),
})

type QuizQuestion = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

function QuizDetail() {
  const { id } = Route.useParams()
  const number = Number(id)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryID(number),
    retry: 1,
  })

  const [choose, setChoose] = useState<string>('')
  const [indexValue, setIndexValue] = useState<number>(0)
  const [alert, setAlert] = useState<string>('')
  if (isLoading) return <div className="p-8">Loading quiz...</div>
  if (isError) return <div className="p-8">Error: {error?.message || 'Failed to load quiz'}</div>
  if (!data || data.length === 0) return <div className="p-8">No quiz data found</div>

  // ✅ Safe now — data definitely exists
  const currentQuestion = data[indexValue]
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort()

  const handleAnswerChange = (answer: string) => {
    setChoose(answer)
  }

  const handleAnswer = () => {
    const isCorrect = choose === currentQuestion.correct_answer
    console.log(`Selected: ${choose}, Correct: ${currentQuestion.correct_answer}`)
       setAlert(isCorrect ? 'Correct answer!' : `Wrong answer! The correct answer was: ${currentQuestion.correct_answer}`)

    
    // Go to next question if available

    if (choose.trim() === '') {
      setAlert('Please select an answer before proceeding.')
      setIndexValue(indexValue)
    }

  setTimeout(() => {
    setAlert('')
  }, 3000);

    if (indexValue < data.length - 1) {
      setTimeout(() => {
        setIndexValue((prev) => prev + 1)
      }, 3000);
      setChoose('')
      
       const updateXp = {
        xp: isCorrect ? 15 : 0, // Award 10 XP for correct answers
      };

      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.xp = (parsedData.xp || 0) + updateXp.xp;
       
        localStorage.setItem('userData', JSON.stringify(parsedData));
      }
        
    } else {
      alert('🎉 You finished the quiz!')
    }
  }

  return (
    <div className="p-8 h-[70vh] overflow-y-auto flex flex-col items-center justify-between w-full">
      <h1 className="text-2xl font-semibold mb-12 w-full text-start">
        Category: {currentQuestion.category}
      </h1>

      <div className="mb-6 p-4 flex flex-col items-center">
        <h2
          className="text-2xl font-medium mb-2"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
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
          {indexValue < data.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  )
}
