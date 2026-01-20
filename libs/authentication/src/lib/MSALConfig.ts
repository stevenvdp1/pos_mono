import { type Configuration, LogLevel, type PopupRequest } from "@azure/msal-browser";

/**
 * Configuration options for MSALConfig
 */
export interface MSALConfigOptions {
    clientId: string;
    tenantId: string;
    redirectUri?: string;
    postLogoutRedirectUri?: string;
    cacheLocation?: "sessionStorage" | "localStorage";
    storeAuthStateInCookie?: boolean;
    logLevel?: LogLevel;
    loginScopes?: string[];
    apiScopes?: string[];
}

/**
 * MSAL Configuration class for Microsoft Entra ID authentication
 * Provides a reusable configuration that can be instantiated with different settings across projects
 */
export class MSALConfig {
    private clientId: string;
    private tenantId: string;
    private redirectUri: string;
    private postLogoutRedirectUri: string;
    private cacheLocation: "sessionStorage" | "localStorage";
    private logLevel: LogLevel;
    private loginScopes: string[];
    private apiScopes: string[];

    constructor(options: MSALConfigOptions) {
        this.clientId = options.clientId;
        this.tenantId = options.tenantId;
        this.redirectUri = options.redirectUri ?? '';
        this.postLogoutRedirectUri = options.postLogoutRedirectUri || this.redirectUri;
        this.cacheLocation = options.cacheLocation || "sessionStorage";
        this.logLevel = options.logLevel ?? LogLevel.Warning;
        this.loginScopes = options.loginScopes || [];
        this.apiScopes = options.apiScopes || [];
    }

    /**
     * Get the MSAL browser configuration object
     */
    getConfiguration(): Configuration {
        console.log('Generating MSAL Configuration with clientId:', this.clientId);
        return {
            auth: {
                clientId: this.clientId,
                authority: `https://login.microsoftonline.com/${this.tenantId}`,
                redirectUri: this.redirectUri,
                postLogoutRedirectUri: this.postLogoutRedirectUri,
                navigateToLoginRequestUrl: true,
            },
            cache: {
                cacheLocation: this.cacheLocation,
                storeAuthStateInCookie: false,
            },
            system: {
                loggerOptions: {
                    loggerCallback: (level, message, containsPii) => {
                        if (containsPii) return;
                        switch (level) {
                            case LogLevel.Error:
                                console.error(message);
                                break;
                            case LogLevel.Warning:
                                console.warn(message);
                                break;
                            case LogLevel.Info:
                                console.info(message);
                                break;
                            case LogLevel.Verbose:
                                console.debug(message);
                                break;
                        }
                    },
                    logLevel: this.logLevel,
                },
            },
        };
    }

    /**
     * Get the login request configuration
     */
    getLoginRequest(): PopupRequest {
        return {
            scopes: this.loginScopes,
        };
    }

    /**
     * Get the API request configuration
     */
    getApiRequest(): PopupRequest {
        return {
            scopes: this.apiScopes,
        };
    }

    /**
     * Update login scopes
     */
    setLoginScopes(scopes: string[]): void {
        this.loginScopes = scopes;
    }

    /**
     * Update API scopes
     */
    setApiScopes(scopes: string[]): void {
        this.apiScopes = scopes;
    }

    /**
     * Get current login scopes
     */
    getLoginScopes(): string[] {
        return [...this.loginScopes];
    }

    /**
     * Get current API scopes
     */
    getApiScopes(): string[] {
        return [...this.apiScopes];
    }
}

/**
 * Default MSAL configuration instance
 * This is a placeholder - create your own MSALConfig instance in your app with your actual values
 */
export const defaultMSALConfig = new MSALConfig({
    clientId: "YOUR_CLIENT_ID",
    tenantId: "YOUR_TENANT_ID",
    loginScopes: [],
    apiScopes: [],
});

/**
 * Backwards compatibility exports
 */
export const msalConfig = defaultMSALConfig.getConfiguration();
export const loginRequest = defaultMSALConfig.getLoginRequest();
export const apiRequest = defaultMSALConfig.getApiRequest();
