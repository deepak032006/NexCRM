'use client';

import { useState, useEffect } from "react";
import { PageKey, User } from "@/types";
import { navSections } from "@/lib/data";

interface SidebarProps {
  currentPage: PageKey;
  navigate: (p: PageKey) => void;
  user: User;
  onLogout: () => void;
}

export default function Sidebar({ currentPage, navigate, user, onLogout }: SidebarProps) {
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AK";
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <aside style={{ width: 210, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh" }}>
      <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }} onClick={() => navigate("dashboard")}>
        <div style={{ fontSize: 19, fontWeight: 900, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: -0.5 }}>NexCRM</div>
        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
          {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} · {time.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
        </div>
      </div>

      <nav style={{ flex: 1, padding: "8px", overflowY: "auto" }}>
        {navSections.map((s) => (
          <div key={s.section}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#94a3b8", padding: "10px 8px 3px" }}>{s.section}</div>
            {s.links.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button key={link.page} onClick={() => navigate(link.page)}
                  style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: isActive ? 700 : 500, marginBottom: 2, transition: "all 0.15s",
                    background: isActive ? (link.ai ? "#ede9fe" : "#eff6ff") : link.ai ? "#faf5ff" : "transparent",
                    color: isActive ? (link.ai ? "#7c3aed" : "#3b82f6") : link.ai ? "#7c3aed" : "#475569",
                    borderLeft: isActive ? `3px solid ${link.ai ? "#7c3aed" : "#3b82f6"}` : "3px solid transparent",
                  }}>
                  <span style={{ fontSize: 13 }}>{link.icon}</span>
                  {link.label}
                  {isActive && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: link.ai ? "#7c3aed" : "#3b82f6" }} />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding: "12px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
          <div style={{ fontSize: 9.5, color: "#94a3b8" }}>{user?.role}</div>
        </div>
        <button onClick={onLogout} title="Logout"
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#94a3b8", padding: 4, borderRadius: 6, transition: "color 0.15s" }}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#ef4444")}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "#94a3b8")}>⏻</button>
      </div>
    </aside>
  );
}