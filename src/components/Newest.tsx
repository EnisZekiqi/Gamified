import { Link } from "@tanstack/react-router";


const Newest = () => {
    
     const newest = [
        {name:'React',describe:'React is a Frontend library created by Facebook , learn more from it',id:1}
        ,{name:'JavaScript',describe:'A programming language that is one of the core technologies of the World Wide Web',id:2}
        ,{name:'CSS',describe:'A style sheet language used for describing the presentation of a document',id:3}];


    return ( 
        <>
         <h1 className='text-[22px] font-medium'>Newest</h1>
    {newest.map((catName)=>(
        <Link 
        to="/newest/$id"
        params={{ id: catName.id }}
        key={catName.id} className='p-2 text-lg font-medium border border-[#E6E6E6] inset-shadow-sm inset-shadow-[#2563eb]/50 rounded-lg my-2'>
            <h3 className='text-lg'>{catName.name}</h3>
            <p className='text-sm font-light text-black/70'>{catName.describe}</p>
        </Link>
    ))}
        </>
     );
}
 
export default Newest;