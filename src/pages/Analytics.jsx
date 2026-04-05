import { MonthlyGroupedChart, CashflowChart, SpendingTagChart } from "../components/Charts";
import { useApp } from "../context/AppContext";
import { byTag, formatINR } from "../utils/utils";
import { TAG_COLORS } from "../data/mockData";

export default function Analytics() {
  const { transactions } = useApp();
  const tagData = byTag(transactions);
  const total = tagData.reduce((s, t) => s + t.value, 0);

  return (
    <div className="page-content">
      <MonthlyGroupedChart />
      <div className="two-col">
        <CashflowChart />
        <SpendingTagChart />
      </div>
      <div className="section-box">
        <div className="section-head">
          <span className="section-title">Category Breakdown</span>
          <span className="section-count">{tagData.length} categories</span>
        </div>
        <div className="breakdown-list">
          {tagData.map((item) => {
            const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            const colors = TAG_COLORS[item.name] || { dot: "#888", bg: "#222", text: "#aaa" };
            return (
              <div className="breakdown-row" key={item.name}>
                <div className="breakdown-left">
                  <span className="breakdown-dot" style={{ background: colors.dot }} />
                  <span className="breakdown-name">{item.name}</span>
                </div>
                <div className="breakdown-bar-wrap">
                  <div className="breakdown-bar">
                    <div className="breakdown-fill" style={{ width: `${pct}%`, background: colors.dot }} />
                  </div>
                </div>
                <span className="breakdown-pct">{pct}%</span>
                <span className="breakdown-amt">{formatINR(item.value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
