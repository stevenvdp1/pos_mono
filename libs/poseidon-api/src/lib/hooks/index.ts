export const defaultQuerySettings = {
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
};

export * from './useClientConfig';
export * from './useJob';
export * from './useCountry';
export * from './useRegionConfig';