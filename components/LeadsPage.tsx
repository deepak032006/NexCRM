'use client';

import { useState } from "react";
import { Lead, PageKey } from "@/types";

interface LeadsPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

function AddLeadModal({ onClose, onAdd }: { onClose: () => void; onAdd: (l: Lead) => void }) {
  const [form, setForm] = useState({ name: "", phone: "", source: "Justdial", assigned: "Neha G.", stage: "New Lead" });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const stageColorMap: Record<string, string> = {
    "New Lead": "#6366f1", "Contacted": "#f59e0b", "Interested": "#8b5cf6",
    "Demo Sched.": "#0ea5e9", "Converted": "#10b981", "Lost": "#ef4444",
  };

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    onAdd({
      ...form,
      stageColor: stageColorMap[form.stage] ?? "#6366f1",
      score: 50, scoreLabel: "Warm", scoreColor: "#f59e0b",
      sentiment: "Neutral", sentColor: "#94a3b8",
      added: "Today", lastContact: "New",
    });
    onClose();
  };

  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "inherit", color: "#1e293b", boxSizing: "border-box" as const };
  const selectStyle = { ...inputStyle, background: "#fff" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, width: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a" }}>➕ Add New Lead</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8" }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Full Name *" style={inputStyle} />
          <input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Phone Number *" style={inputStyle} />
          <select value={form.source} onChange={e => set("source", e.target.value)} style={selectStyle}>
            {["Justdial", "Website", "Referral", "Walk-in", "IndiaMart", "Social Media"].map(o => <option key={o}>{o}</option>)}
          </select>
          <select value={form.assigned} onChange={e => set("assigned", e.target.value)} style={selectStyle}>
            {["Neha G.", "Raj B.", "Suresh R.", "Aman S.", "Kavita N."].map(o => <option key={o}>{o}</option>)}
          </select>
          <select value={form.stage} onChange={e => set("stage", e.target.value)} style={selectStyle}>
            {["New Lead", "Contacted", "Interested", "Demo Sched.", "Converted", "Lost"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <button onClick={submit} style={{ flex: 1, padding: "9px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add Lead</button>
          <button onClick={onClose} style={{ padding: "9px 16px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage({ navigate: _navigate, toast, leads, setLeads }: LeadsPageProps) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const sources = ["Justdial", "Website", "Referral", "Walk-in"];
  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search);
    const matchTab = tab === "All" || l.source === tab;
    return matchSearch && matchTab;
  });

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Source", "Assigned", "Stage", "Score", "Sentiment", "Added", "Last Contact"];
    const rows = filtered.map(l => [l.name, l.phone, l.source, l.assigned, l.stage, l.score, l.sentiment, l.added, l.lastContact]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "leads.csv"; a.click();
    URL.revokeObjectURL(url);
    toast("📥 CSV exported successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      {showModal && (
        <AddLeadModal
          onClose={() => setShowModal(false)}
          onAdd={(l) => { setLeads(prev => [l, ...prev]); toast(`✅ ${l.name} added successfully!`); }}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["All", ...sources].map((t) => {
            const count = t === "All" ? leads.length : leads.filter(l => l.source === t).length;
            return (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "5px 12px", borderRadius: 99, border: "none", fontSize: 11.5, fontWeight: tab === t ? 700 : 500, background: tab === t ? "#6366f1" : "#f1f5f9", color: tab === t ? "#fff" : "#475569", cursor: "pointer" }}>
                {t} ({count})
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads…" style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 8, outline: "none", fontFamily: "inherit" }} />
          <button onClick={exportCSV} style={{ padding: "6px 14px", background: "#f1f5f9", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#475569" }}>Export CSV</button>
          <button onClick={() => setShowModal(true)} style={{ padding: "6px 14px", background: "#6366f1", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", color: "#fff" }}>+ Add Lead</button>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              {["Name", "Phone", "Source", "Assigned", "Stage", "AI Score", "Sentiment", "Added", "Last Contact", "Action"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "9px 12px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.12s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${lead.stageColor}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: lead.stageColor }}>{lead.name.split(" ").map((n) => n[0]).join("")}</div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{lead.name}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569" }}>{lead.phone}</td>
                <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, background: "#f1f5f9", color: "#475569", padding: "2px 8px", borderRadius: 99 }}>{lead.source}</span></td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569" }}>{lead.assigned}</td>
                <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, background: `${lead.stageColor}15`, color: lead.stageColor, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>{lead.stage}</span></td>
                <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, background: `${lead.scoreColor}15`, color: lead.scoreColor, padding: "2px 8px", borderRadius: 99, fontWeight: 700 }}>🔥 {lead.scoreLabel} · {lead.score}</span></td>
                <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, background: `${lead.sentColor}15`, color: lead.sentColor, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>{lead.sentiment}</span></td>
                <td style={{ padding: "10px 12px", fontSize: 11, color: "#94a3b8" }}>{lead.added}</td>
                <td style={{ padding: "10px 12px", fontSize: 11, color: "#94a3b8" }}>{lead.lastContact}</td>
                <td style={{ padding: "10px 12px" }}>
                  <button
                    onClick={() => { setLeads(prev => prev.filter((_, j) => j !== i)); toast(`🗑 ${lead.name} deleted`); }}
                    style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", background: "none", border: "1px solid #fecaca", borderRadius: 6, padding: "3px 8px", cursor: "pointer" }}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={10} style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>No leads found.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{ padding: "10px 16px", fontSize: 11, color: "#94a3b8", borderTop: "1px solid #f1f5f9" }}>
          Showing {filtered.length} of {leads.length} leads
        </div>
      </div>
    </div>
  );
}