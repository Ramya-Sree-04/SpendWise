import {
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from "recharts";
import { useApp } from "../context/AppContext";
import { byMonth, byTag, shortINR } from "../utils/utils";
import { TAG_COLORS } from "../data/mockData";

const DOT_COLORS = Object.fromEntries(Object.entries(TAG_COLORS).map(([k, v]) => [k, v.dot]));

export function CashflowChart() {
  const { transactions } = useApp();
  const data = byMonth(transactions);

  return (
    <div className="chart-box">
      <div className="chart-box-header">
        <span className="chart-box-title">Cashflow</span>
        <span className="chart-box-sub">Income vs Spending</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={shortINR} />
          <Tooltip
            contentStyle={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 8, color: "#e2e8f0" }}
            formatter={(v, name) => [shortINR(v), name]}
          />
          <Area type="monotone" dataKey="income" stroke="#a78bfa" strokeWidth={2} fill="url(#gIncome)" name="Income" />
          <Area type="monotone" dataKey="spend" stroke="#f87171" strokeWidth={2} fill="url(#gSpend)" name="Spending" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingTagChart() {
  const { transactions } = useApp();
  const data = byTag(transactions).slice(0, 6);

  return (
    <div className="chart-box">
      <div className="chart-box-header">
        <span className="chart-box-title">Top Spending</span>
        <span className="chart-box-sub">By category</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 8, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={shortINR} />
          <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip
            contentStyle={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 8, color: "#e2e8f0" }}
            formatter={(v) => [shortINR(v)]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Spent">
            {data.map((entry) => (
              <Cell key={entry.name} fill={DOT_COLORS[entry.name] || "#6366f1"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyGroupedChart() {
  const { transactions } = useApp();
  const data = byMonth(transactions);

  return (
    <div className="chart-box wide">
      <div className="chart-box-header">
        <span className="chart-box-title">Monthly Breakdown</span>
        <span className="chart-box-sub">Income vs Expenses per month</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={shortINR} />
          <Tooltip
            contentStyle={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 8, color: "#e2e8f0" }}
            formatter={(v, n) => [shortINR(v), n]}
          />
          <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
          <Bar dataKey="income" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Income" />
          <Bar dataKey="spend" fill="#f87171" radius={[4, 4, 0, 0]} name="Spending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
