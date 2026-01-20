# Poseidon Frontend (poseidon-fe)

A React-based frontend application for the Poseidon system, built with Vite and integrated with Azure MSAL authentication.

## Overview

Poseidon Frontend is a modern React application that serves as the user interface for the Poseidon system. It is built as part of a monorepo workspace using Nx, leveraging shared libraries for authentication and API communication.

### Key Features

- **React 19**: Modern React application with hooks and functional components
- **Azure AD Authentication**: Integrated authentication using MSAL (Microsoft Authentication Library)
- **Vite**: Fast build tool and development server
- **TypeScript**: Fully typed codebase for better developer experience
- **Monorepo Architecture**: Part of an Nx-powered monorepo with shared libraries

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)

## Setup and Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pos_mono
```

### 2. Install Dependencies

From the root of the monorepo, install all dependencies:

```bash
npm install
```

This will install dependencies for all applications and libraries in the workspace.

### 3. Configuration

The application uses Azure AD for authentication. The MSAL configuration is located in `src/main.tsx` and includes:

- **Client ID**: Azure AD application client ID
- **Tenant ID**: Azure AD tenant ID
- **Redirect URI**: Configured to use the current origin
- **API Scopes**: Configured for backend API access

**Note**: For local development, these values are pre-configured. For production deployment, ensure these values are updated to match your Azure AD configuration.

## Development

### Start Development Server

To run the development server:

```bash
npx nx serve poseidon-fe
```

The application will be available at:
- **URL**: `http://localhost:4200`
- **Host**: `localhost`
- **Port**: `4200`

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- TypeScript compilation

### Available Development Commands

```bash
# Serve the application in development mode
npx nx serve poseidon-fe

# Run unit tests
npx nx test poseidon-fe

# Run unit tests in watch mode
npx nx test poseidon-fe --watch

# Run linting
npx nx lint poseidon-fe

# Type checking
npx nx typecheck poseidon-fe

# View all available targets
npx nx show project poseidon-fe
```

## Build and Deployment

### Production Build

To create a production-optimized build:

```bash
npx nx build poseidon-fe
```

The build output will be generated in the `./dist` directory with:
- Minified and optimized JavaScript bundles
- Compressed assets
- Production-ready static files

### Build Configuration

The build process:
- Uses Vite for fast, optimized builds
- Generates compressed output with size reporting
- Clears the output directory before each build
- Handles CommonJS modules appropriately

### Preview Production Build

To preview the production build locally:

```bash
npx nx preview poseidon-fe
```

The preview server will run at:
- **URL**: `http://localhost:4300`
- **Port**: `4300`

### Deployment

The built application in the `./dist` directory can be deployed to any static hosting service:

1. **Azure Static Web Apps**: Native support for React SPAs
2. **Netlify**: Direct deployment from the dist folder
3. **Vercel**: Optimized for Vite applications
4. **AWS S3 + CloudFront**: Static website hosting
5. **Any web server**: Serve the static files from the dist directory

**Important**: When deploying, ensure:
- The redirect URI in Azure AD matches your deployment URL
- The MSAL configuration in `src/main.tsx` is updated for production
- API scopes and endpoints are configured for your production environment

## Testing

### Unit Tests

The application uses Vitest for unit testing:

```bash
# Run all tests
npx nx test poseidon-fe

# Run tests in watch mode
npx nx test poseidon-fe --watch

# Run tests with coverage
npx nx test poseidon-fe --coverage
```

Test files should follow the naming convention:
- `*.test.ts` or `*.test.tsx`
- `*.spec.ts` or `*.spec.tsx`

Tests are located in the `src` or `tests` directories.

## Project Structure

```
apps/poseidon-fe/
├── src/
│   ├── app/              # Application components
│   │   └── index.tsx     # Main App component
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── main.tsx          # Application entry point
│   └── styles.scss       # Global styles
├── public/               # Public static files
├── index.html            # HTML template
├── vite.config.mts       # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App-specific TypeScript config
├── tsconfig.spec.json    # Test TypeScript config
├── eslint.config.mjs     # ESLint configuration
├── package.json          # Package metadata
└── README.md             # This file
```

## Dependencies

### Core Dependencies

- **React 19**: UI framework
- **React Router DOM**: Client-side routing
- **@azure/msal-browser**: Azure AD authentication
- **@azure/msal-react**: React bindings for MSAL
- **axios**: HTTP client for API calls

### Shared Libraries

- **@pos-mono/authentication**: Shared authentication utilities
- **@pos-mono/poseidon-api**: API client library (if available)

## Configuration Files

- **vite.config.mts**: Vite build and development server configuration
- **tsconfig.json**: TypeScript compiler options
- **eslint.config.mjs**: Code linting rules
- **package.json**: Project metadata and dependencies

## Environment Variables

Currently, the application uses hardcoded configuration values in `src/main.tsx`. For different environments, consider:

1. Creating environment-specific configuration files
2. Using Vite's environment variables (`.env` files)
3. Implementing runtime configuration

## Troubleshooting

### Port Already in Use

If port 4200 is already in use, you can specify a different port:

```bash
npx nx serve poseidon-fe --port=4300
```

### Build Fails

Ensure all dependencies are installed:

```bash
npm install
```

Clear the Vite cache:

```bash
rm -rf ../../node_modules/.vite/apps/poseidon-fe
```

### Authentication Issues

- Verify Azure AD configuration values in `src/main.tsx`
- Ensure redirect URIs are registered in Azure AD
- Check browser console for MSAL errors

## Contributing

When contributing to this application:

1. Follow the existing code style
2. Write tests for new features
3. Update this README if adding new features or changing configuration
4. Use the Nx generators for creating new components when possible

## Additional Resources

- [Nx Documentation](https://nx.dev)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MSAL Documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview)
- [TypeScript Documentation](https://www.typescriptlang.org)

## License

This project is part of the pos_mono monorepo.
