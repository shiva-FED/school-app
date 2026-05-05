import { useState } from "react";

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
  teachers: any[];
}

export default function AddUserModal({ onClose, onSave, teachers }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    teacherId: "",
  });

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Add User</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          name="user_email_field"
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          autoComplete="off"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          name="user_pass_field"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {form.role === "student" && (
          <select
            value={form.teacherId}
            onChange={(e) =>
              setForm({ ...form, teacherId: e.target.value })
            }
          >
            <option value="">Assign Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        )}

        <div style={{ marginTop: "10px" }}>
          <button className="button" onClick={() => onSave(form)}>Create</button>
          <button onClick={onClose} className="button" style={{ marginLeft: "10px", background: "#ff4d4f" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};