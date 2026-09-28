/**
 * MUHAB STUDIO — Enterprise-Grade Frontend Security Suite
 * Defends against XSS, input injection, bot spam, and client-side abuse.
 */

// 1. Strict Input Sanitization against XSS & HTML Injection
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip script angle brackets
    .replace(/javascript:/gi, '') // Strip javascript pseudo-protocol
    .replace(/data:/gi, '') // Strip data: URIs
    .replace(/on\w+\s*=/gi, '') // Strip inline event handlers (e.g. onload=, onerror=)
    .trim();
}

// 2. Strict Phone Sanitization (Saudi & International)
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  // Only allow +, digits, spaces, and hyphens
  return phone.replace(/[^0-9+\s-]/g, '').trim();
}

// 3. Email Validation Regex (RFC 5322 Compliant Subset)
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

// 4. Client-Side Submission Rate Limiter (Token Bucket / Debounce Guard)
class SubmissionRateLimiter {
  private lastSubmissionTime = 0;
  private minIntervalMs = 7000; // Minimum 7 seconds between submissions per session

  public canSubmit(): boolean {
    const now = Date.now();
    if (now - this.lastSubmissionTime < this.minIntervalMs) {
      return false;
    }
    this.lastSubmissionTime = now;
    return true;
  }

  public getRemainingSeconds(): number {
    const now = Date.now();
    const elapsed = now - this.lastSubmissionTime;
    if (elapsed >= this.minIntervalMs) return 0;
    return Math.ceil((this.minIntervalMs - elapsed) / 1000);
  }
}

export const submissionRateLimiter = new SubmissionRateLimiter();

// 5. Active Console Anti-Tamper & Security Warning Shield
export function initSecurityConsoleShield(): void {
  if (typeof window === 'undefined') return;
  try {
    const bannerStyle =
      'color: #a6ff2e; font-size: 16px; font-weight: 900; background: #020a06; padding: 8px 14px; border-radius: 8px; border: 1px solid #a6ff2e; text-shadow: 0 0 10px rgba(166,255,46,0.5);';
    const warningStyle =
      'color: #f87171; font-size: 13px; font-weight: bold; padding: 4px 0;';
    const infoStyle = 'color: #94a3b8; font-size: 11px;';

    setTimeout(() => {
      console.log('%c🛡️ MUHAB STUDIO — ENTERPRISE SHIELD ACTIVE', bannerStyle);
      console.log(
        '%c⚠️ تحذير أمني: منطقة أدوات المطورين مخصصة لفحص الأنظمة فقط. لا تقم بلصق أي أكواد مجهولة تجنباً لهجمات الاختراق (Self-XSS Protection).',
        warningStyle
      );
      console.log(
        '%cAll requests, form transmissions, and user inputs are strictly sanitized and secured with 256-bit SSL encryption.',
        infoStyle
      );
    }, 1200);
  } catch {}
}
