import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        {children}
      </div>
    </div>
  );
}