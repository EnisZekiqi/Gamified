import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, X } from 'lucide-react'
import { SlArrowUp } from "react-icons/sl";
import { AnimatePresence, motion } from 'motion/react';
import { SiReact,SiJavascript,SiCss3   } from "react-icons/si";

type Navbar = {
  name:string,
  link?:string
  
}

export default function Header() {
 
  const [explore,setExplore]=useState('')


  const navbar = [
    {name:'Features',link:'',access:<SlArrowUp size={10}/>},
    {name:'Newest',link:'',access:<SlArrowUp size={10}/>},
    {name:'Categories',link:''},
    {name:'FAQ',link:''}
  ]


  return (
    <>
      <header className="px-14 relative py-4 flex items-center gap-6 justify-center  text-white w-full z-50">
        <h1 className=" text-xl font-semibold text-white">
         Gamified
        </h1>
      <div className="relative flex items-center gap-4 mt-1">
  {navbar.map((item: Navbar) => (
    <div
      key={item.name}
      className="relative"
      onMouseEnter={() => setExplore(item.name)}
      onMouseLeave={() => setExplore('')}
    >
      {/* Main link */}
      <p className="text-white/70 flex items-center gap-2 hover:text-white transition-all duration-200 cursor-pointer select-none">
        <span>{item.name}</span>
        {item.access && (
          <motion.span
            animate={{ rotate: explore === item.name ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.access}
          </motion.span>
        )}
      </p>

      {/* Dropdown */}
      <AnimatePresence>
        {(explore === "Newest" && item.name === "Newest") && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className=" absolute left-0 top-8  text-black bg-white border border-white/10 rounded-2xl p-3 shadow-lg backdrop-blur-md min-w-[180px] z-40"
          >
            <div className="grid grid-cols-1 gap-2">
              <button className="flex items-center gap-2 hover:bg-white/10 rounded-md px-2 py-1 transition">
                <SiReact size={16} className="text-sky-400" />
                <span>React</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-white/10 rounded-md px-2 py-1 transition">
                <SiJavascript size={16} className="text-yellow-300" />
                <span>JavaScript</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-white/10 rounded-md px-2 py-1 transition">
                <SiCss3 size={16} className="text-blue-400" />
                <span>CSS</span>
              </button>
            </div>
          </motion.div>
        )}

        {(explore === "Features" && item.name === "Features") && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className=" absolute left-0 top-8 text-black bg-white border border-white/10 rounded-2xl p-3 shadow-lg backdrop-blur-md min-w-[200px] z-40"
          >
            <div><motion.div
                       
                        className="flex flex-col items-start gap-4 justify-between">
                            <div className="flex flex-col items-start gap-2">
                               <div className="flex items-center gap-2">
                                 <img src="https://framerusercontent.com/images/8XloMG9slaAAviwFXnArBqT18Y.svg" className='w-6 h-6' alt="" />
                                <h2 className="text-md font-medium text-[#1d1d1d]">Productivity</h2>
                               </div>
                                <p className="text-xs font-light text-[#4b4b4b] max-w-sm text-start">Boost your efficiency with tools designed to streamline your workflow and enhance focus.</p>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <div className="flex items-center gap-2">
                                    <img src="https://framerusercontent.com/images/fP8VSisvho3qaGtdE1UDgWG1N3g.svg" className='w-6 h-6' alt="" />
                                <h2 className="text-md font-medium text-[#1d1d1d]">Creativity</h2>
                                </div>
                                <p className="text-xs font-light text-[#4b4b4b] max-w-sm text-start">Unleash your creative potential with innovative features that inspire and empower your ideas.</p>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                               <div className="flex items-center gap-2">
                                 <img src="https://framerusercontent.com/images/oI6jpPOLQDHv6FbcH28j1VQ8.svg" className='w-6 h-6' alt="" />
                                <h2 className="text-md font-medium text-[#1d1d1d]">Collaboration</h2>
                               </div>
                                <p className="text-xs font-light text-[#4b4b4b] max-w-sm text-start">Enhance teamwork with seamless communication and project management tools.</p>
                            </div>
                        </motion.div>
                        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
</div>

        
      </header>
      
    </>
  )
}
