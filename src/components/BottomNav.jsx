import { LayoutGrid, ArrowLeftRight, BarChart3, Lightbulb } from "lucide-react";
import { useApp } from "../context/AppContext";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function BottomNav() {
  const { activePage, setActivePage } = useApp();

  return (
    <nav className="bottom-nav">
      {NAV.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`bottom-nav-item ${activePage === id ? "active" : ""}`}
          onClick={() => setActivePage(id)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
