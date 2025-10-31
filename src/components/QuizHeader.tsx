import { useState,useEffect } from "react";

const QuizHeader = () => {

    const [player,setPlayer]=useState('');
    const [totalXP,setTotalXP]=useState(0);
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if(userData){
            const parsedData = JSON.parse(userData);
            setPlayer(parsedData.name);
            setTotalXP(parsedData.xp || 0);
        }
    }, [])

    return ( 
        <header className="bg-white text-black p-4 shadow-md">
            <h1 className="text-2xl font-bold">{player}</h1>
            <p>Total XP : {totalXP}</p>
            <p className="mt-1">Test your knowledge across various categories.</p>
        </header>
     );
}
 
export default QuizHeader;