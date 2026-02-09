export type NumericRangeFilter = {
    gte?: number | Date | string;
    lte?: number | Date | string;
};
export type EqualityFilter = {
    equals?: string | number | boolean | null;
};
export type GenericFilter = NumericRangeFilter | EqualityFilter;
export type PoolsStatsFilter = {
    pools?: Record<string, GenericFilter>;
    [key: string]: GenericFilter | Record<string, GenericFilter> | undefined;
};
export type NumericRange = {
    gte?: number;
    lte?: number;
};
export type GenericWhere = {
    AND?: GenericWhere[];
    OR?: GenericWhere[];
    [key: string]: NumericRange | GenericWhere[] | undefined;
};
