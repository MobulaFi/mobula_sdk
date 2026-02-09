export declare const API_KEYS_QUERIES: {
    readonly SELECT_BY_NAME_AND_OWNER: "\n    SELECT key FROM misc.api_keys\n    WHERE name = $1\n    AND (\n      ($2::text IS NULL AND organization_id IS NULL AND customer_id = $3)\n      OR\n      (organization_id = $2)\n    )\n    LIMIT 1\n  ";
    readonly INSERT: "\n    INSERT INTO misc.api_keys\n      (key, customer_id, organization_id, name, total_calls, metrics)\n    VALUES\n      ($1, $2, $3, $4, 0, $5)\n  ";
};
