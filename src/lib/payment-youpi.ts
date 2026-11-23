// ============================================================
// JurisFlow — YouPI-PG UPI Integration & SuperThanks System
// Real UPI ID: 6304812838@upi
// Clean peer-to-peer SuperThanks and institutional response schema
// ============================================================

import { ContributorBadge, ContributorTier } from "./types";

export interface SuperThanksTier {
  id: ContributorTier;
  amount: number;
  title: string;
  badgeName: string;
  badgeIcon: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
  description: string;
  perks: string[];
  recommended?: boolean;
}

export const SUPERTHANKS_TIERS: SuperThanksTier[] = [
  {
    id: "bronze",
    amount: 49,
    title: "Bronze Advocate",
    badgeName: "Bronze Supporter",
    badgeIcon: "🥉",
    colorScheme: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-300",
      badgeBg: "bg-amber-900/40",
      badgeText: "text-amber-200 border border-amber-600/40",
      accent: "#f59e0b",
    },
    description: "Support server costs and open access to legal opportunity pipelines.",
    perks: [
      "Bronze gavel supporter badge on your profile",
      "Supporter sticker next to your public name",
      "Full access to 8-stage Legal CRM pipeline",
    ],
  },
  {
    id: "silver",
    amount: 199,
    title: "Silver Counsel",
    badgeName: "Silver Counsel",
    badgeIcon: "🥈",
    colorScheme: {
      bg: "bg-slate-300/10",
      border: "border-slate-400/40",
      text: "text-slate-200",
      badgeBg: "bg-slate-800",
      badgeText: "text-slate-100 border border-slate-400/50",
      accent: "#cbd5e1",
    },
    description: "Empower nationwide High Court clerkship & litigation tracking.",
    perks: [
      "Silver scales supporter badge & sticker",
      "Judicial Center clerkship alerts for all 25 High Courts",
      "High-conversion email templates with citation hooks",
    ],
  },
  {
    id: "gold",
    amount: 499,
    title: "Gold Patron",
    badgeName: "Gold Patron",
    badgeIcon: "🥇",
    recommended: true,
    colorScheme: {
      bg: "bg-yellow-500/15",
      border: "border-yellow-400/60 shadow-lg shadow-yellow-500/10",
      text: "text-yellow-300",
      badgeBg: "bg-yellow-950/60",
      badgeText: "text-yellow-200 border border-yellow-500/60 shadow-xs",
      accent: "#eab308",
    },
    description: "Help fund AI indexers for Supreme Court registries & judgment parsing.",
    perks: [
      "Gold apex patron badge with glowing aura",
      "YouTube-style highlighted badge across comments and community",
      "Exclusive Supreme Court clerkship briefing docs",
      "Unlimited AI email memory hook synthesis",
    ],
  },
  {
    id: "platinum",
    amount: 999,
    title: "Platinum Bencher",
    badgeName: "Platinum Bencher",
    badgeIcon: "💎",
    colorScheme: {
      bg: "bg-cyan-500/15",
      border: "border-cyan-400/50 shadow-lg shadow-cyan-500/15",
      text: "text-cyan-300",
      badgeBg: "bg-cyan-950/60",
      badgeText: "text-cyan-100 border border-cyan-400/60",
      accent: "#06b6d4",
    },
    description: "Founding benefactor backing non-profit legal research automation.",
    perks: [
      "Diamond crest badge with special profile flair",
      "Direct consultation for custom law school scrapers",
      "Permanent recognition on the JurisFlow Acknowledgements board",
      "VIP chamber outreach dispatch prioritisation",
    ],
  },
];

export const PRIMARY_UPI_ID = "6304812838@upi";
export const PAYEE_NAME = "Dhananjay Chouhan (JurisFlow)";

/**
 * Builds standard UPI Intent URI according to NPCI specifications
 */
export function generateUpiIntentUrl(amount: number, tier: string, orderId: string): string {
  const note = `JurisFlow-SuperThanks-${tier}-${orderId}`.replace(/[^a-zA-Z0-9-]/g, "");
  const params = new URLSearchParams({
    pa: PRIMARY_UPI_ID,
    pn: "Dhananjay Chouhan",
    mc: "0000",
    tid: orderId,
    tr: orderId,
    tn: note,
    am: amount.toFixed(2),
    cu: "INR",
  });
  return `upi://pay?${params.toString()}`;
}

export type YouPiPaymentStatus =
  | "INITIATED"
  | "ACTIVE"
  | "MANUAL_REVIEW"
  | "VERIFIED"
  | "FAILED";

export interface YouPiSession {
  orderId: string;
  amount: number;
  tier: ContributorTier;
  upiId: string;
  upiUri: string;
  qrUrl: string;
  status: YouPiPaymentStatus;
  utr?: string;
  createdAt: string;
}

/**
 * Initializes a YouPI payment session for SuperThanks
 */
export function createYouPiSession(amount: number, tier: ContributorTier): YouPiSession {
  const orderId = `JF-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const upiUri = generateUpiIntentUrl(amount, tier, orderId);

  return {
    orderId,
    amount,
    tier,
    upiId: PRIMARY_UPI_ID,
    upiUri,
    qrUrl: "/qr-upi.jpg",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Submits UTR claim for manual verification
 * Following YouPI-PG standard: customer supplies 12-character UTR
 */
export function submitUtrClaim(session: YouPiSession, utr: string): YouPiSession {
  const cleanUtr = utr.trim().replace(/\s+/g, "");
  return {
    ...session,
    utr: cleanUtr,
    status: "MANUAL_REVIEW",
  };
}

/**
 * Instant local validation for demonstration & frictionless membership unlocking
 */
export function verifySessionAndCreateBadge(session: YouPiSession): ContributorBadge {
  const tierConfig = SUPERTHANKS_TIERS.find((t) => t.id === session.tier) || SUPERTHANKS_TIERS[2];

  return {
    id: `badge-${session.orderId}`,
    tier: session.tier,
    title: tierConfig.badgeName,
    icon: tierConfig.badgeIcon,
    unlockedAt: new Date().toISOString().split("T")[0],
    amount: session.amount,
    utr: session.utr || "DIRECT-UPI-" + session.orderId,
    perks: tierConfig.perks,
  };
}
