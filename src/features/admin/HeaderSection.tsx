import { useState } from "react";

import AddUserModal from "../../components/AddUserModal";
import { AdminProvider, useAdmin } from "../../context/AdminContext";
import Header from "../../components/Header";

export default function HeaderSection() {
  const [showAddModal, setShowAddModal] = useState(false);

  const { users, handleCreateUser } = useAdmin();

  const handleAddUser = async (data: any) => {
    try {
      await handleCreateUser(data);
      alert("User created");
      setShowAddModal(false); // ✅ UI handled here
    } catch (e) {
      alert("Error creating user");
    }
  };

  return (
    <AdminProvider>
      <Header onAdd={() => setShowAddModal(true)} />

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddUser}
          teachers={users.filter((u) => u.role === "teacher")}
        />
      )}
    </AdminProvider>
  );
}
