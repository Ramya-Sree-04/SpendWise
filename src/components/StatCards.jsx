import { TrendingUp, TrendingDown, Minus, Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getStats, shortINR, formatINR } from "../utils/utils";

export default function StatCards() {
  const { transactions } = useApp();
  const { credits, debits, net } = getStats(transactions);
  const savingsRate = credits > 0 ? ((net / credits) * 100).toFixed(1) : 0;

  const cards = [
    {
      label: "Net Balance",
      value: formatINR(net),
      sub: `${savingsRate}% savings rate`,
      icon: Wallet,
      trend: net > 0 ? "up" : "down",
      color: "purple",
    },
    {
      label: "Total Income",
      value: formatINR(credits),
      sub: "All credit entries",
      icon: ArrowDownLeft,
      trend: "up",
      color: "green",
    },
    {
      label: "Total Spent",
      value: formatINR(debits),
      sub: "All debit entries",
      icon: ArrowUpRight,
      trend: "down",
      color: "red",
    },
    {
      label: "Transactions",
      value: transactions.length,
      sub: "Total records",
      icon: Minus,
      trend: "neutral",
      color: "blue",
    },
  ];

  return (
    <div className="stat-grid">
      {cards.map((c) => {
        const Icon = c.icon;
        const TrendIcon = c.trend === "up" ? TrendingUp : c.trend === "down" ? TrendingDown : Minus;
        return (
          <div className={`stat-card ${c.color}`} key={c.label}>
            <div className="stat-top">
              <div className="stat-icon-wrap">
                <Icon size={18} />
              </div>
              <div className={`trend-badge ${c.trend}`}>
                <TrendIcon size={12} />
              </div>
            </div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
            <div className="stat-sub">{c.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
