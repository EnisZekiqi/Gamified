import { useState,useEffect } from "react";

const QuizHeader = () => {

    const [player, setPlayer] = useState('');
    const [totalXP, setTotalXP] = useState(0);
    const [rank, setRank] = useState('');
    const [congrats,setCongrats]=useState(false);
    // Load initial user data
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const parsedData = JSON.parse(userData);
            setPlayer(parsedData.name);
            setTotalXP(parsedData.xp || 0);
            setRank(parsedData.rank || 'Novice');
        }
    }, []); // Only run on mount

    // Handle rank progression
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (!userData) return;

        const parsedData = JSON.parse(userData);
        let shouldUpdate = false;
        
        // Check for rank progression
        if (parsedData.xp >= 200) {
            if (parsedData.rank === 'Novice') {
                parsedData.rank = 'Silver';
                shouldUpdate = true;
            } else if (parsedData.rank === 'Silver') {
                parsedData.rank = 'Gold';
                shouldUpdate = true;
            } else if (parsedData.rank === 'Gold') {
                parsedData.rank = 'Master';
                shouldUpdate = true;
            }

            if (shouldUpdate) {
                parsedData.xp -= 200;
                localStorage.setItem('userData', JSON.stringify(parsedData));
                setRank(parsedData.rank);
                setTotalXP(parsedData.xp);
                setCongrats(true);
            }
        }
    }, [totalXP]); // Only check when XP changes


    return ( 
        <header className="bg-white text-black flex items-center justify-between w-full p-4 shadow-sm">
          <div className="flex items-center justify-between w-full gap-4 px-4">
  {/* Player Info */}
  <h1 className="text-2xl font-semibold">{player}</h1>
  <div className="flex flex-col">
    <div className="flex items-center gap-2">
      <h2 className="font-light text-sm">Current Rank : </h2>
      <p className="text-sm text-black font-medium flex items-center gap-1">
        {rank} {rank === 'Novice' ? '🥉' : rank === 'Silver' ? '🥈' : '🥇'}
      </p>
    </div>

    {/* XP Progress Bar */}
    <div className="relative mt-2 w-[200px] h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500"
        style={{ width: `${(totalXP / 200) * 100}%` }} // Calculate percentage of progress
      />
      {/* XP Label on top of the bar */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-600">
        {totalXP} / 200 XP
      </div>
    </div>

    {/* Next Rank Indicator */}
    <div className="flex justify-between mt-1 text-xs text-gray-500">
<span>{rank} {rank === 'Novice' ? '🥉' : rank === 'Silver' ? '🥈' : rank === 'Gold' && '🥇'}      </span>
<span>{rank === 'Novice' ? '🥈' : rank === 'Silver' ? '🥇' : rank === 'Gold' && '🥇'} {rank === 'Novice' ? 'Silver' : rank === 'Silver' ? 'Gold': rank === 'Gold' && 'Master'}</span>
    </div>
  </div>
</div>

      {congrats && (
        <>
         <div className="fixed bg-black/60 top-0 right-0 left-0 bottom-0 w-full h-full " onClick={()=>setCongrats(false)}></div>
         <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50 w-96">
            <div className="p-8 bg-green-100 border border-green-400 text-green-700 rounded">
                <h2 className="text-2xl font-bold mb-4">🎉 Congrats </h2>
                <p className="text-lg">You've advanced to {rank} rank!</p>
            </div>
         </div>
        </>
      )}
        </header>
     );
}
 
export default QuizHeader;