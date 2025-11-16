// src/lib/constants/colors.ts
// Design system colors and constants for Hotel Grader Audit UI
// Created: November 16, 2025

import type { Grade, ScoreColor } from '@/types/audit';

// Brand Colors
export const BRAND_COLORS = {
  primary: '#667eea', // Indigo
  secondary: '#764ba2', // Purple
  accent: '#f093fb', // Pink gradient
  success: '#10b981', // Green
  warning: '#f59e0b', // Amber
  danger: '#ef4444', // Red
  info: '#3b82f6', // Blue
} as const;

// Score-based Colors
export const SCORE_COLORS = {
  green: {
    bg: '#d1fae5',
    border: '#10b981',
    text: '#065f46',
    badge: '#10b981',
  },
  amber: {
    bg: '#fef3c7',
    border: '#f59e0b',
    text: '#92400e',
    badge: '#f59e0b',
  },
  red: {
    bg: '#fee2e2',
    border: '#ef4444',
    text: '#991b1b',
    badge: '#ef4444',
  },
} as const;

// Grade to Color mapping
export const GRADE_COLORS: Record<Grade, ScoreColor> = {
  'A+': 'green',
  'A': 'green',
  'A-': 'green',
  'B+': 'green',
  'B': 'amber',
  'B-': 'amber',
  'C+': 'amber',
  'C': 'amber',
  'C-': 'red',
  'D': 'red',
  'F': 'red',
};

// Score thresholds
export const SCORE_THRESHOLDS = {
  excellent: 90, // Green
  good: 75,
  average: 60,
  poor: 50, // Below this is red
} as const;

// Get color based on numeric score
export function getScoreColor(score: number): ScoreColor {
  if (score >= SCORE_THRESHOLDS.good) return 'green';
  if (score >= SCORE_THRESHOLDS.poor) return 'amber';
  return 'red';
}

// Get color based on grade
export function getGradeColor(grade: Grade): ScoreColor {
  return GRADE_COLORS[grade];
}

// Tailwind class helpers
export function getScoreBgClass(color: ScoreColor): string {
  const classes = {
    green: 'bg-green-50',
    amber: 'bg-amber-50',
    red: 'bg-red-50',
  };
  return classes[color];
}

export function getScoreBorderClass(color: ScoreColor): string {
  const classes = {
    green: 'border-green-500',
    amber: 'border-amber-500',
    red: 'border-red-500',
  };
  return classes[color];
}

export function getScoreTextClass(color: ScoreColor): string {
  const classes = {
    green: 'text-green-700',
    amber: 'text-amber-700',
    red: 'text-red-700',
  };
  return classes[color];
}

export function getScoreBadgeClass(color: ScoreColor): string {
  const classes = {
    green: 'bg-green-500 text-white',
    amber: 'bg-amber-500 text-white',
    red: 'bg-red-500 text-white',
  };
  return classes[color];
}

// Section icons (Lucide React icon names)
export const SECTION_ICONS = {
  digitalPresence: 'Globe',
  reputation: 'Star',
  socialMedia: 'Share2',
  advertising: 'Megaphone',
  booking: 'Calendar',
  competitive: 'TrendingUp',
} as const;

// Priority colors
export const PRIORITY_COLORS = {
  high: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
  },
  medium: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-300',
  },
  low: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
  },
} as const;

// Effort indicators
export const EFFORT_LABELS = {
  'quick-win': 'Quick Win',
  'moderate': 'Moderate Effort',
  'significant': 'Significant Project',
} as const;

export const EFFORT_COLORS = {
  'quick-win': 'bg-green-100 text-green-800',
  'moderate': 'bg-amber-100 text-amber-800',
  'significant': 'bg-purple-100 text-purple-800',
} as const;
