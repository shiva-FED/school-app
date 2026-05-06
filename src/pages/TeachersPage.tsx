import { AdminProvider } from "../context/AdminContext"
import TeachersList from "../features/admin/TeachersList"
import AdminLayout from "../layouts/AdminLayout"

function TeachersPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <TeachersList />
      </AdminLayout>
    </AdminProvider>
  )
}

export default TeachersPage