'use client';

import { useState } from "react";
import { PageKey, User } from "@/types";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  currentPage: PageKey;
  navigate: (p: PageKey) => void;
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const notifications = [
  "Ravi Kumar follow-up overdue 2h",
  "Deepak Tiwari: missed callback",
  "3 new leads from Justdial assigned",
];

export default function Layout({ currentPage, navigate, user, onLogout, children, title, subtitle }: LayoutProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const [search, setSearch] = useState("");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#f8fafc", overflow: "hidden" }}>
      <Sidebar currentPage={currentPage} navigate={navigate} user={user} onLogout={onLogout} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0", padding: "10px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: "#0f172a", letterSpacing: -0.3 }}>{title}</h1>
            {subtitle && <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{subtitle}</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && search.trim()) navigate("leads"); }}
                placeholder="Search leads…"
                style={{ padding: "6px 12px 6px 30px", fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 99, background: "#f8fafc", outline: "none", width: 160, color: "#475569", fontFamily: "inherit" }}
              />
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "#94a3b8" }}>🔍</span>
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={() => setNotifOpen(p => !p)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>🔔</button>
              {notifList.length > 0 && (
                <span style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14, background: "#ef4444", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 800 }}>{notifList.length}</span>
              )}
              {notifOpen && (
                <div style={{ position: "absolute", right: 0, top: 38, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, width: 280, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 200 }}>
                  <div style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#0f172a" }}>Notifications</span>
                    <button onClick={() => { setNotifList([]); setNotifOpen(false); }} style={{ fontSize: 10, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Clear All</button>
                  </div>
                  {notifList.length === 0 && (
                    <div style={{ padding: "20px", textAlign: "center", fontSize: 12, color: "#94a3b8" }}>🎉 All clear!</div>
                  )}
                  {notifList.map((n, i) => (
                    <div key={i} style={{ padding: "10px 14px", borderBottom: "1px solid #f8fafc", fontSize: 11.5, color: "#475569", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <span>⚠️ {n}</span>
                      <button onClick={() => setNotifList(p => p.filter((_, j) => j !== i))} style={{ fontSize: 10, color: "#94a3b8", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}