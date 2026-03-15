'use client';

import { useState } from "react";
import { PageKey } from "@/types";

interface SettingsPageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

export default function SettingsPage({ navigate: _navigate, toast }: SettingsPageProps) {
  const [profile, setProfile] = useState({ name: "Akshat K.", email: "akshat@nexcrm.in", phone: "+91 99000 12345", role: "Admin" });
  const [notifs, setNotifs] = useState({ overdueAlerts: true, newLeads: true, dailyReport: false, weeklyDigest: true });
  const [aiSettings, setAiSettings] = useState({ autoScore: true, autoAssign: false, sentimentAnalysis: true, followUpSuggestions: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    toast("✅ Settings saved successfully!");
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "inherit", color: "#1e293b", boxSizing: "border-box" as const };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div onClick={onChange} style={{ width: 40, height: 22, borderRadius: 99, background: value ? "#6366f1" : "#e2e8f0", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: value ? 20 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Profile Settings */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>👤 Profile Settings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Full Name",  key: "name",  type: "text"  },
              { label: "Email",      key: "email", type: "email" },
              { label: "Phone",      key: "phone", type: "text"  },
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>{f.label}</div>
                <input
                  type={f.type}
                  value={(profile as Record<string, string>)[f.key]}
                  onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Role</div>
              <select value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} style={{ ...inputStyle, background: "#fff" }}>
                {["Admin", "Manager", "Counselor"].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🔔 Notification Settings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Overdue Follow-Up Alerts", sub: "Alert when a follow-up is past due",   key: "overdueAlerts"       },
              { label: "New Lead Assigned",        sub: "Notify when a new lead is assigned",   key: "newLeads"            },
              { label: "Daily Report",             sub: "Get daily performance summary",        key: "dailyReport"         },
              { label: "Weekly Digest",            sub: "Weekly team performance digest",       key: "weeklyDigest"        },
            ].map(n => (
              <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1e293b" }}>{n.label}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{n.sub}</div>
                </div>
                <Toggle value={(notifs as Record<string, boolean>)[n.key]} onChange={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))} />
              </div>
            ))}
          </div>
        </div>

        {/* AI Settings */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🤖 AI Settings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Auto Lead Scoring",       sub: "AI scores every new lead automatically",   key: "autoScore"             },
              { label: "Auto Assign Leads",        sub: "AI assigns leads to best-fit counselor",  key: "autoAssign"            },
              { label: "Sentiment Analysis",       sub: "Analyze call sentiment post-conversation",key: "sentimentAnalysis"     },
              { label: "Follow-Up Suggestions",    sub: "AI suggests next best follow-up action",  key: "followUpSuggestions"   },
            ].map(n => (
              <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1e293b" }}>{n.label}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{n.sub}</div>
                </div>
                <Toggle value={(aiSettings as Record<string, boolean>)[n.key]} onChange={() => setAiSettings(p => ({ ...p, [n.key]: !p[n.key as keyof typeof p] }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "18px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>⚙️ Workspace</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => toast("📤 Data export started — check email in 5 mins")} style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, color: "#475569", cursor: "pointer", textAlign: "left" }}>📤 Export All Data</button>
            <button onClick={() => toast("🔗 Integration setup opened in new tab")} style={{ width: "100%", padding: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12.5, fontWeight: 600, color: "#475569", cursor: "pointer", textAlign: "left" }}>🔗 Manage Integrations</button>
            <button onClick={() => toast("🗑 Please confirm in email to delete account")} style={{ width: "100%", padding: "10px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 12.5, fontWeight: 600, color: "#ef4444", cursor: "pointer", textAlign: "left" }}>🗑 Delete Account</button>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleSave} style={{ padding: "10px 28px", background: saved ? "#10b981" : "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}>
          {saved ? "✅ Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}