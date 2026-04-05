import { Bell, Search, Plus, Sun, Moon, Menu } from "lucide-react";
import { useApp } from "../context/AppContext";

const PAGE_TITLES = {
  overview: { title: "Overview", sub: "Your financial snapshot" },
  transactions: { title: "Transactions", sub: "Income and spending records" },
  analytics: { title: "Analytics", sub: "Visual breakdown of finances" },
  insights: { title: "Insights", sub: "Smart observations" },
};

export default function Topbar() {
  const { activePage, role, setShowModal, setEditTarget, darkMode, setDarkMode, setSidebarOpen } = useApp();
  const { title, sub } = PAGE_TITLES[activePage] || PAGE_TITLES.overview;

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
          <Menu size={20} />
        </button>
        <div>
          <h1 className="topbar-title">{title}</h1>
          <p className="topbar-sub">{sub}</p>
        </div>
      </div>
      <div className="topbar-right">
        <div className="search-wrap desktop-only">
          <Search size={14} className="search-icon" />
          <input className="topbar-search" placeholder="Search..." readOnly />
        </div>
        <button className="icon-circle" onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="icon-circle desktop-only">
          <Bell size={16} />
          <span className="notif-dot" />
        </button>
        {role === "admin" && (
          <button className="add-btn" onClick={() => { setEditTarget(null); setShowModal(true); }}>
            <Plus size={15} />
            <span className="add-btn-label">Add Entry</span>
          </button>
        )}
      </div>
    </div>
  );
}
