'use client';

import { useState, useEffect, useCallback } from "react";
import { PageKey, User, Lead } from "@/types";
import { useRouter } from "@/lib/useRouter";
import { leadsData } from "@/lib/data";
import Layout from "@/components/Layout";
import DashboardContent from "@/components/DashboardContent";
import PipelinePage from "@/components/PipelinePage";
import LeadsPage from "@/components/LeadsPage";
import CallsPage from "@/components/Callspage";
import AIFollowUpPage from "@/components/AIFollowUpPage";
import NextActionsPage from "@/components/Nextactionspage";
import SentimentPage from "@/components/Sentimentpage";
import LeadScoringPage from "@/components/LeadScoringPage";
import EmployeesPage from "@/components/Employeespage";
import ReportsPage from "@/components/Reportspage";
import SettingsPage from "@/components/Settingspage";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: "#1e293b", color: "#fff",
      padding: "12px 20px", borderRadius: 12,
      fontSize: 13, fontWeight: 600, zIndex: 9999,
      boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
      display: "flex", alignItems: "center", gap: 10,
      animation: "slideUp 0.2s ease",
    }}>
      {msg}
    </div>
  );
}

// ─── Page config ──────────────────────────────────────────────────────────────
const pageConfig: Record<PageKey, { title: string; subtitle: string }> = {
  dashboard:      { title: "Dashboard",     subtitle: `Welcome back, Akshat · ${new Date().toDateString()}` },
  pipeline:       { title: "Pipeline",      subtitle: "Drag-and-drop kanban workflow" },
  leads:          { title: "Leads",         subtitle: "All leads · Table view with source breakdown" },
  calls:          { title: "Calls",         subtitle: "Call log · recordings · outcomes" },
  "ai-followup":  { title: "AI Follow-Up",  subtitle: "AI-powered follow-up reminders" },
  "ai-actions":   { title: "Next Actions",  subtitle: "AI-suggested best next steps for each lead" },
  sentiment:      { title: "Sentiment",     subtitle: "Post-call AI analysis · Flags at-risk leads" },
  "lead-scoring": { title: "Lead Scoring",  subtitle: "Real-time scoring · Hot / Warm / Cold distribution" },
  employees:      { title: "Employees",     subtitle: "Team performance and management" },
  reports:        { title: "Reports",       subtitle: "Full analytics and export" },
  settings:       { title: "Settings",      subtitle: "Workspace preferences" },
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const { page, navigate } = useRouter();
  const [user] = useState<User>({ name: "Akshat K.", role: "Admin" });
  const [leads, setLeads] = useState<Lead[]>(leadsData);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = useCallback((msg: string) => setToastMsg(msg), []);
  const cfg = pageConfig[page];

  const renderPage = () => {
    switch (page) {
      case "dashboard":    return <DashboardContent navigate={navigate} toast={toast} />;
      case "pipeline":     return <PipelinePage navigate={navigate} toast={toast} />;
      case "leads":        return <LeadsPage navigate={navigate} toast={toast} leads={leads} setLeads={setLeads} />;
      case "calls":        return <CallsPage navigate={navigate} toast={toast} />;
      case "ai-followup":  return <AIFollowUpPage navigate={navigate} toast={toast} />;
      case "ai-actions":   return <NextActionsPage navigate={navigate} toast={toast} />;
      case "sentiment":    return <SentimentPage navigate={navigate} toast={toast} />;
      case "lead-scoring": return <LeadScoringPage navigate={navigate} leads={leads} toast={toast} />;
      case "employees":    return <EmployeesPage navigate={navigate} toast={toast} />;
      case "reports":      return <ReportsPage navigate={navigate} toast={toast} />;
      case "settings":     return <SettingsPage navigate={navigate} toast={toast} />;
      default:             return null;
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Layout
        currentPage={page}
        navigate={navigate}
        user={user}
        onLogout={() => toast("👋 Logged out")}
        title={cfg.title}
        subtitle={cfg.subtitle}>
        {renderPage()}
      </Layout>

      {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}
    </>
  );
}