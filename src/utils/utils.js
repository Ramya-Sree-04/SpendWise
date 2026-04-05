export const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const shortINR = (n) => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`;
  return `₹${n}`;
};

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const fmtShortDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

export const monthKey = (d) =>
  new Date(d).toLocaleDateString("en-IN", { month: "short", year: "2-digit" });

export const getStats = (txns) => {
  const credits = txns.filter((t) => t.flow === "credit").reduce((s, t) => s + t.amount, 0);
  const debits = txns.filter((t) => t.flow === "debit").reduce((s, t) => s + t.amount, 0);
  return { credits, debits, net: credits - debits };
};

export const byTag = (txns) => {
  const map = {};
  txns.filter((t) => t.flow === "debit").forEach((t) => {
    map[t.tag] = (map[t.tag] || 0) + t.amount;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
};

export const byMonth = (txns) => {
  const map = {};
  txns.forEach((t) => {
    const k = monthKey(t.date);
    if (!map[k]) map[k] = { month: k, income: 0, spend: 0 };
    if (t.flow === "credit") map[k].income += t.amount;
    else map[k].spend += t.amount;
  });
  return Object.values(map).reverse();
};

export const downloadCSV = (txns) => {
  const rows = [["ID", "Date", "Title", "Merchant", "Tag", "Flow", "Amount"]];
  txns.forEach((t) => rows.push([t.id, t.date, t.title, t.merchant, t.tag, t.flow, t.amount]));
  const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "spendwise-export.csv" });
  a.click();
};

export const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
