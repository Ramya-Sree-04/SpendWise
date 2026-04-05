import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { TAGS } from "../data/mockData";

const blank = { date: "", title: "", merchant: "", amount: "", tag: "Tech", flow: "debit", note: "" };

export default function EntryModal() {
  const { showModal, setShowModal, editTarget, setEditTarget, addTx, updateTx } = useApp();
  const [form, setForm] = useState(blank);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (editTarget) setForm({ ...editTarget, amount: Math.abs(editTarget.amount) });
    else setForm(blank);
    setErr("");
  }, [editTarget, showModal]);

  if (!showModal) return null;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.date || !form.title || !form.merchant || !form.amount) { setErr("All fields except note are required."); return; }
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) { setErr("Enter a valid amount."); return; }
    const payload = { ...form, amount: amt };
    if (editTarget) updateTx(editTarget.id, payload);
    else addTx(payload);
    setShowModal(false);
    setEditTarget(null);
  };

  const tags = TAGS.filter((t) => t !== "All");

  return (
    <div className="modal-bg" onClick={() => setShowModal(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-title">{editTarget ? "Edit Entry" : "New Entry"}</h2>
          <button className="modal-close" onClick={() => setShowModal(false)}><X size={16} /></button>
        </div>
        {err && <div className="modal-err">{err}</div>}
        <div className="modal-body">
          <div className="field-row">
            <div className="field">
              <label>Date</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
            </div>
            <div className="field">
              <label>Flow</label>
              <select value={form.flow} onChange={(e) => set("flow", e.target.value)}>
                <option value="debit">Debit (Expense)</option>
                <option value="credit">Credit (Income)</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>Title</label>
            <input type="text" placeholder="e.g. Netflix, Salary" value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>Merchant / Source</label>
              <input type="text" placeholder="e.g. Netflix Inc." value={form.merchant} onChange={(e) => set("merchant", e.target.value)} />
            </div>
            <div className="field">
              <label>Amount (₹)</label>
              <input type="number" placeholder="0" min="0" value={form.amount} onChange={(e) => set("amount", e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label>Category Tag</label>
            <select value={form.tag} onChange={(e) => set("tag", e.target.value)}>
              {tags.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Note (optional)</label>
            <input type="text" placeholder="Any extra detail..." value={form.note} onChange={(e) => set("note", e.target.value)} />
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btn-solid" onClick={handleSave}>{editTarget ? "Save Changes" : "Add Entry"}</button>
        </div>
      </div>
    </div>
  );
}
