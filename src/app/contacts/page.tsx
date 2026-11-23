"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Mail,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { contacts as initialContacts } from "@/lib/data";
import { Contact, RelationshipStrength } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStrength, setSelectedStrength] = React.useState<string>("All");

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStrength =
      selectedStrength === "All" || contact.relationshipStrength === selectedStrength;

    return matchesSearch && matchesStrength;
  });

  const getStrengthBadge = (strength: RelationshipStrength) => {
    switch (strength) {
      case "Strong":
        return <Badge variant="success" className="text-[10px]">●●● Strong Network</Badge>;
      case "Medium":
        return <Badge variant="warning" className="text-[10px]">●●○ Medium Tie</Badge>;
      case "Weak":
        return <Badge variant="outline" className="text-[10px]">●○○ Emerging</Badge>;
      case "New":
        return <Badge variant="secondary" className="text-[10px]">○○○ Uncontacted</Badge>;
    }
  };

  return (
    <AppShell title="Contact Intelligence">
      <div className="space-y-6 pb-12">
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                Contact & Network Intelligence
              </h2>
              <Badge variant="purple" className="text-xs">
                Relationship CRM
              </Badge>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Track Senior Advocates, High Court Law Clerks, Tier-1 Partners, and NLU Delhi Alumni to secure warm referrals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/emails?type=Networking">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-blue-200" />
                Draft Networking Note
              </Button>
            </Link>
          </div>
        </div>

        {/* ── METRICS BAR ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">Total Legal Network</span>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{contacts.length} Contacts</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">Strong Connections</span>
            <p className="text-xl font-extrabold text-emerald-600 mt-1">
              {contacts.filter((c) => c.relationshipStrength === "Strong").length} Verified
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">NLU Alumni Ties</span>
            <p className="text-xl font-extrabold text-blue-600 mt-1">
              {contacts.filter((c) => c.tags.includes("Alumni") || c.tags.includes("NLU Delhi")).length} Mentors
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500">Due for Follow-Up</span>
            <p className="text-xl font-extrabold text-amber-600 mt-1">3 Overdue</p>
          </div>
        </div>

        {/* ── SEARCH & FILTER CONTROLS ─────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search contacts by name, firm, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
            {["All", "Strong", "Medium", "Weak", "New"].map((str) => (
              <button
                key={str}
                onClick={() => setSelectedStrength(str)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedStrength === str
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {str}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTACTS CARDS GRID ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {getInitials(contact.name)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{contact.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {contact.position}
                      </p>
                    </div>
                  </div>
                  {getStrengthBadge(contact.relationshipStrength)}
                </div>

                <div className="text-xs text-slate-700 font-semibold flex items-center gap-1.5">
                  <span className="text-slate-400 font-normal">Org:</span>
                  <span>{contact.organization}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {contact.notes}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {contact.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] text-slate-400">
                  Last contact: {contact.lastContactDate}
                </span>

                <div className="flex items-center gap-1.5">
                  <Link href={`/emails?target=${encodeURIComponent(contact.organization)}&person=${encodeURIComponent(contact.name)}&email=${encodeURIComponent(contact.email)}`}>
                    <Button size="sm" variant="outline" className="h-7 text-xs px-2.5">
                      <Mail className="h-3 w-3 mr-1" /> Email
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
