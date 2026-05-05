import { useAdmin } from "../../context/AdminContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TeachersList({ onEdit }: any) {
  const { users, deleteTeacher, fetchData } = useAdmin();

  const handleDelete = async (id: string) => {
    if (confirm("Delete Teacher?")) {
      await deleteTeacher(id);
      fetchData();
    }
  };

  return (
    <>
      <h3>List of Teachers</h3>

      <table style={{ width: "100%", background: "#fff", borderRadius: "10px" }}>
        <thead style={{ background: "#f0f0f0" }}>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
        <tbody>
          {users
            .filter((u) => u.role === "teacher")
            .map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td className="role-text">{u.role}</td>

                <td>
                  <button className="action-btn edit-btn" onClick={() => onEdit(u)}>
                    <FaEdit />
                  </button>

                  <button className="action-btn delete-btn" style={{ marginLeft: "8px" }} onClick={() => handleDelete(u.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}