/// <reference types="vite/client" />
import { Client } from './poseidon-api';

/**
 * API client singleton instance
 */
let apiClientInstance: Client | null = null;

/**
 * Get or create the API client instance with environment variables
 */
export const getApiClient = (): Client => {
    if (!apiClientInstance) {
        const baseUrl = (import.meta.env?.VITE_API_BASE_URL as string) || 'http://localhost:5000';
        apiClientInstance = new Client(baseUrl);
    }
    return apiClientInstance;
};

/**
 * Reset the API client instance (useful for testing or changing base URL)
 */
export const resetApiClient = (): void => {
    apiClientInstance = null;
};

/**
 * Create a new API client with a custom base URL
 */
export const createApiClient = (baseUrl: string): Client => {
    return new Client(baseUrl);
};
