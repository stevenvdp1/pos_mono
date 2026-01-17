import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { msalInstance } from '@auth/index'
import { apiRequest } from '@config/authConfig'

const api = (baseURL: string) => {
    const instance = axios.create({
        baseURL: `${baseURL}/api`,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor for auth and tenant context
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Get the active account
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                try {
                    // Try to acquire token silently
                    const response = await msalInstance.acquireTokenSilent({
                        scopes: apiRequest.scopes,
                        account: accounts[0],
                    });
                    
                    // Add the token to the Authorization header
                    config.headers.Authorization = `Bearer ${response.accessToken}`;
                } catch (error) {
                    console.error('Failed to acquire token silently:', error);
                    // Token acquisition failed - the user may need to re-authenticate
                    // This will be handled by the AuthProvider
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh and error handling
    instance.interceptors.response.use(
        (response: AxiosResponse) => response.data,
        async (error: AxiosError) => {
            // Handle 401 Unauthorized - user may need to re-authenticate
            if (error.response?.status === 401) {
                console.warn('Unauthorized request - user may need to re-authenticate');
            }
            return Promise.reject(error);
        }
    );

    return instance;
};
export default api;