/**
 * stringUtils.ts
 *
 * Provides universal string formatting helpers for SDKs.
 * Includes:
 *  - truncate() — trims long strings intelligently (end or middle)
 *
 * Handles:
 *  - undefined / null / non-string inputs (auto conversion)
 *  - Unicode and emoji slicing (via Array.from)
 *  - Safe defaults and validation
 *  - Returns "N/A" for invalid or empty values
 */

export type TruncateMode = 'end' | 'middle';

export interface TruncateOptions {
  /** Truncation style. Default: 'end' */
  mode?: TruncateMode;

  /** Number of visible characters (default: 50 for end, 4 for middle) */
  length?: number;

  /** Custom ellipsis text (default: '...') */
  ellipsis?: string;

  /** Placeholder for invalid or missing values (default: 'N/A') */
  fallback?: string;
}

/**
 * Safely converts any value to a displayable string.
 * Returns '' for nullish, undefined, or invalid inputs.
 */
export function safeToString(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'bigint' || typeof value === 'boolean') {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
}

/**
 * Universal truncate function — supports end and middle truncation.
 *
 * Examples:
 *  truncate("0x123456789abcdef", { mode: "middle", length: 4 }) → "0x12...cdef"
 *  truncate(1234567890, { mode: "end", length: 5 }) → "12345..."
 *  truncate({ key: "value" }, { mode: "middle", length: 2 }) → '{"k...ue"}'
 *  truncate(undefined) → "N/A"
 */
export function truncate(input?: unknown, options: TruncateOptions = {}): string {
  // 1️⃣ Convert to safe string
  const str = safeToString(input).trim();
  const fallback = options.fallback ?? 'N/A';
  if (!str) return fallback;

  // 2️⃣ Extract options
  const { mode = 'end', length, ellipsis = '...' } = options;

  // 3️⃣ Unicode-safe slicing
  const chars = Array.from(str);
  const total = chars.length;

  if (total === 0) return fallback;

  // 4️⃣ Early return for short strings
  if (mode === 'end' && total <= (length ?? 50)) return str;
  if (mode === 'middle' && total <= (length ?? 4) * 2 + ellipsis.length) return str;

  // 5️⃣ Apply truncation
  if (mode === 'middle') {
    const visible = Math.max(1, length ?? 4);
    const start = chars.slice(0, visible).join('');
    const end = chars.slice(-visible).join('');
    return `${start}${ellipsis}${end}`;
  }

  // Default: end truncation
  const maxLength = Math.max(1, length ?? 50);
  const visible = chars.slice(0, maxLength).join('');
  return `${visible}${ellipsis}`;
}
