import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { useState, useEffect, useMemo } from "react";
import { LoginRedirect } from "./LoginRedirect";
import { MSALConfig, defaultMSALConfig } from "./MSALConfig";

export interface AuthProviderProps {
    children: React.ReactNode;
    msalConfig?: MSALConfig;
    customLoadingComponent?: React.ReactNode;
}

// Cache for MSAL instances to prevent re-initialization
const msalInstanceCache = new Map<string, PublicClientApplication>();

const getMsalInstance = (msalConfig: MSALConfig): PublicClientApplication => {
    const config = msalConfig.getConfiguration();
    const key = config.auth.clientId;
    
    if (!msalInstanceCache.has(key)) {
        const instance = new PublicClientApplication(config);
        msalInstanceCache.set(key, instance);
    }
    
    return msalInstanceCache.get(key)!;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
    msalConfig = defaultMSALConfig,
    customLoadingComponent
}) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const msalInstance = getMsalInstance(msalConfig);
    
    // Memoize loginRequest to prevent unnecessary re-renders
    const loginRequest = useMemo(() => msalConfig.getLoginRequest(), [msalConfig]);

    useEffect(() => {
        msalInstance.initialize().then(() => {
            return msalInstance.handleRedirectPromise();
        }).then(() => {
            setIsInitialized(true);
        }).catch((error) => {
            console.error("MSAL initialization error:", error);
            setIsInitialized(true); // Still set to true to avoid infinite loading
        });
    }, [msalInstance]);

    if (!isInitialized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Initializing authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <MsalProvider instance={msalInstance}>
            <AuthenticatedTemplate>
                {children}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <LoginRedirect loginRequest={loginRequest}>
                    {customLoadingComponent || (
                        <div className="flex items-center justify-center min-h-screen">
                            <p className="text-gray-600">Please sign in to continue...</p>
                        </div>
                    )}
                </LoginRedirect>
            </UnauthenticatedTemplate>
        </MsalProvider>
    );
};

// /**
//  * Hook to get the current authenticated user
//  */
// export const useAuth = () => {
//     const { instance, accounts, inProgress } = useMsal();

//     const account = accounts[0] || null;
//     const isAuthenticated = accounts.length > 0;
//     const isLoading = inProgress !== InteractionStatus.None;

//     const logout = () => {
//         instance.logoutRedirect({
//             postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : '/',
//         });
//     };

//     const getAccessToken = async (scopes: string[]) => {
//         if (!account) return null;

//         try {
//             const response = await instance.acquireTokenSilent({
//                 scopes,
//                 account,
//             });
//             return response.accessToken;
//         } catch (error) {
//             // If silent token acquisition fails, try interactive
//             try {
//                 const response = await instance.acquireTokenPopup({ scopes });
//                 return response.accessToken;
//             } catch (popupError) {
//                 console.error("Token acquisition error:", popupError);
//                 return null;
//             }
//         }
//     };

//     return {
//         account,
//         isAuthenticated,
//         isLoading,
//         logout,
//         getAccessToken,
//         instance,
//     };
// };