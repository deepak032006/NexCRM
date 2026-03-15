'use client';

import { useState } from "react";
import { PageKey } from "@/types";

interface SentimentPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

const sentimentData = [
  { name: "Ravi Kumar",    score: 92, sentiment: "Positive", tags: ["Excited", "Budget Ready", "Urgent"], color: "#10b981", last: "Today"     },
  { name: "Priya Sharma",  score: 55, sentiment: "Neutral",  tags: ["Comparing", "Needs Info"],            color: "#f59e0b", last: "Today"     },
  { name: "Deepak Tiwari", score: 88, sentiment: "Positive", tags: ["High Intent", "Referral"],             color: "#10b981", last: "Yesterday" },
  { name: "Meena Lakshmi", score: 70, sentiment: "Positive", tags: ["Demo Booked"],                         color: "#10b981", last: "3d ago"    },
  { name: "Aman Singh",    score: 30, sentiment: "Negative", tags: ["Disinterested", "Price Concern"],       color: "#ef4444", last: "Yesterday" },
  { name: "Vinod Hegde",   score: 12, sentiment: "Negative", tags: ["Lost", "Competitor Chose"],             color: "#ef4444", last: "12 Feb"   },
];

export default function SentimentPage({ navigate, toast }: SentimentPageProps) {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? sentimentData : sentimentData.filter(s => s.sentiment === filter);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Summary cards — clickable to filter */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[
          { label: "Positive", count: sentimentData.filter(s => s.sentiment === "Positive").length, color: "#10b981", bg: "#f0fdf4", icon: "😊" },
          { label: "Neutral",  count: sentimentData.filter(s => s.sentiment === "Neutral").length,  color: "#f59e0b", bg: "#fffbeb", icon: "😐" },
          { label: "Negative", count: sentimentData.filter(s => s.sentiment === "Negative").length, color: "#ef4444", bg: "#fef2f2", icon: "😟" },
        ].map(c => (
          <div key={c.label} onClick={() => setFilter(filter === c.label ? "All" : c.label)}
            style={{ background: "#fff", border: `2px solid ${filter === c.label ? c.color : "#e2e8f0"}`, borderRadius: 12, padding: "16px", display: "flex", gap: 12, alignItems: "center", cursor: "pointer", transition: "border-color 0.15s" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 900, color: c.color, letterSpacing: -0.5 }}>{c.count}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{c.label} Sentiment</div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>Click to filter</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>Post-Call Sentiment Analysis</div>
        {filter !== "All" && (
          <button onClick={() => setFilter("All")} style={{ fontSize: 11, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Show All ×</button>
        )}
      </div>

      {/* Sentiment cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map((s, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: s.color }}>{s.name.split(" ").map(n => n[0]).join("")}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>Last call: {s.last}</div>
                </div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, background: `${s.color}15`, color: s.color, padding: "3px 10px", borderRadius: 99 }}>{s.sentiment}</span>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>Sentiment Score</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.score}/100</span>
              </div>
              <div style={{ height: 6, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${s.score}%`, height: "100%", background: s.color, borderRadius: 99 }} />
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
              {s.tags.map(t => (
                <span key={t} style={{ fontSize: 10, background: `${s.color}10`, color: s.color, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>{t}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => { toast(`📞 Calling ${s.name}...`); }} style={{ padding: "5px 12px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>📞 Call</button>
              <button onClick={() => navigate("leads")} style={{ padding: "5px 12px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>View Lead →</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: 13, background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0" }}>No leads found for this sentiment.</div>
        )}
      </div>
    </div>
  );
}