'use client';

import { useState } from "react";
import { PageKey } from "@/types";
import { pipelineStages as initialStages } from "@/lib/data";

interface PipelinePageProps {
  navigate: (p: PageKey) => void;
  toast: (msg: string) => void;
}

export default function PipelinePage({ navigate, toast }: PipelinePageProps) {
  const [stages, setStages] = useState(initialStages.map(s => ({ ...s, leads: [...s.leads] })));
  const [dragging, setDragging] = useState<{ name: string; fromLabel: string } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const handleDrop = (toLabel: string) => {
    if (!dragging || dragging.fromLabel === toLabel) { setDragging(null); setDragOver(null); return; }
    setStages(prev => prev.map(s => {
      if (s.label === dragging.fromLabel) return { ...s, leads: s.leads.filter(l => l !== dragging.name), count: s.count - 1 };
      if (s.label === toLabel) return { ...s, leads: [...s.leads, dragging.name], count: s.count + 1 };
      return s;
    }));
    toast(`✅ ${dragging.name} moved to ${toLabel}`);
    setDragging(null);
    setDragOver(null);
  };

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
        {stages.map((stage) => (
          <div key={stage.label}
            style={{ minWidth: 190, background: "#fff", border: `2px solid ${dragOver === stage.label ? stage.color : "#e2e8f0"}`, borderRadius: 12, overflow: "hidden", flexShrink: 0, transition: "border-color 0.15s" }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(stage.label); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(stage.label)}>
            <div style={{ padding: "10px 14px", background: stage.bg, borderBottom: `2px solid ${stage.color}30`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: stage.color }}>{stage.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, background: `${stage.color}20`, color: stage.color, padding: "1px 7px", borderRadius: 99 }}>{stage.count}</span>
            </div>
            <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7, minHeight: 80 }}>
              {stage.leads.map((name) => (
                <div key={name}
                  draggable
                  onDragStart={() => setDragging({ name, fromLabel: stage.label })}
                  onDragEnd={() => { setDragging(null); setDragOver(null); }}
                  onClick={() => navigate("leads")}
                  style={{ padding: "9px 10px", borderRadius: 8, background: "#fafafa", border: "1px solid #f1f5f9", cursor: "grab", transition: "all 0.15s", userSelect: "none" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = stage.bg; (e.currentTarget as HTMLDivElement).style.borderColor = `${stage.color}40`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#fafafa"; (e.currentTarget as HTMLDivElement).style.borderColor = "#f1f5f9"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${stage.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: stage.color }}>{name.split(" ").map((n) => n[0]).join("")}</div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{name}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => toast(`➕ Lead added to ${stage.label}`)} style={{ width: "100%", padding: "7px", background: "none", border: `1px dashed ${stage.color}40`, borderRadius: 8, color: stage.color, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}