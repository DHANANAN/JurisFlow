// ============================================================
// JurisFlow — Type Definitions
// ============================================================

export type OpportunityType =
  | "Supreme Court Chambers"
  | "Supreme Court Clerkship"
  | "High Court Chambers"
  | "Judicial Internship"
  | "Tier 1 Firm"
  | "Tier 2 Firm"
  | "Boutique Litigation"
  | "Research Centre"
  | "Think Tank"
  | "Policy Fellowship"
  | "NGO"
  | "Corporate Counsel";

export type ApplicationStatus =
  | "Discovered"
  | "Interested"
  | "Preparing"
  | "Applied"
  | "Follow-Up"
  | "Interview"
  | "Offer"
  | "Closed";

export type CourtType =
  | "Supreme Court"
  | "Delhi High Court"
  | "Telangana High Court"
  | "Bombay High Court"
  | "Karnataka High Court"
  | "Madras High Court"
  | "Calcutta High Court"
  | "Other High Courts";

export type EmailType =
  | "Application"
  | "Networking"
  | "Follow-Up"
  | "Thank You";

export type RelationshipStrength =
  | "Strong"
  | "Medium"
  | "Weak"
  | "New";

export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  year: string;
  interests: string[];
  avatar?: string;
  bio?: string;
  location?: string;
  linkedin?: string;
}

export interface Opportunity {
  id: string;
  organization: string;
  position: string;
  type: OpportunityType;
  location: string;
  deadline: string;
  contactPerson: string;
  contactEmail: string;
  applicationRoute: string;
  score: number;
  description: string;
  practiceAreas: string[];
  source: string;
  postedDate: string;
  isBookmarked: boolean;
  status: ApplicationStatus;
  tags: string[];
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunity: Opportunity;
  status: ApplicationStatus;
  notes: string;
  deadline: string;
  cvVersion: string;
  coverLetter: string;
  writingSample: string;
  communications: Communication[];
  attachments: string[];
  appliedDate?: string;
  lastUpdated: string;
}

export interface Communication {
  id: string;
  type: EmailType;
  subject: string;
  body: string;
  sentDate: string;
  recipient: string;
}

export interface Judge {
  id: string;
  name: string;
  court: CourtType;
  chamber: string;
  practiceAreas: string[];
  clerkshipAvailable: boolean;
  internshipAvailable: boolean;
  contactEmail?: string;
  notes: string;
  applicationDeadline?: string;
  status: "Open" | "Closed" | "Rolling";
}

export interface Contact {
  id: string;
  name: string;
  position: string;
  organization: string;
  email: string;
  linkedin?: string;
  phone?: string;
  notes: string;
  relationshipStrength: RelationshipStrength;
  lastContactDate: string;
  tags: string[];
  avatar?: string;
}

export interface Prompt {
  id: string;
  title: string;
  category: string;
  content: string;
  variables: string[];
  lastUsed?: string;
  usageCount: number;
  isFavorite: boolean;
}

export interface AnalyticsData {
  applicationsSent: number;
  responsesReceived: number;
  interviews: number;
  offers: number;
  conversionRate: number;
  monthlyTrends: MonthlyTrend[];
  sourceBreakdown: SourceBreakdown[];
  statusDistribution: StatusDistribution[];
}

export interface MonthlyTrend {
  month: string;
  applications: number;
  responses: number;
  interviews: number;
  offers: number;
}

export interface SourceBreakdown {
  source: string;
  count: number;
  percentage: number;
}

export interface StatusDistribution {
  status: ApplicationStatus;
  count: number;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface Activity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  icon: string;
}
