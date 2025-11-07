import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AnimatePresence,motion } from 'motion/react'
import { getCategories } from '@/api/fetch'
import useLastSeen from '@/hooks/useLastSeen'

export const Route = createFileRoute('/users')({
  component: RouteComponent,
  loader: getCategories,
})

function RouteComponent() {

  const [player, setPlayer] = useState('')
  const [totalXP, setTotalXP] = useState(0)
  const [rank, setRank] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)
  const [inputValue, setInputValue] = useState('')
  // Load initial user data
  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      const parsedData = JSON.parse(userData)
      setPlayer(parsedData.name)
      setTotalXP(parsedData.xp || 0)
      setRank(parsedData.rank || 'Novice')
    }
  }, [])

  // Update player name in localStorage when inputValue changes
  useEffect(() => {
    if (inputValue.trim() === '') return // Ignore empty names
    const userData = localStorage.getItem('userData')
    const parsedData = userData ? JSON.parse(userData) : {}
    parsedData.name = inputValue
    localStorage.setItem('userData', JSON.stringify(parsedData))
    setPlayer(inputValue)
  }, [inputValue])

  useEffect(() => {
    if (rank === 'Silver' || rank === 'Gold') {
      setTotalXP((prev) => prev + 200)
    }
  }, [rank])

  const resetRanking = () => {
    setRank('Novice')
    setTotalXP(0)
    const userData = localStorage.getItem('userData')
    const parsedData = userData ? JSON.parse(userData) : {}
    parsedData.rank = 'Novice'
    parsedData.xp = 0
    localStorage.setItem('userData', JSON.stringify(parsedData))
  }

  const { lastSeen } = useLastSeen<{ id: number; name: string }>()

  return (
    <div className="flex flex-col items-start gap-t p-7 h-[100vh]">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-1 mt-10">
          <h2 className="text-md font-light">Player Name: </h2>
          <span className="text-md font-medium text-black">{player}</span>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Change Name"
          className="p-1 text-black rounded focus:outline-0 border border-[#2563eb]/50"
        />
      </div>
      <div className="flex flex-col items-start gap-4 mt-4">
        <div className="flex items-center gap-1">
          <h2 className="text-md font-light">Total XP: </h2>
          <span className="text-md font-medium text-black">{totalXP}</span>
        </div>
        <div className="flex items-center gap-1">
          <h2 className="text-md font-light">Current Rank: </h2>
          <span className="text-md font-medium text-black">
            {rank === 'Novice'
              ? '🥉'
              : rank === 'Silver'
                ? '🥈'
                : rank === 'Gold' && '🥇'}{' '}
            {rank}
          </span>
        </div>
        <button
          className="p-2 rounded-lg bg-[#2563eb] text-white"
          onClick={() => setConfirmReset(true)}
        >
          Reset Rank
        </button>
      </div>
      <div className="flex flex-col items-start gap-4 mt-10 w-full">
        <h2 className="text-xl font-semibold">Recently Visited Quizzes</h2>
        {lastSeen.length === 0 ? (
          <p className="text-md font-light text-black/70">
            You have not visited any quizzes yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2 w-full">
            {lastSeen.slice(0, 5).map((cat) => (
              <Link
                to="/quiz/$id"
                params={{ id: String(cat.id) }}
                key={cat.id}
              >
                <li className="text-md font-medium text-black/80 border border-[#2563eb]/50 rounded p-2">
                  {cat.name}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <AnimatePresence>
        {confirmReset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
              <h2 className="text-lg font-semibold">Confirm Reset</h2>
              <p className="text-md font-light">
                Are you sure you want to reset your rank and XP?
              </p>
              <div className="flex items-center gap-4">
                <button
                  className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 transition-all duration-200"
                  onClick={() => {
                    resetRanking()
                    setConfirmReset(false)
                  }}
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 cursor-pointer text-black rounded hover:bg-gray-400 transition-all duration-200"
                  onClick={() => setConfirmReset(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
