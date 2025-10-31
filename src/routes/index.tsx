import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { Link } from '@tanstack/react-router'
import HeroSection from '@/components/HeroSection'
import Categories from '@/components/Categories'
import FAQ from '@/components/FAQ'
import Features from '@/components/Features'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="text-center">
    
    <HeroSection/>
    <Categories/>
    <Features />
    <div className="empty h-[220px]"></div>
    <FAQ/>
    </main>
  )
}
