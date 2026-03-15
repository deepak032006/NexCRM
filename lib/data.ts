import { KPI, HotLead, FollowUp, ActivityItem, LeaderboardRow, PipelineStage, Lead, NavSection } from "@/types";

export const navSections: NavSection[] = [
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

export const kpis: KPI[] = [
  { label: "Total Leads Today", value: "48", delta: "+12%", positive: true, note: "vs yesterday", icon: "👥" },
  { label: "Calls Made", value: "134", delta: "+8%", positive: true, note: "this week", icon: "📞" },
  { label: "Conversions", value: "18.4%", delta: "+2.1%", positive: true, note: "this month", icon: "🎯" },
  { label: "Revenue MTD", value: "₹12.4L", delta: "-3%", positive: false, note: "vs last month", icon: "💰" },
];

export const hotLeads: HotLead[] = [
  { name: "Ravi Kumar", source: "Justdial", city: "Mumbai", time: "2h", score: 92 },
  { name: "Priya Sharma", source: "Website", city: "Delhi", time: "4h", score: 74 },
  { name: "Deepak Tiwari", source: "Referral", city: "Pune", time: "1d", score: 88 },
  { name: "Meena Lakshmi", source: "Walk-in", city: "Chennai", time: "", score: 65 },
];

export const followUps: FollowUp[] = [
  { name: "Ravi Kumar", status: "OVERDUE", color: "#ef4444", bg: "#fef2f2", msg: "High buying intent detected. Call immediately for demo scheduling.", action: "📞 Call Now" },
  { name: "Priya Sharma", status: "DUE TODAY", color: "#f59e0b", bg: "#fffbeb", msg: "Send product brochure. Lead showed interest in Premium plan.", action: "✉ Send Email" },
  { name: "Suresh Reddy", status: "SCHEDULED", color: "#10b981", bg: "#f0fdf4", msg: "Callback scheduled for 3 PM today. Prepare pricing sheet.", action: "" },
];

export const activity: ActivityItem[] = [
  { dot: "#10b981", text: "Kiran Patel", action: "converted to customer", time: "10 min ago", by: "Neha G." },
  { dot: "#6366f1", text: "Aman Singh", action: "moved to Interested", time: "25 min ago", by: "Raj B." },
  { dot: "#8b5cf6", text: "AI", action: "assigned 3 new leads to Neha", time: "40 min ago", by: "auto" },
  { dot: "#0ea5e9", text: "Meena L.", action: "demo scheduled", time: "1h ago", by: "Suresh R." },
  { dot: "#ef4444", text: "Vinod H.", action: "marked as Lost", time: "2h ago", by: "Raj B." },
];

export const leaderboard: LeaderboardRow[] = [
  { rank: "🥇", name: "Neha Gupta", calls: 42, conv: "24%", rev: "₹4.2L", score: 96 },
  { rank: "🥈", name: "Raj Bhatt", calls: 38, conv: "21%", rev: "₹3.8L", score: 91 },
  { rank: "🥉", name: "Suresh Reddy", calls: 30, conv: "18%", rev: "₹2.4L", score: 84 },
  { rank: "4", name: "Aman Singh", calls: 24, conv: "15%", rev: "₹1.9L", score: 72 },
];

export const pipelineStages: PipelineStage[] = [
  { label: "New Lead", color: "#6366f1", bg: "#eff6ff", count: 12, leads: ["Ravi Kumar", "Anita Joshi", "Mohan Das", "Sita Rao"] },
  { label: "Contacted", color: "#f59e0b", bg: "#fffbeb", count: 8, leads: ["Priya Sharma", "Deepak Tiwari", "Suresh Reddy"] },
  { label: "Interested", color: "#8b5cf6", bg: "#faf5ff", count: 6, leads: ["Aman Singh", "Kavita Nair"] },
  { label: "Demo Sched.", color: "#0ea5e9", bg: "#f0f9ff", count: 4, leads: ["Meena Lakshmi", "Raj Bhatt"] },
  { label: "Converted", color: "#10b981", bg: "#f0fdf4", count: 3, leads: ["Kiran Patel"] },
  { label: "Lost", color: "#ef4444", bg: "#fef2f2", count: 5, leads: ["Vinod Hegde", "Rajeev Kumar"] },
];

export const leadsData: Lead[] = [
  { name: "Ravi Kumar", phone: "+91 98200 12345", source: "Justdial", assigned: "Neha G.", stage: "New Lead", stageColor: "#6366f1", score: 92, scoreLabel: "Hot", scoreColor: "#ef4444", sentiment: "Positive", sentColor: "#10b981", added: "18 Feb", lastContact: "2h ago" },
  { name: "Priya Sharma", phone: "+91 99001 88812", source: "Website", assigned: "Raj B.", stage: "Interested", stageColor: "#8b5cf6", score: 74, scoreLabel: "Warm", scoreColor: "#f59e0b", sentiment: "Neutral", sentColor: "#94a3b8", added: "17 Feb", lastContact: "5h ago" },
  { name: "Deepak Tiwari", phone: "+91 96655 43221", source: "Referral", assigned: "Suresh R.", stage: "Interested", stageColor: "#8b5cf6", score: 88, scoreLabel: "Hot", scoreColor: "#ef4444", sentiment: "Positive", sentColor: "#10b981", added: "16 Feb", lastContact: "1d ago" },
  { name: "Meena Lakshmi", phone: "+91 95544 32110", source: "Walk-in", assigned: "Neha G.", stage: "Demo Sched.", stageColor: "#0ea5e9", score: 65, scoreLabel: "Warm", scoreColor: "#f59e0b", sentiment: "Positive", sentColor: "#10b981", added: "15 Feb", lastContact: "3d ago" },
  { name: "Kiran Patel", phone: "+91 94433 11009", source: "Website", assigned: "Raj B.", stage: "Converted", stageColor: "#10b981", score: 91, scoreLabel: "Hot", scoreColor: "#ef4444", sentiment: "Positive", sentColor: "#10b981", added: "10 Feb", lastContact: "Today" },
  { name: "Vinod Hegde", phone: "+91 93322 00998", source: "Justdial", assigned: "Suresh R.", stage: "Lost", stageColor: "#ef4444", score: 22, scoreLabel: "Cold", scoreColor: "#94a3b8", sentiment: "Negative", sentColor: "#ef4444", added: "8 Feb", lastContact: "12 Feb" },
  { name: "Aman Singh", phone: "+91 87654 32100", source: "Website", assigned: "Aman S.", stage: "New Lead", stageColor: "#6366f1", score: 28, scoreLabel: "Cold", scoreColor: "#94a3b8", sentiment: "Neutral", sentColor: "#94a3b8", added: "18 Feb", lastContact: "New" },
];

export const allFollowUps: FollowUp[] = [
  { name: "Ravi Kumar", status: "OVERDUE", color: "#ef4444", bg: "#fef2f2", msg: "High buying intent detected. Call immediately for demo scheduling.", action: "📞 Call Now", time: "2h overdue", score: 92 },
  { name: "Priya Sharma", status: "DUE TODAY", color: "#f59e0b", bg: "#fffbeb", msg: "Send product brochure. Lead showed interest in Premium plan.", action: "✉ Send Email", time: "Due at 3 PM", score: 74 },
  { name: "Suresh Reddy", status: "SCHEDULED", color: "#10b981", bg: "#f0fdf4", msg: "Callback scheduled for 3 PM today. Prepare pricing sheet.", action: "", time: "3:00 PM", score: 68 },
  { name: "Deepak Tiwari", status: "OVERDUE", color: "#ef4444", bg: "#fef2f2", msg: "Follow-up call pending. Lead showed interest in Enterprise plan.", action: "📞 Call Now", time: "1d overdue", score: 88 },
  { name: "Meena Lakshmi", status: "DUE TODAY", color: "#f59e0b", bg: "#fffbeb", msg: "Demo reminder — confirm attendance and share meeting link.", action: "📅 Confirm", time: "Due at 5 PM", score: 65 },
  { name: "Aman Singh", status: "SCHEDULED", color: "#10b981", bg: "#f0fdf4", msg: "Re-engagement email scheduled. Cold lead — low priority.", action: "", time: "Tomorrow 10 AM", score: 28 },
];