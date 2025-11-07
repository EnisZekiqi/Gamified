import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FAQ = () => {
  const [showFAQ, setShowFAQ] = useState('')

  const faqs = [
    {
      id: 'What is KazeAnime?',
      description:
        'KazeAnime is an anime discovery platform powered by the Jikan API. You can explore trending series, detailed character info, and search for your favorite anime all in one place.',
    },
    {
      id: 'Where does the anime data come from?',
      description:
        'All anime and manga information on KazeAnime is sourced from the Jikan API, an open-source REST API for MyAnimeList data.',
    },
    {
      id: 'Can I watch anime directly on KazeAnime?',
      description:
        "No, KazeAnime is not a streaming site. It's designed to help you explore, learn about, and track anime titles, characters, and related info.",
    },
    {
      id: 'How often is the data updated?',
      description:
        'The data is fetched live from the Jikan API, which stays in sync with MyAnimeList. This means you’ll always get up-to-date info on new episodes, characters, and rankings.',
    },
    {
      id: 'Can I save my favorite anime?',
      description:
        'Not yet — but we’re planning to add a favorites feature soon so you can bookmark the anime you love and access them anytime.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      id="faq"
      className="flex flex-col lg:flex-row items-start justify-between w-full h-full gap-10 md:gap-0 px-7 sm:px-14 mb-10"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-start gap-4"
      >
        <span className="font-medium text-md text-[#2563eb]">
          GOT QUESTIONS?
        </span>
        <h1 className="font-semibold text-[25px] sm:text-3xl text-black text-start">
          Everything You Need to Know, All in One Place
        </h1>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-start sm:items-start md:items-end gap-2 w-full"
      >
        {faqs.map((faq, index) => (
          <motion.div
            layout
            onClick={() => setShowFAQ(showFAQ === faq.id ? '' : faq.id)}
            key={index}
            className={`p-3 border ${showFAQ === faq.id ? 'border-[#2563eb]' : 'border-white/40'}  rounded-2xl w-full sm:w-[500px] bg-[#fff] text-black cursor-pointer shadow-sm transition-all duration-300`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2 text-md sm:text-lg font-medium text-start">
                {faq.id}
              </div>
              <motion.div
                animate={{ rotate: showFAQ === faq.id ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              ></motion.div>
            </div>

            <AnimatePresence initial={false}>
              {showFAQ === faq.id && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 60, y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden text-sm text-[#1d1d1d] text-start mt-2"
                >
                  {faq.description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default FAQ
