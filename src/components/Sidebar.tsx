import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <nav>
        <NavLink to="/adminDashboard" className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/teachers" className="nav-item">
          Teachers
        </NavLink>

        <NavLink to="/students" className="nav-item">
          Students
        </NavLink>
      </nav>
    </div>
  );
}