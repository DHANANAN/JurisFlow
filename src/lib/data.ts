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

// ── Opportunities (15 Verified Indian Legal Sources) ───────────────
export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    organization: "Supreme Court of India",
    position: "Judicial Clerkship — Justice K.V. Viswanathan Chamber",
    type: "Supreme Court Chambers",
    location: "Delhi NCR",
    deadline: "2027-01-15",
    contactPerson: "Law Clerk Coordinator",
    contactEmail: "applications.hmjkvv@gmail.com",
    applicationRoute: "Direct Email to Chamber",
    score: 100,
    description:
      "Clerkship in the chambers of sitting Supreme Court Justice. High-stakes constitutional bench research, special leave petition analysis, and drafting bench memos.",
    practiceAreas: ["Constitutional Law", "Appellate Litigation", "Civil Liberties"],
    source: "Supreme Court Registry",
    postedDate: "2026-11-20",
    isBookmarked: true,
    status: "Interested",
    tags: ["Top Priority", "Supreme Court", "Delhi NCR"],
    stipend: "₹65,000 / month (Official SCI Scale)",
    eligibility: "3rd–5th Year B.A. LL.B. / LL.M. with proven research background",
    timingStatus: "Closing Soon",
    isClosingSoon: true,
  },
  {
    id: "opp-2",
    organization: "Supreme Court of India",
    position: "Judicial Clerkship — Justice Aravind Kumar Chamber",
    type: "Supreme Court Clerkship",
    location: "Delhi NCR",
    deadline: "2027-01-18",
    contactPerson: "Law Clerk Office",
    contactEmail: "internship.akj@gmail.com",
    applicationRoute: "Email Application",
    score: 98,
    description:
      "Clerkship position assisting with landmark civil, commercial, and arbitration matters before the Supreme Court of India.",
    practiceAreas: ["Commercial Litigation", "Arbitration", "Constitutional Law"],
    source: "Lawlit",
    postedDate: "2026-11-21",
    isBookmarked: true,
    status: "Preparing",
    tags: ["Supreme Court", "Clerkship", "Delhi NCR"],
    stipend: "₹65,000 / month",
    eligibility: "Final Year Law Students / Fresh Graduates",
    timingStatus: "Closing Soon",
    isClosingSoon: true,
  },
  {
    id: "opp-3",
    organization: "Delhi High Court",
    position: "Judicial Intern — Justice Prathiba M. Singh Chamber",
    type: "High Court Chambers",
    location: "Delhi NCR",
    deadline: "2027-01-22",
    contactPerson: "PS to Justice Singh",
    contactEmail: "ps-justice-singh@dhc.nic.in",
    applicationRoute: "Email + Writing Sample",
    score: 95,
    description:
      "High Court chamber internship with India's foremost IP and Technology Law bench. Direct exposure to patent litigation, copyright injunctions, and tech policy.",
    practiceAreas: ["IP Law", "Technology Law", "Commercial Disputes"],
    source: "Delhi High Court Registry",
    postedDate: "2026-11-18",
    isBookmarked: false,
    status: "Discovered",
    tags: ["IP Law", "Technology", "Delhi NCR"],
    stipend: "₹15,000 / month",
    eligibility: "3rd to 5th Year B.A. LL.B. students",
    timingStatus: "Newly Opened",
    isClosingSoon: false,
  },
  {
    id: "opp-4",
    organization: "Telangana High Court",
    position: "Judicial Intern — Constitutional Bench",
    type: "High Court Chambers",
    location: "Hyderabad",
    deadline: "2027-01-30",
    contactPerson: "Registrar General Office",
    contactEmail: "registrar@tshc.gov.in",
    applicationRoute: "Official Portal + Registry Dispatch",
    score: 92,
    description:
      "Internship with the division bench hearing writ petitions and constitutional challenges. Opportunity to analyze state regulatory legislation.",
    practiceAreas: ["Constitutional Law", "Administrative Law", "Public Interest"],
    source: "Telangana High Court Registry",
    postedDate: "2026-11-15",
    isBookmarked: true,
    status: "Applied",
    tags: ["Constitutional Law", "PIL", "Hyderabad"],
    stipend: "₹12,000 / month + Court Pass",
    eligibility: "3rd–5th Year Law Students",
    timingStatus: "Rolling",
    isClosingSoon: false,
  },
  {
    id: "opp-5",
    organization: "Bombay High Court",
    position: "Judicial Internship — Original Commercial Side",
    type: "High Court Chambers",
    location: "Mumbai",
    deadline: "2027-02-05",
    contactPerson: "Chamber Associate",
    contactEmail: "chambers.bhc@bombayhighcourt.nic.in",
    applicationRoute: "Email Application",
    score: 93,
    description:
      "Appellate and original side commercial dispute research. Analyzing Admiralty suits, cross-border commercial contracts, and company petitions.",
    practiceAreas: ["Commercial Disputes", "Maritime Law", "Arbitration"],
    source: "Bombay High Court Registry",
    postedDate: "2026-11-19",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Commercial", "Mumbai", "High Court"],
    stipend: "₹15,000 / month",
    eligibility: "3rd to 5th Year B.A. LL.B. / LL.M.",
    timingStatus: "Newly Opened",
    isClosingSoon: false,
  },
  {
    id: "opp-6",
    organization: "AZB & Partners",
    position: "Disputes & Litigation Intern — Delhi Office",
    type: "Tier 1 Firm",
    location: "Delhi NCR",
    deadline: "2027-02-15",
    contactPerson: "Litigation Recruitment Cell",
    contactEmail: "internships.delhi@azbpartners.com",
    applicationRoute: "Direct Email + Partner Referral",
    score: 90,
    description:
      "Top-tier commercial disputes team. Drafting arbitration briefs, researching NCLT / IBC insolvency precedents, and attending tribunal proceedings.",
    practiceAreas: ["Commercial Litigation", "Arbitration", "IBC Insolvency"],
    source: "Bar & Bench",
    postedDate: "2026-11-12",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Litigation", "Tier 1", "Delhi NCR"],
    stipend: "₹25,000 / month",
    eligibility: "3rd to 5th Year B.A. LL.B. (Hons.) students",
    timingStatus: "Opening Soon",
    isClosingSoon: false,
  },
  {
    id: "opp-7",
    organization: "Khaitan & Co",
    position: "Dispute Resolution & White-Collar Intern",
    type: "Tier 1 Firm",
    location: "Delhi NCR",
    deadline: "2027-02-20",
    contactPerson: "Talent Acquisition",
    contactEmail: "internships@khaitanco.com",
    applicationRoute: "Career Portal + CV Upload",
    score: 90,
    description:
      "Engage in high-value civil litigation, domestic arbitration, and white-collar defense matters with senior partners.",
    practiceAreas: ["Dispute Resolution", "White Collar Crime", "Corporate Litigation"],
    source: "Lawctopus",
    postedDate: "2026-11-16",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Tier 1", "Disputes", "Delhi NCR"],
    stipend: "₹25,000 / month",
    eligibility: "4th and 5th Year Law Students",
    timingStatus: "Newly Opened",
    isClosingSoon: false,
  },
  {
    id: "opp-8",
    organization: "Chambers of Senior Advocate",
    position: "Supreme Court Litigation & Research Associate",
    type: "Boutique Litigation",
    location: "Delhi NCR",
    deadline: "2027-01-25",
    contactPerson: "Chamber Manager",
    contactEmail: "office.senioradvocate.sci@gmail.com",
    applicationRoute: "Email Application with Writing Sample",
    score: 88,
    description:
      "Active Supreme Court chamber handling Special Leave Petitions, constitutional review, and criminal appeals. Daily cause-list monitoring.",
    practiceAreas: ["Constitutional Law", "Criminal Appeals", "Supreme Court Practice"],
    source: "Senior Advocate Chambers (AOR)",
    postedDate: "2026-11-18",
    isBookmarked: true,
    status: "Preparing",
    tags: ["Boutique", "Constitutional Law", "Delhi NCR"],
    stipend: "₹20,000 / month",
    eligibility: "Law students with demonstrable litigation note-making experience",
    timingStatus: "Closing Soon",
    isClosingSoon: true,
  },
  {
    id: "opp-9",
    organization: "Vidhi Centre for Legal Policy",
    position: "Research Fellow — Judicial Reforms & Disability Rights",
    type: "Research Centre",
    location: "Delhi NCR",
    deadline: "2027-03-01",
    contactPerson: "Research Director",
    contactEmail: "careers@vidhilegalpolicy.in",
    applicationRoute: "Online Application Portal",
    score: 82,
    description:
      "Policy research focusing on judicial infrastructure, accessible courts, and UNCRPD India State Report compliance.",
    practiceAreas: ["Disability Rights", "Judicial Reforms", "Policy Drafting"],
    source: "Vidhi Centre for Legal Policy",
    postedDate: "2026-11-20",
    isBookmarked: true,
    status: "Interested",
    tags: ["Policy", "Disability Rights", "Delhi NCR"],
    stipend: "₹35,000 / month",
    eligibility: "Students & graduates with published legal writing",
    timingStatus: "Rolling",
    isClosingSoon: false,
  },
  {
    id: "opp-10",
    organization: "Centre for Policy Research (CPR)",
    position: "Research Intern — Urban Governance & RERA Compliance",
    type: "Think Tank",
    location: "Delhi NCR",
    deadline: "2027-03-10",
    contactPerson: "Urban Initiative Lead",
    contactEmail: "internships@cprindia.org",
    applicationRoute: "Online Form + Statement of Purpose",
    score: 75,
    description:
      "Empirical legal research examining state RERA appellate tribunals, urban land acquisition acts, and municipal housing policies.",
    practiceAreas: ["Urban Governance", "RERA Law", "Regulatory Policy"],
    source: "Centre for Policy Research",
    postedDate: "2026-11-19",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Policy", "RERA", "Delhi NCR"],
    stipend: "₹20,000 / month",
    eligibility: "Undergraduate / Postgraduate Law Students",
    timingStatus: "Rolling",
    isClosingSoon: false,
  },
  {
    id: "opp-11",
    organization: "SCC Online Research Division",
    position: "Legal Digest & Case Law Research Associate",
    type: "Research Centre",
    location: "Delhi NCR / Remote",
    deadline: "2027-02-28",
    contactPerson: "Editorial Board",
    contactEmail: "editorial@scconline.com",
    applicationRoute: "Email with Case Comment",
    score: 80,
    description:
      "Headnoting and analyzing Supreme Court and High Court judgments for the SCC Online flagship law report.",
    practiceAreas: ["Case Law Analysis", "Statutory Interpretation", "Headnoting"],
    source: "SCC Online",
    postedDate: "2026-11-14",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Research", "Case Law", "Remote"],
    stipend: "₹18,000 / month",
    eligibility: "2nd to 5th Year B.A. LL.B. with strong citation skills",
    timingStatus: "Newly Opened",
    isClosingSoon: false,
  },
  {
    id: "opp-12",
    organization: "LiveLaw Judicial Desk",
    position: "Court Reporting & Legal Journalism Intern",
    type: "Research Centre",
    location: "Delhi NCR",
    deadline: "2027-02-12",
    contactPerson: "Senior Editor",
    contactEmail: "careers@livelaw.in",
    applicationRoute: "Email + Sample Articles",
    score: 78,
    description:
      "Reporting live proceedings from Supreme Court Courtroom 1 and Delhi High Court benches. Drafting immediate judgment summaries.",
    practiceAreas: ["Court Reporting", "Constitutional Benches", "Legal Journalism"],
    source: "LiveLaw",
    postedDate: "2026-11-17",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Reporting", "Courtroom", "Delhi NCR"],
    stipend: "₹15,000 / month",
    eligibility: "3rd to 5th Year Law Students",
    timingStatus: "Newly Opened",
    isClosingSoon: false,
  },
  {
    id: "opp-13",
    organization: "IndusLaw",
    position: "Disputes & Regulatory Intern — Pune Office",
    type: "Tier 2 Firm",
    location: "Pune",
    deadline: "2027-02-25",
    contactPerson: "HR Regional Lead",
    contactEmail: "careers.pune@induslaw.com",
    applicationRoute: "Online Portal",
    score: 82,
    description:
      "Assisting Pune and Western India disputes team with arbitration matters, civil recovery suits, and consumer forum hearings.",
    practiceAreas: ["Civil Litigation", "Arbitration", "Consumer Disputes"],
    source: "LinkedIn Legal",
    postedDate: "2026-11-13",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Pune", "Tier 2", "Litigation"],
    stipend: "₹15,000 / month",
    eligibility: "3rd to 5th Year Law Students",
    timingStatus: "Opening Soon",
    isClosingSoon: false,
  },
  {
    id: "opp-14",
    organization: "Trilegal",
    position: "Dispute Resolution Internship — Delhi Office",
    type: "Tier 1 Firm",
    location: "Delhi NCR",
    deadline: "2027-02-18",
    contactPerson: "Internship Coordinator",
    contactEmail: "internship@trilegal.com",
    applicationRoute: "Career Portal",
    score: 90,
    description:
      "Work alongside leading arbitration practitioners on domestic and international commercial arbitrations under SIAC and ICC rules.",
    practiceAreas: ["Commercial Arbitration", "Construction Disputes", "Company Petitions"],
    source: "Bar & Bench",
    postedDate: "2026-11-15",
    isBookmarked: false,
    status: "Discovered",
    tags: ["Arbitration", "Tier 1", "Delhi NCR"],
    stipend: "₹25,000 / month",
    eligibility: "4th and 5th Year B.A. LL.B. Students",
    timingStatus: "Newly Opened",
    isClosingSoon: false,
  },
  {
    id: "opp-15",
    organization: "UNCRPD India State Report Initiative",
    position: "Senior Student Researcher — Disability Rights Compliance",
    type: "Research Centre",
    location: "Delhi NCR / Hybrid",
    deadline: "2027-01-28",
    contactPerson: "Project Director",
    contactEmail: "uncrpd.research@lawschool.edu.in",
    applicationRoute: "Email Statement of Interest",
    score: 85,
    description:
      "Researching Indian state compliance under the UN Convention on the Rights of Persons with Disabilities, assessing accessibility in courts and statutory provisions.",
    practiceAreas: ["Disability Rights", "Human Rights", "Constitutional Law"],
    source: "UNCRPD & Disability Law Initiative",
    postedDate: "2026-11-20",
    isBookmarked: true,
    status: "Preparing",
    tags: ["Disability Rights", "Human Rights", "Delhi NCR"],
    stipend: "₹20,000 / month + UN Project Credit",
    eligibility: "Law students with interest in human rights jurisprudence",
    timingStatus: "Closing Soon",
    isClosingSoon: true,
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
