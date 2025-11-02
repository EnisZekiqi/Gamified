import { useState,useEffect } from "react";

const QuizHeader = () => {

    const [player,setPlayer]=useState('');
    const [totalXP,setTotalXP]=useState(0);
    const [rank,setRank]=useState('');
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if(userData){
            const parsedData = JSON.parse(userData);
            setPlayer(parsedData.name);
            setTotalXP(parsedData.xp || 0);
            setRank(parsedData.rank || 'Novice');
        }
    }, [])

    return ( 
        <header className="bg-white text-black flex items-center justify-between w-full p-4 shadow-sm">
          <div className="flex items-center justify-between w-full gap-4 px-4">
  {/* Player Info */}
  <h1 className="text-2xl font-semibold">{player}</h1>
  <div className="flex flex-col">
    <div className="flex items-center gap-2">
      <h2 className="font-light text-sm">Current Rank : </h2>
      <p className="text-sm text-black font-medium flex items-center gap-1">
        {rank} <span><svg width='20px' viewBox="0 0 120 120" id="Layer_1" version="1.1"  xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <g> <polygon className="st0" points="75.7,107.4 60,97.5 44.3,107.4 44.3,41.1 75.7,41.1 "></polygon> <circle className="st1" cx="60" cy="44.8" r="32.2"></circle> <circle className="st2" cx="60" cy="44.8" r="25.3"></circle> <path className="st3" d="M61.2,29.7l4.2,8.4c0.2,0.4,0.6,0.7,1,0.8l9.3,1.4c1.1,0.2,1.6,1.5,0.8,2.3l-6.7,6.6c-0.3,0.3-0.5,0.8-0.4,1.2 l1.6,9.3c0.2,1.1-1,2-2,1.4l-8.3-4.4c-0.4-0.2-0.9-0.2-1.3,0L51,61.1c-1,0.5-2.2-0.3-2-1.4l1.6-9.3c0.1-0.4-0.1-0.9-0.4-1.2 l-6.7-6.6c-0.8-0.8-0.4-2.2,0.8-2.3l9.3-1.4c0.4-0.1,0.8-0.3,1-0.8l4.2-8.4C59.3,28.7,60.7,28.7,61.2,29.7z"></path> </g> </g></svg>
 </span>
      </p>
    </div>

    {/* XP Progress Bar */}
    <div className="relative mt-2 w-[220px] h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500"
        style={{ width: totalXP }} // dynamic value based on XP
      />
      {/* XP Label on top of the bar */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-600">
        45 / 100 XP
      </div>
    </div>

    {/* Next Rank Indicator */}
    <div className="flex justify-between mt-1 text-xs text-gray-500">
      <span className="flex items-center gap-0"><svg width='20px' viewBox="0 0 120 120" id="Layer_1" version="1.1"  xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <g> <polygon className="st0" points="75.7,107.4 60,97.5 44.3,107.4 44.3,41.1 75.7,41.1 "></polygon> <circle className="st1" cx="60" cy="44.8" r="32.2"></circle> <circle className="st2" cx="60" cy="44.8" r="25.3"></circle> <path className="st3" d="M61.2,29.7l4.2,8.4c0.2,0.4,0.6,0.7,1,0.8l9.3,1.4c1.1,0.2,1.6,1.5,0.8,2.3l-6.7,6.6c-0.3,0.3-0.5,0.8-0.4,1.2 l1.6,9.3c0.2,1.1-1,2-2,1.4l-8.3-4.4c-0.4-0.2-0.9-0.2-1.3,0L51,61.1c-1,0.5-2.2-0.3-2-1.4l1.6-9.3c0.1-0.4-0.1-0.9-0.4-1.2 l-6.7-6.6c-0.8-0.8-0.4-2.2,0.8-2.3l9.3-1.4c0.4-0.1,0.8-0.3,1-0.8l4.2-8.4C59.3,28.7,60.7,28.7,61.2,29.7z"></path> </g> </g></svg> {rank}</span>
      <span>🥈 Silver</span>
    </div>
  </div>
</div>


        </header>
     );
}
 
export default QuizHeader;