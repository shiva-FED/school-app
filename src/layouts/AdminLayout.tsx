import Sidebar from "../components/Sidebar";
import HeaderSection from "../features/admin/HeaderSection";

export default function AdminLayout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        <HeaderSection />
        {children}
      </div>
    </div>
  );
}