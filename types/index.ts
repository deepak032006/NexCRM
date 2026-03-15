// ─── Types ────────────────────────────────────────────────────────────────────
export type PageKey =
  | "dashboard"
  | "pipeline"
  | "leads"
  | "calls"
  | "ai-followup"
  | "ai-actions"
  | "sentiment"
  | "lead-scoring"
  | "employees"
  | "reports"
  | "settings";

export interface User {
  name: string;
  role: string;
}

export interface NavLink {
  label: string;
  icon: string;
  page: PageKey;
  ai?: boolean;
}

export interface NavSection {
  section: string;
  links: NavLink[];
}

export interface KPI {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  note: string;
  icon: string;
}

export interface HotLead {
  name: string;
  source: string;
  city: string;
  time: string;
  score: number;
}

export interface FollowUp {
  name: string;
  status: string;
  color: string;
  bg: string;
  msg: string;
  action: string;
  time?: string;
  score?: number;
}

export interface ActivityItem {
  dot: string;
  text: string;
  action: string;
  time: string;
  by: string;
}

export interface LeaderboardRow {
  rank: string;
  name: string;
  calls: number;
  conv: string;
  rev: string;
  score: number;
}

export interface PipelineStage {
  label: string;
  color: string;
  bg: string;
  count: number;
  leads: string[];
}

export interface Lead {
  name: string;
  phone: string;
  source: string;
  assigned: string;
  stage: string;
  stageColor: string;
  score: number;
  scoreLabel: string;
  scoreColor: string;
  sentiment: string;
  sentColor: string;
  added: string;
  lastContact: string;
}