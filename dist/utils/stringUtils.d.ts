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
export declare function safeToString(value: unknown): string;
/**
 * Universal truncate function — supports end and middle truncation.
 *
 * Examples:
 *  truncate("0x123456789abcdef", { mode: "middle", length: 4 }) → "0x12...cdef"
 *  truncate(1234567890, { mode: "end", length: 5 }) → "12345..."
 *  truncate({ key: "value" }, { mode: "middle", length: 2 }) → '{"k...ue"}'
 *  truncate(undefined) → "N/A"
 */
export declare function truncate(input?: unknown, options?: TruncateOptions): string;
