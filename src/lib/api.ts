// src/lib/api.ts
// API service for HotelGrader backend communication

import type { AnalyzeMetricsResponse, AuditReport, AuditSection, SectionName } from '@/types/audit';

// Backend API URL - change this for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-production-13e22.up.railway.app';

/**
 * Analyze a hotel's 40 public signal metrics
 */
export async function analyzeHotelMetrics(
  hotelName: string,
  city: string,
  state: string
): Promise<AnalyzeMetricsResponse> {
  console.log(`🔍 Analyzing metrics for: ${hotelName}, ${city}, ${state}`);

  const response = await fetch(`${API_BASE_URL}/api/analyze-metrics-stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hotel_name: hotelName,
      city,
      state,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  console.log('✅ Analysis complete:', data);

  return data;
}
/**
 * Fetch detailed analysis for a specific section when user unlocks it
 */
export async function fetchSectionDetails(
  hotelName: string,
  city: string,
  state: string,
  category: string,
  metrics: any[]
): Promise<{ success: boolean; category: string; details: any }> {
  console.log(`🔍 Fetching detailed analysis for section: ${category}`);

  const response = await fetch(`${API_BASE_URL}/api/section-details`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hotelName, city, state, category, metrics }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}

export function mergeSectionDetails(existingMetrics: any[], detailsData: { metrics: any[] }): any[] {
  if (!detailsData?.metrics) return existingMetrics;
  return existingMetrics.map((metric) => {
    const detail = detailsData.metrics.find((d: any) => d.id === metric.id);
    return detail ? { ...metric, detailedAnalysis: detail.detailedAnalysis, actionSteps: detail.actionSteps || [], expectedImpact: detail.expectedImpact } : metric;
  });
}
/**
 * Find competitors for a hotel
 */
export async function findCompetitors(
  hotelName: string,
  city: string,
  state: string
) {
  const response = await fetch(`${API_BASE_URL}/api/find-competitors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hotel_name: hotelName,
      city,
      state,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Transform backend API response to frontend AuditReport format
 */
export function transformApiResponse(apiData: any): AuditReport {
  // Handle both direct data and nested data structure
  const data = apiData.data || apiData;

  // Get categories from the response
  const categories = data.categories || {};

  // Build the transformed report
  const report: AuditReport = {
    hotelName: data.hotelName || '',
    city: data.city || '',
    state: data.state || '',
    analyzedAt: data.analyzedAt || new Date().toISOString(),
    overallScore: data.overallScore || 0,
    overallGrade: data.overallGrade || 'C',
    executiveSummary: {
      overallScore: data.overallScore || 0,
      overallGrade: data.overallGrade || 'C',
      keyFinding: data.executiveSummary?.keyFinding || '',
      strengths: data.executiveSummary?.strengths || [],
      criticalIssues: data.executiveSummary?.criticalIssues || [],
      quickWins: data.executiveSummary?.quickWins || [],
    },
    // Map categories to flat structure for backward compatibility
    digitalPresence: transformSection(categories.digitalPresence),
    reputation: transformSection(categories.reputation),
    socialMedia: transformSection(categories.socialMedia),
    advertising: transformSection(categories.advertising),
    booking: transformSection(categories.booking),
    competitive: transformSection(categories.competitive),
    // Also keep categories for new structure
    categories: {
      digitalPresence: transformSection(categories.digitalPresence),
      reputation: transformSection(categories.reputation),
      socialMedia: transformSection(categories.socialMedia),
      advertising: transformSection(categories.advertising),
      booking: transformSection(categories.booking),
      competitive: transformSection(categories.competitive),
    },
    _meta: data._meta,
    isFullReportUnlocked: false,
  };

  return report;
}

/**
 * Transform a category section from API format
 */
function transformSection(section: any): AuditSection {
  if (!section) {
    return {
      score: 0,
      metrics: [],
    };
  }

  return {
    score: section.score || 0,
    color: getColorFromScore(section.score),
    metrics: (section.metrics || []).map((metric: any) => ({
      id: metric.id || '',
      name: metric.name || metric.title || '',
      title: metric.name || metric.title || '',
      label: metric.name || metric.title || '',
      score: metric.score || 0,
      color: getColorFromScore(metric.score),
      insight: metric.insight || '',
      recommendation: metric.recommendation || '',
      detailedAnalysis: metric.detailedAnalysis || '',
      actionSteps: metric.actionSteps || [],
      expectedImpact: metric.expectedImpact || '',
      isLocked: false,
    })),
  };
}

/**
 * Get color based on score
 */
function getColorFromScore(score: number | null): 'green' | 'amber' | 'red' {
  if (score === null || score === undefined) return 'amber';
  if (score >= 75) return 'green';
  if (score >= 50) return 'amber';
  return 'red';
}

/**
 * Get section display info
 */
export const SECTION_INFO: Record<SectionName, { title: string; description: string }> = {
  digitalPresence: {
    title: 'Digital Presence',
    description: 'Your online visibility and digital footprint',
  },
  reputation: {
    title: 'Reputation Management',
    description: 'Review performance across all major platforms',
  },
  socialMedia: {
    title: 'Social Media',
    description: 'Social media presence and engagement metrics',
  },
  advertising: {
    title: 'Advertising & Paid Media',
    description: 'Paid advertising presence and effectiveness',
  },
  booking: {
    title: 'Booking & Distribution',
    description: 'Online booking channels and optimization',
  },
  competitive: {
    title: 'Competitive Intelligence',
    description: 'Market position and competitor analysis',
  },
};
