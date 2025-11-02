import { motion,AnimatePresence } from "motion/react";
import { Link } from "lucide-react";
import Header from "./Header";
import { useNavigate } from "@tanstack/react-router";
import { useState,useEffect } from "react";
const HeroSection = () => {

     const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
          },
        },
    };
    
    const fadeInUp = {
        hidden: {
          opacity: 0,
          y: 10,
          filter: "blur(4px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.5,
          },
        },
      };


      const navigate = useNavigate();
      const [info,setInfo]=useState(false);/// modal activation when not logged in
      const [name,setName]=useState('');/// name state for input field
      const [error,setError]=useState('');/// error state for input field
        const handleGetStarted = () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setInfo(true);
      } else {
       navigate({ to: '/quiz' })
      }
    };

      useEffect(() => {
       if(info){
        document.body.style.overflow = 'hidden';
       }
       else{
        document.body.style.overflow = 'auto';
       }
      }, [info])

   const submitName = () => {
        if (name.trim().length > 0) {
          // ✅ Initialize XP with default value (0)
          const newUser = {
            name,
            xp: 0, // 👈 default XP value
            rank:'Beginner', // optional, if you want to track it too
            quizzesCompleted: 0, // optional, if you want to track it too
          };

          localStorage.setItem('userData', JSON.stringify(newUser));
          setInfo(false);
          navigate({ to: '/quiz' });
        } else {
          setError('Name cannot be empty');
          setTimeout(() => setError(''), 3000);
        }
      };
      

    return ( 
          <section className="relative h-screen w-full overflow-hidden flex flex-col items-start bg-white justify-center md:justify-start">
            <Header/>
      {/* Video Background */}
      <div className="empty h-[120px]"></div>
      {/* Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/0 z-[1]" />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://framerusercontent.com/assets/2Zb7xKsaB61aArojWHODHJZ3ew.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
        className="relative z-10 text-start flex flex-col p-14 items-start justify-center  md:justify-start text-white w-full">
                    <motion.h1
                     variants={fadeInUp}
                    className="text-balance text-[44px] sm:text-5xl md:text-[68px] font-medium text-[var(--primarytext)] z-0 leading-[43px] md:leading-none">
                      Learn with Gamified
                    </motion.h1>
       <div className="flex items-center justify-between w-full mt-6 pb-6 border-b border-white/30">
         <motion.p
           variants={fadeInUp}
          className="text-balance text-white/70 text-3xl font-normal max-w-md z-0">
                     Where Knowledge Begins
        </motion.p>
        <button onClick={handleGetStarted} className="explore text-white border border-white/50 rounded-full p-2.5 cursor-pointer text-sm font-medium">Start Exploring</button>
       </div>
        <motion.div
           variants={fadeInUp}
          className="flex items-end justify-end gap-4 mt-8 z-[100] w-full">
            <p className="text-white text-md font-light w-2/6 text-end text-balance">Discovery doesn't always begin with knowing. It starts with questions.Context that guide understanding forward,that's why we are here , to improve</p>
                  </motion.div>
      </motion.div>
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-0" />

      {/* Bottom Fade Mask */}
     
      <AnimatePresence>
        {info && 
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className="fixed bg-black/50 top-0 bottom-0 w-full h-full z-[999]" onClick={()=>setInfo(false)}></div>
      <div className="fixed bg-white flex flex-col items-start text-black p-3 rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[370px] z-[1000]">
        <h2 className="text-lg font-medium mt-0 mb-2">Please Log In</h2>
        <p className="text-sm font-light mb-4 text-start ">You need to have some identification in to start exploring the resources. Please log in or sign up to continue.</p>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="border border-[#2563eb] p-1.5 rounded-2xl focus:outline-0 mb-4 text-black w-full text-sm"  placeholder="Enter Name"/>
        {error && <span className="text-red-500 text-xs mb-2">{error}</span>}
        <div className="flex items-center justify-between w-full">
          <button onClick={submitName} className="bg-[#2563eb] text-white px-4 py-2 rounded-full mb-2">Log In</button>
           <button onClick={()=>setInfo(false)} className="bg-white text-black px-4 py-2 rounded-full mb-2">Close</button>
        </div>
       
      </div>
      </motion.div>
      }
      </AnimatePresence>

    </section>
     );
}
 
export default HeroSection;