import { useQuery } from "@tanstack/react-query";
import { getApiClient } from "../client";
import { defaultQuerySettings } from ".";

const client = getApiClient();

export const useJobs = () => {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: () => client.jobAll(),
        ...defaultQuerySettings
    })
}