// src/types/audit.ts
// TypeScript type definitions for Hotel Grader 40-Point Audit System
// Updated: November 24, 2025 - Aligned with backend API structure

export type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';

export type ScoreColor = 'green' | 'amber' | 'red';

// Individual metric from the 40-metric analysis
export interface MetricDetail {
  id: string;           // Unique metric ID (e.g., "dp_1", "rep_2")
  name: string;         // Display name
  score: number | null; // 0-100, null if locked
  color?: ScoreColor;
  label?: string;       // Legacy - use name instead
  title?: string;       // Legacy - use name instead
  value?: string | number;
  isLocked?: boolean;
  insight?: string;
  recommendation?: string;
  detailedAnalysis?: string;
  actionSteps?: string[];
  expectedImpact?: string;
}

export interface CompetitorData {
  rank: number;
  name: string;
  rating: number;
  reviewCount?: number;
  reviews?: number;
  distance?: number; // miles
  distance_miles?: number;
  lat: number;
  lng: number;
  placeId?: string;
  place_id?: string;
  priceLevel?: number;
  price_level?: number;
  address?: string;
}

// Generic section with metrics array
export interface AuditSection {
  score: number | null;
  color?: ScoreColor;
  metrics: MetricDetail[];
  isLocked?: boolean;
  unlockMessage?: string;
}

export interface ExecutiveSummary {
  overallScore: number;
  overallGrade: Grade;
  competitiveRank?: number;
  competitiveTotal?: number;
  strengths: string[];
  criticalIssues: string[];
  quickWins?: string[];
  keyFinding: string;
}

export interface ActionPlanItem {
  priority: 'high' | 'medium' | 'low';
  category: string;
  action: string;
  impact: string;
  effort: 'quick-win' | 'moderate' | 'significant';
  timeline: string;
  resources?: string[];
}

// Main audit report structure - aligned with backend API
export interface AuditReport {
  hotelId?: string;
  hotelName: string;
  city: string;
  state: string;
  address?: string;
  analyzedAt?: string;

  // Overall scores
  overallScore: number;
  overallGrade: Grade;

  // Executive Summary
  executiveSummary: ExecutiveSummary;

  // 6 Main Categories (each with metrics array)
  categories?: {
    digitalPresence: AuditSection;
    reputation: AuditSection;
    socialMedia: AuditSection;
    advertising: AuditSection;
    booking: AuditSection;
    competitive: AuditSection;
  };

  // Legacy flat structure for backward compatibility
  digitalPresence?: AuditSection;
  reputation?: AuditSection;
  socialMedia?: AuditSection;
  advertising?: AuditSection;
  booking?: AuditSection;
  competitive?: AuditSection;

  // Competitor data
  competitors?: CompetitorData[];

  // Action plan
  actionPlan?: ActionPlanItem[];

  // Metadata
  generatedAt?: string;
  isFullReportUnlocked?: boolean;
  emailCaptured?: string;

  // API metadata
  _meta?: {
    totalMetrics: number;
    analysisVersion: string;
    generatedAt: string;
    competitorsAnalyzed: number;
  };
}

// Helper type for section names
export type SectionName =
  | 'digitalPresence'
  | 'reputation'
  | 'socialMedia'
  | 'advertising'
  | 'booking'
  | 'competitive';

// Backend API response structure
export interface AnalyzeMetricsResponse {
  success: boolean;
  data: AuditReport;
  error?: string;
  rawResponse?: string;
}

// Legacy API Response types
export interface AuditAPIResponse {
  success: boolean;
  data: AuditReport;
  error?: string;
}

export interface EmailCaptureRequest {
  email: string;
  hotelId?: string;
  hotelName: string;
  city: string;
  state: string;
  section?: SectionName | 'all';
}

export interface EmailCaptureResponse {
  success: boolean;
  message: string;
  unlockedSections?: SectionName[];
}

// UI State types
export interface EmailCaptureState {
  isOpen: boolean;
  section: SectionName | 'all' | null;
  isSubmitting: boolean;
  error: string | null;
}

export interface AuditUIState {
  isLoading: boolean;
  error: string | null;
  report: AuditReport | null;
  emailCaptureModal: EmailCaptureState;
}

// Helper function to get color from score
export function getScoreColor(score: number | null): ScoreColor {
  if (score === null) return 'amber';
  if (score >= 75) return 'green';
  if (score >= 50) return 'amber';
  return 'red';
}

// Helper function to get grade from score
export function getGradeFromScore(score: number): Grade {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 87) return 'A-';
  if (score >= 83) return 'B+';
  if (score >= 80) return 'B';
  if (score >= 77) return 'B-';
  if (score >= 73) return 'C+';
  if (score >= 70) return 'C';
  if (score >= 67) return 'C-';
  if (score >= 60) return 'D';
  return 'F';
}
