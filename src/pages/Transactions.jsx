import { Download } from "lucide-react";
import { useApp } from "../context/AppContext";
import { TAGS } from "../data/mockData";
import { downloadCSV } from "../utils/utils";
import TxCard from "../components/TxCard";

export default function Transactions() {
  const { filtered, transactions, filters, setFilters, role, setShowModal, setEditTarget } = useApp();

  return (
    <div className="page-content">
      <div className="toolbar">
        <input
          className="toolbar-search"
          placeholder="Search by title, merchant, tag..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select value={filters.tag} onChange={(e) => setFilters({ ...filters, tag: e.target.value })}>
          {TAGS.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={filters.flow} onChange={(e) => setFilters({ ...filters, flow: e.target.value })}>
          <option value="all">All Flow</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
        <button className="btn-ghost small" onClick={() => downloadCSV(transactions)}>
          <Download size={13} /> Export
        </button>
      </div>

      <div className="section-box">
        <div className="section-head">
          <span className="section-title">All Entries</span>
          <span className="section-count">{filtered.length} found</span>
        </div>
        {filtered.length === 0
          ? <div className="empty">No entries match your filters.</div>
          : filtered.map((t) => <TxCard key={t.id} tx={t} />)
        }
      </div>
    </div>
  );
}
