import { Link, createFileRoute  } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { getCategoryList } from '@/api/fetch'
import QuizHeader from '@/components/QuizHeader'
import useFilter from '@/hooks/useFilter'
import Newest from '@/components/Newest'
import useLastSeen from '@/hooks/useLastSeen'

export const Route = createFileRoute('/quiz/')({
  loader: getCategoryList,
  component: Quiz,
  staleTime: 1000 * 60 * 5, // 5 minutes
})

type Categories = {
  id: number
  name: string
}

function Quiz() {
  const categories = Route.useLoaderData()

  const { add } = useLastSeen<Categories>()

  const { filteredItems, query, handleSearch } = useFilter<Categories>(
    categories || [],
    ['name'],
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <QuizHeader />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-8">
        <div className="flex flex-col items-start gap-2 px-8 py-4">
          <h1 className="text-2xl font-semibold">Welcome to Quiz Page</h1>
          <p className="text-md font-light text-black/70">
            Check every quiz from every category , available for you
          </p>
        </div>
        <div className="flex items-center justify-end px-8 ">
          <input
            value={query}
            onChange={handleSearch}
            type="text"
            placeholder="Search Quiz by Category"
            className="border border-gray-300 rounded-lg p-2 focus:outline-0 w-64"
          />
        </div>
      </div>
      <div className="flex flex-col items-start px-8 py-8">
        <Newest />

        <h1 className="text-[22px] font-medium mt-8">All Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((cat: Categories) => (
            <Link
              to="/quiz/$categoryId"
              params={{ categoryId: cat.id }}
              onClick={() => add(cat)}
              key={cat.id}
              className="p-2 text-lg font-medium border border-[#2563eb]/50 inset-shadow-sm hover:border-[#2563eb]/80 transition-all duration-200 inset-shadow-[#2563eb]/50 rounded-lg my-2"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
