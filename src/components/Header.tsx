import { TiUserAdd } from "react-icons/ti";
import LogoutButton from "./common/LogoutButton";

export default function Header({ onAddUser }: any) {
  return (
    <div className="header-section">
      <h1>Admin Panel</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="primary-btn" onClick={onAddUser}>
          <TiUserAdd size={20} />
        </button>

        <LogoutButton />
      </div>
    </div>
  );
}