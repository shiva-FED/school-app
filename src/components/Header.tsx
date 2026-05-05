import LogoutButton from "../components/common/LogoutButton";
import { TiUserAdd } from "react-icons/ti";

export default function Header({ onAdd }: any) {
  return (
    <div className="header-section">
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="primary-btn" onClick={onAdd}>
          <TiUserAdd size={20} />
        </button>

        <LogoutButton />
      </div>
    </div>
  );
}