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

  showSymbol?: boolean; // Whether to include any currency symbol (default: true)

  /* Minimum fraction digits for normal numbers (default: 2) */
  minFractionDigits?: number;
  /* Maximum fraction digits for normal numbers (default: 4) */
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
export const formatCryptoPrice = (
  price: number | string | null | undefined,
  options: FormatPriceOptions = {},
): string => {
  const {
    currency = 'USD',
    symbolPosition = 'prefix',
    locale = 'en-US',
    significantDigits = 3,
    showSymbol = true,
    minFractionDigits = 2,
    maxFractionDigits = 4,
  } = options;

  // Handle invalid inputs
  if (price === null || price === undefined) {
    return showSymbol ? (symbolPosition === 'prefix' ? '$--' : `-- ${currency}`) : '--';
  }

  // Parse string inputs (strip out symbols, commas, etc.)
  let numPrice = price;
  if (typeof price === 'string') {
    const cleanedPrice = price.replace(/[$,\s]/g, '');
    numPrice = Number.parseFloat(cleanedPrice);
  }

  // Handle invalid numbers
  if (Number.isNaN(numPrice as number) || !Number.isFinite(numPrice as number)) {
    return showSymbol ? (symbolPosition === 'prefix' ? '$--' : `-- ${currency}`) : '--';
  }

  // Handle zero
  if (numPrice === 0) {
    const base = (0).toLocaleString(locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    });
    return showSymbol ? (symbolPosition === 'prefix' ? `$${base}` : `${base} ${currency}`) : base;
  }

  const absPrice = Math.abs(numPrice as number);
  const sign = (numPrice as number) < 0 ? '-' : '';
  let formattedValue: string;

  // Trillion+
  if (absPrice >= 1_000_000_000_000) {
    const v = absPrice / 1_000_000_000_000;
    formattedValue = `${v.toFixed(2)}T`;
  }
  // Billion+
  else if (absPrice >= 1_000_000_000) {
    const v = absPrice / 1_000_000_000;
    formattedValue = `${v.toFixed(2)}B`;
  }
  // Million+
  else if (absPrice >= 1_000_000) {
    const v = absPrice / 1_000_000;
    formattedValue = `${v.toFixed(2)}M`;
  }
  // Thousand+
  else if (absPrice >= 1000) {
    const v = absPrice / 1000;
    formattedValue = `${v.toFixed(2)}K`;
  }
  // Very small numbers
  else if (absPrice < 0.01) {
    formattedValue = formatSmallNumberWithSubscript(absPrice, Math.min(significantDigits, maxFractionDigits));
  }
  // All other numbers
  else {
    formattedValue = absPrice.toLocaleString(locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    });
  }

  // No symbol? just return the formatted number
  if (!showSymbol) return `${sign}${formattedValue}`;

  // Apply symbol
  const prefix = symbolPosition === 'prefix' ? '$' : '';
  const suffix = symbolPosition === 'suffix' ? ` ${currency}` : '';
  return `${sign}${prefix}${formattedValue}${suffix}`;
};

/**
 * Format very small numbers with subscript notation
 * @internal
 */
const formatSmallNumberWithSubscript = (price: number, sigFigs: number): string => {
  if (price === 0) return '0.00';

  // Handle extremely small numbers that might cause precision issues
  if (price < 1e-20) {
    return price.toExponential(sigFigs - 1);
  }

  const priceStr = price.toFixed(30);
  const match = priceStr.match(/^0\.(0+)([1-9][\d]*)/);

  if (!match) {
    return price.toExponential(sigFigs - 1);
  }

  const zeros = match[1]!;
  const digits = match[2]!;
  const zeroCount = zeros.length;

  // Use scientific notation for extremely small numbers
  if (zeroCount > 15) {
    return price.toExponential(sigFigs - 1);
  }

  let significantPart = digits.slice(0, sigFigs);
  significantPart = significantPart.replace(/0+$/, '') || '0';

  return `0.0${toSubscript(zeroCount)}${significantPart}`;
};

/**
 * Convert number to subscript characters
 * @internal
 */
const toSubscript = (num: number): string => {
  const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  return num
    .toString()
    .split('')
    .map((digit) => subscripts[Number.parseInt(digit, 10)] || digit)
    .join('');
};

/**
 * Helper to format USD prices (prefix style)
 */
export const formatUSD = (price: number | string | null | undefined): string => {
  return formatCryptoPrice(price, { symbolPosition: 'prefix' });
};

/**
 * Helper to format token prices (suffix style)
 */
export const formatTokenPrice = (price: number | string | null | undefined, symbol: string): string => {
  return formatCryptoPrice(price, {
    currency: symbol,
    symbolPosition: 'suffix',
  });
};

/**
 * Helper to format with high precision
 */
export const formatPrecisePrice = (
  price: number | string | null | undefined,
  significantDigits: number = 5,
): string => {
  return formatCryptoPrice(price, { significantDigits });
};

/**
 * Helper to format pure numeric values without any symbol or currency
 * Keeps all intelligent formatting (K/M/B, small number handling, etc.)
 */
export const formatPureNumber = (
  price: number | string | null | undefined,
  options: Omit<FormatPriceOptions, 'showSymbol' | 'symbolPosition' | 'currency'> = {},
): string => {
  return formatCryptoPrice(price, {
    ...options,
    showSymbol: false,
  });
};

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
export const formatPercentage = (
  value: number | string | null | undefined,
  options: FormatPercentageOptions = {},
): string => {
  const { locale = 'en-US', minFractionDigits = 2, maxFractionDigits = 2, fallback = '--%' } = options;

  // Validate decimal options
  const clampedMinFractionDigits = Math.max(0, Math.min(20, minFractionDigits));
  const clampedMaxFractionDigits = Math.max(0, Math.min(20, maxFractionDigits));
  const toLocaleStringOptions = {
    minimumFractionDigits: clampedMinFractionDigits,
    maximumFractionDigits: Math.max(clampedMinFractionDigits, clampedMaxFractionDigits),
  };

  // Handle invalid inputs
  if (value === null || value === undefined) {
    return fallback;
  }

  // Parse string inputs
  let numValue: number;
  if (typeof value === 'string') {
    const cleanedValue = value.replace(/[$,%\s]/g, '');
    numValue = Number.parseFloat(cleanedValue);
  } else {
    numValue = value;
  }

  // Handle invalid numbers
  if (Number.isNaN(numValue) || !Number.isFinite(numValue)) {
    return fallback;
  }

  // Format the number
  const absValue = Math.abs(numValue);
  const sign = numValue < 0 ? '-' : '';
  let formattedValue: string;

  // Trillion+
  if (absValue >= 1_000_000_000_000) {
    const v = absValue / 1_000_000_000_000;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}T`;
  }
  // Billion+
  else if (absValue >= 1_000_000_000) {
    const v = absValue / 1_000_000_000;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}B`;
  }
  // Million+
  else if (absValue >= 1_000_000) {
    const v = absValue / 1_000_000;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}M`;
  }
  // Thousand+
  else if (absValue >= 1000) {
    const v = absValue / 1000;
    formattedValue = `${v.toLocaleString(locale, toLocaleStringOptions)}K`;
  }
  // Other numbers
  else {
    formattedValue = absValue.toLocaleString(locale, toLocaleStringOptions);
  }

  return `${sign}${formattedValue}%`;
};
