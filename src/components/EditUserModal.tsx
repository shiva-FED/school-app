import { useState, useEffect } from "react";

interface Props {
  user: any;
  onClose: () => void;
  onSave: (name: string) => void;
}

const overlayStyle = {
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

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "5px 0 10px 0",
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  if (!user) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Edit User</h3>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label>Email</label>
        <input value={user.email} disabled style={inputStyle} />

        <label>Role</label>
        <input value={user.role} disabled style={inputStyle} />

        <div style={{ marginTop: "15px" }}>
          <button onClick={() => onSave(name)}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}