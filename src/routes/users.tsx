import { createFileRoute } from '@tanstack/react-router'
import { getCategories } from '@/api/fetch'
import { useState,useEffect } from 'react'
export const Route = createFileRoute('/users')({
  component: RouteComponent,
  loader:getCategories,
})

function RouteComponent() {

   const categories = Route.useLoaderData()

   const [player, setPlayer] = useState('');
    const [totalXP, setTotalXP] = useState(0);
    const [rank, setRank] = useState('');
    const [lastSeen, setLastSeen] = useState([]);

    const [inputValue, setInputValue] = useState('');
    // Load initial user data
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const parsedData = JSON.parse(userData);
            setPlayer(parsedData.name);
            setTotalXP(parsedData.xp || 0);
            setRank(parsedData.rank || 'Novice');
        }
    }, []);

    // Update player name in localStorage when inputValue changes
    useEffect(() => {
        if (inputValue.trim() === '') return; // Ignore empty names
        const userData = localStorage.getItem("userData");
        let parsedData = userData ? JSON.parse(userData) : {};
        parsedData.name = inputValue;
        localStorage.setItem("userData", JSON.stringify(parsedData));
        setPlayer(inputValue);
    }, [inputValue]);


  useEffect(() => {
   const storedLastSeen = localStorage.getItem('lastVisitedQuiz');
    if (storedLastSeen) {
      const seenCategories = categories.filter(cat => cat.id === Number(storedLastSeen));
      setLastSeen(seenCategories);
    }
  }, [])
  
  

  return <div className='flex flex-col items-start gap-t p-7'>
    <h1 className='text-2xl font-semibold'>Settings</h1>
   <div className="flex flex-col items-start gap-4">
     <div className="flex items-center gap-1 mt-7">
      <h2 className='text-md font-light'>Player Name: </h2>
      <span className='text-md font-medium text-black'>{player}</span>
    </div>
    <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='Change Name' className='p-1 text-black rounded focus:outline-0 border border-[#2563eb]/50' />
   </div>
    <div className="flex flex-col items-start gap-4 mt-4">
      <div className="flex items-center gap-1">
      <h2 className='text-md font-light'>Total XP: </h2>
      <span className='text-md font-medium text-black'>{totalXP}</span>
    </div>
    <div className="flex items-center gap-1">
      <h2 className='text-md font-light'>Current Rank: </h2>
      <span className='text-md font-medium text-black'>{rank === 'Novice' ? '🥉' : rank === 'Silver' ? '🥈' : rank === 'Gold' && '🥇'} {rank}</span>
    </div>
    </div>
    <div className="flex flex-col items-start gap-4 mt-4 w-full">
      <h2 className='text-xl font-semibold'>Recently Visited Quizzes</h2>
      {lastSeen.length === 0 ? (
        <p className='text-md font-light text-black/70'>You have not visited any quizzes yet.</p>
      ) : (
        <ul className='flex flex-col gap-2 w-full'>
          {lastSeen.map((cat) => (
            <li key={cat.id} className='text-md font-medium text-black/80 border border-[#2563eb]/50 rounded p-2'>
              {cat.name}
            </li>
          ))}
        </ul>
      )}
      </div>

  </div>
}
