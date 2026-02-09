import { z } from 'zod';
/**
 * Supported fiat currencies for multi-currency price display
 */
export declare const SupportedCurrency: z.ZodEnum<["USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "KRW", "INR", "BRL"]>;
export type SupportedCurrencyType = z.infer<typeof SupportedCurrency>;
/**
 * Default currency when none is specified
 */
export declare const DEFAULT_CURRENCY: SupportedCurrencyType;
/**
 * Schema for currencies query parameter
 * Accepts comma-separated list of currencies, defaults to USD
 * Example: currencies=EUR,USD
 */
export declare const CurrenciesParamSchema: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, ("USD" | "EUR" | "GBP" | "JPY" | "CHF" | "CAD" | "AUD" | "CNY" | "KRW" | "INR" | "BRL")[], string | undefined>;
export type CurrenciesParam = z.infer<typeof CurrenciesParamSchema>;
/**
 * All currencies except USD (currencies that need conversion)
 */
export declare const NON_USD_CURRENCIES: ("EUR" | "GBP" | "JPY" | "CHF" | "CAD" | "AUD" | "CNY" | "KRW" | "INR" | "BRL")[];
