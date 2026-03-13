'use client';


import { useState, useEffect } from "react";

// ─── Router ──────────────────────────────────────────────────────────────────
function useRouter() {
  const [page, setPage] = useState("dashboard");
  const navigate = (p) => setPage(p);
  return { page, navigate };
}


const navSections = [
  {
    section: "MAIN",
    links: [
      { label: "Dashboard", icon: "📊", page: "dashboard" },
      { label: "Pipeline", icon: "🗂", page: "pipeline" },
      { label: "Leads", icon: "👤", page: "leads" },
      { label: "Calls", icon: "📞", page: "calls" },
    ],
  },
  {
    section: "AI LAYER",
    links: [
      { label: "AI Follow-Up", icon: "🤖", page: "ai-followup", ai: true },
      { label: "Next Actions", icon: "⚡", page: "ai-actions", ai: true },
      { label: "Sentiment", icon: "😊", page: "sentiment", ai: true },
      { label: "Lead Scoring", icon: "🔥", page: "lead-scoring", ai: true },
    ],
  },
  {
    section: "TEAM",
    links: [
      { label: "Employees", icon: "👥", page: "employees" },
      { label: "Reports", icon: "🏆", page: "reports" },
      { label: "Settings", icon: "⚙️", page: "settings" },
    ],
  },
];

function Sidebar({ currentPage, navigate, user, onLogout }) {
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
          onMouseEnter={(e) => (e.target.style.color = "#ef4444")}
          onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}>⏻</button>
      </div>
    </aside>
  );
}

// ─── Layout wrapper ───────────────────────────────────────────────────────────
function Layout({ currentPage, navigate, user, onLogout, children, title, subtitle }) {
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
              <input placeholder="Search leads…" style={{ padding: "6px 12px 6px 30px", fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 99, background: "#f8fafc", outline: "none", width: 160, color: "#475569", fontFamily: "inherit" }} />
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "#94a3b8" }}>🔍</span>
            </div>
            <div style={{ position: "relative" }}>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>🔔</button>
              <span style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14, background: "#ef4444", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff", fontWeight: 800 }}>3</span>
            </div>
          </div>
        </header>
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Placeholder page ─────────────────────────────────────────────────────────
function PlaceholderPage({ icon, title, desc, color = "#6366f1", navigate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: 400, gap: 16, padding: 40 }}>
      <div style={{ width: 72, height: 72, borderRadius: 20, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{icon}</div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 900, color: "#0f172a", letterSpacing: -0.3 }}>{title}</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: "#64748b", maxWidth: 340 }}>{desc}</p>
      </div>
      <button onClick={() => navigate("dashboard")}
        style={{ marginTop: 8, padding: "9px 22px", background: color, color: "#fff", border: "none", borderRadius: 99, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
const kpis = [
  { label: "Total Leads Today", value: "48", delta: "+12%", positive: true, note: "vs yesterday", icon: "👥" },
  { label: "Calls Made", value: "134", delta: "+8%", positive: true, note: "this week", icon: "📞" },
  { label: "Conversions", value: "18.4%", delta: "+2.1%", positive: true, note: "this month", icon: "🎯" },
  { label: "Revenue MTD", value: "₹12.4L", delta: "-3%", positive: false, note: "vs last month", icon: "💰" },
];
const hotLeads = [
  { name: "Ravi Kumar", source: "Justdial", city: "Mumbai", time: "2h", score: 92 },
  { name: "Priya Sharma", source: "Website", city: "Delhi", time: "4h", score: 74 },
  { name: "Deepak Tiwari", source: "Referral", city: "Pune", time: "1d", score: 88 },
  { name: "Meena Lakshmi", source: "Walk-in", city: "Chennai", time: "", score: 65 },
];
const followUps = [
  { name: "Ravi Kumar", status: "OVERDUE", color: "#ef4444", bg: "#fef2f2", msg: "High buying intent detected. Call immediately for demo scheduling.", action: "📞 Call Now" },
  { name: "Priya Sharma", status: "DUE TODAY", color: "#f59e0b", bg: "#fffbeb", msg: "Send product brochure. Lead showed interest in Premium plan.", action: "✉ Send Email" },
  { name: "Suresh Reddy", status: "SCHEDULED", color: "#10b981", bg: "#f0fdf4", msg: "Callback scheduled for 3 PM today. Prepare pricing sheet.", action: "" },
];
const activity = [
  { dot: "#10b981", text: "Kiran Patel", action: "converted to customer", time: "10 min ago", by: "Neha G." },
  { dot: "#6366f1", text: "Aman Singh", action: "moved to Interested", time: "25 min ago", by: "Raj B." },
  { dot: "#8b5cf6", text: "AI", action: "assigned 3 new leads to Neha", time: "40 min ago", by: "auto" },
  { dot: "#0ea5e9", text: "Meena L.", action: "demo scheduled", time: "1h ago", by: "Suresh R." },
  { dot: "#ef4444", text: "Vinod H.", action: "marked as Lost", time: "2h ago", by: "Raj B." },
];
const leaderboard = [
  { rank: "🥇", name: "Neha Gupta", calls: 42, conv: "24%", rev: "₹4.2L", score: 96 },
  { rank: "🥈", name: "Raj Bhatt", calls: 38, conv: "21%", rev: "₹3.8L", score: 91 },
  { rank: "🥉", name: "Suresh Reddy", calls: 30, conv: "18%", rev: "₹2.4L", score: 84 },
  { rank: "4", name: "Aman Singh", calls: 24, conv: "15%", rev: "₹1.9L", score: 72 },
];

function ScoreBar({ score }) {
  const color = score >= 85 ? "#10b981" : score >= 70 ? "#6366f1" : "#f59e0b";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 24 }}>{score}</span>
    </div>
  );
}

function DashboardContent({ navigate }) {
  const [alertVisible, setAlertVisible] = useState(true);
  return (
    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {alertVisible && (
        <div style={{ background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", border: "1px solid #c4b5fd", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#7c3aed,#6366f1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#4c1d95" }}>AI Alert — 5 follow-ups overdue</div>
            <div style={{ fontSize: 11, color: "#6d28d9", marginTop: 2 }}>3 hot leads haven't been contacted in 24h. Immediate callback suggested for Ravi Kumar, Priya Sharma, and Deepak T.</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => navigate("ai-followup")} style={{ padding: "6px 14px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View Follow-Ups</button>
            <button onClick={() => setAlertVisible(false)} style={{ padding: "6px 10px", background: "rgba(255,255,255,0.5)", color: "#6d28d9", border: "none", borderRadius: 99, fontSize: 11, cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
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
        {/* Hot Leads */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>🔥 Hot Leads</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: "#fef2f2", color: "#ef4444", padding: "2px 8px", borderRadius: 99 }}>7 leads</span>
          </div>
          {hotLeads.map((lead, i) => (
            <div key={i} onClick={() => navigate("leads")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, background: "#fafafa", marginBottom: 5, cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")} onMouseLeave={(e) => (e.currentTarget.style.background = "#fafafa")}>
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

        {/* AI Follow-Ups */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>🤖 AI Follow-Ups</span>
            <span style={{ fontSize: 10, fontWeight: 700, background: "#ede9fe", color: "#7c3aed", padding: "2px 8px", borderRadius: 99 }}>12 pending</span>
          </div>
          {followUps.map((f, i) => (
            <div key={i} style={{ padding: "9px 10px", borderRadius: 8, background: f.bg, border: `1px solid ${f.color}20`, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{f.name}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: f.color, textTransform: "uppercase" }}>{f.status}</span>
              </div>
              <p style={{ margin: "0 0 6px", fontSize: 10, color: "#475569", lineHeight: 1.4 }}>AI: "{f.msg}"</p>
              {f.action && (
                <div style={{ display: "flex", gap: 5 }}>
                  <button style={{ padding: "3px 10px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 99, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>{f.action}</button>
                  <button style={{ padding: "3px 10px", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 99, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>Snooze</button>
                </div>
              )}
            </div>
          ))}
          <button onClick={() => navigate("ai-followup")} style={{ display: "block", width: "100%", marginTop: 6, padding: 6, background: "none", border: "none", color: "#7c3aed", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>View All Follow-Ups →</button>
        </div>

        {/* Activity */}
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

      {/* Leaderboard */}
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
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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

// ─── PIPELINE PAGE ────────────────────────────────────────────────────────────
const pipelineStages = [
  { label: "New Lead", color: "#6366f1", bg: "#eff6ff", count: 12, leads: ["Ravi Kumar", "Anita Joshi", "Mohan Das", "Sita Rao"] },
  { label: "Contacted", color: "#f59e0b", bg: "#fffbeb", count: 8, leads: ["Priya Sharma", "Deepak Tiwari", "Suresh Reddy"] },
  { label: "Interested", color: "#8b5cf6", bg: "#faf5ff", count: 6, leads: ["Aman Singh", "Kavita Nair"] },
  { label: "Demo Sched.", color: "#0ea5e9", bg: "#f0f9ff", count: 4, leads: ["Meena Lakshmi", "Raj Bhatt"] },
  { label: "Converted", color: "#10b981", bg: "#f0fdf4", count: 3, leads: ["Kiran Patel"] },
  { label: "Lost", color: "#ef4444", bg: "#fef2f2", count: 5, leads: ["Vinod Hegde", "Rajeev Kumar"] },
];

function PipelinePage({ navigate }) {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Kanban Pipeline</h2>
          <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Drag leads across stages to update their status</p>
        </div>
        <button onClick={() => navigate("leads")} style={{ padding: "7px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Add Lead</button>
      </div>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
        {pipelineStages.map((stage) => (
          <div key={stage.label} style={{ minWidth: 190, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
            <div style={{ padding: "10px 14px", background: stage.bg, borderBottom: `2px solid ${stage.color}30`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: stage.color }}>{stage.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, background: `${stage.color}20`, color: stage.color, padding: "1px 7px", borderRadius: 99 }}>{stage.count}</span>
            </div>
            <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
              {stage.leads.map((name) => (
                <div key={name} onClick={() => navigate("leads")} style={{ padding: "9px 10px", borderRadius: 8, background: "#fafafa", border: "1px solid #f1f5f9", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = stage.bg; e.currentTarget.style.borderColor = `${stage.color}40`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fafafa"; e.currentTarget.style.borderColor = "#f1f5f9"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${stage.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: stage.color }}>{name.split(" ").map((n) => n[0]).join("")}</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{name}</span>
                  </div>
                </div>
              ))}
              <button style={{ width: "100%", padding: "7px", background: "none", border: `1px dashed ${stage.color}40`, borderRadius: 8, color: stage.color, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEADS PAGE ───────────────────────────────────────────────────────────────
const leadsData = [
  { name: "Ravi Kumar", phone: "+91 98200 12345", source: "Justdial", assigned: "Neha G.", stage: "New Lead", stageColor: "#6366f1", score: 92, scoreLabel: "Hot", scoreColor: "#ef4444", sentiment: "Positive", sentColor: "#10b981", added: "18 Feb", lastContact: "2h ago" },
  { name: "Priya Sharma", phone: "+91 99001 88812", source: "Website", assigned: "Raj B.", stage: "Interested", stageColor: "#8b5cf6", score: 74, scoreLabel: "Warm", scoreColor: "#f59e0b", sentiment: "Neutral", sentColor: "#94a3b8", added: "17 Feb", lastContact: "5h ago" },
  { name: "Deepak Tiwari", phone: "+91 96655 43221", source: "Referral", assigned: "Suresh R.", stage: "Interested", stageColor: "#8b5cf6", score: 88, scoreLabel: "Hot", scoreColor: "#ef4444", sentiment: "Positive", sentColor: "#10b981", added: "16 Feb", lastContact: "1d ago" },
  { name: "Meena Lakshmi", phone: "+91 95544 32110", source: "Walk-in", assigned: "Neha G.", stage: "Demo Sched.", stageColor: "#0ea5e9", score: 65, scoreLabel: "Warm", scoreColor: "#f59e0b", sentiment: "Positive", sentColor: "#10b981", added: "15 Feb", lastContact: "3d ago" },
  { name: "Kiran Patel", phone: "+91 94433 11009", source: "Website", assigned: "Raj B.", stage: "Converted", stageColor: "#10b981", score: 91, scoreLabel: "Hot", scoreColor: "#ef4444", sentiment: "Positive", sentColor: "#10b981", added: "10 Feb", lastContact: "Today" },
  { name: "Vinod Hegde", phone: "+91 93322 00998", source: "Justdial", assigned: "Suresh R.", stage: "Lost", stageColor: "#ef4444", score: 22, scoreLabel: "Cold", scoreColor: "#94a3b8", sentiment: "Negative", sentColor: "#ef4444", added: "8 Feb", lastContact: "12 Feb" },
  { name: "Aman Singh", phone: "+91 87654 32100", source: "Website", assigned: "Aman S.", stage: "New Lead", stageColor: "#6366f1", score: 28, scoreLabel: "Cold", scoreColor: "#94a3b8", sentiment: "Neutral", sentColor: "#94a3b8", added: "18 Feb", lastContact: "New" },
];

function LeadsPage({ navigate }) {
  const [search, setSearch] = useState("");
  const filtered = leadsData.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["All (87)", "Justdial (32)", "Website (24)", "Referral (18)", "Walk-in (8)"].map((tab, i) => (
            <button key={tab} style={{ padding: "5px 12px", borderRadius: 99, border: "none", fontSize: 11.5, fontWeight: i === 0 ? 700 : 500, background: i === 0 ? "#6366f1" : "#f1f5f9", color: i === 0 ? "#fff" : "#475569", cursor: "pointer" }}>{tab}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads…" style={{ padding: "6px 12px", fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 8, outline: "none", fontFamily: "inherit" }} />
          <button style={{ padding: "6px 14px", background: "#f1f5f9", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#475569" }}>Export CSV</button>
          <button style={{ padding: "6px 14px", background: "#6366f1", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", color: "#fff" }}>+ Add Lead</button>
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              {["Name", "Phone", "Source", "Assigned", "Stage", "AI Score", "Sentiment", "Added", "Last Contact"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "9px 12px", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer", transition: "background 0.12s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "10px 16px", fontSize: 11, color: "#94a3b8", borderTop: "1px solid #f1f5f9" }}>Showing {filtered.length} of 87 leads</div>
      </div>
    </div>
  );
}

// ─── LEAD SCORING PAGE ────────────────────────────────────────────────────────
function LeadScoringPage({ navigate }) {
  const scoreFactors = [
    { label: "Call frequency (last 7 days)", pct: 30, color: "#6366f1" },
    { label: "Sentiment analysis", pct: 25, color: "#8b5cf6" },
    { label: "Engagement signals", pct: 20, color: "#0ea5e9" },
    { label: "Pipeline progression speed", pct: 15, color: "#10b981" },
    { label: "Lead source quality", pct: 10, color: "#f59e0b" },
  ];
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[{ label: "Hot Leads", count: 7, sub: "Score 75–100 · High conversion probability", color: "#ef4444", bg: "#fef2f2", icon: "🔥" },
          { label: "Warm Leads", count: 12, sub: "Score 40–74 · Needs nurturing", color: "#f59e0b", bg: "#fffbeb", icon: "🌤" },
          { label: "Cold Leads", count: 5, sub: "Score 0–39 · Low engagement", color: "#94a3b8", bg: "#f8fafc", icon: "❄️" }].map((c) => (
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
            {leadsData.sort((a,b) => b.score - a.score).map((lead, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "9px 12px", fontSize: 12, fontWeight: 700, color: "#64748b" }}>{i + 1}</td>
                <td style={{ padding: "9px 12px", fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{lead.name}</td>
                <td style={{ padding: "9px 12px" }}><span style={{ fontSize: 12, fontWeight: 800, background: `${lead.scoreColor}20`, color: lead.scoreColor, padding: "2px 8px", borderRadius: 99 }}>{lead.score}</span></td>
                <td style={{ padding: "9px 12px" }}><span style={{ fontSize: 11, color: lead.scoreColor, fontWeight: 700 }}>🔥 {lead.scoreLabel}</span></td>
                <td style={{ padding: "9px 12px", fontSize: 11, color: "#64748b" }}>{lead.source}</td>
                <td style={{ padding: "9px 12px", fontSize: 11, color: "#64748b" }}>{lead.assigned}</td>
                <td style={{ padding: "9px 12px" }}><span style={{ fontSize: 11, background: `${lead.stageColor}15`, color: lead.stageColor, padding: "2px 8px", borderRadius: 99 }}>{lead.stage}</span></td>
                <td style={{ padding: "9px 12px", fontSize: 11, fontWeight: 700, color: lead.score > 70 ? "#10b981" : "#ef4444" }}>{lead.score > 70 ? `↑ +${Math.floor(lead.score/10)}` : `↓ -${Math.floor((100-lead.score)/10)}`}</td>
                <td style={{ padding: "9px 12px" }}><button onClick={() => navigate("leads")} style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", background: "none", border: "none", cursor: "pointer" }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── AI FOLLOW-UP PAGE ────────────────────────────────────────────────────────
const allFollowUps = [
  { name: "Ravi Kumar", status: "OVERDUE", color: "#ef4444", bg: "#fef2f2", msg: "High buying intent detected. Call immediately for demo scheduling.", action: "📞 Call Now", time: "2h overdue", score: 92 },
  { name: "Priya Sharma", status: "DUE TODAY", color: "#f59e0b", bg: "#fffbeb", msg: "Send product brochure. Lead showed interest in Premium plan.", action: "✉ Send Email", time: "Due at 3 PM", score: 74 },
  { name: "Suresh Reddy", status: "SCHEDULED", color: "#10b981", bg: "#f0fdf4", msg: "Callback scheduled for 3 PM today. Prepare pricing sheet.", action: "", time: "3:00 PM", score: 68 },
  { name: "Deepak Tiwari", status: "OVERDUE", color: "#ef4444", bg: "#fef2f2", msg: "Follow-up call pending. Lead showed interest in Enterprise plan.", action: "📞 Call Now", time: "1d overdue", score: 88 },
  { name: "Meena Lakshmi", status: "DUE TODAY", color: "#f59e0b", bg: "#fffbeb", msg: "Demo reminder — confirm attendance and share meeting link.", action: "📅 Confirm", time: "Due at 5 PM", score: 65 },
  { name: "Aman Singh", status: "SCHEDULED", color: "#10b981", bg: "#f0fdf4", msg: "Re-engagement email scheduled. Cold lead — low priority.", action: "", time: "Tomorrow 10 AM", score: 28 },
];

function AIFollowUpPage({ navigate }) {
  const [snoozed, setSnoozed] = useState([]);
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[{ label: "Overdue", count: 2, color: "#ef4444", bg: "#fef2f2", icon: "⚠️" }, { label: "Due Today", count: 3, color: "#f59e0b", bg: "#fffbeb", icon: "📅" }, { label: "Scheduled", count: 7, color: "#10b981", bg: "#f0fdf4", icon: "✅" }].map((c) => (
          <div key={c.label} style={{ background: "#fff", border: `1px solid ${c.color}30`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: c.color }}>{c.count}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {allFollowUps.filter((f) => !snoozed.includes(f.name)).map((f, i) => (
          <div key={i} style={{ background: "#fff", border: `1px solid ${f.color}25`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: f.color, flexShrink: 0 }}>{f.name.split(" ").map((n) => n[0]).join("")}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{f.name}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: f.color, background: f.bg, padding: "2px 7px", borderRadius: 99, textTransform: "uppercase" }}>{f.status}</span>
                <span style={{ fontSize: 10, color: "#94a3b8" }}>· {f.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: 11.5, color: "#475569" }}>🤖 AI: "{f.msg}"</p>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              {f.action && <button style={{ padding: "6px 14px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{f.action}</button>}
              <button onClick={() => setSnoozed([...snoozed, f.name])} style={{ padding: "6px 12px", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Snooze</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Router → page map ────────────────────────────────────────────────────────
function App() {
  const { page, navigate } = useRouter();
  const [user] = useState({ name: "Akshat K.", role: "Admin" });
  const [loggedIn, setLoggedIn] = useState(true); // start logged in for demo

  const pageConfig = {
    dashboard:    { title: "Dashboard",     subtitle: `Welcome back, Akshat · ${new Date().toDateString()}` },
    pipeline:     { title: "Pipeline",      subtitle: "Drag-and-drop kanban workflow" },
    leads:        { title: "Leads",         subtitle: "All leads · Table view with source breakdown" },
    calls:        { title: "Calls",         subtitle: "Call history and recordings" },
    "ai-followup":{ title: "AI Follow-Up",  subtitle: "AI-powered follow-up reminders" },
    "ai-actions": { title: "Next Actions",  subtitle: "AI-suggested best next steps" },
    sentiment:    { title: "Sentiment",     subtitle: "Post-call AI analysis · Flags at-risk leads" },
    "lead-scoring":{ title: "Lead Scoring", subtitle: "Real-time scoring · Hot / Warm / Cold distribution" },
    employees:    { title: "Employees",     subtitle: "Team performance and management" },
    reports:      { title: "Reports",       subtitle: "Full analytics and export" },
    settings:     { title: "Settings",      subtitle: "Workspace preferences" },
  };

  const cfg = pageConfig[page] || pageConfig.dashboard;

  const renderPage = () => {
    if (page === "dashboard")     return <DashboardContent navigate={navigate} />;
    if (page === "pipeline")      return <PipelinePage navigate={navigate} />;
    if (page === "leads")         return <LeadsPage navigate={navigate} />;
    if (page === "ai-followup")   return <AIFollowUpPage navigate={navigate} />;
    if (page === "lead-scoring")  return <LeadScoringPage navigate={navigate} />;
    return (
      <PlaceholderPage
        icon={page === "calls" ? "📞" : page === "ai-actions" ? "⚡" : page === "sentiment" ? "😊" : page === "employees" ? "👥" : page === "reports" ? "🏆" : "⚙️"}
        title={cfg.title}
        desc={`The ${cfg.title} page is under construction. Navigate back or explore other sections.`}
        color={["ai-actions","sentiment","ai-followup"].includes(page) ? "#7c3aed" : "#6366f1"}
        navigate={navigate}
      />
    );
  };

  return (
    <Layout currentPage={page} navigate={navigate} user={user} onLogout={() => setLoggedIn(false)} title={cfg.title} subtitle={cfg.subtitle}>
      <style>{`* { box-sizing: border-box; }`}</style>
      {renderPage()}
    </Layout>
  );
}




export default App;