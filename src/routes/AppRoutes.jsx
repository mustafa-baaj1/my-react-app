import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'
import CourseDetails from '../pages/CourseDetails'
import Courses from '../pages/Courses'
import Home from '../pages/Home'
import Learning from '../pages/Learning'
import Login from '../pages/Login'
import MyCourses from '../pages/MyCourses'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import Register from '../pages/Register'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="learn/:courseId" element={<Learning />} />
          <Route path="learn/:courseId/:lessonId" element={<Learning />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
