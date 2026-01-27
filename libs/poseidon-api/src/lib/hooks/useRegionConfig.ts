import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '../client';
import { defaultQuerySettings } from '.';

const client = getApiClient();

export const regionConfigQueryKeys = {
    all: ['regionConfigs'] as const,
    detail: (id: string) => ['regionConfigs', id] as const,
};

export const useRegionConfigs = () => {
    return useQuery({
        queryKey: regionConfigQueryKeys.all,
        queryFn: () => client.regionConfigAll(),
        ...defaultQuerySettings
    });
};
