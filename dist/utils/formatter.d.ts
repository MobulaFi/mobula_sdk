/**
 * Options for formatting cryptocurrency prices
 */
export interface FormatPriceOptions {
    /** Currency symbol or name (default: 'USD') */
    currency?: string;
    /** Position of currency symbol: 'prefix' for $1.23, 'suffix' for 1.23 USD */
    symbolPosition?: 'prefix' | 'suffix';
    /** Locale for number formatting (default: 'en-US') */
    locale?: string;
    /** Number of significant digits for very small numbers (default: 3) */
    significantDigits?: number;
    showSymbol?: boolean;
    minFractionDigits?: number;
    maxFractionDigits?: number;
}
/**
 * Format cryptocurrency prices with intelligent notation
 * Handles all ranges from tiny shitcoins to multi-trillion market caps
 *
 * @example
 * ```ts
 * formatCryptoPrice(0.00046738)  // "$0.0₃467"
 * formatCryptoPrice(115000)      // "$115K"
 * formatCryptoPrice(0.025, { currency: 'ETH', symbolPosition: 'suffix' }) // "0.025 ETH"
 * ```
 */
export declare const formatCryptoPrice: (price: number | string | null | undefined, options?: FormatPriceOptions) => string;
/**
 * Helper to format USD prices (prefix style)
 */
export declare const formatUSD: (price: number | string | null | undefined) => string;
/**
 * Helper to format token prices (suffix style)
 */
export declare const formatTokenPrice: (price: number | string | null | undefined, symbol: string) => string;
/**
 * Helper to format with high precision
 */
export declare const formatPrecisePrice: (price: number | string | null | undefined, significantDigits?: number) => string;
/**
 * Helper to format pure numeric values without any symbol or currency
 * Keeps all intelligent formatting (K/M/B, small number handling, etc.)
 */
export declare const formatPureNumber: (price: number | string | null | undefined, options?: Omit<FormatPriceOptions, "showSymbol" | "symbolPosition" | "currency">) => string;
/**
 * Options for formatting percentage values
 */
/**
 * Options for formatting percentage values
 */
export interface FormatPercentageOptions {
    /** Locale for number formatting (default: 'en-US') */
    locale?: string;
    /** Minimum fraction digits for the number (default: 2) */
    minFractionDigits?: number;
    /** Maximum fraction digits for the number (default: 2) */
    maxFractionDigits?: number;
    /** Fallback value for invalid inputs (default: '--%') */
    fallback?: string;
}
/**
 * Format numbers as percentages with a % suffix, supporting K/M/B/T suffixes for large values
 * Handles positive and negative numbers with consistent decimal places
 *
 * @example
 * ```ts
 * formatPercentage(1.87505641, { minFractionDigits: 1, maxFractionDigits: 2 }) // "1.88%"
 * formatPercentage(-0.772378, { minFractionDigits: 1, maxFractionDigits: 2 }) // "-0.77%"
 * formatPercentage(1234567, { minFractionDigits: 1, maxFractionDigits: 2 }) // "1.23M%"
 * formatPercentage(null, { fallback: 'N/A' }) // "N/A"
 * ```
 */
export declare const formatPercentage: (value: number | string | null | undefined, options?: FormatPercentageOptions) => string;
