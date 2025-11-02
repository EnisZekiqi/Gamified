
import { getCategoryID } from '@/api/fetch'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/quiz/$id')({
  component: QuizDetail,
  loader: ({ params }) => {
    return {
      id: params.id
    }
  }
})

function QuizDetail() {
  const { id } = Route.useParams();
  const number = Number(id);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryID(number),
    retry: 1,
  })

  const category = data && data.length > 0 ? data[0].category : 'Unknown';

  if (isLoading) return <div className="p-8">Loading quiz...</div>
  if (isError) return <div className="p-8">Error: {error?.message || 'Failed to load quiz'}</div>
  if (!data) return <div className="p-8">No quiz data found</div>



  return <div className="p-8">
      <h1 className="text-2xl font-semibold"> Category : {category} </h1>
      {data.map((question, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-medium mb-2" dangerouslySetInnerHTML={{ __html: question.question }}></h2>
          <ul className="list-disc list-inside">
            {[...question.incorrect_answers, question.correct_answer].sort().map((answer, ansIndex) => (
              <li key={ansIndex} dangerouslySetInnerHTML={{ __html: answer }}></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
}
