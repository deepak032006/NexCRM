'use client';

import { useState } from "react";
import { PageKey } from "@/types";

interface NextActionsPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

const nextActionsData = [
  { lead: "Ravi Kumar",    action: "Schedule Demo",   priority: "HIGH",   reason: "High score + no demo booked yet",  due: "Today",    assignedTo: "Neha G.",   icon: "📅", color: "#6366f1" },
  { lead: "Deepak Tiwari", action: "Follow-up Call",  priority: "HIGH",   reason: "Overdue callback by 1 day",         due: "Now",      assignedTo: "Suresh R.", icon: "📞", color: "#ef4444" },
  { lead: "Priya Sharma",  action: "Send Brochure",   priority: "MEDIUM", reason: "Expressed interest in Premium",     due: "3 PM",     assignedTo: "Raj B.",    icon: "✉️",  color: "#f59e0b" },
  { lead: "Meena Lakshmi", action: "Confirm Demo",    priority: "MEDIUM", reason: "Demo scheduled for tomorrow",       due: "5 PM",     assignedTo: "Neha G.",   icon: "✅", color: "#0ea5e9" },
  { lead: "Aman Singh",    action: "Re-engage Email", priority: "LOW",    reason: "Cold lead, 5 days no contact",      due: "Tomorrow", assignedTo: "Aman S.",   icon: "📧", color: "#94a3b8" },
  { lead: "Vinod Hegde",   action: "Mark as Lost",    priority: "LOW",    reason: "No response after 3 attempts",      due: "Anytime",  assignedTo: "Raj B.",    icon: "❌", color: "#ef4444" },
];

const priorityColors: Record<string, { bg: string; color: string }> = {
  HIGH:   { bg: "#fef2f2", color: "#ef4444" },
  MEDIUM: { bg: "#fffbeb", color: "#f59e0b" },
  LOW:    { bg: "#f8fafc", color: "#94a3b8" },
};

export default function NextActionsPage({ navigate: _navigate, toast }: NextActionsPageProps) {
  const [done, setDone] = useState<number[]>([]);
  const [filter, setFilter] = useState("All");

  const filtered = nextActionsData.filter(a => filter === "All" || a.priority === filter);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[
          { label: "High Priority", count: nextActionsData.filter(a => a.priority === "HIGH").length,   color: "#ef4444", icon: "🔴" },
          { label: "Medium",        count: nextActionsData.filter(a => a.priority === "MEDIUM").length, color: "#f59e0b", icon: "🟡" },
          { label: "Low Priority",  count: nextActionsData.filter(a => a.priority === "LOW").length,    color: "#94a3b8", icon: "⚪" },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{c.icon}</span>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: c.color }}>{c.count}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8 }}>
        {["All", "HIGH", "MEDIUM", "LOW"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 14px", borderRadius: 99, border: "none", fontSize: 11.5, fontWeight: filter === f ? 700 : 500, background: filter === f ? "#6366f1" : "#f1f5f9", color: filter === f ? "#fff" : "#475569", cursor: "pointer" }}>{f}</button>
        ))}
        {done.length > 0 && (
          <button onClick={() => { setDone([]); toast("🔄 Actions reset"); }} style={{ marginLeft: "auto", padding: "5px 14px", borderRadius: 99, border: "1px solid #e2e8f0", fontSize: 11.5, fontWeight: 500, background: "none", color: "#64748b", cursor: "pointer" }}>Reset Done ({done.length})</button>
        )}
      </div>

      {/* Action cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((a, i) => {
          const isDone = done.includes(i);
          const pc = priorityColors[a.priority];
          return (
            <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, opacity: isDone ? 0.5 : 1, transition: "opacity 0.3s" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${a.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{a.lead}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 99, background: pc.bg, color: pc.color }}>{a.priority}</span>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>Due: {a.due} · {a.assignedTo}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: a.color }}>{a.action}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>💡 {a.reason}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => { if (!isDone) { setDone(prev => [...prev, i]); toast(`✅ "${a.action}" marked done for ${a.lead}`); } }}
                  disabled={isDone}
                  style={{ padding: "6px 14px", background: isDone ? "#f1f5f9" : "#6366f1", color: isDone ? "#94a3b8" : "#fff", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: isDone ? "not-allowed" : "pointer" }}>
                  {isDone ? "✓ Done" : "Mark Done"}
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: 13, background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0" }}>No actions for this priority.</div>
        )}
      </div>
    </div>
  );
}