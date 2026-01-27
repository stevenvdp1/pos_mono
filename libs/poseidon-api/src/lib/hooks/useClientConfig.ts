import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '../client';
import { defaultQuerySettings } from '.';


const client = getApiClient();

/**
 * Query keys for client config queries
 */
export const clientConfigQueryKeys = {
    all: ['clientConfigs'] as const,
    detail: (id: string) => ['clientConfigs', id] as const,
};

/**
 * Hook to fetch all client configs
 */
export const useClientConfigs = () => {
    return useQuery({
        queryKey: clientConfigQueryKeys.all,
        queryFn: () => client.clientConfigAll(),
        ...defaultQuerySettings
    });
};
