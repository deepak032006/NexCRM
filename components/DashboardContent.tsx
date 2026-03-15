'use client';

import { useState } from "react";
import { PageKey } from "@/types";
import { kpis, hotLeads, followUps, activity, leaderboard } from "@/lib/data";
import ScoreBar from "@/components/ScoreBar";

interface DashboardContentProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

export default function DashboardContent({ navigate, toast }: DashboardContentProps) {
  const [alertVisible, setAlertVisible] = useState(true);
  const [snoozed, setSnoozed] = useState<string[]>([]);

  return (
    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

      {alertVisible && (
        <div style={{ background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", border: "1px solid #c4b5fd", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#7c3aed,#6366f1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#4c1d95" }}>AI Alert — 5 follow-ups overdue</div>
            <div style={{ fontSize: 11, color: "#6d28d9", marginTop: 2 }}>3 hot leads haven&apos;t been contacted in 24h. Immediate callback suggested for Ravi Kumar, Priya Sharma, and Deepak T.</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => navigate("ai-followup")} style={{ padding: "6px 14px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View Follow-Ups</button>
            <button onClick={() => setAlertVisible(false)} style={{ padding: "6px 10px", background: "rgba(255,255,255,0.5)", color: "#6d28d9", border: "none", borderRadius: 99, fontSize: 11, cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {kpis.map((k, i) => (
          <div key={i}
            onClick={() => { if (i === 0) navigate("leads"); else if (i === 1) navigate("calls"); else if (i === 2) navigate("reports"); }}
            style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", cursor: i < 3 ? "pointer" : "default", transition: "border-color 0.15s" }}
            onMouseEnter={(e) => { if (i < 3) (e.currentTarget as HTMLDivElement).style.borderColor = "#6366f1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0"; }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>{k.label}</div>
              <span style={{ fontSize: 16 }}>{k.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", lineHeight: 1.2, margin: "6px 0 4px", letterSpacing: -0.5 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              <span style={{ fontWeight: 700, color: k.positive ? "#10b981" : "#ef4444" }}>{k.delta}</span> {k.note}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>🔥 Hot Leads</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: "#fef2f2", color: "#ef4444", padding: "2px 8px", borderRadius: 99 }}>7 leads</span>
          </div>
          {hotLeads.map((lead, i) => (
            <div key={i} onClick={() => navigate("leads")}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, background: "#fafafa", marginBottom: 5, cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#f1f5f9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#fafafa")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#fbbf24,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 800 }}>{lead.name.split(" ").map((n) => n[0]).join("")}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{lead.name}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{lead.source} · {lead.city}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                <span style={{ fontSize: 9, fontWeight: 800, background: "#fef2f2", color: "#ef4444", padding: "1px 6px", borderRadius: 99 }}>🔥 Hot</span>
                {lead.time && <span style={{ fontSize: 9, color: "#6366f1", fontWeight: 600 }}>● {lead.time}</span>}
              </div>
            </div>
          ))}
          <button onClick={() => navigate("lead-scoring")} style={{ display: "block", width: "100%", marginTop: 8, padding: 6, background: "none", border: "none", color: "#6366f1", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View All Hot Leads →</button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>🤖 AI Follow-Ups</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: "#ede9fe", color: "#7c3aed", padding: "2px 8px", borderRadius: 99 }}>{followUps.filter(f => !snoozed.includes(f.name)).length} pending</span>
          </div>
          {followUps.filter(f => !snoozed.includes(f.name)).map((f, i) => (
            <div key={i} style={{ padding: "9px 10px", borderRadius: 8, background: f.bg, border: `1px solid ${f.color}20`, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{f.name}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: f.color, textTransform: "uppercase" }}>{f.status}</span>
              </div>
              <p style={{ margin: "0 0 6px", fontSize: 10, color: "#475569", lineHeight: 1.4 }}>AI: &quot;{f.msg}&quot;</p>
              {f.action && (
                <div style={{ display: "flex", gap: 5 }}>
                  <button onClick={() => toast(`✅ ${f.action} done for ${f.name}`)} style={{ padding: "3px 10px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 99, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>{f.action}</button>
                  <button onClick={() => { setSnoozed(prev => [...prev, f.name]); toast(`⏰ Snoozed ${f.name}`); }} style={{ padding: "3px 10px", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 99, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>Snooze</button>
                </div>
              )}
            </div>
          ))}
          {followUps.every(f => snoozed.includes(f.name)) && (
            <div style={{ textAlign: "center", padding: "10px 0", fontSize: 11, color: "#94a3b8" }}>🎉 All cleared!</div>
          )}
          <button onClick={() => navigate("ai-followup")} style={{ display: "block", width: "100%", marginTop: 6, padding: 6, background: "none", border: "none", color: "#7c3aed", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View All Follow-Ups →</button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>📋 Recent Activity</div>
          {activity.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ marginTop: 4, width: 8, height: 8, borderRadius: "50%", background: a.dot, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: "#334155" }}><strong>{a.text}</strong> {a.action}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>{a.time} · by {a.by}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>🏆 Top Counselor Leaderboard</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
              {["#", "Counselor", "Calls Today", "Conversions", "Revenue MTD", "Score"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "6px 10px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f8fafc", cursor: "pointer" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                onClick={() => navigate("employees")}>
                <td style={{ padding: "10px 10px", fontSize: 14 }}>{row.rank}</td>
                <td style={{ padding: "10px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg,#fbbf24,#f59e0b)" : i === 1 ? "linear-gradient(135deg,#94a3b8,#64748b)" : i === 2 ? "linear-gradient(135deg,#fb923c,#ea580c)" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: i < 3 ? "#fff" : "#64748b" }}>
                      {row.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{row.name}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 10px", fontSize: 12.5, color: "#475569" }}>{row.calls}</td>
                <td style={{ padding: "10px 10px", fontSize: 12.5, fontWeight: 700, color: "#10b981" }}>{row.conv}</td>
                <td style={{ padding: "10px 10px", fontSize: 12.5, fontWeight: 600, color: "#1e293b" }}>{row.rev}</td>
                <td style={{ padding: "10px 10px", width: 120 }}><ScoreBar score={row.score} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate("reports")} style={{ display: "block", margin: "10px auto 0", background: "none", border: "none", color: "#6366f1", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View Full Report →</button>
      </div>
    </div>
  );
}