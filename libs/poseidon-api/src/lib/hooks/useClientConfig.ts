import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '../client';

/**
 * Query keys for client config queries
 */
export const clientConfigQueryKeys = {
    all: ['clientConfigs'] as const,
    detail: (id: string) => ['clientConfigs', id] as const,
};

/**
 * Default query settings
 */
const defaultQuerySettings = {
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
};

/**
 * Hook to fetch all client configs
 */
export const useClientConfigs = () => {
    const client = getApiClient();
    
    return useQuery({
        queryKey: clientConfigQueryKeys.all,
        queryFn: () => client.clientConfigAll(),
        ...defaultQuerySettings
    });
};
