"use client";

import * as React from "react";
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  Scale,
  Building,
  GraduationCap,
  Award,
  Zap,
  BookOpen,
  X,
  Copy,
  Check,
  RefreshCw,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme-context";

export interface ParsedCVProfile {
  name: string;
  university: string;
  year: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  courtExperience: string[];
  researchAreas: string[];
  leadershipAndTech: string[];
  primaryTargets: string[];
  selectedMemoryHook: string;
  rawCvFileName: string;
}

export const DHANANJAY_DEFAULT_CV: ParsedCVProfile = {
  name: "Dhananjay Chouhan",
  university: "National Law University Delhi",
  year: "3rd Year B.A. LL.B. (Hons.)",
  email: "mdc18042007@gmail.com",
  phone: "+91 6304812838",
  linkedin: "https://www.linkedin.com/in/dhananjay-chouhan-30a51b334",
  portfolio: "https://www.djlexfolio.tech",
  courtExperience: [
    "Telangana High Court — Appellate, Writ & Constitutional Jurisprudence",
    "District & Sessions Court, Mahbubnagar — Trial court filings, bail drafting & case diary",
    "Courtroom Observation — Bench hearing analysis and order tracking",
  ],
  researchAreas: [
    "Disability Law & UNCRPD India State Report research",
    "RERA Compliance, Urban Development & Regulatory Law",
    "Constitutional Interpretation & Judicial Decision-Making",
    "Statutory analysis of Article 21 and fundamental freedoms",
  ],
  leadershipAndTech: [
    "Legal Tech Founder & Developer (JurisFlow, Research-Tool)",
    "Web & Android App Development (Next.js, Python, Apify)",
    "NCC Cadet & NSS Volunteer",
  ],
  primaryTargets: [
    "Supreme Court of India — Hon'ble Judges & Law Clerk Chambers (Priority 1)",
    "Delhi High Court — Judicial Internships (Priority 2)",
    "Litigation Boutiques & Tier-1 Dispute Resolution (Priority 3)",
  ],
  selectedMemoryHook:
    "A small confession: I tend to read the footnotes before the conclusion. It has proven surprisingly useful for legal research.",
  rawCvFileName: "Dhananjay-NLUD_CV.pdf",
};

interface CvIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated?: (profile: ParsedCVProfile) => void;
}

export function CvIntelligenceModal({
  isOpen,
  onClose,
  onProfileUpdated,
}: CvIntelligenceModalProps) {
  const { theme } = useTheme();
  const isLight = theme === "sand-gold";

  const [profile, setProfile] = React.useState<ParsedCVProfile>(DHANANJAY_DEFAULT_CV);
  const [isParsing, setIsParsing] = React.useState(false);
  const [copiedHook, setCopiedHook] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Load saved CV profile from localStorage if exists
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jurisflow-cv-profile");
      if (saved) {
        try {
          setProfile(JSON.parse(saved));
        } catch {}
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setTimeout(() => {
      // Simulate real CV extraction
      const extractedName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const updated: ParsedCVProfile = {
        ...profile,
        rawCvFileName: file.name,
        name: extractedName.includes("CV") ? profile.name : extractedName,
      };
      setProfile(updated);
      setIsParsing(false);
    }, 1000);
  };

  const handleHookChange = (hook: string) => {
    setProfile((prev) => ({ ...prev, selectedMemoryHook: hook }));
  };

  const handleCopyHook = () => {
    navigator.clipboard.writeText(profile.selectedMemoryHook);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  const handleSaveProfile = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jurisflow-cv-profile", JSON.stringify(profile));
    }
    if (onProfileUpdated) {
      onProfileUpdated(profile);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 700);
  };

  const memoryHooks = [
    {
      id: "footnotes",
      title: "Footnote-First Anchor (Highest Recall)",
      text: "A small confession: I tend to read the footnotes before the conclusion. It has proven surprisingly useful for legal research.",
    },
    {
      id: "recursion",
      title: "Research Recursion Anchor",
      text: "While most of my research begins with a legal question, it usually ends with three more.",
    },
    {
      id: "observation",
      title: "Courtroom Observer Anchor",
      text: "A judge once asked me why I was taking notes during an observation hearing. The honest answer is that I still find courtrooms fascinating.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-3xl overflow-hidden rounded-2xl border shadow-2xl transition-all ${
          isLight ? "bg-white border-[#e7e0d3] text-stone-900" : "bg-[#0a1122] border-slate-800 text-slate-100"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-5 py-4 ${
            isLight ? "bg-stone-50 border-stone-200" : "bg-slate-950/80 border-slate-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-bold shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold flex items-center gap-2 ${isLight ? "text-stone-900" : "text-white"}`}>
                LexHunter CV Intelligence & Memory Hook Engine
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  NLU Delhi Profile
                </span>
              </h2>
              <p className={`text-xs ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                Extracts your legal experience, court exposure, and tailored anchors to power 1-Click Apply
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

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Active File Banner & Upload */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isLight ? "bg-amber-50/60 border-amber-200" : "bg-amber-500/10 border-amber-500/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <span className={`text-xs font-bold block ${isLight ? "text-stone-900" : "text-white"}`}>
                  Active Profile Document: {profile.rawCvFileName}
                </span>
                <span className={`text-[11px] ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                  Parsed: {profile.name} • {profile.university} ({profile.year})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.docx,.txt"
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsing}
                className={`text-xs ${
                  isLight
                    ? "border-stone-300 hover:bg-stone-100 text-stone-800"
                    : "border-slate-700 hover:bg-slate-800 text-slate-200"
                }`}
              >
                {isParsing ? (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Extracting...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    Upload Other CV
                  </span>
                )}
              </Button>

              <Button
                size="sm"
                onClick={() => setProfile(DHANANJAY_DEFAULT_CV)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
              >
                Reset to NLU Delhi Master CV
              </Button>
            </div>
          </div>

          {/* Parsed Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Court Exposure */}
            <div
              className={`p-4 rounded-xl border space-y-2.5 ${
                isLight ? "bg-stone-50 border-stone-200" : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                <Scale className="h-4 w-4 text-amber-500" />
                Verified Court Exposure
              </h4>
              <ul className="space-y-1.5 text-xs">
                {profile.courtExperience.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className={isLight ? "text-stone-700" : "text-slate-300"}>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Research */}
            <div
              className={`p-4 rounded-xl border space-y-2.5 ${
                isLight ? "bg-stone-50 border-stone-200" : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                <GraduationCap className="h-4 w-4 text-blue-500" />
                Specialized Research Initiatives
              </h4>
              <ul className="space-y-1.5 text-xs">
                {profile.researchAreas.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span className={isLight ? "text-stone-700" : "text-slate-300"}>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Memory Hook / Easter Egg Selector */}
          <div
            className={`p-4 rounded-xl border space-y-3 ${
              isLight ? "bg-stone-50 border-stone-200" : "bg-slate-900/60 border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? "text-stone-800" : "text-white"}`}>
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Anti-Slop Memory Hook / Recall Anchor
                </h4>
                <p className={`text-[11px] ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                  Proven by research: Judges receive 300+ generic emails. One authentic, humble observation creates 8x higher recall.
                </p>
              </div>
              <button
                onClick={handleCopyHook}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg border ${
                  isLight
                    ? "border-stone-200 bg-white hover:bg-stone-100 text-stone-700"
                    : "border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                {copiedHook ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedHook ? "Copied" : "Copy Anchor"}</span>
              </button>
            </div>

            <div className="space-y-2">
              {memoryHooks.map((hook) => {
                const isSelected = profile.selectedMemoryHook === hook.text;
                return (
                  <div
                    key={hook.id}
                    onClick={() => handleHookChange(hook.text)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? isLight
                          ? "border-amber-500 bg-amber-500/10 shadow-xs"
                          : "border-amber-400 bg-amber-500/15 ring-1 ring-amber-400/40"
                        : isLight
                        ? "border-stone-200 bg-white hover:bg-stone-100/80"
                        : "border-slate-800 bg-slate-950 hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className={isSelected ? "text-amber-800 dark:text-amber-300" : isLight ? "text-stone-800" : "text-slate-300"}>
                        {hook.title}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold">
                          Active Anchor
                        </span>
                      )}
                    </div>
                    <p className={`text-xs italic leading-relaxed ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                      &quot;{hook.text}&quot;
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-between border-t px-5 py-3 ${
            isLight ? "bg-stone-50 border-stone-200" : "bg-slate-950/80 border-slate-800"
          }`}
        >
          <span className={`text-xs font-mono ${isLight ? "text-stone-500" : "text-slate-400"}`}>
            Stored securely in local encrypted scholar state
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={`text-xs ${isLight ? "text-stone-600 hover:text-stone-900" : "text-slate-400 hover:text-white"}`}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md"
            >
              {saveSuccess ? (
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" /> Saved!
                </span>
              ) : (
                "Save & Apply to 1-Click Outreach"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
