import StatCards from "../components/StatCards";
import { CashflowChart, SpendingTagChart } from "../components/Charts";
import TxCard from "../components/TxCard";
import { useApp } from "../context/AppContext";

export default function Overview() {
  const { transactions } = useApp();
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  return (
    <div className="page-content">
      <StatCards />
      <div className="two-col">
        <CashflowChart />
        <SpendingTagChart />
      </div>
      <div className="section-box">
        <div className="section-head">
          <span className="section-title">Recent Activity</span>
          <span className="section-count">{recent.length} entries</span>
        </div>
        {recent.length === 0
          ? <div className="empty">No transactions yet.</div>
          : recent.map((t) => <TxCard key={t.id} tx={t} compact />)
        }
      </div>
    </div>
  );
}
