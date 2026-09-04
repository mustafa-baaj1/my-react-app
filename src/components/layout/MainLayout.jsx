import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function MainLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">انتقل إلى المحتوى الرئيسي</a>
      <Navbar />
      <main className="main-content" id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
