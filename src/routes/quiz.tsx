import { createFileRoute } from '@tanstack/react-router'
import { getCategoryList } from '@/api/fetch'
import QuizHeader from '@/components/QuizHeader'


export const Route = createFileRoute('/quiz')({
    loader:getCategoryList,
  component: RouteComponent,
})

type Categories = {
    id:number,
    name:string
}

function RouteComponent() {

    const categories = Route.useLoaderData()

    const newest = ['React','JavaScript','CSS']
    
  return <div className='h-full'>
    <QuizHeader/>
    Welcome to Quiz Page!
    <h1 className='text-2xl font-medium'>Newest</h1>
    {newest.map((catName)=>(
        <p key={catName}>
            {catName}
        </p>
    ))}
    
    <h1 className='text-2xl font-medium'>All Categories</h1>
    {categories.map((cat:Categories)=>(
        <p key={cat.id}>
            {cat.name}
        </p>
    ))}
    </div>
}
