import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { App } from './app';
import { AuthProvider, MSALConfig } from '@pos-mono/authentication';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Create MSAL configuration for this app
const msalConfig = new MSALConfig({
  clientId: '9120d0a7-c2d5-4fc4-83b9-374802f099f0',
  tenantId: '6a46594c-2608-4eb1-b88e-6520f57b0956',
  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  loginScopes: ['api://5605bcee-7a37-4a81-a7ff-3da205d7e44e/access_as_user'],
  apiScopes: ['api://5605bcee-7a37-4a81-a7ff-3da205d7e44e/access_as_user'],
});

root.render(
  <BrowserRouter>
    {/* <AuthProvider msalConfig={msalConfig}> */}
      <App />
      
    {/* </AuthProvider> */}
  </BrowserRouter>
);