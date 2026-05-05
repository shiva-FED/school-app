import { useAdmin } from "../../context/AdminContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditUserModal from "../../components/EditUserModal";
import { useState } from "react";
import { updateUser } from "../../services/firestoreService";

export default function TeachersList() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { users, deleteTeacher, fetchData } = useAdmin();

  const handleDelete = async (id: string) => {
    if (confirm("Delete Teacher?")) {
      await deleteTeacher(id);
      fetchData();
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
  };

  const handleSave = async (name: string) => {
    await updateUser(selectedUser.id, { name });
    setSelectedUser(null);
    fetchData();
  };

  return (
    <>
      <h3>List of Teachers</h3>

      <table
        style={{ width: "100%", background: "#fff", borderRadius: "10px" }}
      >
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>SNo</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) => u.role === "teacher")
            .map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td className="role-text">{u.role}</td>

                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(u)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="action-btn delete-btn"
                    style={{ marginLeft: "8px" }}
                    onClick={() => handleDelete(u.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          
        </tbody>
      </table>
      {selectedUser && (
            <EditUserModal
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
              onSave={handleSave}
            />
          )}
    </>
  );
}
