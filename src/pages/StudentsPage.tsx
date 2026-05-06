import { AdminProvider } from "../context/AdminContext"
import StudentsList from "../features/admin/StudentsList"
import AdminLayout from "../layouts/AdminLayout"

function StudentsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <StudentsList />
      </AdminLayout>
    </AdminProvider>
  )
}

export default StudentsPage