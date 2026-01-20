import { useEffect, useRef } from "react";
import { InteractionStatus, type PopupRequest } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";

export interface LoginRedirectProps {
    children: React.ReactNode;
    loginRequest: PopupRequest;
}

export const LoginRedirect: React.FC<LoginRedirectProps> = ({ children, loginRequest }) => {
    const { instance, inProgress, accounts } = useMsal();
    const redirectInitiated = useRef(false);
    const hasInitiatedLogin = useRef(false);

    useEffect(() => {
        // Only redirect once when not authenticated and not already in progress
        if (!hasInitiatedLogin.current && inProgress === InteractionStatus.None && accounts.length === 0) {
            hasInitiatedLogin.current = true;
            redirectInitiated.current = true;
            
            instance.loginRedirect(loginRequest).catch((error) => {
                console.error("Login redirect error:", error);
                hasInitiatedLogin.current = false;
                redirectInitiated.current = false;
            });
        }
    }, [instance, inProgress, accounts.length]);

    if (inProgress !== InteractionStatus.None) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Signing in...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
