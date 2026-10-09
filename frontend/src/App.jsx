import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import AdminDashboard from './pages/AdminDashboard'
import ComplaintDetails from './pages/ComplaintDetails'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import MyComplaints from './pages/MyComplaints'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import SubmitComplaint from './pages/SubmitComplaint'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute role="student" />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route path="/complaints" element={<MyComplaints />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/complaints/:id" element={<ComplaintDetails />} />
          </Route>
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
        <footer>Campus Voice <span>·</span> built for clearer campus conversations</footer>
      </AuthProvider>
    </BrowserRouter>
  )
}
