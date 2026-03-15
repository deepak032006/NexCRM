'use client';

import { useState } from "react";
import { PageKey } from "@/types";

interface CallsPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

const callsData = [
  { name: "Ravi Kumar",    phone: "+91 98200 12345", counselor: "Neha G.",   duration: "8m 42s", outcome: "Interested", outcomeColor: "#8b5cf6", time: "10:32 AM", date: "Today",     recording: true  },
  { name: "Priya Sharma",  phone: "+91 99001 88812", counselor: "Raj B.",    duration: "4m 18s", outcome: "Callback",   outcomeColor: "#f59e0b", time: "11:15 AM", date: "Today",     recording: true  },
  { name: "Deepak Tiwari", phone: "+91 96655 43221", counselor: "Suresh R.", duration: "12m 5s", outcome: "Demo Set",   outcomeColor: "#0ea5e9", time: "09:50 AM", date: "Today",     recording: true  },
  { name: "Kiran Patel",   phone: "+91 94433 11009", counselor: "Neha G.",   duration: "6m 30s", outcome: "Converted",  outcomeColor: "#10b981", time: "03:20 PM", date: "Yesterday", recording: false },
  { name: "Aman Singh",    phone: "+91 87654 32100", counselor: "Aman S.",   duration: "2m 10s", outcome: "No Answer",  outcomeColor: "#94a3b8", time: "02:05 PM", date: "Yesterday", recording: false },
  { name: "Vinod Hegde",   phone: "+91 93322 00998", counselor: "Raj B.",    duration: "3m 55s", outcome: "Lost",       outcomeColor: "#ef4444", time: "04:40 PM", date: "Yesterday", recording: true  },
  { name: "Meena Lakshmi", phone: "+91 95544 32110", counselor: "Suresh R.", duration: "7m 22s", outcome: "Interested", outcomeColor: "#8b5cf6", time: "11:00 AM", date: "18 Feb",    recording: true  },
];

const outcomeFilters = ["All", "Interested", "Callback", "Demo Set", "Converted", "No Answer", "Lost"];

export default function CallsPage({ navigate: _navigate, toast }: CallsPageProps) {
  const [filter, setFilter] = useState("All");
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = filter === "All" ? callsData : callsData.filter(c => c.outcome === filter);

  const handlePlay = (name: string) => {
    setPlaying(name);
    toast(`▶ Playing recording for ${name}`);
    setTimeout(() => setPlaying(null), 3000);
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { label: "Total Calls",  value: "134",    icon: "📞", color: "#6366f1" },
          { label: "Avg Duration", value: "6m 12s", icon: "⏱",  color: "#0ea5e9" },
          { label: "Answered",     value: "118",    icon: "✅", color: "#10b981" },
          { label: "Missed",       value: "16",     icon: "❌", color: "#ef4444" },
        ].map((k, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>{k.label}</div>
              <span style={{ fontSize: 16 }}>{k.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: k.color, lineHeight: 1.2, margin: "6px 0 2px", letterSpacing: -0.5 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Call Log Table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>📞 Call Log</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {outcomeFilters.map(o => (
              <button key={o} onClick={() => setFilter(o)} style={{ padding: "4px 10px", borderRadius: 99, border: "none", fontSize: 11, fontWeight: filter === o ? 700 : 500, background: filter === o ? "#6366f1" : "#f1f5f9", color: filter === o ? "#fff" : "#475569", cursor: "pointer" }}>{o}</button>
            ))}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Lead", "Phone", "Counselor", "Duration", "Outcome", "Date / Time", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 12px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.12s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#7c3aed" }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569" }}>{c.phone}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569" }}>{c.counselor}</td>
                <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{c.duration}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ fontSize: 11, background: `${c.outcomeColor}15`, color: c.outcomeColor, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>{c.outcome}</span>
                </td>
                <td style={{ padding: "10px 12px", fontSize: 11, color: "#94a3b8" }}>{c.date} · {c.time}</td>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => toast(`📞 Calling ${c.name}...`)} style={{ padding: "4px 10px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>📞 Call</button>
                    {c.recording && (
                      <button onClick={() => handlePlay(c.name)} style={{ padding: "4px 10px", background: playing === c.name ? "#10b981" : "#f1f5f9", color: playing === c.name ? "#fff" : "#475569", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>
                        {playing === c.name ? "⏸ Playing" : "▶ Play"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>No calls for this filter.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{ padding: "10px 16px", fontSize: 11, color: "#94a3b8", borderTop: "1px solid #f1f5f9" }}>
          Showing {filtered.length} of {callsData.length} calls
        </div>
      </div>
    </div>
  );
}