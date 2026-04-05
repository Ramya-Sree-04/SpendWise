import { AppProvider, useApp } from "./context/AppContext";
import { useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import BottomNav from "./components/BottomNav";
import EntryModal from "./components/EntryModal";

import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Insights from "./pages/Insights";

import "./App.css";

function Shell() {
  const { activePage, darkMode } = useApp();

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const renderPage = () => {
    switch (activePage) {
      case "transactions":
        return <Transactions />;
      case "analytics":
        return <Analytics />;
      case "insights":
        return <Insights />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar />

        <div className="app-body">
          {renderPage()}
        </div>

        <BottomNav />
      </div>

      <EntryModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}