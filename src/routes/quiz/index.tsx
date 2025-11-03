import { createFileRoute } from '@tanstack/react-router'
import { getCategoryList } from '@/api/fetch'
import QuizHeader from '@/components/QuizHeader'
import useFilter from '@/hooks/useFilter'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/quiz/')({
    loader:getCategoryList,
  component: Quiz,
  staleTime: 1000 * 60 * 5, // 5 minutes
})

type Categories = {
    id:number,
    name:string,
    
}

function Quiz() {
    const categories = Route.useLoaderData()


console.log(categories);


    const newest = [
        {name:'React',describe:'React is a Frontend library created by Facebook , learn more from it'}
        ,{name:'JavaScript',describe:'A programming language that is one of the core technologies of the World Wide Web'}
        ,{name:'CSS',describe:'A style sheet language used for describing the presentation of a document'}];

    const { filteredItems, query,handleSearch}=useFilter<Categories>(categories || [],['name']);
    
  return <div className='h-full'>
    <QuizHeader/>
   <div className="flex items-center justify-between w-full">
    <div className="flex flex-col items-start gap-2 px-8 py-4 border-b border-gray-300">
     <h1 className='text-2xl font-semibold'>Welcome to Quiz Page</h1>
     <p className='text-md font-light text-black/70'>Check every quiz from every category , available for you</p>
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
     <h1 className='text-[22px] font-medium'>Newest</h1>
    {newest.map((catName,index)=>(
        <div key={index} className='p-2 text-lg font-medium border border-[#E6E6E6] inset-shadow-sm inset-shadow-[#2563eb]/50 rounded-lg my-2'>
            <h3 className='text-lg'>{catName.name}</h3>
            <p className='text-sm font-light text-black/70'>{catName.describe}</p>
        </div>
    ))}
    
    <h1 className='text-[22px] font-medium mt-8'>All Categories</h1>
    <div className="grid grid-cols-4 gap-4">
        {filteredItems.map((cat:Categories)=>(
        <Link
          to="/quiz/$categoryId"
          params={{ categoryId: cat.id }}
        key={cat.id} className='p-2 text-lg font-medium border border-[#E6E6E6] inset-shadow-sm inset-shadow-[#2563eb]/50 rounded-lg my-2'>
            {cat.name}
        </Link>
    ))}
    </div>
   </div>
    </div>
}
