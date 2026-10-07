/**
 * Security and privacy utilities for DreamTech static frontend.
 * Protects against bot scraping, spam floods, XSS payloads, and sensitive data leaks.
 */

// Obfuscated recipient email representation (split & base64 encoded)
// Prevents plain-text email harvesters and scrapers from indexing the email in public bundles.
const OBFUSCATED_RECIPIENT_PARTS = ['Z2FicmllbHF2YS4x', 'MEBnbWFpbC5jb20='];

export function getSecureRecipientEmail(): string {
  // If defined via env at build time, prioritize it, otherwise safely decode
  const envEmail = import.meta.env.VITE_CONTACT_EMAIL;
  if (typeof envEmail === 'string' && envEmail.includes('@')) {
    return envEmail.trim();
  }
  try {
    const combined = OBFUSCATED_RECIPIENT_PARTS.join('');
    return atob(combined);
  } catch {
    return '';
  }
}

/**
 * Masks an email for safe display on public/shared screens without leaking user identity.
 * Example: 'alex.valenzuela@empresa.com' -> 'a***a@e***.com'
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '••••••••';
  const [local, domain] = email.split('@');
  if (!domain) return '••••••••';

  const maskedLocal =
    local.length <= 2
      ? `${local[0] || '*'}***`
      : `${local[0]}***${local[local.length - 1]}`;

  const domainParts = domain.split('.');
  const maskedDomain = domainParts
    .map((part, idx) => {
      if (idx === domainParts.length - 1) return part; // Keep TLD (e.g., .com)
      return part.length <= 2 ? `${part[0]}*` : `${part[0]}***`;
    })
    .join('.');

  return `${maskedLocal}@${maskedDomain}`;
}

/**
 * Masks a phone number for confidentiality
 * Example: '+52 55 1234 5678' -> '+52 •••• 5678'
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 5) return '••••••••';
  const clean = phone.trim();
  const last4 = clean.slice(-4);
  return `•••• •••• ${last4}`;
}

/**
 * Sanitizes user input to prevent XSS and malformed payloads
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip potential HTML tags
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Rate Limiting Guard
 * Prevents rapid accidental double clicks without blocking legitimate users testing forms.
 * Stores anonymous submission timestamps in localStorage.
 */
const RATE_LIMIT_STORAGE_KEY = '_dt_sec_rate_ts';
const COOLDOWN_SECONDS = 5; // Low cooldown to avoid accidental double-clicks without frustrating users
const MAX_SUBMISSIONS_PER_HOUR = 30; // Generous threshold for testing and normal browsing
const HOUR_IN_MS = 60 * 60 * 1000;

export interface RateLimitResult {
  allowed: boolean;
  remainingSeconds: number;
  reason?: string;
}

export function checkRateLimit(): RateLimitResult {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (!raw) {
      return { allowed: true, remainingSeconds: 0 };
    }

    const timestamps: number[] = JSON.parse(raw);
    const now = Date.now();

    // Clean timestamps older than 1 hour
    const recent = timestamps.filter((ts) => now - ts < HOUR_IN_MS);

    // Check consecutive cooldown (prevent rapid double click)
    const lastSubmission = recent[recent.length - 1];
    if (lastSubmission) {
      const elapsedSeconds = Math.floor((now - lastSubmission) / 1000);
      if (elapsedSeconds < COOLDOWN_SECONDS) {
        const remaining = COOLDOWN_SECONDS - elapsedSeconds;
        return {
          allowed: false,
          remainingSeconds: remaining,
          reason: `Por favor espera ${remaining} segundo(s) antes de enviar otra solicitud.`,
        };
      }
    }

    // Check hourly threshold
    if (recent.length >= MAX_SUBMISSIONS_PER_HOUR) {
      return {
        allowed: false,
        remainingSeconds: 60,
        reason: `Límite de solicitudes alcanzado. Por favor intenta de nuevo en unos minutos.`,
      };
    }

    return { allowed: true, remainingSeconds: 0 };
  } catch {
    return { allowed: true, remainingSeconds: 0 };
  }
}

export function recordSuccessfulSubmission(): void {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const now = Date.now();
    let timestamps: number[] = [];
    if (raw) {
      timestamps = JSON.parse(raw);
    }
    const recent = timestamps.filter((ts) => now - ts < HOUR_IN_MS);
    recent.push(now);
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(recent));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Resets the rate limit in local storage (useful if user was previously rate-limited during tests)
 */
export function resetRateLimit(): void {
  try {
    localStorage.removeItem(RATE_LIMIT_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
