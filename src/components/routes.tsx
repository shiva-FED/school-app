import { useAuth } from "../hooks/useAuth";
import Login from "../features/auth/Login";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";

const AdminDashboard = lazy(() => import('../features/admin/AdminDashboard'));
const TeacherDashboard = lazy(() => import('../features/teacher/TeacherDashboard'));
const StudentDashboard = lazy(() => import('../features/student/StudentDashboard'));

export default function Routes() {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!user) return <Login />;

   return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <RouterRoutes>
        <Route path="/" element={<Login />} />
        <Route path="/teachers" element={role === "teacher" ? <TeacherDashboard /> : <Navigate to="/" />} />
        <Route path="/students" element={role === "student" ? <StudentDashboard /> : <Navigate to="/" />} />
        <Route path="/adminDashboard" element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
      {/* {role === "admin" && <AdminDashboard />}
      {role === "teacher" && <TeacherDashboard />}
      {role === "student" && <StudentDashboard />} */}
    </Suspense>
  );
}