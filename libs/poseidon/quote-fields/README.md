# @pos-mono/quote-fields

Reusable form field components for the Poseidon quote system.

## Overview

This library provides form field components designed for use in large forms. All components use PrimeReact's InputText with float-label and support i18n for label translations.

## Features

- Built on PrimeReact components
- i18n support for all labels (no hardcoded strings)
- Consistent styling with float-label inputs
- Designed for large form layouts

## Usage

```typescript
import { /* components will be exported here */ } from '@pos-mono/quote-fields';
```

## Dependencies

- PrimeReact: UI component library
- react-i18next: Internationalization support
- i18next: Translation framework

## Development

```bash
# Build the library
nx build quote-fields

# Run tests
nx test quote-fields

# Lint
nx lint quote-fields
```
