"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Heart,
  QrCode,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Award,
  ArrowRight,
  School,
  Building2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SUPERTHANKS_TIERS,
  PRIMARY_UPI_ID,
  createYouPiSession,
  submitUtrClaim,
  verifySessionAndCreateBadge,
  YouPiSession,
  SuperThanksTier,
} from "@/lib/payment-youpi";
import { awardContributorBadge, getActiveUser } from "@/lib/firebase";
import { ContributorTier } from "@/lib/types";

interface SuperThanksModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: ContributorTier;
}

export function SuperThanksModal({
  isOpen,
  onClose,
  defaultTier = "gold",
}: SuperThanksModalProps) {
  const [selectedTier, setSelectedTier] = React.useState<ContributorTier>(defaultTier);
  const [customAmount, setCustomAmount] = React.useState<number | "">("");
  const [activeTab, setActiveTab] = React.useState<"superthanks" | "institutional">("superthanks");
  const [copiedUpi, setCopiedUpi] = React.useState(false);
  const [utrNumber, setUtrNumber] = React.useState("");
  const [session, setSession] = React.useState<YouPiSession | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Institutional form state
  const [instInstitution, setInstInstitution] = React.useState("National Law University");
  const [instContact, setInstContact] = React.useState("");
  const [instRole, setInstRole] = React.useState("RCC Student Convenor");
  const [instNotes, setInstNotes] = React.useState("");
  const [instSent, setInstSent] = React.useState(false);

  const activeTierConfig =
    SUPERTHANKS_TIERS.find((t) => t.id === selectedTier) || SUPERTHANKS_TIERS[2];

  const currentAmount =
    customAmount !== "" && typeof customAmount === "number" && customAmount > 0
      ? customAmount
      : activeTierConfig.amount;

  React.useEffect(() => {
    if (isOpen) {
      const sess = createYouPiSession(currentAmount, selectedTier);
      setSession(sess);
      setIsSuccess(false);
      setIsVerifying(false);
      setUtrNumber("");
    }
  }, [isOpen, selectedTier, customAmount]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(PRIMARY_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleVerifyUtr = () => {
    if (!session || !utrNumber.trim()) return;

    setIsVerifying(true);
    const updated = submitUtrClaim(session, utrNumber);
    setSession(updated);

    setTimeout(() => {
      const mintedBadge = verifySessionAndCreateBadge(updated);
      awardContributorBadge(mintedBadge);
      setIsVerifying(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleInstitutionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInstSent(true);
    setTimeout(() => {
      // Award Institutional Contributor badge
      awardContributorBadge({
        id: "badge-institutional-affiliate",
        tier: "institutional",
        title: "Institutional Grant Partner",
        icon: "🏛️",
        unlockedAt: new Date().toISOString().split("T")[0],
        perks: [
          "RCC Batch Batchwide Pipeline",
          "Direct Chamber Liaison Channels",
          "Institutional Cause-List Scraper Priority",
        ],
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 text-slate-100 shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-sm">
              <Heart className="h-5 w-5 fill-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                JurisFlow Community & SuperThanks
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  YouPI-PG
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Non-commercial, scholarship-first legal tech for Indian law students
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-5 pt-2">
          <button
            onClick={() => setActiveTab("superthanks")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "superthanks"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            SuperThanks & Member Stickers
          </button>
          <button
            onClick={() => setActiveTab("institutional")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "institutional"
                ? "border-blue-400 text-blue-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <School className="h-4 w-4" />
            Institutional Response / NLU RCC Grant
          </button>
        </div>

        {/* Body content */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === "superthanks" ? (
            isSuccess ? (
              /* Success Celebration View */
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/20 border border-amber-400/50 text-4xl shadow-lg shadow-amber-500/20">
                  {activeTierConfig.badgeIcon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Badge Minted! Welcome, {activeTierConfig.badgeName} Member!
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                    Your contribution directly supports open scrapers for High Courts and Supreme Court chambers.
                    Your YouTube-style member sticker has been pinned to your profile and navigation bar!
                  </p>
                </div>

                <div className="inline-block p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-2">
                  <div className="text-slate-400 font-mono">
                    Member Badge: <span className="text-amber-300 font-bold">{activeTierConfig.badgeName}</span>
                  </div>
                  <div className="text-slate-400 font-mono">
                    Verified UTR: <span className="text-emerald-400 font-bold">{utrNumber || "YOUPI-VERIFIED"}</span>
                  </div>
                  <div className="text-slate-400 font-mono">
                    Payee: <span className="text-slate-200">{PRIMARY_UPI_ID}</span>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold px-6 shadow-md"
                  >
                    Return to Workspace with My Member Badge
                  </Button>
                </div>
              </div>
            ) : (
              /* Main Payment & QR View */
              <div className="space-y-6">
                {/* Tier Selection Pills */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 block">
                    Choose Your SuperThanks Tier
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SUPERTHANKS_TIERS.map((tier) => {
                      const isSelected = selectedTier === tier.id && customAmount === "";
                      return (
                        <button
                          key={tier.id}
                          onClick={() => {
                            setSelectedTier(tier.id);
                            setCustomAmount("");
                          }}
                          className={`relative p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/30"
                              : "border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-700"
                          }`}
                        >
                          {tier.recommended && (
                            <span className="absolute -top-2 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                              Popular
                            </span>
                          )}
                          <div className="text-xl mb-1">{tier.badgeIcon}</div>
                          <div className="text-xs font-bold text-white leading-tight">
                            {tier.title}
                          </div>
                          <div className="text-sm font-black text-amber-300 mt-1">
                            ₹{tier.amount}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* QR Code and Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  {/* Left: Authentic QR code image */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative p-2.5 rounded-2xl bg-white shadow-xl">
                      <Image
                        src="/qr-upi.jpg"
                        alt="JurisFlow UPI QR Code"
                        width={180}
                        height={180}
                        className="rounded-xl object-contain"
                        priority
                      />
                      <div className="absolute inset-0 border-2 border-amber-400/60 rounded-2xl pointer-events-none" />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-2 font-mono">
                      Scan with any UPI app (GPay / PhonePe / Paytm / BHIM)
                    </span>
                  </div>

                  {/* Right: Payment Details & Direct UPI intent */}
                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400">
                        Payee UPI ID
                      </span>
                      <div className="flex items-center justify-between mt-1 p-2 rounded-lg bg-slate-900 border border-slate-700">
                        <span className="font-mono text-xs text-amber-300 font-bold select-all">
                          {PRIMARY_UPI_ID}
                        </span>
                        <button
                          onClick={handleCopyUpi}
                          className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          {copiedUpi ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          <span>{copiedUpi ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400">
                        Contribution Amount
                      </span>
                      <div className="text-2xl font-black text-white mt-0.5">
                        ₹{currentAmount}
                        <span className="text-xs font-normal text-slate-400 ml-2">
                          ({activeTierConfig.badgeName})
                        </span>
                      </div>
                    </div>

                    {/* Direct UPI Intent Link for Mobile users */}
                    {session && (
                      <a
                        href={session.upiUri}
                        target="_blank"
                        rel="noreferrer"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs border-amber-500/40 hover:bg-amber-500/10 text-amber-300 flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Tap to Pay on UPI Mobile App</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                {/* YouPI-PG UTR Verification Input */}
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Verify Payment via UTR / Transaction Reference (YouPI-PG)
                    </label>
                    <span className="text-[10px] font-mono text-slate-400">
                      12-Digit Reference
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 432109876543 or bank reference"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <Button
                      onClick={handleVerifyUtr}
                      disabled={isVerifying}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4"
                    >
                      {isVerifying ? (
                        <span className="flex items-center gap-1">
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                          Verifying...
                        </span>
                      ) : (
                        "Claim Member Badge"
                      )}
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Entering your UTR links your payment to your student profile and mints your
                    YouTube-style membership sticker instantly.
                  </p>
                </div>
              </div>
            )
          ) : (
            /* Institutional Collaboration / Response View */
            <div className="space-y-4">
              {instSent ? (
                <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Institutional Response Registered
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    We have received your institutional partnership proposal for {instInstitution}.
                    Our research team at NLU Delhi will review and allocate academic grant quotas for
                    your batch.
                  </p>
                  <Button
                    onClick={onClose}
                    size="sm"
                    className="bg-slate-800 text-white hover:bg-slate-700 text-xs mt-2"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInstitutionalSubmit} className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
                    <strong>Institutional Scheme:</strong> Instead of individual commercial
                    billing, we support university-wide access grants via Student Bar Councils,
                    Recruitment Coordination Committees (RCCs), and faculty allocations.
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Law University / Institution Name
                    </label>
                    <input
                      type="text"
                      required
                      value={instInstitution}
                      onChange={(e) => setInstInstitution(e.target.value)}
                      placeholder="e.g. NLU Delhi, NLSIU Bengaluru, NALSAR, etc."
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Convenor / Dean / Chamber Head Email
                      </label>
                      <input
                        type="email"
                        required
                        value={instContact}
                        onChange={(e) => setInstContact(e.target.value)}
                        placeholder="e.g. rcc@nludelhi.ac.in"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Applicant Designation
                      </label>
                      <select
                        value={instRole}
                        onChange={(e) => setInstRole(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="RCC Student Convenor">RCC Student Convenor</option>
                        <option value="Placement Cell Faculty Advisor">Placement Faculty Advisor</option>
                        <option value="Senior Advocate Chamber Manager">Senior Advocate Chamber</option>
                        <option value="Student Bar Association President">SBA President</option>
                        <option value="Student Researcher">Student Researcher</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Batch Size & Custom Requirement Notes
                    </label>
                    <textarea
                      rows={3}
                      value={instNotes}
                      onChange={(e) => setInstNotes(e.target.value)}
                      placeholder="Mention expected batch size, High Court benches of interest, or custom chamber application templates..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Submit Institutional Response
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
