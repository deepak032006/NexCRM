'use client';

import { useState } from "react";
import { PageKey } from "@/types";
import ScoreBar from "@/components/ScoreBar";

interface EmployeesPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

const employees = [
  { name: "Neha Gupta",   role: "Senior Counselor", calls: 42, conv: 24, rev: "₹4.2L", score: 96, status: "active",   color: "#10b981", joined: "Jan 2023", phone: "+91 98111 00001" },
  { name: "Raj Bhatt",    role: "Counselor",         calls: 38, conv: 21, rev: "₹3.8L", score: 91, status: "active",   color: "#6366f1", joined: "Mar 2023", phone: "+91 98111 00002" },
  { name: "Suresh Reddy", role: "Counselor",         calls: 30, conv: 18, rev: "₹2.4L", score: 84, status: "active",   color: "#f59e0b", joined: "Jun 2023", phone: "+91 98111 00003" },
  { name: "Aman Singh",   role: "Junior Counselor",  calls: 24, conv: 15, rev: "₹1.9L", score: 72, status: "active",   color: "#0ea5e9", joined: "Sep 2023", phone: "+91 98111 00004" },
  { name: "Kavita Nair",  role: "Counselor",         calls: 19, conv: 12, rev: "₹1.2L", score: 65, status: "on-leave", color: "#8b5cf6", joined: "Nov 2023", phone: "+91 98111 00005" },
];

export default function EmployeesPage({ navigate: _navigate, toast }: EmployeesPageProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { label: "Total Team",   value: employees.length,                                  icon: "👥", color: "#6366f1" },
          { label: "Active",       value: employees.filter(e => e.status === "active").length, icon: "✅", color: "#10b981" },
          { label: "On Leave",     value: employees.filter(e => e.status === "on-leave").length,icon: "🏖", color: "#f59e0b" },
          { label: "Avg Score",    value: Math.round(employees.reduce((s,e)=>s+e.score,0)/employees.length), icon: "⭐", color: "#8b5cf6" },
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

      {/* Employee table */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>👥 Team Members</div>
          <button onClick={() => toast("➕ Add Employee form coming soon!")} style={{ padding: "6px 14px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Add Employee</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Name", "Role", "Calls MTD", "Conv%", "Revenue", "Score", "Status", "Joined", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 12px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr key={i}
                style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer", background: selected === i ? "#f8fafc" : "transparent", transition: "background 0.12s" }}
                onClick={() => setSelected(selected === i ? null : i)}
                onMouseEnter={e => { if (selected !== i) e.currentTarget.style.background = "#f8fafc"; }}
                onMouseLeave={e => { if (selected !== i) e.currentTarget.style.background = "transparent"; }}>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${emp.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: emp.color }}>{emp.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{emp.name}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>{emp.phone}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569" }}>{emp.role}</td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 600, color: "#1e293b" }}>{emp.calls}</td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 700, color: "#10b981" }}>{emp.conv}%</td>
                <td style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 600, color: "#1e293b" }}>{emp.rev}</td>
                <td style={{ padding: "10px 12px", width: 120 }}><ScoreBar score={emp.score} /></td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ fontSize: 11, background: emp.status === "active" ? "#f0fdf4" : "#fffbeb", color: emp.status === "active" ? "#10b981" : "#f59e0b", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>
                    {emp.status === "active" ? "🟢 Active" : "🟡 On Leave"}
                  </span>
                </td>
                <td style={{ padding: "10px 12px", fontSize: 11, color: "#94a3b8" }}>{emp.joined}</td>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={e => { e.stopPropagation(); toast(`📞 Calling ${emp.name}...`); }} style={{ padding: "4px 10px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Call</button>
                    <button onClick={e => { e.stopPropagation(); toast(`✉️ Message sent to ${emp.name}`); }} style={{ padding: "4px 10px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>Message</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}