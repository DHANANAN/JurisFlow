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
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/lib/data";
import { EmailType } from "@/lib/types";

export default function EmailEnginePage() {
  const [emailType, setEmailType] = React.useState<EmailType>("Application");
  const [selectedHook, setSelectedHook] = React.useState<string>(
    "I have developed a habit of reading footnotes before conclusions, which perhaps explains both my research interests and my internship applications."
  );
  const [copied, setCopied] = React.useState(false);

  // Form Inputs
  const [targetOrg, setTargetOrg] = React.useState("Hon'ble Judge Chambers, Supreme Court of India");
  const [targetPerson, setTargetPerson] = React.useState("The Law Clerk / Registrar");
  const [recipientEmail, setRecipientEmail] = React.useState("lawclerksci@gmail.com");
  const [practiceArea, setPracticeArea] = React.useState("Constitutional Law & Regulatory Adjudication");
  const [experienceHighlight, setExperienceHighlight] = React.useState(
    "Telangana High Court internship, Mahbubnagar District Court, and UNCRPD State Report Research at NLU Delhi"
  );

  const memoryHooks = [
    {
      label: "Version A — Research Depth",
      text: "While most of my research begins with a legal question, it usually ends with three more.",
    },
    {
      label: "Version B — Footnote Habit (Recommended)",
      text: "I have developed a habit of reading footnotes before conclusions, which perhaps explains both my research interests and my internship applications.",
    },
    {
      label: "Version C — Courtroom Fascination",
      text: "A senior advocate once asked me why I took detailed notes during routine observation hearings; the candid answer is that I still find courtrooms genuinely fascinating.",
    },
  ];

  // Dynamically constructed realistic email body
  const generatedEmail = React.useMemo(() => {
    if (emailType === "Application") {
      return {
        subject: `Application for Judicial Clerkship / Internship — Dhananjay Chouhan [B.A. LL.B. (Hons.), NLU Delhi]`,
        body: `Respected Sir/Madam,

I am Dhananjay Chouhan, a student at National Law University Delhi pursuing my B.A. LL.B. (Hons.).

I write to formally submit my application for an internship / clerkship under the Hon'ble Judge's office. Having previously interned at the Telangana High Court and the District & Sessions Court, Mahbubnagar, I have developed firsthand exposure to courtroom proceedings, case-brief compilation, petition drafting, and record scrutiny. Alongside court exposure, my academic research at NLU Delhi focuses on constitutional interpretation, disability rights jurisprudence, urban governance, and RERA compliance.

Currently, I am engaged with research on a comprehensive UNCRPD India State Report project. This work has sharpened my skills in statutory analysis, comparative constitutional review, and deep evidentiary synthesis.

${selectedHook}

I would be deeply privileged to contribute sincere, disciplined research assistance to the Hon'ble Court. Attached for your kind perusal are my Curriculum Vitae, Cover Letter, and a brief constitutional writing sample.

Thank you for your valuable time and consideration.

Warm regards,

Dhananjay Chouhan
B.A. LL.B. (Hons.) | National Law University Delhi
LinkedIn: https://www.linkedin.com/in/dhananjay-chouhan-30a51b334
Portfolio: https://www.djlexfolio.tech`,
      };
    } else if (emailType === "Networking") {
      return {
        subject: `NLU Delhi Student Inquiry: Litigation Practice & Constitutional Law — Dhananjay Chouhan`,
        body: `Dear ${targetPerson},

I hope this email finds you well.

My name is Dhananjay Chouhan, a student at National Law University Delhi with a strong focus on litigation and constitutional law. I have closely followed your contributions in ${practiceArea}.

Given my prior judicial internship experience at the Telangana High Court and current research on disability rights and regulatory frameworks at NLU Delhi, I would be grateful for an opportunity to briefly learn about your litigation trajectory and chamber work.

${selectedHook}

If your schedule permits in the coming weeks, I would be deeply grateful for a brief 10-minute introductory conversation.

Warm regards,

Dhananjay Chouhan
National Law University Delhi`,
      };
    } else if (emailType === "Follow-Up") {
      return {
        subject: `Follow-up: Internship Application — Dhananjay Chouhan [NLU Delhi]`,
        body: `Respected Sir/Madam,

I hope you are having a productive week.

I am writing to respectfully follow up on my internship application submitted on behalf of Dhananjay Chouhan (NLU Delhi) for the upcoming term.

Since submitting my application, I have completed a detailed analytical paper reviewing state compliance under the UNCRPD and recent constitutional bench directives. I remain eager to assist the Hon'ble Office with thorough research and bench memos.

${selectedHook}

I understand your office handles a substantial volume of applications, and I thank you again for your kind time and consideration.

Warm regards,

Dhananjay Chouhan
B.A. LL.B. (Hons.), NLU Delhi`,
      };
    } else {
      return {
        subject: `Thank you — Dhananjay Chouhan [NLU Delhi]`,
        body: `Dear ${targetPerson},

Thank you very much for taking the time to speak with me today regarding the chamber internship opportunity.

Our discussion regarding ${practiceArea} and analytical research methodologies was immensely enriching and reaffirmed my dedication to rigorous litigation practice.

${selectedHook}

I look forward to hearing about the next steps. Please do not hesitate to contact me if any additional writing samples or references are required.

Sincerely,

Dhananjay Chouhan
National Law University Delhi`,
      };
    }
  }, [emailType, selectedHook, targetPerson, practiceArea]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell title="AI Email Engine">
      <div className="space-y-6 pb-12">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                AI Legal Email & Outreach Engine
              </h2>
              <Badge variant="success" className="text-xs">
                Zero-Generic Policy
              </Badge>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Construct dignified, memorable outreach tailored for Supreme Court chambers, High Court judges, Senior Advocates, and Tier-1 litigation partners.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied Full Draft" : "Copy Subject & Body"}
            </Button>
          </div>
        </div>

        {/* ── EMAIL TYPE SELECTOR TABS ─────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { type: "Application" as EmailType, label: "Clerkship / Internship", icon: Send, desc: "For judge chambers & firms" },
            { type: "Networking" as EmailType, label: "Professional Networking", icon: Users, desc: "For advocates & alumni" },
            { type: "Follow-Up" as EmailType, label: "Cadence Follow-Up", icon: Clock, desc: "D+7 or D+14 gentle nudge" },
            { type: "Thank You" as EmailType, label: "Post-Interview Note", icon: Heart, desc: "Within 24 hours of call" },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = emailType === tab.type;
            return (
              <button
                key={tab.type}
                onClick={() => setEmailType(tab.type)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-blue-50/80 border-blue-500 shadow-xs"
                    : "bg-white border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                  <span className={`text-xs font-bold ${isSelected ? "text-blue-900" : "text-slate-900"}`}>
                    {tab.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{tab.desc}</p>
              </button>
            );
          })}
        </div>

        {/* ── TWO-COLUMN WORKBENCH: FORM ON LEFT, DRAFT ON RIGHT ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: INPUTS & MEMORY HOOK SELECTOR (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                Target Parameters
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Target Organization / Chamber
                  </label>
                  <Input
                    value={targetOrg}
                    onChange={(e) => setTargetOrg(e.target.value)}
                    placeholder="Chambers of Justice... or Firm Name"
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Recipient Title / Name
                  </label>
                  <Input
                    value={targetPerson}
                    onChange={(e) => setTargetPerson(e.target.value)}
                    placeholder="Law Clerk / Partner Name"
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Recipient Email Address
                  </label>
                  <Input
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="clerkship@sci.gov.in"
                    className="text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Practice Area / Jurisprudence
                  </label>
                  <Input
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    placeholder="Constitutional Law, White Collar, Arbitration"
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Specific Experience to Emphasize
                  </label>
                  <textarea
                    rows={3}
                    value={experienceHighlight}
                    onChange={(e) => setExperienceHighlight(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* MEMORY HOOK SELECTION */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Legal Memory Hooks
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">Anti-Cringe Verified</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Subtle, dignified lines that create recall with busy law clerks and judges without sounding cliché.
              </p>

              <div className="space-y-2 pt-1">
                {memoryHooks.map((hook, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedHook(hook.text)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedHook === hook.text
                        ? "bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/50"
                        : "bg-slate-50/60 border-slate-200 hover:bg-white"
                    }`}
                  >
                    <p className="font-semibold text-slate-800 text-[11px] mb-1">{hook.label}</p>
                    <p className="italic text-slate-600 leading-relaxed text-[11px]">
                      &quot;{hook.text}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: GENERATED EMAIL PREVIEW (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-700 ml-2">
                    Live Draft Preview
                  </span>
                </div>
                <Button size="sm" variant="ghost" onClick={handleCopy} className="text-xs h-7 gap-1">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              {/* Email Envelope Header */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2 text-xs font-mono">
                <div className="flex items-center">
                  <span className="w-16 text-slate-400 font-sans">To:</span>
                  <span className="text-blue-600 font-semibold">{recipientEmail}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-16 text-slate-400 font-sans">Subject:</span>
                  <span className="text-slate-900 font-bold">{generatedEmail.subject}</span>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-4 rounded-xl bg-white border border-slate-100 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap selection:bg-blue-100 min-h-[380px]">
                {generatedEmail.body}
              </div>

              {/* Attachments bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  📎 Attachments: <strong>Dhananjay-NLUD_CV.pdf</strong>, <strong>CoverLetter.pdf</strong>, <strong>UNCRPD_WritingSample.pdf</strong>
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  Ready to send
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
