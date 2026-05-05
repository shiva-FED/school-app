import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <nav>
        <NavLink to="/admin/dashboard" className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/admin/teachers" className="nav-item">
          Teachers
        </NavLink>

        <NavLink to="/admin/students" className="nav-item">
          Students
        </NavLink>
      </nav>
    </div>
  );
}