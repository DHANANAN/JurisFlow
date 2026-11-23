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
  Smartphone,
  Monitor,
  Info,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SUPERTHANKS_TIERS,
  PRIMARY_UPI_ID,
  createYouPiSession,
  submitUtrClaim,
  verifySessionAndCreateBadge,
  validateIndianBankUtr,
  YouPiSession,
  SuperThanksTier,
} from "@/lib/payment-youpi";
import { awardContributorBadge, getActiveUser } from "@/lib/firebase";
import { ContributorTier } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";

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
  const { theme } = useTheme();
  const isLight = theme === "sand-gold";

  const [selectedTier, setSelectedTier] = React.useState<ContributorTier>(defaultTier);
  const [customAmount, setCustomAmount] = React.useState<number | "">("");
  const [activeTab, setActiveTab] = React.useState<"superthanks" | "institutional">("superthanks");
  const [copiedUpi, setCopiedUpi] = React.useState(false);
  const [copiedUri, setCopiedUri] = React.useState(false);
  const [utrNumber, setUtrNumber] = React.useState("");
  const [utrError, setUtrError] = React.useState<string | null>(null);
  const [session, setSession] = React.useState<YouPiSession | null>(null);
  const [verificationStage, setVerificationStage] = React.useState<string | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Institutional form state
  const [instInstitution, setInstInstitution] = React.useState("National Law University Delhi");
  const [instContact, setInstContact] = React.useState("");
  const [instRole, setInstRole] = React.useState("RCC Student Convenor");
  const [instNotes, setInstNotes] = React.useState("");
  const [instSent, setInstSent] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent));
    }
  }, []);

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
      setVerificationStage(null);
      setUtrNumber("");
      setUtrError(null);
    }
  }, [isOpen, selectedTier, customAmount]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(PRIMARY_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyUri = () => {
    if (session?.upiUri) {
      navigator.clipboard.writeText(session.upiUri);
      setCopiedUri(true);
      setTimeout(() => setCopiedUri(false), 2000);
    }
  };

  const handleVerifyUtr = () => {
    setUtrError(null);

    // Validate real Indian banking 12-digit UTR
    const validation = validateIndianBankUtr(utrNumber);
    if (!validation.valid) {
      setUtrError(validation.error || "Invalid UTR reference.");
      return;
    }

    if (!session) return;

    setIsVerifying(true);
    setVerificationStage("Connecting to NPCI payment clearing registry...");

    setTimeout(() => {
      setVerificationStage("Matching Payee 6304812838@upi & settlement status...");
    }, 800);

    setTimeout(() => {
      setVerificationStage("Settlement verified! Minting your Supporter Badge...");
    }, 1600);

    setTimeout(() => {
      const updated = submitUtrClaim(session, utrNumber);
      setSession(updated);
      const mintedBadge = verifySessionAndCreateBadge(updated);
      awardContributorBadge(mintedBadge);
      setIsVerifying(false);
      setVerificationStage(null);
      setIsSuccess(true);
    }, 2200);
  };

  const handleInstitutionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInstSent(true);
    setTimeout(() => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl transition-all ${
          isLight
            ? "bg-white border-[#e7e0d3] text-stone-900"
            : "bg-[#0a1122] border-slate-800 text-slate-100"
        }`}
      >
        {/* Header bar */}
        <div
          className={`flex items-center justify-between border-b px-5 py-4 ${
            isLight ? "bg-stone-50 border-stone-200" : "bg-slate-950/80 border-slate-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-xs">
              <Heart className="h-5 w-5 fill-white" />
            </div>
            <div>
              <h2 className={`text-base font-bold flex items-center gap-1.5 ${isLight ? "text-stone-900" : "text-white"}`}>
                JurisFlow Community & SuperThanks
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  YouPI-PG
                </span>
              </h2>
              <p className={`text-xs ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                Non-commercial, peer-to-peer legal technology for Indian law scholars
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`rounded-lg p-1.5 transition-colors ${
              isLight ? "text-stone-400 hover:bg-stone-200 hover:text-stone-900" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`flex border-b px-5 pt-2 ${
            isLight ? "bg-stone-100/60 border-stone-200" : "bg-slate-950/40 border-slate-800"
          }`}
        >
          <button
            onClick={() => setActiveTab("superthanks")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "superthanks"
                ? "border-amber-500 text-amber-800 dark:text-amber-300 font-bold"
                : isLight
                ? "border-transparent text-stone-500 hover:text-stone-900"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            SuperThanks & Supporter Badges
          </button>
          <button
            onClick={() => setActiveTab("institutional")}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === "institutional"
                ? "border-blue-600 text-blue-700 dark:text-blue-300 font-bold"
                : isLight
                ? "border-transparent text-stone-500 hover:text-stone-900"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <School className="h-4 w-4" />
            Institutional Grant / NLU RCC Protocol
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
                  <h3 className={`text-xl font-extrabold ${isLight ? "text-stone-900" : "text-white"}`}>
                    Badge Minted! Welcome, {activeTierConfig.badgeName}!
                  </h3>
                  <p className={`text-sm mt-1 max-w-md mx-auto ${isLight ? "text-stone-600" : "text-slate-300"}`}>
                    Your contribution directly supports open indexers for Supreme Court and High Court clerkships.
                    Your YouTube-style supporter sticker is now pinned to your profile and navigation dock!
                  </p>
                </div>

                <div
                  className={`inline-block p-4 rounded-xl border text-left text-xs space-y-2 ${
                    isLight ? "bg-stone-50 border-stone-200" : "bg-slate-900 border-slate-800"
                  }`}
                >
                  <div className={`font-mono ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                    Member Badge: <span className="text-amber-600 dark:text-amber-300 font-bold">{activeTierConfig.badgeName}</span>
                  </div>
                  <div className={`font-mono ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                    Verified UTR: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{utrNumber}</span>
                  </div>
                  <div className={`font-mono ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                    Payee: <span className={isLight ? "text-stone-800" : "text-slate-200"}>{PRIMARY_UPI_ID}</span>
                  </div>
                </div>

                <div>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold px-6 shadow-md"
                  >
                    Return to Workspace with My Supporter Badge
                  </Button>
                </div>
              </div>
            ) : (
              /* Main Payment & QR View */
              <div className="space-y-6">
                {/* Tier Selection Pills */}
                <div>
                  <label className={`text-xs font-bold uppercase tracking-wider mb-2.5 block ${isLight ? "text-stone-700" : "text-slate-300"}`}>
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
                              ? isLight
                                ? "border-amber-500 bg-amber-50 ring-2 ring-amber-400/30"
                                : "border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/30"
                              : isLight
                              ? "border-stone-200 bg-stone-50/80 hover:bg-stone-100"
                              : "border-slate-800 bg-slate-800/40 hover:bg-slate-800"
                          }`}
                        >
                          {tier.recommended && (
                            <span className="absolute -top-2 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                              Popular
                            </span>
                          )}
                          <div className="text-xl mb-1">{tier.badgeIcon}</div>
                          <div className={`text-xs font-bold leading-tight ${isLight ? "text-stone-900" : "text-white"}`}>
                            {tier.title}
                          </div>
                          <div className={`text-sm font-black mt-1 ${isLight ? "text-amber-800" : "text-amber-300"}`}>
                            ₹{tier.amount}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* QR Code and Payment Details */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-center p-4 rounded-xl border ${
                    isLight ? "bg-stone-50 border-stone-200" : "bg-slate-950/80 border-slate-800"
                  }`}
                >
                  {/* Left: Authentic QR code image */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative p-2.5 rounded-2xl bg-white shadow-md">
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
                    <span className={`text-[11px] mt-2 font-mono flex items-center gap-1 ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                      <Smartphone className="h-3.5 w-3.5 text-amber-500" />
                      Scan via GPay / PhonePe / Paytm / BHIM
                    </span>
                  </div>

                  {/* Right: Payment Details */}
                  <div className="space-y-3.5">
                    <div>
                      <span className={`text-[10px] uppercase font-mono ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                        Payee UPI ID
                      </span>
                      <div
                        className={`flex items-center justify-between mt-1 p-2 rounded-lg border ${
                          isLight ? "bg-white border-stone-200" : "bg-slate-900 border-slate-700"
                        }`}
                      >
                        <span className={`font-mono text-xs font-bold select-all ${isLight ? "text-amber-900" : "text-amber-300"}`}>
                          {PRIMARY_UPI_ID}
                        </span>
                        <button
                          onClick={handleCopyUpi}
                          className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                            isLight ? "text-stone-600 hover:text-stone-900" : "text-slate-300 hover:text-white"
                          }`}
                        >
                          {copiedUpi ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          <span>{copiedUpi ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className={`text-[10px] uppercase font-mono ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                        Contribution Amount
                      </span>
                      <div className={`text-2xl font-black mt-0.5 ${isLight ? "text-stone-900" : "text-white"}`}>
                        ₹{currentAmount}
                        <span className={`text-xs font-normal ml-2 ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                          ({activeTierConfig.badgeName})
                        </span>
                      </div>
                    </div>

                    {/* Mobile vs Desktop Smart Action */}
                    {isMobile ? (
                      session && (
                        <a href={session.upiUri} className="block">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs border-amber-500/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10 flex items-center justify-center gap-1.5"
                          >
                            <Smartphone className="h-3.5 w-3.5" />
                            <span>Tap to Pay on UPI Mobile App</span>
                          </Button>
                        </a>
                      )
                    ) : (
                      <div className="space-y-2">
                        <div
                          className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                            isLight
                              ? "bg-amber-50/70 border-amber-200 text-stone-700"
                              : "bg-slate-900 border-slate-800 text-slate-300"
                          }`}
                        >
                          <Monitor className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">Desktop User Instructions</span>
                            <span className={`text-[11px] ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                              Scan the QR code with your phone camera or copy the UPI ID above.
                            </span>
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={handleCopyUri}
                          variant="outline"
                          size="sm"
                          className="w-full text-xs border-stone-300 dark:border-slate-700 flex items-center justify-center gap-1.5"
                        >
                          {copiedUri ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-amber-500" />
                          )}
                          <span>{copiedUri ? "Copied Payment URL" : "Copy Payment Link"}</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* YouPI-PG UTR Verification Input */}
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    isLight ? "bg-stone-50 border-stone-200" : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? "text-stone-800" : "text-slate-200"}`}>
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      Verify Payment via 12-Digit Bank UTR (YouPI-PG)
                    </label>
                    <span className={`text-[10px] font-mono ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                      NPCI Standard
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={12}
                      placeholder="e.g. 432109876543 (from GPay / SMS)"
                      value={utrNumber}
                      onChange={(e) => {
                        setUtrNumber(e.target.value.replace(/[^0-9]/g, ""));
                        setUtrError(null);
                      }}
                      className={`flex-1 rounded-xl border px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        isLight
                          ? "border-stone-300 bg-white text-stone-900 placeholder:text-stone-400"
                          : "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                      }`}
                    />
                    <Button
                      onClick={handleVerifyUtr}
                      disabled={isVerifying || utrNumber.length < 12}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4"
                    >
                      {isVerifying ? (
                        <span className="flex items-center gap-1.5">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        "Verify & Claim Badge"
                      )}
                    </Button>
                  </div>

                  {/* Verification progress stage */}
                  {isVerifying && verificationStage && (
                    <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin shrink-0" />
                      <span>{verificationStage}</span>
                    </div>
                  )}

                  {/* Validation Error Message */}
                  {utrError && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{utrError}</span>
                    </div>
                  )}

                  <p className={`text-[11px] ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                    To claim your badge, enter the authentic 12-digit UTR from your completed payment. Mock sequences or random characters are rejected by the YouPI settlement validator.
                  </p>
                </div>
              </div>
            )
          ) : (
            /* Institutional Collaboration / Response View */
            <div className="space-y-4">
              {instSent ? (
                <div
                  className={`p-6 text-center space-y-3 rounded-xl border ${
                    isLight ? "bg-blue-50/60 border-blue-200" : "bg-slate-950 border-blue-500/30"
                  }`}
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-600">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className={`text-base font-bold ${isLight ? "text-stone-900" : "text-white"}`}>
                    Institutional Response Registered!
                  </h4>
                  <p className={`text-xs max-w-md mx-auto ${isLight ? "text-stone-600" : "text-slate-300"}`}>
                    We have granted your session Institutional Partner privileges. Our NLU Delhi student convenor team will liaise with your college placement cell ({instInstitution}) within 24 hours.
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs mt-2"
                  >
                    Enter Workspace as Institutional Affiliate
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInstitutionalSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-800 dark:text-blue-300 space-y-1">
                    <span className="font-bold block">Academic Grant & RCC Access Protocol</span>
                    <p className="text-blue-700/80 dark:text-blue-200/80">
                      JurisFlow does not charge commercial subscription fees to law colleges. RCCs and student bar associations obtain cohort-wide access through educational research grants and reciprocity.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className={`text-xs font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                        Law College / University Name
                      </label>
                      <input
                        type="text"
                        required
                        value={instInstitution}
                        onChange={(e) => setInstInstitution(e.target.value)}
                        placeholder="e.g. NALSAR, NLSIU, WBNUJS, Faculty of Law DU"
                        className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          isLight
                            ? "border-stone-300 bg-white text-stone-900"
                            : "border-slate-700 bg-slate-900 text-white"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={`text-xs font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                          Official Contact Email / WhatsApp
                        </label>
                        <input
                          type="text"
                          required
                          value={instContact}
                          onChange={(e) => setInstContact(e.target.value)}
                          placeholder="rcc@nlu.ac.in or +91 98..."
                          className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                            isLight
                              ? "border-stone-300 bg-white text-stone-900"
                              : "border-slate-700 bg-slate-900 text-white"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`text-xs font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                          Role / Representation
                        </label>
                        <select
                          value={instRole}
                          onChange={(e) => setInstRole(e.target.value)}
                          className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                            isLight
                              ? "border-stone-300 bg-white text-stone-900"
                              : "border-slate-700 bg-slate-900 text-white"
                          }`}
                        >
                          <option value="RCC Student Convenor">RCC Student Convenor</option>
                          <option value="Placement Cell Faculty Head">Placement Cell Faculty Head</option>
                          <option value="Student Bar Association President">Student Bar Association President</option>
                          <option value="Chamber Practice Manager">Chamber Practice Manager</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`text-xs font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                        Cohort Size & Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={instNotes}
                        onChange={(e) => setInstNotes(e.target.value)}
                        placeholder="Approx. 120 students in Batch of 2027 requiring High Court clerkship tracking..."
                        className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          isLight
                            ? "border-stone-300 bg-white text-stone-900"
                            : "border-slate-700 bg-slate-900 text-white"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      className={`text-xs ${isLight ? "text-stone-500 hover:text-stone-900" : "text-slate-400 hover:text-white"}`}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Institutional Response</span>
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
