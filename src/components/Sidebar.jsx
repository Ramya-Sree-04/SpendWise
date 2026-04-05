import { LayoutGrid, ArrowLeftRight, BarChart3, Lightbulb, Settings, ChevronRight, X } from "lucide-react";
import { useApp } from "../context/AppContext";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar() {
  const { activePage, setActivePage, role, setRole, sidebarOpen, setSidebarOpen } = useApp();

  const navigate = (id) => {
    setActivePage(id);
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">S</div>
          <div>
            <div className="logo-name">SpendWise</div>
            <div className="logo-tag">Money Dashboard</div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">P</div>
          <div className="user-info">
            <div className="user-name">Person</div>
            <div className="user-role-label">{role === "admin" ? "Administrator" : "Viewer"}</div>
          </div>
          <select className="role-pill" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu</div>
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activePage === id ? "active" : ""}`}
              onClick={() => navigate(id)}
            >
              <Icon size={17} />
              <span>{label}</span>
              {activePage === id && <ChevronRight size={14} className="nav-arrow" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item muted">
            <Settings size={17} />
            <span>Settings</span>
          </button>
          <div className="sidebar-version">v1.0.0 · 2025</div>
        </div>
      </aside>
    </>
  );
}
