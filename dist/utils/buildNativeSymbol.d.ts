/**
 * Returns the native symbol for the provided chain ID.
 * If the chain ID is not found, returns an empty string.
 *
 * @param chainId - The unique chain identifier (e.g., "evm:1", "evm:56")
 * @returns The native token symbol or an empty string if unsupported.
 */
export declare function buildNativeSymbol(chainId: string): string;
