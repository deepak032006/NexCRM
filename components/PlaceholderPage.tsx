'use client';

import { PageKey } from "@/types";

interface PlaceholderPageProps {
  icon: string;
  title: string;
  desc: string;
  color?: string;
  navigate: (p: PageKey) => void;
}

export default function PlaceholderPage({ icon, title, desc, color = "#6366f1", navigate }: PlaceholderPageProps) {
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