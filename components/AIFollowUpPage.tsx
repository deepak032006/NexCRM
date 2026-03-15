'use client';

import { useState } from "react";
import { PageKey } from "@/types";
import { allFollowUps } from "@/lib/data";

interface AIFollowUpPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

export default function AIFollowUpPage({ navigate: _navigate, toast }: AIFollowUpPageProps) {
  const [snoozed, setSnoozed] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);

  const visible = allFollowUps.filter(f => !snoozed.includes(f.name) && !done.includes(f.name));

  const overdue = allFollowUps.filter(f => f.status === "OVERDUE").length;
  const dueToday = allFollowUps.filter(f => f.status === "DUE TODAY").length;
  const scheduled = allFollowUps.filter(f => f.status === "SCHEDULED").length;

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[
          { label: "Overdue",   count: overdue,   color: "#ef4444", bg: "#fef2f2", icon: "⚠️" },
          { label: "Due Today", count: dueToday,  color: "#f59e0b", bg: "#fffbeb", icon: "📅" },
          { label: "Scheduled", count: scheduled, color: "#10b981", bg: "#f0fdf4", icon: "✅" },
        ].map((c) => (
          <div key={c.label} style={{ background: "#fff", border: `1px solid ${c.color}30`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: c.color }}>{c.count}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: 14, background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0" }}>
          🎉 All follow-ups cleared!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((f, i) => (
          <div key={i} style={{ background: "#fff", border: `1px solid ${f.color}25`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: f.color, flexShrink: 0 }}>
              {f.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{f.name}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: f.color, background: f.bg, padding: "2px 7px", borderRadius: 99, textTransform: "uppercase" }}>{f.status}</span>
                <span style={{ fontSize: 10, color: "#94a3b8" }}>· {f.time}</span>
                {f.score && <span style={{ fontSize: 10, color: "#6366f1", fontWeight: 600 }}>Score: {f.score}</span>}
              </div>
              <p style={{ margin: 0, fontSize: 11.5, color: "#475569" }}>🤖 AI: &quot;{f.msg}&quot;</p>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              {f.action && (
                <button
                  onClick={() => { setDone(prev => [...prev, f.name]); toast(`✅ ${f.action} done for ${f.name}`); }}
                  style={{ padding: "6px 14px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                  {f.action}
                </button>
              )}
              <button
                onClick={() => { setSnoozed(prev => [...prev, f.name]); toast(`⏰ Snoozed ${f.name} for 1 hour`); }}
                style={{ padding: "6px 12px", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                Snooze
              </button>
            </div>
          </div>
        ))}
      </div>

      {(snoozed.length > 0 || done.length > 0) && (
        <button
          onClick={() => { setSnoozed([]); setDone([]); toast("🔄 All follow-ups restored"); }}
          style={{ alignSelf: "center", padding: "7px 20px", background: "none", border: "1px solid #e2e8f0", borderRadius: 99, fontSize: 11, color: "#64748b", cursor: "pointer" }}>
          Reset All
        </button>
      )}
    </div>
  );
}