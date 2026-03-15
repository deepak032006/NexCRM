'use client';

import { useState } from "react";
import { PageKey } from "@/types";

interface ReportsPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const revenueData = [8.2, 9.1, 10.4, 11.0, 12.4, 14.1];
const leadsData   = [34,  38,  42,   45,   48,   52];
const convData    = [14,  15,  17,   18,   18.4, 19.2];

const counselorStats = [
  { name: "Neha Gupta",   calls: 42, conv: "24%", rev: "₹4.2L", leads: 18 },
  { name: "Raj Bhatt",    calls: 38, conv: "21%", rev: "₹3.8L", leads: 15 },
  { name: "Suresh Reddy", calls: 30, conv: "18%", rev: "₹2.4L", leads: 12 },
  { name: "Aman Singh",   calls: 24, conv: "15%", rev: "₹1.9L", leads: 9  },
];

export default function ReportsPage({ navigate: _navigate, toast }: ReportsPageProps) {
  const [period, setPeriod] = useState("This Month");

  const exportReport = () => {
    toast("📊 Report exported as PDF!");
  };

  const maxRev = Math.max(...revenueData);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["This Month", "Last 3 Months", "This Year"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: "6px 14px", borderRadius: 99, border: "none", fontSize: 12, fontWeight: period === p ? 700 : 500, background: period === p ? "#6366f1" : "#f1f5f9", color: period === p ? "#fff" : "#475569", cursor: "pointer" }}>{p}</button>
          ))}
        </div>
        <button onClick={exportReport} style={{ padding: "7px 16px", background: "#10b981", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>⬇ Export Report</button>
      </div>

      {/* KPI summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { label: "Revenue MTD",   value: "₹12.4L", delta: "-3%",   positive: false, icon: "💰" },
          { label: "Total Leads",   value: "48",     delta: "+12%",  positive: true,  icon: "👥" },
          { label: "Conversion",    value: "18.4%",  delta: "+2.1%", positive: true,  icon: "🎯" },
          { label: "Calls Made",    value: "134",    delta: "+8%",   positive: true,  icon: "📞" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>{k.label}</div>
              <span style={{ fontSize: 16 }}>{k.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", lineHeight: 1.2, margin: "6px 0 4px", letterSpacing: -0.5 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}><span style={{ fontWeight: 700, color: k.positive ? "#10b981" : "#ef4444" }}>{k.delta}</span> vs last month</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Revenue Bar Chart */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>📈 Revenue Trend (₹L)</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 120 }}>
            {revenueData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#6366f1" }}>{v}</div>
                <div style={{ width: "100%", height: `${(v / maxRev) * 100}px`, background: i === revenueData.length - 1 ? "linear-gradient(180deg,#6366f1,#8b5cf6)" : "#e0e7ff", borderRadius: "4px 4px 0 0", transition: "height 0.3s" }} />
                <div style={{ fontSize: 9, color: "#94a3b8" }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Line */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🎯 Conversion Rate (%)</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 120 }}>
            {convData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#10b981" }}>{v}%</div>
                <div style={{ width: "100%", height: `${(v / 25) * 100}px`, background: i === convData.length - 1 ? "linear-gradient(180deg,#10b981,#34d399)" : "#d1fae5", borderRadius: "4px 4px 0 0" }} />
                <div style={{ fontSize: 9, color: "#94a3b8" }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counselor breakdown */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontWeight: 800, color: "#0f172a" }}>👥 Counselor Performance Breakdown</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Counselor", "Calls MTD", "Conversions", "Revenue", "Leads Closed"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 12px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {counselorStats.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.12s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#7c3aed" }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, color: "#475569" }}>{c.calls}</td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 700, color: "#10b981" }}>{c.conv}</td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 600, color: "#1e293b" }}>{c.rev}</td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, color: "#475569" }}>{c.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}