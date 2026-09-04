import CategoriesSection from '../../components/home/CategoriesSection'
import CtaSection from '../../components/home/CtaSection'
import FeaturedCoursesSection from '../../components/home/FeaturedCoursesSection'
import HeroSection from '../../components/home/HeroSection'
import LearningPathSection from '../../components/home/LearningPathSection'
import StatsSection from '../../components/home/StatsSection'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import WhyLearnovaSection from '../../components/home/WhyLearnovaSection'
import './Home.css'

function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <WhyLearnovaSection />
      <LearningPathSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}

export default Home
