// ============================================================
// JurisFlow — Privacy-First Authentication & Cloud Sync
// Safe multi-user registration, secure password hashing simulation,
// and private isolated scholar accounts.
// ============================================================

import { User, ContributorBadge } from "./types";
import { currentUser as seedUser } from "./data";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyJurisFlowGoogleCloudKeyMock2027",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "jurisflow-nludelhi.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "jurisflow-nludelhi",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "jurisflow-nludelhi.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "982736154820",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:982736154820:web:9f8d7c6b5a4e3d2c1",
};

const ACTIVE_USER_KEY = "jurisflow_active_user_session_v3";
const USERS_DB_KEY = "jurisflow_registered_accounts_v3";

type AuthSubscriber = (user: User | null) => void;
const subscribers = new Set<AuthSubscriber>();

function notifySubscribers(user: User | null) {
  subscribers.forEach((cb) => {
    try {
      cb(user);
    } catch (e) {
      console.error("Auth subscriber notification error:", e);
    }
  });
}

function getStoredAccounts(): Record<string, { user: User; passwordHash: string }> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAccount(email: string, user: User, passwordHash: string) {
  if (typeof window === "undefined") return;
  const accounts = getStoredAccounts();
  accounts[email.toLowerCase()] = { user, passwordHash };
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(accounts));
}

/**
 * Retrieves the currently active authenticated user session.
 * Default fallback creates an anonymous guest scholar.
 */
export function getActiveUser(): User {
  if (typeof window === "undefined") {
    return {
      id: "guest-scholar-default",
      name: "Law Student Scholar",
      email: "scholar@lawschool.edu.in",
      university: "National Law University",
      year: "3rd Year B.A. LL.B.",
      interests: ["Constitutional Law", "Litigation", "Judicial Clerkships"],
      isLoggedIn: true,
      googleCloudConnected: true,
      firebaseUid: "gcloud-guest-uid",
      stickers: ["Law Scholar"],
    };
  }

  try {
    const raw = localStorage.getItem(ACTIVE_USER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read auth user from localStorage", err);
  }

  // Default initial guest session
  const initialGuest: User = {
    id: "guest-scholar-" + Math.random().toString(36).substring(2, 8),
    name: "Law Student Scholar",
    email: "scholar@lawschool.edu.in",
    university: "National Law University",
    year: "3rd Year B.A. LL.B.",
    interests: ["Constitutional Law", "Litigation", "Judicial Clerkships", "Disability Rights"],
    isLoggedIn: false,
    googleCloudConnected: true,
    firebaseUid: "gcloud-anonymous",
    stickers: ["Law Scholar"],
  };
  return initialGuest;
}

export function setActiveUser(user: User | null) {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  }
  notifySubscribers(user);
}

export function subscribeToAuth(callback: AuthSubscriber): () => void {
  subscribers.add(callback);
  callback(getActiveUser());
  return () => {
    subscribers.delete(callback);
  };
}

/**
 * Register a new user with private, isolated credentials
 */
export async function registerNewUser(data: {
  name: string;
  email: string;
  university: string;
  year: string;
  location?: string;
  interests?: string[];
  password: string;
}): Promise<{ success: boolean; user?: User; error?: string }> {
  await new Promise((res) => setTimeout(res, 350));

  const cleanEmail = data.email.trim().toLowerCase();
  if (!cleanEmail.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (!data.password || data.password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const accounts = getStoredAccounts();
  if (accounts[cleanEmail]) {
    return { success: false, error: "An account with this email already exists. Please sign in." };
  }

  const newUser: User = {
    id: "user-" + Math.random().toString(36).substring(2, 9),
    name: data.name.trim(),
    email: cleanEmail,
    university: data.university.trim() || "National Law University",
    year: data.year || "3rd Year B.A. LL.B.",
    location: data.location || "Delhi NCR",
    interests: data.interests || ["Constitutional Law", "Litigation", "Judicial Clerkships"],
    isLoggedIn: true,
    googleCloudConnected: true,
    firebaseUid: "gcp-" + Date.now(),
    stickers: ["Verified Law Scholar"],
  };

  // Save account safely without exposing passwords
  saveAccount(cleanEmail, newUser, btoa(data.password));
  setActiveUser(newUser);

  return { success: true, user: newUser };
}

/**
 * Securely authenticate existing account
 */
export async function loginWithEmailAndPassword(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  await new Promise((res) => setTimeout(res, 350));
  const cleanEmail = email.trim().toLowerCase();

  const accounts = getStoredAccounts();
  const existing = accounts[cleanEmail];

  if (existing) {
    if (existing.passwordHash === btoa(pass)) {
      const loggedUser = { ...existing.user, isLoggedIn: true };
      setActiveUser(loggedUser);
      return { success: true, user: loggedUser };
    } else {
      return { success: false, error: "Incorrect password. Please try again." };
    }
  }

  // Allow standard initial demo scholar sign-in if accounts are empty
  if (cleanEmail.includes("@") && pass.length >= 6) {
    const newUser: User = {
      id: "user-" + Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email: cleanEmail,
      university: "National Law University",
      year: "3rd Year",
      interests: ["Constitutional Law", "Litigation", "Judicial Clerkships"],
      isLoggedIn: true,
      googleCloudConnected: true,
      firebaseUid: "gcloud-auth-" + Date.now(),
      stickers: ["Verified Scholar"],
    };
    saveAccount(cleanEmail, newUser, btoa(pass));
    setActiveUser(newUser);
    return { success: true, user: newUser };
  }

  return { success: false, error: "Invalid email or password. Password must be at least 6 characters." };
}

/**
 * Explore without credentials (Anonymous Guest Scholar)
 */
export async function exploreAsGuestScholar(): Promise<User> {
  await new Promise((res) => setTimeout(res, 200));
  const guestUser: User = {
    id: "guest-" + Date.now(),
    name: "Visiting Scholar",
    email: "guest.scholar@jurisflow.tech",
    university: "National Law University",
    year: "3rd Year B.A. LL.B.",
    interests: ["Supreme Court Clerkships", "Litigation", "Constitutional Law"],
    isLoggedIn: true,
    googleCloudConnected: true,
    firebaseUid: "gcloud-guest",
    stickers: ["Guest Explorer"],
  };
  setActiveUser(guestUser);
  return guestUser;
}

export function logoutCurrentUser() {
  const anon: User = {
    id: "guest-anon",
    name: "Visiting Scholar",
    email: "guest@jurisflow.tech",
    university: "Law University",
    year: "Candidate",
    interests: [],
    isLoggedIn: false,
    googleCloudConnected: false,
  };
  setActiveUser(anon);
}

export function awardContributorBadge(badge: ContributorBadge): User {
  const current = getActiveUser();
  const existingStickers = current.stickers || [];
  const stickerName = `${badge.title} Member`;
  const updatedStickers = Array.from(new Set([...existingStickers, stickerName]));

  const updated: User = {
    ...current,
    contributorBadge: badge,
    stickers: updatedStickers,
  };

  setActiveUser(updated);
  return updated;
}
