import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'
import DashboardLayout from './layouts/DashBoardLayout'  

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import RankingsPage from './pages/admin/RankingsPage'
import StudentDetailPage from './pages/admin/StudentDetailPage'
import BranchAnalyticsPage from './pages/admin/BranchAnalyticsPage'
import SectionAnalyticsPage from './pages/admin/SectionAnalyticsPage'
import SubjectAnalyticsPage from './pages/admin/SubjectAnalyticsPage'
import FailureAnalyticsPage from './pages/admin/FailureAnalyticsPage'

import StudentDashboard from './pages/student/StudentDashboard'
import StudentResultsPage from './pages/student/StudentResultsPage'
import StudentBacklogPage from './pages/student/StudentBacklogPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute role="admin" />}>
              <Route element={<DashboardLayout />}>
                <Route path="/admin"                       element={<AdminDashboard />} />
                <Route path="/admin/rankings"              element={<RankingsPage />} />
                <Route path="/admin/students/:roll_no"     element={<StudentDetailPage />} />  
                <Route path="/admin/branch"                element={<BranchAnalyticsPage />} />
                <Route path="/admin/section"               element={<SectionAnalyticsPage />} />
                <Route path="/admin/subjects"              element={<SubjectAnalyticsPage />} />
                <Route path="/admin/failures"              element={<FailureAnalyticsPage />} />
              </Route>
            </Route>
          </Route>

          {/* Student routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute role="student" />}>
              <Route element={<DashboardLayout />}>
                <Route path="/student"          element={<StudentDashboard />} />
                <Route path="/student/results"  element={<StudentResultsPage />} />
                <Route path="/student/backlogs" element={<StudentBacklogPage />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}