import { useApp } from "../context/AppContext";
import { getStats, byTag, byMonth, formatINR } from "../utils/utils";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function Insights() {
  const { transactions } = useApp();
  const { credits, debits, net } = getStats(transactions);
  const tags = byTag(transactions);
  const months = byMonth(transactions);
  const savingsRate = credits > 0 ? ((net / credits) * 100).toFixed(1) : 0;
  const topTag = tags[0];
  const latest = months[months.length - 1];
  const prev = months[months.length - 2];
  const spendDelta = latest && prev && prev.spend > 0
    ? (((latest.spend - prev.spend) / prev.spend) * 100).toFixed(1)
    : null;
  const subCount = transactions.filter((t) => t.tag === "Subscriptions" && t.flow === "debit").length;
  const subTotal = transactions.filter((t) => t.tag === "Subscriptions" && t.flow === "debit").reduce((s, t) => s + t.amount, 0);

  const cards = [
    {
      icon: savingsRate >= 20 ? CheckCircle : AlertCircle,
      color: savingsRate >= 20 ? "green" : "orange",
      title: "Savings Rate",
      value: `${savingsRate}%`,
      detail: savingsRate >= 20 ? "You're on track. Keep it up." : "Aim for at least 20% savings.",
    },
    {
      icon: TrendingUp,
      color: "purple",
      title: "Top Expense Category",
      value: topTag ? topTag.name : "—",
      detail: topTag ? `${formatINR(topTag.value)} spent across all records` : "No expense data.",
    },
    {
      icon: spendDelta !== null && parseFloat(spendDelta) > 0 ? TrendingUp : TrendingDown,
      color: spendDelta !== null && parseFloat(spendDelta) > 0 ? "red" : "green",
      title: "Month-on-Month Spend",
      value: spendDelta !== null ? `${parseFloat(spendDelta) > 0 ? "+" : ""}${spendDelta}%` : "N/A",
      detail: spendDelta !== null ? `vs ${prev?.month || "previous month"}` : "Not enough data yet.",
    },
    {
      icon: Info,
      color: "blue",
      title: "Active Subscriptions",
      value: `${subCount} plans`,
      detail: `Total ${formatINR(subTotal)} in recurring costs`,
    },
  ];

  return (
    <div className="page-content">
      <div className="insight-grid">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div className={`insight-card ${c.color}`} key={c.title}>
              <div className="insight-icon"><Icon size={20} /></div>
              <div className="insight-body">
                <div className="insight-title">{c.title}</div>
                <div className="insight-value">{c.value}</div>
                <div className="insight-detail">{c.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-box">
        <div className="section-head">
          <span className="section-title">Monthly Summary</span>
        </div>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Spending</th>
              <th>Net</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {months.map((m) => {
              const net = m.income - m.spend;
              return (
                <tr key={m.month}>
                  <td>{m.month}</td>
                  <td className="credit">{formatINR(m.income)}</td>
                  <td className="debit">{formatINR(m.spend)}</td>
                  <td className={net >= 0 ? "credit" : "debit"}>{net >= 0 ? "+" : "−"}{formatINR(Math.abs(net))}</td>
                  <td>
                    <span className={`status-pill ${net >= 0 ? "surplus" : "deficit"}`}>
                      {net >= 0 ? "Surplus" : "Deficit"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
