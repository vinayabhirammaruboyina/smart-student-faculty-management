import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/auth/LoginPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentTimetable from './pages/student/StudentTimetable';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentQRScanner from './pages/student/StudentQRScanner';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentLeave from './pages/student/StudentLeave';
import StudentGrades from './pages/student/StudentGrades';
import StudentNotifications from './pages/student/StudentNotifications';
import StudentProfile from './pages/student/StudentProfile';
import StudentSettings from './pages/student/StudentSettings';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyClasses from './pages/faculty/FacultyClasses';
import FacultyAttendance from './pages/faculty/FacultyAttendance';
import FacultyQRGenerator from './pages/faculty/FacultyQRGenerator';
import FacultyAssignments from './pages/faculty/FacultyAssignments';
import FacultySubmissions from './pages/faculty/FacultySubmissions';
import FacultyGrades from './pages/faculty/FacultyGrades';
import FacultyLeave from './pages/faculty/FacultyLeave';
import FacultyStudents from './pages/faculty/FacultyStudents';
import FacultyNotifications from './pages/faculty/FacultyNotifications';
import FacultyProfile from './pages/faculty/FacultyProfile';
import FacultySettings from './pages/faculty/FacultySettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminStudents from './pages/admin/AdminStudents';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminSubjects from './pages/admin/AdminSubjects';
import AdminTimetable from './pages/admin/AdminTimetable';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminAssignments from './pages/admin/AdminAssignments';
import AdminLeave from './pages/admin/AdminLeave';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: { borderRadius: '12px', fontSize: '14px', maxWidth: '380px' },
                success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
                error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
              }}
            />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Student Routes */}
              <Route element={<ProtectedRoute allowedRoles={['student']}><AppLayout /></ProtectedRoute>}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/timetable" element={<StudentTimetable />} />
                <Route path="/student/attendance" element={<StudentAttendance />} />
                <Route path="/student/qr-scan" element={<StudentQRScanner />} />
                <Route path="/student/assignments" element={<StudentAssignments />} />
                <Route path="/student/leave" element={<StudentLeave />} />
                <Route path="/student/grades" element={<StudentGrades />} />
                <Route path="/student/notifications" element={<StudentNotifications />} />
                <Route path="/student/profile" element={<StudentProfile />} />
                <Route path="/student/settings" element={<StudentSettings />} />
              </Route>

              {/* Faculty Routes */}
              <Route element={<ProtectedRoute allowedRoles={['faculty']}><AppLayout /></ProtectedRoute>}>
                <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
                <Route path="/faculty/classes" element={<FacultyClasses />} />
                <Route path="/faculty/attendance" element={<FacultyAttendance />} />
                <Route path="/faculty/qr-attendance" element={<FacultyQRGenerator />} />
                <Route path="/faculty/assignments" element={<FacultyAssignments />} />
                <Route path="/faculty/submissions" element={<FacultySubmissions />} />
                <Route path="/faculty/grades" element={<FacultyGrades />} />
                <Route path="/faculty/leave" element={<FacultyLeave />} />
                <Route path="/faculty/students" element={<FacultyStudents />} />
                <Route path="/faculty/notifications" element={<FacultyNotifications />} />
                <Route path="/faculty/profile" element={<FacultyProfile />} />
                <Route path="/faculty/settings" element={<FacultySettings />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']}><AppLayout /></ProtectedRoute>}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/students" element={<AdminStudents />} />
                <Route path="/admin/faculty" element={<AdminFaculty />} />
                <Route path="/admin/departments" element={<AdminDepartments />} />
                <Route path="/admin/subjects" element={<AdminSubjects />} />
                <Route path="/admin/timetable" element={<AdminTimetable />} />
                <Route path="/admin/attendance" element={<AdminAttendance />} />
                <Route path="/admin/assignments" element={<AdminAssignments />} />
                <Route path="/admin/leave" element={<AdminLeave />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
