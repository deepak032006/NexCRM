'use client';

import { PageKey, Lead } from "@/types";

interface LeadScoringPageProps {
  navigate: (p: PageKey) => void;
  leads: Lead[];
  toast: (msg: string) => void;
}

export default function LeadScoringPage({ navigate, leads, toast }: LeadScoringPageProps) {
  const scoreFactors = [
    { label: "Call frequency (last 7 days)", pct: 30, color: "#6366f1" },
    { label: "Sentiment analysis", pct: 25, color: "#8b5cf6" },
    { label: "Engagement signals", pct: 20, color: "#0ea5e9" },
    { label: "Pipeline progression speed", pct: 15, color: "#10b981" },
    { label: "Lead source quality", pct: 10, color: "#f59e0b" },
  ];

  const hot  = leads.filter(l => l.score >= 75);
  const warm = leads.filter(l => l.score >= 40 && l.score < 75);
  const cold = leads.filter(l => l.score < 40);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[
          { label: "Hot Leads",  count: hot.length,  sub: "Score 75–100 · High conversion probability", color: "#ef4444", bg: "#fef2f2", icon: "🔥" },
          { label: "Warm Leads", count: warm.length, sub: "Score 40–74 · Needs nurturing",              color: "#f59e0b", bg: "#fffbeb", icon: "🌤" },
          { label: "Cold Leads", count: cold.length, sub: "Score 0–39 · Low engagement",                color: "#94a3b8", bg: "#f8fafc", icon: "❄️" },
        ].map((c) => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px", display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: c.color, letterSpacing: -0.5 }}>{c.count}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{c.label}</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>⚙️ Score Factors (How AI Scores)</div>
          {scoreFactors.map((f) => (
            <div key={f.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#475569" }}>{f.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: f.color }}>{f.pct}%</span>
              </div>
              <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${f.pct * 2.5}%`, height: "100%", background: f.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>📈 Score Distribution (Last 4 Weeks)</div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120 }}>
            {[{h:55,w:35,c:20},{h:50,w:30,c:20},{h:60,w:25,c:15},{h:65,w:22,c:13}].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "stretch" }}>
                <div style={{ height: `${bar.c}%`, background: "#94a3b8", borderRadius: "3px 3px 0 0" }} />
                <div style={{ height: `${bar.w}%`, background: "#f59e0b" }} />
                <div style={{ height: `${bar.h}%`, background: "#ef4444", borderRadius: "0 0 3px 3px" }} />
                <div style={{ fontSize: 9, textAlign: "center", color: "#94a3b8", marginTop: 4 }}>W{i + 1}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {[["#ef4444","Hot"],["#f59e0b","Warm"],["#94a3b8","Cold"]].map(([c,l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                <span style={{ fontSize: 10, color: "#64748b" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontWeight: 800, color: "#0f172a" }}>All Leads — Sorted by AI Score</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Rank","Lead","Score","Category","Source","Counselor","Stage","Trend","Action"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...leads].sort((a, b) => b.score - a.score).map((lead, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}>
                <td style={{ padding: "9px 12px", fontSize: 12, fontWeight: 700, color: "#64748b" }}>{i + 1}</td>
                <td style={{ padding: "9px 12px", fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{lead.name}</td>
                <td style={{ padding: "9px 12px" }}><span style={{ fontSize: 12, fontWeight: 800, background: `${lead.scoreColor}20`, color: lead.scoreColor, padding: "2px 8px", borderRadius: 99 }}>{lead.score}</span></td>
                <td style={{ padding: "9px 12px" }}><span style={{ fontSize: 11, color: lead.scoreColor, fontWeight: 700 }}>🔥 {lead.scoreLabel}</span></td>
                <td style={{ padding: "9px 12px", fontSize: 11, color: "#64748b" }}>{lead.source}</td>
                <td style={{ padding: "9px 12px", fontSize: 11, color: "#64748b" }}>{lead.assigned}</td>
                <td style={{ padding: "9px 12px" }}><span style={{ fontSize: 11, background: `${lead.stageColor}15`, color: lead.stageColor, padding: "2px 8px", borderRadius: 99 }}>{lead.stage}</span></td>
                <td style={{ padding: "9px 12px", fontSize: 11, fontWeight: 700, color: lead.score > 70 ? "#10b981" : "#ef4444" }}>{lead.score > 70 ? `↑ +${Math.floor(lead.score / 10)}` : `↓ -${Math.floor((100 - lead.score) / 10)}`}</td>
                <td style={{ padding: "9px 12px" }}>
                  <button onClick={() => { toast(`📋 Viewing ${lead.name}`); navigate("leads"); }} style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", background: "none", border: "1px solid #c7d2fe", borderRadius: 6, padding: "3px 8px", cursor: "pointer" }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}