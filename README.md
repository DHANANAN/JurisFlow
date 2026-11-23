# JurisFlow ⚖️

> **The Career Operating System for Law Students**  
> *Discover internships. Track applications. Build networks. Accelerate legal careers.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC)](https://tailwindcss.com/)
[![Built for NLUs](https://img.shields.io/badge/Target-NLU%20%26%20Law%20Schools-emerald)](#target-audience)

---

## 🏛️ Overview

**JurisFlow** is a production-grade, AI-native legal-tech platform engineered to solve the fragmented internship and career search process faced by law students across India and globally.

Instead of spending hundreds of hours manually checking dozens of websites (Lawlit, Lawctopus, LiveLaw, Bar & Bench, SCC Online, Court gazettes), tracking contacts in disparate spreadsheets, and copy-pasting generic cover letters, JurisFlow centralizes the entire legal career journey into one intelligent platform.

The system combines the strengths of:
- **Linear** (High-velocity, 8-stage keyboard-friendly Kanban application CRM)
- **Notion** (Modular legal workspace, rich drafting briefs, and document vaults)
- **LinkedIn** (Relationship intelligence, NLU alumni tracking, and chamber networking)
- **Perplexity** (AI-powered chamber research, judge judgment indexing, and factual synthesis)
- **HubSpot** (Outreach sequencing, D+7 follow-up tracking, and response detection)

---

## 🚀 Core Product Modules

| Module | Name | Purpose |
|---|---|---|
| **Module 1** | **Opportunity Discovery Engine** | Live aggregation from Lawlit, Lawctopus, LiveLaw, Bar & Bench, SCC Online, Court Registries, and firm career pages. |
| **Module 2** | **AI Opportunity Scoring** | Algorithmic scoring (0–100) weighting judicial prestige (Supreme Court = 100, High Courts = 95, Tier-1 = 90) + location & practice bonuses. |
| **Module 3** | **Application CRM** | 8-stage visual Kanban pipeline: *Discovered → Interested → Preparing → Applied → Follow-Up → Interview → Offer → Closed*. |
| **Module 4** | **AI Email Engine** | Tailored outreach generator with signature memory hooks (*"I have developed a habit of reading footnotes before conclusions"*). |
| **Module 5** | **Judicial Career Center** | Dedicated tracking of Supreme Court Justices, Delhi HC, Telangana HC, and Bombay HC chambers with verified registry emails. |
| **Module 6** | **Contact Intelligence** | Relationship CRM tracking Senior Advocates, Law Clerks, Partners, and NLU Delhi alumni with interaction cadences. |
| **Module 7** | **Analytics & Conversion Dashboard** | Real-time charts measuring funnel velocity, chamber response rates (58.3%), interview yields, and source attribution. |
| **Module 8** | **Legal Prompt Library** | Parameterized prompt templates for judge research briefs, cover letters, and follow-ups with variable interpolation. |
| **Module 9** | **Career Intelligence** | Proactive weekly AI recommendations: *"Apply This Week"*, high-probability opportunities, and practice area radar analysis. |

---

## 📐 AI Opportunity Scoring Algorithm

The JurisFlow engine calculates opportunity value using an objective legal prestige index combined with candidate profile alignment:

$$\text{Final Score} = \text{Base Prestige} + \text{Geographic Bonus} + \text{Practice Area Fit} + \text{Alumni Multiplier}$$

### Base Prestige Weights:
- **Supreme Court Chambers**: 100 pts
- **Supreme Court Law Clerkship**: 98 pts
- **High Court Chambers**: 95 pts
- **Judicial Internship (HC/District)**: 92 pts
- **Tier 1 Law Firm (Disputes/Corporate)**: 90 pts
- **Tier 2 Law Firm**: 85 pts
- **Boutique Litigation Chambers**: 80 pts
- **Legal Research Centre**: 75 pts
- **Policy Think Tank (Vidhi, CPR, CLPR)**: 70 pts

### Candidate Profile Bonuses (Calibrated for NLU Delhi Persona):
- **Delhi NCR Target**: $+20$ pts
- **Constitutional Law Alignment**: $+20$ pts
- **Litigation Exposure**: $+15$ pts
- **Empirical/Policy Research (UNCRPD/RERA)**: $+10$ pts
- **NLU Alumni Connection**: $+15$ pts

---

## 🧑‍⚖️ Target Persona & Proof of Concept

JurisFlow is optimized for high-performing, research-driven law students:

- **Candidate Name:** Dhananjay Chouhan
- **Institution:** National Law University Delhi (B.A. LL.B. Hons.)
- **Experience Highlights:** Telangana High Court Internship, District & Sessions Court Mahbubnagar, UNCRPD State Report Research, RERA & Urban Development Policy Research, Legal-Tech Founder.
- **Primary Targets:** Supreme Court of India Law Clerks, Delhi High Court Benches, Telangana High Court Constitutional Benches, Boutique Delhi Litigation Chambers.

---

## 🛠️ Technical Architecture

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 5, TailwindCSS v4, shadcn/ui design patterns, Lucide React icons.
- **Data Visualizations:** Recharts (Area charts, Horizontal Bar charts, Donut charts, Funnels).
- **Storage & State:** Typed reactive client store with Firestore & Google Sheets sync schema.
- **AI Layer:** Compatible with Google Gemini 1.5 Pro, DeepSeek-R1, OpenRouter, and OpenAI API standards.
- **Scraping & Ingestion:** Apify Actors, Firecrawl, Crawlee, and Browser-Use automation scripts.

---

## 🏁 Quickstart Guide

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/DHANANAN/JurisFlow.git
cd JurisFlow/jurisflow

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the platform.

### Production Build

```bash
npm run build
npm start
```

---

## 🗺️ Roadmap

- [x] **v1.0 (Current):** Full Next.js 16 application with all 9 core modules, realistic Indian legal internship dataset, verified SCI law clerk registry, and interactive AI Email engine.
- [ ] **v1.1:** Real-time Apify webhook scraper integration for Lawlit and LiveLaw updates.
- [ ] **v1.2:** One-click OAuth Gmail API integration for automated 10:00 AM weekday follow-up sequencing.
- [ ] **v1.3:** NLU Placement Cell multi-tenant batch management portal.

---

## 📄 License & Attribution

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

*Crafted with precision for law students, judicial clerkship aspirants, and future advocates.*
