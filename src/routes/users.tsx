import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
export const Route = createFileRoute('/users')({
  component: RouteComponent,
})

function RouteComponent() {
    
    const {data,isLoading}=useQuery({
        queryKey:['posts'],
        queryFn:async () => {
         const  res = await fetch('https://jsonplaceholder.typicode.com/posts')
            return res.json()
        }
    })

    if (isLoading) {
        return <div className='text-black'>Loading</div>
    }

  return <div>Hello "/users"!

    {data.slice(0,10).map((item:any)=>(
        <p key={item.id}>
            <p>{item.title}</p>
        </p>
    ))}

  </div>
}
