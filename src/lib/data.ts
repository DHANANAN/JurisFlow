// ============================================================
// JurisFlow — Sample Data (Realistic Indian Legal Career Data)
// ============================================================

import {
  Opportunity,
  Application,
  Judge,
  Contact,
  Prompt,
  AnalyticsData,
  Activity,
  Notification,
  User,
} from "./types";

// ── Current User ──────────────────────────────────────────────
export const currentUser: User = {
  id: "u1",
  name: "Dhananjay Chouhan",
  email: "dhananjay.chouhan@nludelhi.ac.in",
  university: "NLU Delhi",
  year: "4th Year",
  interests: [
    "Constitutional Law",
    "Litigation",
    "Disability Rights",
    "Policy Research",
    "Legal Tech",
  ],
  bio: "NLU Delhi student passionate about constitutional law, litigation, and legal-tech. Experienced in judicial internships, disability rights research, and policy analysis.",
  location: "Delhi NCR",
  linkedin: "linkedin.com/in/dhananjay-chouhan",
};

// ── Opportunities ─────────────────────────────────────────────
export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    organization: "Supreme Court of India",
    position: "Judicial Clerkship — Justice D.Y. Chandrachud Chamber",
    type: "Supreme Court Chambers",
    location: "Delhi",
    deadline: "2027-01-15",
    contactPerson: "Registrar (Judicial)",
    contactEmail: "registrar-judicial@sci.gov.in",
    applicationRoute: "Email + Official Portal",
    score: 100,
    description:
      "Clerkship opportunity in the chambers of a sitting Supreme Court Justice. Involves legal research, drafting opinions, and assisting with constitutional law matters.",
    practiceAreas: ["Constitutional Law", "Fundamental Rights", "Administrative Law"],
    source: "SCI Website",
    postedDate: "2026-11-01",
    isBookmarked: true,
    status: "Interested",
    tags: ["Top Priority", "Constitutional Law", "Delhi"],
  },
  {
    id: "opp-2",
    organization: "Supreme Court of India",
    position: "Research Intern — SCORA",
    type: "Supreme Court Clerkship",
    location: "Delhi",
    deadline: "2027-02-01",
    contactPerson: "SCORA Coordinator",
    contactEmail: "scora@sci.gov.in",
    applicationRoute: "Official Portal",
    score: 98,
    description:
      "Research internship at the Supreme Court Observer and Research Association. Work on landmark case analysis and legal research.",
    practiceAreas: ["Constitutional Law", "Legal Research", "Jurisprudence"],
    source: "LiveLaw",
    postedDate: "2026-11-05",
    isBookmarked: true,
    status: "Preparing",
    tags: ["Constitutional Law", "Research", "Delhi"],
  },
  {
    id: "opp-3",
    organization: "Delhi High Court",
    position: "Judicial Intern — Justice Prathiba M. Singh Chamber",
    type: "High Court Chambers",
    location: "Delhi",
    deadline: "2027-01-20",
    contactPerson: "PS to Justice Singh",
    contactEmail: "ps-justice-singh@dhc.nic.in",
    applicationRoute: "Email Application",
    score: 95,
    description:
      "Internship in the chambers of Justice Prathiba M. Singh, known for IP and technology law expertise.",
    practiceAreas: ["IP Law", "Technology Law", "Commercial Litigation"],
    source: "Lawctopus",
    postedDate: "2026-11-10",
    isBookmarked: false,
    status: "Discovered",
    tags: ["IP Law", "Technology", "Delhi"],
  },
  {
    id: "opp-4",
    organization: "Telangana High Court",
    position: "Judicial Intern — Constitutional Bench",
    type: "High Court Chambers",
    location: "Hyderabad",
    deadline: "2027-01-30",
    contactPerson: "Registrar General",
    contactEmail: "registrar@tshc.gov.in",
    applicationRoute: "Official Portal + Email",
    score: 92,
    description:
      "Internship with the Constitutional Bench of Telangana High Court. Opportunity to work on constitutional matters and state law issues.",
    practiceAreas: ["Constitutional Law", "State Legislation", "Public Interest Litigation"],
    source: "LiveLaw",
    postedDate: "2026-11-08",
    isBookmarked: true,
    status: "Applied",
    tags: ["Constitutional Law", "PIL", "Hyderabad"],
  },
  {
    id: "opp-5",
    organization: "AZB & Partners",
    position: "Litigation Intern — Delhi Office",
    type: "Tier 1 Firm",
    location: "Delhi",
    deadline: "2027-02-15",
    contactPerson: "HR — Internships",
    contactEmail: "internships@azbpartners.com",
    applicationRoute: "Email + Career Portal",
    score: 90,
    description:
      "Litigation internship at one of India's premier law firms. Work with the disputes team on commercial litigation, arbitration, and regulatory matters.",
    practiceAreas: ["Commercial Litigation", "Arbitration", "Regulatory"],
    source: "Firm Website",
    postedDate: "2026-11-12",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Litigation", "Tier 1", "Delhi"],
  },
  {
    id: "opp-6",
    organization: "Shardul Amarchand Mangaldas",
    position: "Disputes & Litigation Intern",
    type: "Tier 1 Firm",
    location: "Delhi",
    deadline: "2027-02-10",
    contactPerson: "Talent Acquisition",
    contactEmail: "careers@amsshardul.com",
    applicationRoute: "Career Portal",
    score: 90,
    description:
      "Join the disputes practice of SAM for a 4-week internship. Focus on complex commercial disputes and white-collar matters.",
    practiceAreas: ["Commercial Disputes", "White Collar", "Competition Law"],
    source: "Lawlit",
    postedDate: "2026-11-14",
    isBookmarked: false,
    status: "Interested",
    tags: ["Litigation", "Tier 1", "Delhi"],
  },
  {
    id: "opp-7",
    organization: "Cyril Amarchand Mangaldas",
    position: "Constitutional Law Research Fellow",
    type: "Tier 1 Firm",
    location: "Mumbai",
    deadline: "2027-03-01",
    contactPerson: "Research Team Lead",
    contactEmail: "research@cyrilshroff.com",
    applicationRoute: "Email",
    score: 88,
    description:
      "Research fellowship focusing on constitutional law developments. Work with the firm's research division on landmark cases.",
    practiceAreas: ["Constitutional Law", "Legal Research", "Policy"],
    source: "Bar & Bench",
    postedDate: "2026-11-15",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Research", "Constitutional Law", "Mumbai"],
  },
  {
    id: "opp-8",
    organization: "Khaitan & Co",
    position: "Litigation Summer Intern",
    type: "Tier 2 Firm",
    location: "Delhi",
    deadline: "2027-02-20",
    contactPerson: "HR Department",
    contactEmail: "hr@khaitanco.com",
    applicationRoute: "Career Portal",
    score: 85,
    description:
      "Summer internship in the litigation practice. Gain exposure to civil, commercial, and regulatory litigation.",
    practiceAreas: ["Civil Litigation", "Commercial Disputes", "Regulatory"],
    source: "LinkedIn",
    postedDate: "2026-11-16",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Litigation", "Tier 2", "Delhi"],
  },
  {
    id: "opp-9",
    organization: "Chambers of Mr. Dushyant Dave, Senior Advocate",
    position: "Junior Research Assistant",
    type: "Boutique Litigation",
    location: "Delhi",
    deadline: "2027-01-25",
    contactPerson: "Office of Mr. Dave",
    contactEmail: "office.dushyantdave@gmail.com",
    applicationRoute: "Email",
    score: 82,
    description:
      "Research assistant position in the chambers of Senior Advocate Dushyant Dave. Work on constitutional law, PIL, and human rights matters.",
    practiceAreas: ["Constitutional Law", "PIL", "Human Rights"],
    source: "Referral",
    postedDate: "2026-11-18",
    isBookmarked: true,
    status: "Preparing",
    tags: ["Boutique", "Constitutional Law", "Delhi"],
  },
  {
    id: "opp-10",
    organization: "Vidhi Centre for Legal Policy",
    position: "Research Fellow — Disability Rights",
    type: "Research Centre",
    location: "Delhi",
    deadline: "2027-03-15",
    contactPerson: "Dr. Arghya Sengupta",
    contactEmail: "careers@vidhilegalpolicy.in",
    applicationRoute: "Email + Application Form",
    score: 78,
    description:
      "Research fellowship at India's premier legal policy think tank. Focus on disability rights legislation and UNCRPD compliance.",
    practiceAreas: ["Disability Rights", "Policy Research", "Legislative Drafting"],
    source: "Lawctopus",
    postedDate: "2026-11-20",
    isBookmarked: true,
    status: "Interested",
    tags: ["Policy", "Disability Rights", "Delhi"],
  },
  {
    id: "opp-11",
    organization: "Centre for Policy Research",
    position: "Research Intern — Law & Regulation",
    type: "Think Tank",
    location: "Delhi",
    deadline: "2027-03-10",
    contactPerson: "Internship Coordinator",
    contactEmail: "internships@cprindia.org",
    applicationRoute: "Online Application",
    score: 72,
    description:
      "Research internship at CPR focusing on regulatory policy, urban governance, and environmental law.",
    practiceAreas: ["Policy Research", "Environmental Law", "Urban Governance"],
    source: "CPR Website",
    postedDate: "2026-11-19",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Policy", "Research", "Delhi"],
  },
  {
    id: "opp-12",
    organization: "Bombay High Court",
    position: "Judicial Intern — Justice G.S. Patel Chamber",
    type: "High Court Chambers",
    location: "Mumbai",
    deadline: "2027-02-28",
    contactPerson: "PS to Justice Patel",
    contactEmail: "ps-justice-patel@bhc.nic.in",
    applicationRoute: "Email Application",
    score: 93,
    description:
      "Intern with Justice G.S. Patel, known for IP law expertise and innovative judicial approaches.",
    practiceAreas: ["IP Law", "Commercial Law", "Constitutional Law"],
    source: "Bar & Bench",
    postedDate: "2026-11-22",
    isBookmarked: false,
    status: "Discovered",
    tags: ["IP Law", "Mumbai", "High Court"],
  },
];

// ── Applications ──────────────────────────────────────────────
export const applications: Application[] = [
  {
    id: "app-1",
    opportunityId: "opp-4",
    opportunity: opportunities[3],
    status: "Applied",
    notes: "Submitted application with writing sample on UNCRPD compliance. Mentioned Telangana HC internship experience.",
    deadline: "2027-01-30",
    cvVersion: "CV_v3_Litigation.pdf",
    coverLetter: "CL_TelanganaHC_Constitutional.pdf",
    writingSample: "UNCRPD_StateReport_Analysis.pdf",
    communications: [
      {
        id: "comm-1",
        type: "Application",
        subject: "Application for Judicial Internship — Constitutional Bench",
        body: "Respected Sir/Madam, I write to apply for the judicial internship...",
        sentDate: "2026-11-15",
        recipient: "registrar@tshc.gov.in",
      },
    ],
    attachments: ["CV_v3.pdf", "CoverLetter.pdf", "WritingSample.pdf"],
    appliedDate: "2026-11-15",
    lastUpdated: "2026-11-15",
  },
  {
    id: "app-2",
    opportunityId: "opp-1",
    opportunity: opportunities[0],
    status: "Interested",
    notes: "Need to prepare a strong constitutional law writing sample. Research Justice Chandrachud's recent judgments.",
    deadline: "2027-01-15",
    cvVersion: "CV_v3_Litigation.pdf",
    coverLetter: "",
    writingSample: "",
    communications: [],
    attachments: [],
    lastUpdated: "2026-11-20",
  },
  {
    id: "app-3",
    opportunityId: "opp-2",
    opportunity: opportunities[1],
    status: "Preparing",
    notes: "Drafting writing sample on fundamental rights jurisprudence. Need to refine CV to highlight research experience.",
    deadline: "2027-02-01",
    cvVersion: "CV_v3_Research.pdf",
    coverLetter: "CL_SCORA_Draft.pdf",
    writingSample: "FundamentalRights_Draft.pdf",
    communications: [],
    attachments: ["CV_v3_Research.pdf"],
    lastUpdated: "2026-11-22",
  },
  {
    id: "app-4",
    opportunityId: "opp-9",
    opportunity: opportunities[8],
    status: "Preparing",
    notes: "Preparing application to Dushyant Dave's chambers. Need alumni referral from NLU Delhi.",
    deadline: "2027-01-25",
    cvVersion: "CV_v3_Litigation.pdf",
    coverLetter: "",
    writingSample: "",
    communications: [],
    attachments: [],
    lastUpdated: "2026-11-21",
  },
  {
    id: "app-5",
    opportunityId: "opp-10",
    opportunity: opportunities[9],
    status: "Interested",
    notes: "Perfect fit given my UNCRPD research. Need to compile research portfolio.",
    deadline: "2027-03-15",
    cvVersion: "",
    coverLetter: "",
    writingSample: "",
    communications: [],
    attachments: [],
    lastUpdated: "2026-11-20",
  },
  {
    id: "app-6",
    opportunityId: "opp-6",
    opportunity: opportunities[5],
    status: "Interested",
    notes: "SAM has strong disputes practice. Check if NLU alumni work there.",
    deadline: "2027-02-10",
    cvVersion: "",
    coverLetter: "",
    writingSample: "",
    communications: [],
    attachments: [],
    lastUpdated: "2026-11-19",
  },
];

// ── Judges ────────────────────────────────────────────────────
export const judges: Judge[] = [
  {
    id: "j-1",
    name: "Justice D.Y. Chandrachud",
    court: "Supreme Court",
    chamber: "Court No. 1",
    practiceAreas: ["Constitutional Law", "Fundamental Rights", "Privacy Law"],
    clerkshipAvailable: true,
    internshipAvailable: true,
    contactEmail: "registrar-judicial@sci.gov.in",
    notes: "Former CJI. Known for landmark privacy and personal liberty judgments.",
    applicationDeadline: "2027-01-15",
    status: "Open",
  },
  {
    id: "j-2",
    name: "Justice Sanjiv Khanna",
    court: "Supreme Court",
    chamber: "Court No. 2",
    practiceAreas: ["Tax Law", "Constitutional Law", "Commercial Law"],
    clerkshipAvailable: true,
    internshipAvailable: true,
    contactEmail: "registrar-judicial@sci.gov.in",
    notes: "CJI. Focus on tax and constitutional matters.",
    applicationDeadline: "2027-02-01",
    status: "Open",
  },
  {
    id: "j-3",
    name: "Justice Prathiba M. Singh",
    court: "Delhi High Court",
    chamber: "Court No. 39",
    practiceAreas: ["IP Law", "Technology Law", "Commercial Litigation"],
    clerkshipAvailable: false,
    internshipAvailable: true,
    contactEmail: "ps-justice-singh@dhc.nic.in",
    notes: "Leading IP judge. Authored several landmark technology law judgments.",
    applicationDeadline: "2027-01-20",
    status: "Open",
  },
  {
    id: "j-4",
    name: "Justice Yashwant Varma",
    court: "Delhi High Court",
    chamber: "Court No. 15",
    practiceAreas: ["Tax Law", "Administrative Law", "Service Law"],
    clerkshipAvailable: false,
    internshipAvailable: true,
    notes: "Known for tax law expertise.",
    applicationDeadline: "2027-02-15",
    status: "Rolling",
  },
  {
    id: "j-5",
    name: "Justice G.S. Patel",
    court: "Bombay High Court",
    chamber: "Court No. 37",
    practiceAreas: ["IP Law", "Commercial Law", "Constitutional Law"],
    clerkshipAvailable: false,
    internshipAvailable: true,
    contactEmail: "ps-justice-patel@bhc.nic.in",
    notes: "Known for innovative judicial approaches and IP law expertise.",
    applicationDeadline: "2027-02-28",
    status: "Open",
  },
  {
    id: "j-6",
    name: "Justice P. Naveen Rao",
    court: "Telangana High Court",
    chamber: "Court No. 8",
    practiceAreas: ["Constitutional Law", "Criminal Law", "PIL"],
    clerkshipAvailable: false,
    internshipAvailable: true,
    contactEmail: "registrar@tshc.gov.in",
    notes: "Constitutional bench member. Active in PIL matters.",
    applicationDeadline: "2027-01-30",
    status: "Open",
  },
  {
    id: "j-7",
    name: "Justice Sudhanshu Dhulia",
    court: "Supreme Court",
    chamber: "Court No. 10",
    practiceAreas: ["Constitutional Law", "Environmental Law", "Human Rights"],
    clerkshipAvailable: true,
    internshipAvailable: true,
    notes: "Known for environmental and human rights jurisprudence.",
    status: "Rolling",
  },
  {
    id: "j-8",
    name: "Justice Hima Kohli",
    court: "Supreme Court",
    chamber: "Court No. 7",
    practiceAreas: ["Family Law", "Constitutional Law", "Administrative Law"],
    clerkshipAvailable: true,
    internshipAvailable: true,
    notes: "Former Chief Justice of Telangana HC.",
    status: "Rolling",
  },
];

// ── Contacts ──────────────────────────────────────────────────
export const contacts: Contact[] = [
  {
    id: "c-1",
    name: "Prof. Srikrishna Deva Rao",
    position: "Vice Chancellor",
    organization: "NLU Delhi",
    email: "vc@nludelhi.ac.in",
    linkedin: "linkedin.com/in/srikrishna-rao",
    notes: "PhD supervisor for disability rights research. Can provide strong academic reference.",
    relationshipStrength: "Strong",
    lastContactDate: "2026-11-20",
    tags: ["Academic", "Reference", "NLU Delhi"],
  },
  {
    id: "c-2",
    name: "Adv. Menaka Guruswamy",
    position: "Senior Advocate",
    organization: "Supreme Court of India",
    email: "menaka.guruswamy@gmail.com",
    linkedin: "linkedin.com/in/menaka-guruswamy",
    notes: "Met at constitutional law conference. Interested in disability rights work.",
    relationshipStrength: "Medium",
    lastContactDate: "2026-10-15",
    tags: ["Senior Advocate", "Constitutional Law", "Networking"],
  },
  {
    id: "c-3",
    name: "Dr. Arghya Sengupta",
    position: "Research Director",
    organization: "Vidhi Centre for Legal Policy",
    email: "arghya@vidhilegalpolicy.in",
    linkedin: "linkedin.com/in/arghya-sengupta",
    notes: "Connected through UNCRPD research. Potential research fellowship opportunity.",
    relationshipStrength: "Medium",
    lastContactDate: "2026-11-01",
    tags: ["Think Tank", "Policy", "Research"],
  },
  {
    id: "c-4",
    name: "Amit Sharma",
    position: "Senior Associate",
    organization: "AZB & Partners",
    email: "amit.sharma@azbpartners.com",
    linkedin: "linkedin.com/in/amit-sharma-azb",
    notes: "NLU Delhi alumni (Class of 2020). Can refer for litigation internship.",
    relationshipStrength: "Strong",
    lastContactDate: "2026-11-18",
    tags: ["Alumni", "Tier 1 Firm", "Referral"],
  },
  {
    id: "c-5",
    name: "Priya Krishnamurthy",
    position: "Law Clerk",
    organization: "Supreme Court of India",
    email: "priya.k@sci.gov.in",
    notes: "Current SCI law clerk. NLU Bangalore alumni. Provided clerkship application tips.",
    relationshipStrength: "Medium",
    lastContactDate: "2026-10-28",
    tags: ["Law Clerk", "Supreme Court", "Tips"],
  },
  {
    id: "c-6",
    name: "Rahul Narayan",
    position: "Partner",
    organization: "Trilegal",
    email: "rahul.narayan@trilegal.com",
    linkedin: "linkedin.com/in/rahul-narayan",
    notes: "Guest lecturer at NLU Delhi. Spoke about litigation careers.",
    relationshipStrength: "Weak",
    lastContactDate: "2026-09-15",
    tags: ["Tier 1 Firm", "Litigation", "NLU Delhi"],
  },
  {
    id: "c-7",
    name: "Jayna Kothari",
    position: "Executive Director",
    organization: "Centre for Law and Policy Research",
    email: "jayna@clpr.org.in",
    linkedin: "linkedin.com/in/jayna-kothari",
    notes: "Leading disability rights advocate. UNCRPD expert. Potential collaboration.",
    relationshipStrength: "Weak",
    lastContactDate: "2026-08-20",
    tags: ["Disability Rights", "Policy", "CLPR"],
  },
  {
    id: "c-8",
    name: "Vikram Raghavan",
    position: "Former Law Clerk",
    organization: "Supreme Court of India",
    email: "vikram.r@gmail.com",
    notes: "Alumni mentor. Provided guidance on SCI clerkship applications.",
    relationshipStrength: "Strong",
    lastContactDate: "2026-11-10",
    tags: ["Mentor", "Supreme Court", "Alumni"],
  },
];

// ── Prompts ───────────────────────────────────────────────────
export const prompts: Prompt[] = [
  {
    id: "p-1",
    title: "Judicial Internship Application Email",
    category: "Email Writing",
    content: `Draft a professional application email for a judicial internship at {court} in the chambers of {judge_name}. 

The applicant is {student_name}, a {year} student at {university}, with interests in {practice_areas}. 

Key experiences to highlight: {experiences}

The email should:
- Be formal and respectful
- Reference specific judgments of the judge
- Connect experiences to the judge's practice areas
- Express genuine interest in constitutional law
- Be concise (under 300 words)`,
    variables: [
      "court",
      "judge_name",
      "student_name",
      "year",
      "university",
      "practice_areas",
      "experiences",
    ],
    lastUsed: "2026-11-20",
    usageCount: 12,
    isFavorite: true,
  },
  {
    id: "p-2",
    title: "Law Firm Networking Email",
    category: "Email Writing",
    content: `Draft a networking email to {contact_name}, {position} at {organization}. 

Purpose: {purpose}

The email should reference: {talking_points}

Tone: Professional yet personable. Avoid generic language.

Include a memory hook: "I have developed a habit of reading footnotes before conclusions."`,
    variables: [
      "contact_name",
      "position",
      "organization",
      "purpose",
      "talking_points",
    ],
    lastUsed: "2026-11-18",
    usageCount: 8,
    isFavorite: true,
  },
  {
    id: "p-3",
    title: "Opportunity Discovery — Constitutional Law",
    category: "Opportunity Discovery",
    content: `Search for constitutional law internship and clerkship opportunities with the following criteria:

Courts: {courts}
Practice Areas: {practice_areas}
Location Preference: {location}
Duration: {duration}
Application Deadline: After {deadline}

Rank results by:
1. Prestige score
2. Practice area match
3. Location preference
4. Deadline proximity

Include contact information and application routes for each opportunity.`,
    variables: ["courts", "practice_areas", "location", "duration", "deadline"],
    usageCount: 15,
    isFavorite: true,
  },
  {
    id: "p-4",
    title: "Judge Research Brief",
    category: "Judge Research",
    content: `Create a comprehensive research brief for {judge_name} of {court}.

Include:
1. Career timeline and notable appointments
2. Key judgments (last 5 years)
3. Practice area specializations
4. Judicial philosophy and approach
5. Published articles or speeches
6. Known interests or causes
7. Former clerks and their current positions
8. Application tips specific to this judge's chambers`,
    variables: ["judge_name", "court"],
    usageCount: 6,
    isFavorite: false,
  },
  {
    id: "p-5",
    title: "Follow-Up Email Template",
    category: "Follow-Ups",
    content: `Draft a follow-up email to {recipient_name} at {organization}.

Original email sent on: {original_date}
Subject of original email: {original_subject}

The follow-up should:
- Be polite and not pushy
- Reference the original communication
- Add new value (e.g., recent publication, achievement)
- Include memory hook: "Court observations often leave me with more questions than answers."
- Request a brief response or next step`,
    variables: [
      "recipient_name",
      "organization",
      "original_date",
      "original_subject",
    ],
    usageCount: 10,
    isFavorite: true,
  },
  {
    id: "p-6",
    title: "Cover Letter — Litigation Focus",
    category: "Cover Letter Drafting",
    content: `Draft a cover letter for {position} at {organization}.

Applicant: {student_name}
University: {university}
Year: {year}

Key selling points:
1. {experience_1}
2. {experience_2}
3. {experience_3}

The cover letter should demonstrate:
- Deep interest in litigation
- Understanding of the organization's practice
- Specific contributions the applicant can make
- Personal insight: "My legal research usually begins with one question and ends with several more."`,
    variables: [
      "position",
      "organization",
      "student_name",
      "university",
      "year",
      "experience_1",
      "experience_2",
      "experience_3",
    ],
    usageCount: 7,
    isFavorite: false,
  },
  {
    id: "p-7",
    title: "Opportunity Ranking Analysis",
    category: "Opportunity Ranking",
    content: `Analyze and rank the following opportunities for a law student with this profile:

University: {university}
Year: {year}
Interests: {interests}
Career Goal: {career_goal}

Opportunities to rank:
{opportunities_list}

Ranking criteria:
- Career impact (30%)
- Learning opportunity (25%)
- Network building (20%)
- Location preference (15%)
- Application effort (10%)

Provide a scored ranking with reasoning for each.`,
    variables: [
      "university",
      "year",
      "interests",
      "career_goal",
      "opportunities_list",
    ],
    usageCount: 4,
    isFavorite: false,
  },
  {
    id: "p-8",
    title: "AI Research — Organization Profile",
    category: "AI Research",
    content: `Generate a comprehensive profile for {organization}.

Include:
1. Overview and history
2. Key practice areas
3. Notable partners/members
4. Recent cases/projects
5. Internship program details
6. Culture and work style
7. Alumni network
8. Application tips
9. Salary/stipend information (if available)
10. Contact information`,
    variables: ["organization"],
    usageCount: 9,
    isFavorite: true,
  },
];

// ── Analytics ─────────────────────────────────────────────────
export const analyticsData: AnalyticsData = {
  applicationsSent: 24,
  responsesReceived: 14,
  interviews: 6,
  offers: 3,
  conversionRate: 12.5,
  monthlyTrends: [
    { month: "Jun", applications: 2, responses: 1, interviews: 0, offers: 0 },
    { month: "Jul", applications: 4, responses: 2, interviews: 1, offers: 0 },
    { month: "Aug", applications: 3, responses: 2, interviews: 1, offers: 1 },
    { month: "Sep", applications: 5, responses: 3, interviews: 2, offers: 1 },
    { month: "Oct", applications: 6, responses: 4, interviews: 1, offers: 0 },
    { month: "Nov", applications: 4, responses: 2, interviews: 1, offers: 1 },
  ],
  sourceBreakdown: [
    { source: "Lawctopus", count: 8, percentage: 33.3 },
    { source: "LiveLaw", count: 5, percentage: 20.8 },
    { source: "LinkedIn", count: 4, percentage: 16.7 },
    { source: "Referral", count: 3, percentage: 12.5 },
    { source: "Firm Website", count: 2, percentage: 8.3 },
    { source: "Other", count: 2, percentage: 8.3 },
  ],
  statusDistribution: [
    { status: "Discovered", count: 5, color: "#94a3b8" },
    { status: "Interested", count: 3, color: "#3B82F6" },
    { status: "Preparing", count: 2, color: "#8b5cf6" },
    { status: "Applied", count: 6, color: "#F59E0B" },
    { status: "Follow-Up", count: 3, color: "#f97316" },
    { status: "Interview", count: 2, color: "#06b6d4" },
    { status: "Offer", count: 2, color: "#10B981" },
    { status: "Closed", count: 1, color: "#ef4444" },
  ],
};

// ── Recent Activity ───────────────────────────────────────────
export const recentActivities: Activity[] = [
  {
    id: "act-1",
    action: "Applied",
    description: "Submitted application to Telangana High Court — Constitutional Bench",
    timestamp: "2026-11-23T18:30:00",
    icon: "send",
  },
  {
    id: "act-2",
    action: "Bookmarked",
    description: "Saved Supreme Court Clerkship — Justice Chandrachud Chamber",
    timestamp: "2026-11-23T16:00:00",
    icon: "bookmark",
  },
  {
    id: "act-3",
    action: "Updated",
    description: "Updated CV to v3 — added RERA research experience",
    timestamp: "2026-11-23T14:15:00",
    icon: "file-text",
  },
  {
    id: "act-4",
    action: "Connected",
    description: "Added Amit Sharma (AZB & Partners) to contacts",
    timestamp: "2026-11-22T20:00:00",
    icon: "user-plus",
  },
  {
    id: "act-5",
    action: "Generated",
    description: "AI generated application email for SCORA internship",
    timestamp: "2026-11-22T17:45:00",
    icon: "sparkles",
  },
  {
    id: "act-6",
    action: "Researched",
    description: "Generated judge brief for Justice Prathiba M. Singh",
    timestamp: "2026-11-21T15:30:00",
    icon: "search",
  },
  {
    id: "act-7",
    action: "Preparing",
    description: "Started preparing application for Dushyant Dave Chambers",
    timestamp: "2026-11-21T12:00:00",
    icon: "edit",
  },
  {
    id: "act-8",
    action: "Follow-Up",
    description: "Sent follow-up email to Vidhi Centre for Legal Policy",
    timestamp: "2026-11-20T16:30:00",
    icon: "mail",
  },
];

// ── Notifications ─────────────────────────────────────────────
export const notifications: Notification[] = [
  {
    id: "n-1",
    title: "Deadline Approaching",
    message: "Supreme Court Clerkship application deadline is in 52 days",
    type: "warning",
    read: false,
    createdAt: "2026-11-23T10:00:00",
  },
  {
    id: "n-2",
    title: "New Opportunity",
    message: "Bombay High Court — Justice G.S. Patel internship now accepting applications",
    type: "info",
    read: false,
    createdAt: "2026-11-22T14:00:00",
  },
  {
    id: "n-3",
    title: "Application Received",
    message: "Telangana High Court confirmed receipt of your application",
    type: "success",
    read: true,
    createdAt: "2026-11-16T09:00:00",
  },
  {
    id: "n-4",
    title: "Follow-Up Reminder",
    message: "It's been 7 days since you contacted Vidhi Centre. Consider a follow-up.",
    type: "info",
    read: false,
    createdAt: "2026-11-21T08:00:00",
  },
];

// ── Career Intelligence Recommendations ───────────────────────
export const careerRecommendations = [
  {
    id: "rec-1",
    type: "Apply This Week",
    title: "Dushyant Dave Chambers",
    reason: "Deadline in 62 days. Strong constitutional law match. NLU alumni connection available.",
    urgency: "medium",
    score: 82,
  },
  {
    id: "rec-2",
    type: "High Probability",
    title: "Vidhi Centre — Disability Rights Fellowship",
    reason: "Your UNCRPD research directly matches their current project. 78% match score.",
    urgency: "low",
    score: 78,
  },
  {
    id: "rec-3",
    type: "Constitutional Law Match",
    title: "Supreme Court Clerkship",
    reason: "Highest prestige opportunity. Start preparing writing sample now.",
    urgency: "high",
    score: 100,
  },
  {
    id: "rec-4",
    type: "Litigation Match",
    title: "AZB & Partners — Litigation Intern",
    reason: "NLU alumni Amit Sharma can provide referral. Delhi location preferred.",
    urgency: "medium",
    score: 90,
  },
  {
    id: "rec-5",
    type: "Judicial Internship Match",
    title: "Delhi HC — Justice Prathiba M. Singh",
    reason: "Technology law exposure valuable for legal-tech interest. Delhi location.",
    urgency: "medium",
    score: 95,
  },
];
