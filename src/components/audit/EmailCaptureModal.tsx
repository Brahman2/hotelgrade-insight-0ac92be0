// src/components/audit/EmailCaptureModal.tsx
// Email capture modal for unlocking full audit reports
// Created: November 16, 2025

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import type { SectionName } from "@/types/audit";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  section: SectionName | "all" | null;
  hotelName?: string;
}

export function EmailCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  section,
  hotelName = "your hotel",
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionTitles: Record<SectionName | "all", string> = {
    digitalPresence: "Digital Presence Analysis",
    reputation: "Reputation Management",
    socialMedia: "Social Media Performance",
    advertising: "Advertising & Paid Media",
    booking: "Booking & Distribution",
    competitive: "Competitive Intelligence",
    all: "Complete 40-Point Audit",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(email);
      setIsSuccess(true);
      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail("");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setEmail("");
      setError(null);
      setIsSuccess(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          // Success state
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <DialogTitle className="text-xl font-bold text-center mb-2">
              Success! 🎉
            </DialogTitle>
            <DialogDescription className="text-center">
              Your complete {section ? sectionTitles[section] : "audit report"} is being
              sent to <strong>{email}</strong>
            </DialogDescription>
          </div>
        ) : (
          // Email capture form
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    Unlock Full Analysis
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    {section && section !== "all"
                      ? sectionTitles[section]
                      : "Complete 40-Point Audit Report"}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Value proposition */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-900 mb-2">
                  What You'll Get:
                </h4>
                <ul className="space-y-1.5 text-sm text-indigo-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Complete {section === "all" ? "40-point" : ""} analysis for {hotelName}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Detailed insights and recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Full competitor comparison data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Prioritized action plan</span>
                  </li>
                </ul>
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@hotel.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Unlocking...
                    </span>
                  ) : (
                    "Unlock Full Report"
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We'll send the full report to your email.{" "}
                  <br />
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
