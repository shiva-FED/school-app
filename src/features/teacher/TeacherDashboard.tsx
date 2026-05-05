import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUsers,
  getStudentsByTeacher,
  updateUser,
} from "../../services/firestoreService";
import { auth } from "../../services/firebase";
import LogoutButton from "../../components/common/LogoutButton";
import EditUserModal from "../../components/EditUserModal";
import TeacherBoard from "../../components/TeacherBoard";
import type { User } from "../../types";


export default function TeacherDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const user = auth.currentUser;

  const fetchStudents = async () => {
    if (!user) return;

    const data = await getStudentsByTeacher(user?.uid);
    setStudents(data as User[]);
  };

  const fetchData = async () => {
    const u = await getAllUsers();
    setUsers(u as User[]);
  };

  useEffect(() => {
    fetchStudents();
    fetchData();
  }, []);

  const handleEdit = (student: any) => {
    setSelectedUser(student);
  };

  const handleSave = async (name: string) => {
    await updateUser(selectedUser.id, { name });
    setSelectedUser(null);
    fetchStudents();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this student?")) {
      await deleteUser(id);
      fetchStudents();
    }
  };

  const currentUser = users.find((u) => u.id === user?.uid)

  return (
    <div className="container">
      <div className="header-section">
        <h1>{currentUser?.name} Dashboard</h1>
        <LogoutButton />
      </div>

      <div>
        <TeacherBoard />
      </div>

      <div className="grid">
        {students.map((s) => (
          <div key={s.id} className="card">
            <div className="title">{s.name}</div>
            <div className="badge">{s.email}</div>
            <div>
              <button className="button" onClick={() => handleEdit(s)}>
                Edit
              </button>

              <button
                className="button"
                style={{ marginLeft: "10px", background: "#ff4d4f" }}
                onClick={() => handleDelete(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {students.length === 0 && <p>No students found</p>}

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
