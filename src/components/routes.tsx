import { useAuth } from "../hooks/useAuth";
import Login from "../features/auth/Login";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import TeacherDashboard from "../features/teacher/TeacherDashboard";

const AdminPage = lazy(() => import('../pages/AdminPage'));
const TeachersPage = lazy(() => import('../pages/TeachersPage'));
const StudentsPage = lazy(() => import('../pages/StudentsPage'));

export default function Routes() {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Login />;

   return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <RouterRoutes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/teachers" element={role === "admin" ? <TeachersPage /> : <Navigate to="/" />} />
        <Route path="/admin/students" element={role === "admin" ? <StudentsPage /> : <Navigate to="/" />} />
        <Route path="/admin/dashboard" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
        <Route path="/teacher/:user" element={role === "teacher" ? <TeacherDashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
      {/* {role === "admin" && <AdminDashboard />}
      {role === "teacher" && <TeacherDashboard />}
      {role === "student" && <StudentDashboard />} */}
    </Suspense>
  );
}