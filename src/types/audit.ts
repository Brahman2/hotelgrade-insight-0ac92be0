// src/types/audit.ts
// TypeScript type definitions for Hotel Grader 40-Point Audit System
// Created: November 16, 2025

export type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';

export type ScoreColor = 'green' | 'amber' | 'red';

export interface MetricDetail {
  score: number | null; // 0-100, null if locked
  color: ScoreColor;
  label: string;
  title?: string;
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
  reviewCount: number;
  distance: number; // miles
  lat: number;
  lng: number;
  placeId?: string;
  priceLevel?: number;
}

export interface AuditSection {
  score: number | null;
  color: ScoreColor;
  metrics: MetricDetail[];
  isLocked?: boolean;
  unlockMessage?: string;
}

export interface ExecutiveSummary {
  overallScore: number;
  overallGrade: Grade;
  competitiveRank: number;
  competitiveTotal: number;
  strengths: string[];
  criticalIssues: string[];
  quickWins?: string[];
  keyFinding: string;
}

export interface DigitalPresenceSection extends AuditSection {
  googleBusinessProfile: MetricDetail;
  websitePerformance: MetricDetail;
  searchVisibility: MetricDetail;
  brandProtection: MetricDetail;
  mobileFriendly: MetricDetail;
  localSEO: MetricDetail;
  directoryListings: MetricDetail;
}

export interface ReputationSection extends AuditSection {
  overallRating: MetricDetail;
  reviewVolume: MetricDetail;
  reviewRecency: MetricDetail;
  responseRate: MetricDetail;
  sentimentScore: MetricDetail;
  reviewDistribution: MetricDetail;
  competitivePosition: MetricDetail;
}

export interface SocialMediaSection extends AuditSection {
  facebookPresence: MetricDetail;
  instagramPresence: MetricDetail;
  engagement: MetricDetail;
  contentQuality: MetricDetail;
  postFrequency: MetricDetail;
  followerGrowth: MetricDetail;
}

export interface AdvertisingSection extends AuditSection {
  googleAdsPresence: MetricDetail;
  metaAdsPresence: MetricDetail;
  metasearchVisibility: MetricDetail;
  brandProtection: MetricDetail;
  adSpendEfficiency: MetricDetail;
  competitorAdGaps: MetricDetail;
}

export interface BookingSection extends AuditSection {
  otaPresence: MetricDetail;
  bookingDotCom: MetricDetail;
  expedia: MetricDetail;
  directBookingFlow: MetricDetail;
  mobileBooking: MetricDetail;
  paymentOptions: MetricDetail;
  cancellationPolicy: MetricDetail;
}

export interface CompetitiveSection extends AuditSection {
  marketPosition: MetricDetail;
  priceCompetitiveness: MetricDetail;
  amenityComparison: MetricDetail;
  ratingVsCompetitors: MetricDetail;
  uniqueAdvantages: MetricDetail;
  competitiveThreats: MetricDetail;
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

export interface AuditReport {
  hotelId: string;
  hotelName: string;
  city: string;
  state: string;
  address?: string;
  
  // Executive Summary (always free)
  executiveSummary: ExecutiveSummary;
  
  // 6 Main Sections (teaser free, full locked)
  digitalPresence: DigitalPresenceSection;
  reputation: ReputationSection;
  socialMedia: SocialMediaSection;
  advertising: AdvertisingSection;
  booking: BookingSection;
  competitive: CompetitiveSection;
  
  // Competitor data (top 5 free, full list locked)
  competitors: CompetitorData[];
  
  // Action plan (locked)
  actionPlan: ActionPlanItem[];
  
  // Metadata
  generatedAt: string;
  isFullReportUnlocked: boolean;
  emailCaptured?: string;
}

// Helper type for section names
export type SectionName = 
  | 'digitalPresence' 
  | 'reputation' 
  | 'socialMedia' 
  | 'advertising' 
  | 'booking' 
  | 'competitive';

// API Response types
export interface AuditAPIResponse {
  success: boolean;
  data: AuditReport;
  error?: string;
}

export interface EmailCaptureRequest {
  email: string;
  hotelId: string;
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
