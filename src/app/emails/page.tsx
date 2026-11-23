"use client";

import * as React from "react";
import {
  Mail,
  Send,
  Users,
  Clock,
  Heart,
  Copy,
  Check,
  Sparkles,
  Bookmark,
  RefreshCw,
  Sliders,
  Scale,
  ExternalLink,
  FileText,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmailType } from "@/lib/types";
import { useTheme } from "@/lib/theme-context";
import { CvIntelligenceModal, DHANANJAY_DEFAULT_CV, ParsedCVProfile } from "@/components/cv/cv-intelligence-modal";

export default function EmailEnginePage() {
  const { theme } = useTheme();
  const isLight = theme === "sand-gold";

  const [cvProfile, setCvProfile] = React.useState<ParsedCVProfile>(DHANANJAY_DEFAULT_CV);
  const [isCvModalOpen, setIsCvModalOpen] = React.useState(false);

  const [emailType, setEmailType] = React.useState<EmailType>("Application");
  const [selectedHook, setSelectedHook] = React.useState<string>(
    "A small confession: I have developed a habit of reading footnotes before conclusions, which perhaps explains both my research interests and my internship applications."
  );
  const [copied, setCopied] = React.useState(false);

  // Load saved CV from localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jurisflow-cv-profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCvProfile(parsed);
          if (parsed.selectedMemoryHook) {
            setSelectedHook(parsed.selectedMemoryHook);
          }
        } catch {}
      }
    }
  }, []);

  // Form Inputs
  const [targetOrg, setTargetOrg] = React.useState("Chambers of the Chief Justice, Supreme Court of India");
  const [targetPerson, setTargetPerson] = React.useState("The Law Clerk / Registrar");
  const [recipientEmail, setRecipientEmail] = React.useState("lawclerksci@gmail.com");
  const [practiceArea, setPracticeArea] = React.useState("Constitutional Law & Regulatory Adjudication");
  const [experienceHighlight, setExperienceHighlight] = React.useState(
    "Telangana High Court internship, Mahbubnagar District Court, and UNCRPD State Report Research at NLU Delhi"
  );

  const memoryHooks = [
    {
      label: "Version A — Footnote-First Habit (Recommended)",
      text: "A small confession: I have developed a habit of reading footnotes before conclusions, which perhaps explains both my research interests and my internship applications.",
    },
    {
      label: "Version B — Research Recursion",
      text: "While most of my research begins with a legal question, it usually ends with three more.",
    },
    {
      label: "Version C — Courtroom Fascination",
      text: "A judge once asked me why I took detailed notes during routine observation hearings; the candid answer is that I still find courtrooms genuinely fascinating.",
    },
  ];

  // Dynamically constructed realistic email body
  const generatedEmail = React.useMemo(() => {
    if (emailType === "Application") {
      return {
        subject: `Application for Judicial Clerkship / Internship — ${cvProfile.name} [${cvProfile.year}, ${cvProfile.university}]`,
        body: `Respected Sir/Madam,

I am ${cvProfile.name}, a student at ${cvProfile.university} pursuing my ${cvProfile.year}.

I write to formally submit my application for an internship / clerkship under the Hon'ble Judge's office. Having previously interned at the Telangana High Court and the District & Sessions Court, Mahbubnagar, I have developed firsthand exposure to courtroom proceedings, case-brief compilation, petition drafting, and record scrutiny. Alongside court exposure, my academic research at NLU Delhi focuses on constitutional interpretation, disability rights jurisprudence, urban governance, and RERA compliance.

Currently, I am engaged with research on a comprehensive UNCRPD India State Report project. This work has sharpened my skills in statutory analysis, comparative constitutional review, and deep evidentiary synthesis.

${selectedHook}

I would be deeply privileged to contribute sincere, disciplined research assistance to the Hon'ble Court. Attached for your kind perusal are my Curriculum Vitae (${cvProfile.rawCvFileName}), Cover Letter, and a brief constitutional writing sample.

Thank you for your valuable time and consideration.

Warm regards,

${cvProfile.name}
${cvProfile.year} | ${cvProfile.university}
LinkedIn: ${cvProfile.linkedin}
Portfolio: ${cvProfile.portfolio}
Contact: ${cvProfile.phone}`,
      };
    } else if (emailType === "Networking") {
      return {
        subject: `NLU Delhi Student Inquiry: Litigation Practice & Constitutional Law — ${cvProfile.name}`,
        body: `Dear ${targetPerson},

I hope this email finds you well.

My name is ${cvProfile.name}, a student at ${cvProfile.university} with a strong focus on litigation and constitutional law. I have closely followed your contributions in ${practiceArea}.

Given my prior judicial internship experience at the Telangana High Court and current research on disability rights and regulatory frameworks at NLU Delhi, I would be grateful for an opportunity to briefly learn about your litigation trajectory and chamber work.

${selectedHook}

If your schedule permits in the coming weeks, I would be deeply grateful for a brief 10-minute introductory conversation.

Warm regards,

${cvProfile.name}
${cvProfile.year} | ${cvProfile.university}
Portfolio: ${cvProfile.portfolio}`,
      };
    } else if (emailType === "Follow-Up") {
      return {
        subject: `Gentle Follow-Up: Judicial Clerkship Application — ${cvProfile.name} [${cvProfile.university}]`,
        body: `Respected Sir/Madam,

I hope this email finds you well.

I am writing to gently follow up on my internship application submitted earlier for the upcoming term at ${targetOrg}. I remain keenly interested in contributing research assistance to the chamber.

Attached again are my updated CV (${cvProfile.rawCvFileName}) and writing sample for your ready convenience.

Thank you for your continued time and consideration.

Warm regards,
${cvProfile.name}
${cvProfile.university} | ${cvProfile.phone}`,
      };
    } else {
      return {
        subject: `Thank You: Chambers of ${targetOrg} — ${cvProfile.name}`,
        body: `Respected Sir/Madam,

Thank you for the opportunity to interview with your office today. I thoroughly enjoyed our discussion regarding recent constitutional jurisprudence and adjudicatory practice.

I remain deeply enthusiastic about the opportunity to assist your chamber as an intern.

Warm regards,
${cvProfile.name}
${cvProfile.university}`,
      };
    }
  }, [emailType, selectedHook, targetOrg, targetPerson, practiceArea, cvProfile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${generatedEmail.subject}\n\n${generatedEmail.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    recipientEmail
  )}&su=${encodeURIComponent(generatedEmail.subject)}&body=${encodeURIComponent(
    generatedEmail.body
  )}`;

  return (
    <AppShell title="AI Email Engine">
      <div className="space-y-6 pb-12 max-w-7xl mx-auto">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border transition-all ${
            isLight
              ? "bg-white border-[#e7e0d3] text-stone-900 shadow-xs"
              : "bg-[#0a1122] border-slate-800 text-slate-100 shadow-xl"
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className={`text-xl font-extrabold ${isLight ? "text-stone-950" : "text-white"}`}>
                Anti-Slop Legal Email & Outreach Engine
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Footnote Memory Hooks
              </span>
            </div>
            <p className={`text-xs ${isLight ? "text-stone-600" : "text-slate-400"} max-w-2xl`}>
              Tailored for Supreme Court chambers, High Court judges, Senior Advocates, and Tier-1 litigation partners. Zero generic AI filler.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsCvModalOpen(true)}
              className={`text-xs gap-1.5 ${isLight ? "border-stone-300 text-stone-800" : "border-slate-700 text-slate-200"}`}
            >
              <FileText className="h-3.5 w-3.5 text-amber-500" />
              <span>CV: {cvProfile.rawCvFileName}</span>
            </Button>

            <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs gap-1.5 shadow-sm">
                <Mail className="h-3.5 w-3.5" />
                <span>Open in Gmail Web Draft</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>

            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied Draft!" : "Copy Subject & Body"}
            </Button>
          </div>
        </div>

        {/* ── EMAIL TYPE SELECTOR TABS ─────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { type: "Application" as EmailType, label: "Clerkship / Internship", icon: Send, desc: "For judge chambers & firms" },
            { type: "Networking" as EmailType, label: "Professional Networking", icon: Users, desc: "For advocates & alumni" },
            { type: "Follow-Up" as EmailType, label: "Cadence Follow-Up (D+7)", icon: Clock, desc: "Gentle D+7 cadence nudge" },
            { type: "Thank You" as EmailType, label: "Post-Interview Note", icon: Heart, desc: "Within 24 hours of bench talk" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = emailType === tab.type;
            return (
              <button
                key={tab.type}
                onClick={() => setEmailType(tab.type)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? isLight
                      ? "bg-amber-500/15 border-amber-500 text-stone-900 ring-1 ring-amber-400"
                      : "bg-amber-500/15 border-amber-400 text-white ring-1 ring-amber-400"
                    : isLight
                    ? "bg-white border-[#e7e0d3] hover:bg-stone-50 text-stone-800"
                    : "bg-[#0a1122] border-slate-800 hover:bg-slate-800 text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${isSelected ? "text-amber-500" : isLight ? "text-stone-400" : "text-slate-400"}`} />
                  <span className={`text-xs font-bold ${isSelected ? "text-amber-800 dark:text-amber-300" : ""}`}>
                    {tab.label}
                  </span>
                </div>
                <p className={`text-[11px] ${isLight ? "text-stone-500" : "text-slate-400"}`}>{tab.desc}</p>
              </button>
            );
          })}
        </div>

        {/* ── TWO-COLUMN WORKBENCH ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: INPUTS & MEMORY HOOK SELECTOR (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div
              className={`p-5 rounded-2xl border shadow-xs space-y-4 ${
                isLight ? "bg-white border-[#e7e0d3] text-stone-900" : "bg-[#0a1122] border-slate-800 text-slate-100"
              }`}
            >
              <h3 className={`font-bold text-sm flex items-center gap-2 ${isLight ? "text-stone-900" : "text-white"}`}>
                <Sliders className="h-4 w-4 text-amber-500" />
                Target Chamber Parameters
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className={`font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                    Target Organization / Chamber
                  </label>
                  <input
                    value={targetOrg}
                    onChange={(e) => setTargetOrg(e.target.value)}
                    placeholder="Chambers of Justice... or Firm Name"
                    className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      isLight ? "border-stone-200 bg-stone-50 text-stone-900" : "border-slate-800 bg-slate-950 text-white"
                    }`}
                  />
                </div>

                <div>
                  <label className={`font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                    Recipient Title / Name
                  </label>
                  <input
                    value={targetPerson}
                    onChange={(e) => setTargetPerson(e.target.value)}
                    placeholder="Law Clerk / Partner Name"
                    className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      isLight ? "border-stone-200 bg-stone-50 text-stone-900" : "border-slate-800 bg-slate-950 text-white"
                    }`}
                  />
                </div>

                <div>
                  <label className={`font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                    Recipient Email Address
                  </label>
                  <input
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="clerkship@sci.gov.in"
                    className={`w-full rounded-xl border px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      isLight ? "border-stone-200 bg-stone-50 text-stone-900" : "border-slate-800 bg-slate-950 text-white"
                    }`}
                  />
                </div>

                <div>
                  <label className={`font-semibold block mb-1 ${isLight ? "text-stone-700" : "text-slate-300"}`}>
                    Practice Area / Jurisprudence
                  </label>
                  <input
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    placeholder="Constitutional Law, White Collar, Arbitration"
                    className={`w-full rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      isLight ? "border-stone-200 bg-stone-50 text-stone-900" : "border-slate-800 bg-slate-950 text-white"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* MEMORY HOOK SELECTION */}
            <div
              className={`p-5 rounded-2xl border shadow-xs space-y-3 ${
                isLight ? "bg-white border-[#e7e0d3] text-stone-900" : "bg-[#0a1122] border-slate-800 text-slate-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`font-bold text-sm flex items-center gap-1.5 ${isLight ? "text-stone-900" : "text-white"}`}>
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Anti-Cringe Memory Hooks
                </h3>
                <span className={`text-[10px] font-medium ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                  High-Recall Strategy
                </span>
              </div>
              <p className={`text-[11px] leading-relaxed ${isLight ? "text-stone-500" : "text-slate-400"}`}>
                Subtle, dignified lines that create recall with busy law clerks and judges without sounding cliché.
              </p>

              <div className="space-y-2 pt-1">
                {memoryHooks.map((hook, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedHook(hook.text)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedHook === hook.text
                        ? isLight
                          ? "bg-amber-500/10 border-amber-500 ring-1 ring-amber-400 text-stone-900"
                          : "bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 text-white"
                        : isLight
                        ? "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800"
                        : "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <p className="font-bold text-[11px] mb-1">{hook.label}</p>
                    <p className={`italic leading-relaxed text-[11px] ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                      &quot;{hook.text}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: GENERATED EMAIL PREVIEW (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                isLight ? "bg-white border-[#e7e0d3] text-stone-900" : "bg-[#0a1122] border-slate-800 text-slate-100"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className={`text-xs font-bold ml-2 ${isLight ? "text-stone-800" : "text-white"}`}>
                    Live Draft Preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs h-7 gap-1">
                      <Mail className="h-3 w-3" />
                      <span>Draft in Gmail</span>
                    </Button>
                  </a>
                  <Button size="sm" variant="ghost" onClick={handleCopy} className="text-xs h-7 gap-1">
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Email Envelope Header */}
              <div className={`rounded-xl p-3.5 border space-y-2 text-xs font-mono ${
                isLight ? "bg-stone-50 border-stone-200" : "bg-slate-950 border-slate-800"
              }`}>
                <div className="flex items-center">
                  <span className={`w-16 font-sans ${isLight ? "text-stone-400" : "text-slate-500"}`}>To:</span>
                  <span className="text-blue-600 font-semibold">{recipientEmail}</span>
                </div>
                <div className="flex items-center">
                  <span className={`w-16 font-sans ${isLight ? "text-stone-400" : "text-slate-500"}`}>Subject:</span>
                  <span className={`font-bold ${isLight ? "text-stone-900" : "text-white"}`}>{generatedEmail.subject}</span>
                </div>
              </div>

              {/* Email Body */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed font-sans whitespace-pre-wrap min-h-[380px] ${
                isLight ? "bg-stone-50/50 border-stone-100 text-stone-800" : "bg-slate-950/50 border-slate-900 text-slate-200"
              }`}>
                {generatedEmail.body}
              </div>

              {/* Attachments bar */}
              <div className="pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className={`flex items-center gap-1.5 font-medium ${isLight ? "text-stone-600" : "text-slate-400"}`}>
                  📎 Attachments: <strong>{cvProfile.rawCvFileName}</strong>, <strong>CoverLetter.pdf</strong>, <strong>UNCRPD_WritingSample.pdf</strong>
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Ready to send
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CV Intelligence Modal */}
        <CvIntelligenceModal
          isOpen={isCvModalOpen}
          onClose={() => setIsCvModalOpen(false)}
          onProfileUpdated={(updated) => {
            setCvProfile(updated);
            if (updated.selectedMemoryHook) {
              setSelectedHook(updated.selectedMemoryHook);
            }
          }}
        />
      </div>
    </AppShell>
  );
}
