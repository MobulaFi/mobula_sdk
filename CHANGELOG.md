# Changelog

## [0.1.2] - 2026-01-12

### Added
- `fetchWalletPosition(params)` - GET single wallet position by asset
- `fetchWalletPositionBatch(params)` - POST batch endpoint to fetch multiple wallet positions in a single request
  - Optimized with parallel RPC calls using `getMultipleAccounts` for Solana
  - Supports up to 100 positions per request
  - Each response item includes `wallet` field for identification

### Performance
- Batch endpoint uses single SQL query with UNION ALL instead of N queries
- Solana balances fetched via `getMultipleAccounts` (1 RPC call for all tokens)
- Native SOL and SPL token fetches run in parallel

## [0.1.1] - 2026-01-10

### Added
- Initial release with REST and WebSocket client support

