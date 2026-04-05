import { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");
  const [activePage, setActivePage] = useState("overview");
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("sw_txns");
      return saved ? JSON.parse(saved) : mockTransactions;
    } catch { return mockTransactions; }
  });
  const [filters, setFilters] = useState({ search: "", tag: "All", flow: "all", sort: "newest" });
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("sw_dark");
    return saved === null ? true : saved === "true";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sw_txns", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("sw_dark", darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTx = (tx) => setTransactions((p) => [{ ...tx, id: `t${Date.now()}` }, ...p]);
  const updateTx = (id, data) => setTransactions((p) => p.map((t) => t.id === id ? { ...t, ...data } : t));
  const deleteTx = (id) => setTransactions((p) => p.filter((t) => t.id !== id));

  const filtered = transactions
    .filter((t) => {
      const q = filters.search.toLowerCase();
      const matchQ = !q || t.title.toLowerCase().includes(q) || t.merchant.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q);
      const matchTag = filters.tag === "All" || t.tag === filters.tag;
      const matchFlow = filters.flow === "all" || t.flow === filters.flow;
      return matchQ && matchTag && matchFlow;
    })
    .sort((a, b) => {
      if (filters.sort === "newest") return new Date(b.date) - new Date(a.date);
      if (filters.sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (filters.sort === "highest") return b.amount - a.amount;
      if (filters.sort === "lowest") return a.amount - b.amount;
      return 0;
    });

  return (
    <AppContext.Provider value={{
      role, setRole,
      activePage, setActivePage,
      transactions, filtered,
      addTx, updateTx, deleteTx,
      filters, setFilters,
      showModal, setShowModal,
      editTarget, setEditTarget,
      darkMode, setDarkMode,
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
