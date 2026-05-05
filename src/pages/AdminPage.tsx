import { AdminProvider } from "../context/AdminContext";
import Overview from "../features/admin/Overview";
import AdminLayout from "../layouts/AdminLayout";

function AdminPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <Overview />
      </AdminLayout>
    </AdminProvider>
  );
}

export default AdminPage;
