import { useState } from "react";
import { login } from "./authService";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const cred = await login(email, password);
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      if (!snap.exists()) {
        alert("User not found in DB");
        return;
      }
      const role = snap.data().role;
      
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "teacher") navigate("/teachers");
      else if (role === "student") navigate("/students");
    } catch (e) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}