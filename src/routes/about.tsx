import { createFileRoute } from '@tanstack/react-router'
import { useState,useEffect } from 'react'
export const Route = createFileRoute('/about')({
  loader:async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    return res.json()
  },
  component: About,
})

function About() {


  const [count, setCount] = useState(0)

  const posts = Route.useLoaderData()

  useEffect(() => {
    console.log('fetched:',posts)
  }, [])
  

    return(
        <>
        Welcome to About
        <button className='bg-black text-white' onClick={()=>setCount(count + 1)}>{count}</button>
        {posts.map((p:any)=>(
          <p key={p.id}>
            {p.title}
          </p>
        ))}
        </>
    )
} 
