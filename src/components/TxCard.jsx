import { Pencil, Trash2, FileText } from "lucide-react";
import { useApp } from "../context/AppContext";
import { fmtDate, formatINR } from "../utils/utils";
import { TAG_COLORS } from "../data/mockData";

const MERCHANT_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b", "#10b981", "#3b82f6", "#ef4444"];

function hashColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % MERCHANT_COLORS.length;
  return MERCHANT_COLORS[h];
}

function MerchantAvatar({ name }) {
  const color = hashColor(name);
  const abbr = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="merchant-avatar" style={{ background: color + "22", color }}>
      {abbr}
    </div>
  );
}

export default function TxCard({ tx, compact = false }) {
  const { role, deleteTx, setEditTarget, setShowModal } = useApp();
  const tag = TAG_COLORS[tx.tag] || { bg: "#222", text: "#aaa", dot: "#666" };

  return (
    <div className={`tx-card ${compact ? "compact" : ""}`}>
      <MerchantAvatar name={tx.merchant} />
      <div className="tx-main">
        <div className="tx-title">{tx.title}</div>
        <div className="tx-merchant-date">
          <span>{tx.merchant}</span>
          <span className="dot-sep">·</span>
          <span>{fmtDate(tx.date)}</span>
        </div>
      </div>
      <div className="tx-tag-wrap">
        <span className="tx-tag" style={{ background: tag.bg, color: tag.text }}>
          <span className="tag-dot" style={{ background: tag.dot }} />
          {tx.tag}
        </span>
      </div>
      <div className={`tx-amount-wrap ${tx.flow}`}>
        <span className="tx-amount">
          {tx.flow === "credit" ? "+" : "−"}{formatINR(tx.amount)}
        </span>
        <span className="tx-flow-label">{tx.flow}</span>
      </div>
      {role === "admin" && !compact && (
        <div className="tx-actions">
          <button className="action-btn" title="Edit" onClick={() => { setEditTarget(tx); setShowModal(true); }}>
            <Pencil size={13} />
          </button>
          <button className="action-btn danger" title="Delete" onClick={() => { if (window.confirm("Remove this entry?")) deleteTx(tx.id); }}>
            <Trash2 size={13} />
          </button>
        </div>
      )}
      {compact && tx.note && (
        <div className="tx-note" title={tx.note}><FileText size={12} /></div>
      )}
    </div>
  );
}
