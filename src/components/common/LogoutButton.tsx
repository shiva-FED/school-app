import { RiLogoutCircleRLine } from "react-icons/ri";
import { logout } from "../../features/auth/authService";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 12px",
        background: "#ff4d4f",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      <RiLogoutCircleRLine size={20} title="Logout" />
    </button>
  );
}