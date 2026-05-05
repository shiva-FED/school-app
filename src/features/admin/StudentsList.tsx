import { useAdmin } from "../../context/AdminContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function StudentsList({ onEdit }: any) {
  const { users, updateUser, deleteUser, fetchData } = useAdmin();

  const handleAssign = async (id: string, teacherId: string) => {
    await updateUser(id, { teacherId });
    fetchData();
  };

  return (
    <>
      <h3>List of Students</h3>

      <table style={{ width: "100%", background: "#fff", borderRadius: "10px" }}>
        <thead style={{ background: "#f0f0f0" }}>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Assign Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
        <tbody>
          {users
            .filter((u) => u.role === "student")
            .map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td className="role-text">{u.role}</td>

                <td>
                  <select
                    value={u.teacherId || ""}
                    onChange={(e) =>
                      handleAssign(u.id, e.target.value)
                    }
                  >
                    <option>Select Teacher</option>

                    {users
                      .filter((u) => u.role === "teacher")
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                  </select>
                </td>

                <td>
                  <button className="action-btn edit-btn" onClick={() => onEdit(u)}>
                    <FaEdit />
                  </button>

                  <button className="action-btn delete-btn" style={{ marginLeft: "8px" }} onClick={() => deleteUser(u.id)}>
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