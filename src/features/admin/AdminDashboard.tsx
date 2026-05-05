import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  deleteTeacher,
} from "../../services/firestoreService";
import EditUserModal from "../../components/EditUserModal";
import LogoutButton from "../../components/common/LogoutButton";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { auth, db, firebaseConfig } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import AddUserModal from "../../components/AddUserModal";
import { getApps, initializeApp } from "firebase/app";
import { TiUserAdd } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  teacherId?: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchData = async () => {
    const u = await getAllUsers();
    setUsers(u as User[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTeacherAssign = async (id: string, teacherId: string) => {
    await updateUser(id, { teacherId });
    fetchData();
  };

  const handleDeleteTeacher = async (id: string) => {
    if (confirm("Delete Teacher?")) {
      await deleteTeacher(id);
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete user?")) {
      await deleteUser(id);
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

  const userMap = users.reduce((acc: any, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const handleCreateUser = async (data: any) => {
    const secondaryApp = 
      getApps().find((app) => app.name === "secondary") || 
      initializeApp(firebaseConfig, "secondary");
    const secondaryAuth = getAuth(secondaryApp);

    try {
      // 1. create auth user
      const cred = await createUserWithEmailAndPassword(
        secondaryAuth,
        data.email,
        data.password,
      );

      console.log("Auth created:", cred.user.uid);
      console.log("Primary auth user:", auth.currentUser);

      // 2. store in firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        name: data.name,
        email: data.email,
        role: data.role,
        teacherId: data.role === "student" ? data.teacherId : null,
      });

      console.log("Firestore write SUCCESS");

      alert("User created");

      // 3. Clean up secondary app (important)
      await secondaryAuth.signOut();

      setShowAddModal(false);
      fetchData();
    } catch (e) {
      console.error("@@@@@", e);
      alert("Error creating user");
    }
  };

  const handleDrop = async (e: React.DragEvent, newTeacherId: string) => {
    const studentId = e.dataTransfer.getData("studentId");

    if (!studentId) return;

    await updateUser(studentId, { teacherId: newTeacherId });

    fetchData(); // refresh UI
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="primary-btn" onClick={() => setShowAddModal(true)}>
            <TiUserAdd size={20} title="Add user" />
          </button>

          <LogoutButton />
        </div>
        {showAddModal && (
          <AddUserModal
            onClose={() => setShowAddModal(false)}
            onSave={handleCreateUser}
            teachers={users.filter((u) => u.role === "teacher")}
          />
        )}
      </div>



      <div>
        <div>
          <h3>List of teachers:</h3>
          <table
            style={{ width: "100%", background: "#fff", borderRadius: "10px" }}
          >
            <thead style={{ background: "#f0f0f0" }}>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users
                .filter((u) => u.role == "teacher")
                .map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td className="role-text">{u.role}</td>

                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(u)}
                      >
                        <FaEdit size={16} title="Edit" />
                      </button>

                      <button
                        className="action-btn delete-btn"
                        style={{ marginLeft: "8px" }}
                        onClick={() => handleDeleteTeacher(u.id)}
                      >
                        <MdDelete size={16} title="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}

              {selectedUser && (
                <EditUserModal
                  user={selectedUser}
                  onClose={() => setSelectedUser(null)}
                  onSave={handleSave}
                />
              )}
            </tbody>
          </table>
          <br />

          
          <h3>List of students:</h3>
          <table
            style={{ width: "100%", background: "#fff", borderRadius: "10px" }}
          >
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
                .filter((u) => u.role == "student")
                .map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td className="role-text">{u.role}</td>

                    <td>
                      {u.role === "student" && (
                        <select
                          value={u.teacherId || ""}
                          onChange={(e) =>
                            handleTeacherAssign(u.id, e.target.value)
                          }
                        >
                          <option value="">Select Teacher</option>
                          {users
                            .filter((u) => u.role == "teacher")
                            .map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </td>

                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(u)}
                      >
                        <FaEdit size={16} title="Edit" />
                      </button>

                      <button
                        className="action-btn delete-btn"
                        style={{ marginLeft: "8px" }}
                        onClick={() => handleDelete(u.id)}
                      >
                        <MdDelete size={16} title="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}

              {selectedUser && (
                <EditUserModal
                  user={selectedUser}
                  onClose={() => setSelectedUser(null)}
                  onSave={handleSave}
                />
              )}
            </tbody>
          </table>
        </div>
        <br />


        <div>
          <h3>Overview:</h3>
          {users
            .filter((u) => u.role == "teacher")
            .map((teacher) => {
              const teacherStudents = users
                .filter((u) => u.role == "student")
                .filter((s) => s.teacherId === teacher.id);

              return (
                <div
                  key={teacher.id}
                  className="card"
                  onDragOver={(e) => {
                    e.preventDefault();
                    // e.currentTarget.style.background = "#f0f8ff";
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                  onDrop={(e) => handleDrop(e, teacher.id)}
                >
                  <div className="grid">
                    <h4 style={{ marginTop: "10px" }}>Teacher:</h4>
                    <div className="card teacher-card">
                      <div>{teacher?.name}</div>
                      <small>{teacher?.email}</small>
                    </div>
                  </div>

                  <div className="grid">
                    <h4 style={{ marginTop: "10px" }}>Students</h4>
                    {teacherStudents.map((student) => {
                      const userData = userMap[student.id];
                      return (
                        <div
                          key={student.id}
                          className="card"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("studentId", student.id);
                            e.currentTarget.style.opacity = "0.5";
                          }}
                          onDragEnd={(e) => {
                            e.currentTarget.style.opacity = "1";
                          }}
                        >
                          <div>{userData?.name}</div>
                          <small>{userData?.email}</small>
                        </div>
                      );
                    })}
                  </div>

                  {teacherStudents.length === 0 && <p>No students assigned</p>}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
