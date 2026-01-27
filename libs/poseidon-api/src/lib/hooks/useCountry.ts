import { useQuery } from '@tanstack/react-query';
import { getApiClient } from '../client';
import { defaultQuerySettings } from '.';

const client = getApiClient();


export const countryQueryKeys = {
    all: ['country'] as const,
};

export const useCountries = () => {
    return useQuery({
        queryKey: countryQueryKeys.all,
        queryFn: () => client.country(),
        ...defaultQuerySettings
    });
};
