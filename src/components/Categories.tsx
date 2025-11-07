import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getCategories } from '../api/fetch'

const Categories = () => {
  const [categories, setCategories] = useState<Array<{ category: string }>>([])

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <div
      id="categories"
      className="h-full sm:h-screen flex flex-col items-start px-7 sm:px-14 w-full relative"
    >
      <div className="flex flex-col items-start gap-4 text-start mt-16 sm:mt-6">
        <span className="text-sm uppercase font-medium text-[#2563eb]">
          Explore categories
        </span>
        <h1 className="text-[25px] sm:text-3xl text-[#1d1d1d] font-semibold">
          Elevate your productivity to the next level
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row items-start justify-between w-full mt-16 gap-12">
        {/* === CARD 1 === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#2563eb] animate-gradient"
        >
          <div className="relative bg-white rounded-2xl p-6 flex flex-col items-start w-[300px] h-[300px] sm:w-[500px] sm:h-[360px] overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 opacity-100 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#60a5fa] via-[#2563eb] to-transparent pointer-events-none" />

            {/* Content */}
            <h2 className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent font-medium text-2xl relative z-10">
              Newest
            </h2>

            {/* Badge */}
            <span className="mt-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium relative z-10">
              12 new resources
            </span>

            <p className="text-[#1d1d1d] text-sm font-light mt-2 text-start relative z-10">
              Discover the latest additions to our platform and stay ahead with
              cutting-edge features.
            </p>

            <ul className="text-start mt-6 flex flex-col gap-4 w-full relative z-10">
              <li className="flex items-center gap-2">
                <div className="w-6 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
                React
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
                JavaScript
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
                CSS
              </li>
              <li className="hidden sm:flex items-center gap-2 text-black/70">
                <div className="w-6 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
                Coming Soon...
              </li>
            </ul>
          </div>
        </motion.div>

        {/* === CARD 2 === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#2563eb] animate-gradient"
        >
          <div className="bg-white rounded-2xl p-6 flex flex-col items-start  w-[300px] h-[300px] sm:w-[500px] sm:h-[360px] overflow-hidden">
            <h2 className="font-medium text-2xl bg-gradient-to-r from-[#1d1d1d] to-[#1d1d1d]/50 bg-clip-text text-transparent">
              General
            </h2>
            <p className="text-[#1d1d1d] text-sm font-light mt-2 text-start">
              Discover the other additions to our platform that are highly
              educative and productive.
            </p>
            <div className="grid grid-cols-2 items-start justify-between mt-6 gap-4 w-full">
              {categories.map((cat, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-[2px] bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
                    <h2 className="text-[13px]  sm:text-sm font-medium text-[#1d1d1d] text-start">
                      {cat.category}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Categories
