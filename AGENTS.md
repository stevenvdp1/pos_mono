<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.

<!-- nx configuration end-->

# Poseidon Project Knowledge

## Goal

Build a maritime services quotation system (Poseidon) for Wärtsilä in an Nx monorepo. The core feature is a large complex form with many interdependent fields. The form allows creating/editing quotes for maritime service jobs (diving, maintenance, repair).

## Architecture

- **Nx 22.3 monorepo** with React 19, Vite 7, TypeScript 5.9
- **Tech stack**: PrimeReact 10, react-hook-form 7.71, TanStack React Query 5, Tailwind CSS 4, react-i18next, Azure MSAL (disabled for dev)
- **Pre-existing build issue**: `nx build poseidon-fe` fails due to Vite rollup not resolving `@pos-mono/poseidon-api` from `quote-form` lib. Dev server (`nx serve`) works fine.
- **Pre-existing TS errors**: `DeepPartial<IQuoteForm>` used with `useForm` causes `never` type errors on all `setValue` calls. Also TS6305 stale output errors. These affect all existing code, not just our additions.
- App-level typecheck (`apps/poseidon-fe/tsconfig.app.json`) only shows pre-existing unused import warnings for disabled auth

## Project Structure

```
apps/poseidon-fe/          — React SPA shell app
libs/authentication/       — MSAL/Azure AD auth (disabled)
libs/poseidon-api/         — NSwag auto-generated API client + React Query hooks
libs/poseidon/quote-form/  — Form logic: sections, useQuoteForm hook
libs/poseidon/quote-form-ui/ — Reusable form field/table components
libs/poseidon/ui/          — Generic UI primitives
```

## Key Patterns

### Override Field Pattern (3-tier value resolution)
- All form fields that can be overridden use `IQuoteOverrideField<T>` which has `baseValue`, `configValue`, and `quoteValue`
- Resolution order: `quoteValue ?? configValue ?? baseValue`
- Defined in `libs/poseidon/quote-form-ui/src/lib/quoteOverrideField.tsx`
- Display component: `<QuoteOverrideField field={rowData.fieldName} />` — shows resolved value with tooltip showing all tiers
- Edit components: `QuoteOverrideEditText`, `QuoteOverrideEditNumber`, `QuoteOverrideEditRateType`, `QuoteOverrideEditDurationType`, `QuoteOverrideEditTimeLineItemType`

### DataTable Pattern (Row Editing)
- Uses PrimeReact DataTable with `editMode="row"`
- Uses `useFormContext` with a local generic type, `useWatch` for reactive data, and `useFieldArray` for mutations (`update`, `append`)
- `updateRow` handler clears empty `quoteValue` overrides (delete if empty string or null)
- Column `body` callbacks use `<QuoteOverrideField field={rowData.fieldName} />` for display
- Column `editor` callbacks use `QuoteOverrideEdit*` components
- Reference implementations: `quoteFormRatesEquipment.tsx`, `quoteFormPortCallManning.tsx`, `quoteFormTimelineItems.tsx`

### Form Section Pattern
- Sections are wrapped in `<QuoteFormSection label="sectionKey">` which provides collapsible container with i18n label
- Section wrappers live in `libs/poseidon/quote-form/src/components/` — thin wrappers importing UI components from `quote-form-ui`
- Reusable UI components live in `libs/poseidon/quote-form-ui/src/lib/`
- Pattern example: `quoteFormRates.tsx` imports `QuoteFormRatesEquipment` from `@pos-mono/quote-form-ui` and wraps in `QuoteFormSection`

### API Hook Pattern
- Hooks use `@tanstack/react-query` with `useQuery`
- API client singleton via `getApiClient()` from `libs/poseidon-api/src/lib/client.ts`
- Default settings: `staleTime: 5 * 60 * 1000, retry: 1`
- Hooks exported from `libs/poseidon-api/src/lib/hooks/index.ts`
- Existing hooks: `useJobs`, `useClientConfigs`, `useCountries`, `useRegionConfigs`
- **No mutation hooks exist yet** — only query hooks

### Form Field Components
- `QuoteTextField` — text input wrapper for react-hook-form
- `QuoteNumberField` — numeric input wrapper
- `QuoteDateField` — calendar/date picker wrapper
- `QuoteDescriptionField` — textarea wrapper
- `QuoteDropdownField` — generic dropdown wrapper
- `QuoteFormRow` — grid row helper (auto grid-cols based on children count)
- `QuoteFormClientName` — client selector with editable dropdown
- `QuoteFormConfig` — config selector (region/client) with grouped options
- `QuoteFormScope` — scope multi-select with main-job selection
- `QuoteFormPortCallCountry` — country/region dropdown

## Form Sections Status

| Section | Status | Component | UI Component |
| --- | --- | --- | --- |
| General | ✅ Implemented | `quoteFormGeneral.tsx` | Multiple field components |
| Port Calls | ✅ Implemented | `quoteFormPortCall.tsx` | `quoteFormPortCallManning.tsx` |
| Timeline | ✅ Implemented | `quoteFormTimeline.tsx` | `quoteFormTimelineItems.tsx` |
| Rates | ✅ Implemented | `quoteFormRates.tsx` | `quoteFormRatesEquipment.tsx` |
| Cost Breakdown | ❌ Stub | `quoteFormCostBreakdown.tsx` | None yet |
| Payment Terms | ❌ Stub | `quoteFormPayment.tsx` | None yet |

## IQuoteForm Interface (central form type)

Located in `libs/poseidon/quote-form/src/hooks/useQuoteForm.ts`:

```typescript
export interface IQuoteForm {
    configId: string
    shipName: string
    imoNumber: string
    clientName: string | ClientConfigDto
    clientNote?: string
    quoteReference: string
    clientReference: string
    creationDate: Date
    revisionDate: Date
    loa: number | null
    beam: number | null
    draft: number | null
    totalPortCalls: number | null
    jobDate?: Date
    generalNotes?: string
    scope: IQuoteScopeItem[]
    portCalls: Array<{
        portName: string
        country: { id: string; name: string }
        teamType: 'OneDiverInWater' | 'TwoDiversInWater'
        teamConfiguration: Array<{
            id: JobRateDtoPersonnelRole
            role: IQuoteOverrideField<string>
            count: IQuoteOverrideField<number>
            external: number
        }>
    }>
    equipments: Array<{
        id: string
        name: IQuoteOverrideField<string>
        rate: IQuoteOverrideField<number>
        rateType: IQuoteOverrideField<string>
        equipmentGroup: string
    }>
    timelineItems: Array<{
        id: number
        description: IQuoteOverrideField<string>
        duration: IQuoteOverrideField<number>
        durationType: IQuoteOverrideField<TimeLineItemDtoDurationType>
        timeLineItemType: IQuoteOverrideField<TimeLineItemDtoTimeLineItemType>
    }>
}
```

## Backend API Types (NSwag-generated)

Located in `libs/poseidon-api/src/lib/poseidon-api.ts`:

### Quote DTOs (generic quoteValues map — no typed fields)
```typescript
interface CreateQuoteDto { quoteValues: { [key: string]: any } }
interface UpdateQuoteDto { quoteValues: { [key: string]: any } }
interface QuoteDto {
    id?: string
    createdAt?: string
    updatedAt?: string | undefined
    createdBy?: string | undefined
    updatedBy?: string | undefined
    quoteValues?: { [key: string]: any } | undefined
}
```

### Cost-Related DTOs
```typescript
// Standalone expenses (description + surcharge percentage)
interface ExpenseDto { id?: string; description?: string; surcharge?: number }
interface CreateExpenseDto { description: string; surcharge?: number }

// Equipment has both rate (charge) and cost (internal) with config overrides
interface EquipmentDto {
    id?: string; name?: string; equipmentGroup?: string
    rate?: number; rateOverrides?: { [key: string]: number }
    cost?: number; costOverrides?: { [key: string]: number }
    rateType?: EquipmentDtoRateType
}

// Job rates also have cost + costOverrides
interface JobRateDto {
    id?: string; jobType?: JobRateDtoJobType; description?: string
    rate?: number; rateOverrides?: { [key: string]: number }
    cost?: number; costOverrides?: { [key: string]: number }
    rateType?: JobRateDtoRateType
    personnelRole?: JobRateDtoPersonnelRole; canBeDeleted?: boolean
}

// Maintenance job specs with work/onsite hours and cost/rate
interface MaintenanceJobSpecificationDto {
    loaType: MaintenanceJobSpecificationDtoLoaType
    workHours: number; onsiteHours: number
    rate: number; rateOverrides?: { [key: string]: number }
    cost: number; costOverrides?: { [key: string]: number }
}
```

### Other Key DTOs
```typescript
interface JobDto {
    id?: string; name?: string; jobType?: JobDtoJobType; description?: string
    timeLine?: TimeLineItemDto[]; equipments?: EquipmentDto[]
    maintenanceJobSpecifications?: { [key: string]: MaintenanceJobSpecificationDto }
    teamConfigurations?: { [key: string]: { [key: string]: number } }
}

interface TimeLineItemDto {
    id?: number; description: string; duration: number
    durationType: TimeLineItemDtoDurationType  // Hour | Day | Shift
    timeLineItemType: TimeLineItemDtoTimeLineItemType  // Travel | Work | Preparation | Standby
}
```

### Available API Endpoints (on Client class)
- Quote: `quoteAll()`, `quoteGET(id)`, `quotePOST(body)`, `quotePUT(id, body)`, `quoteDELETE(id)`
- Job: `jobAll()`, `jobGET(id)`, `jobPOST(body)`, `jobPUT(id, body)`, `jobDELETE(id)`
- Equipment: `equipmentAll()`, `equipmentGET(id)`, `equipmentPOST(body)`, `equipmentPUT(id, body)`, `equipmentDELETE(id)`
- JobRate: `jobRateAll(jobType)`, `jobRateGET(id)`, `jobRatePOST(body)`, `jobRatePUT(id, body)`, `jobRateDELETE(id)`
- Expense: `expenseAll()`, `expenseGET(id)`, `expensePOST(body)`, `expensePUT(id, body)`, `expenseDELETE(id)`
- ClientConfig, Country, RegionConfig: CRUD endpoints
- PDF: `pdf(id)` — generates quote PDF

## Form Submission (current state)

- `useQuoteForm` returns `onSubmit = methods.handleSubmit((e) => console.log(e))` — **just logs to console**
- No mapping from `IQuoteForm` → `CreateQuoteDto` exists
- No React Query mutation hooks exist for quotes
- To wire: create `useCreateQuote`/`useUpdateQuote` hooks following `useJob` pattern, implement `IQuoteForm` → `CreateQuoteDto` mapper, replace `console.log`

## Cost Breakdown Analysis (for future implementation)

The Cost Breakdown section needs business requirements. Backend data sources available:
- `EquipmentDto.cost` + `costOverrides` — internal cost per equipment (form currently only tracks `rate`)
- `JobRateDto.cost` + `costOverrides` — internal cost per personnel role
- `ExpenseDto.surcharge` — standalone expenses
- `MaintenanceJobSpecificationDto.cost` + `costOverrides` — maintenance job costs

Possible implementation approaches:
1. **Computed view** — read-only table computing costs from equipment rates × durations + personnel costs × counts
2. **Editable expenses table** — similar to equipment/timeline DataTable pattern with `ExpenseDto` items
3. **Hybrid** — computed subtotals + editable surcharges/expenses

To implement: add `cost: IQuoteOverrideField<number>` to `IQuoteForm.equipments`, populate from `EquipmentDto.cost`/`costOverrides`, and add an `expenses` array to `IQuoteForm`.

## Payment Terms Analysis (for future implementation)

No backend types exist for payment terms. `QuoteDto.quoteValues` is a generic `{ [key: string]: any }` map, so payment data would be stored there.

To implement:
1. Add `paymentTerms` fields to `IQuoteForm` (e.g., paymentType, dueDays, invoiceTo, advancePercent, notes)
2. Create UI fields in `quoteFormPayment.tsx` using existing field components (`QuoteTextField`, `QuoteDropdownField`, etc.)
3. Data persists via `CreateQuoteDto.quoteValues` when form is submitted

## i18n Status

- `react-i18next` is set up and `useTranslation()` / `t()` is used across all components
- Translation keys fall back to key names (e.g., `t('description')` renders "description")
- No translation JSON/YAML resource files exist — all keys show as-is
- Single default namespace used

## Known Issues

1. **Vite build fails** — `nx build poseidon-fe` fails because rollup can't resolve `@pos-mono/poseidon-api` from `quote-form` lib. Dev server works fine. Pre-existing issue.
2. **DeepPartial TS errors** — `useForm<DeepPartial<IQuoteForm>>` causes `never` type on `setValue` calls. Pre-existing across all code.
3. **TS6305 stale output** — TypeScript reports stale `.d.ts` output files. Pre-existing.
4. **No tests** — zero test files in the entire project.
5. **Auth disabled** — MSAL configuration commented out for development.

## Remaining Tasks

- [ ] Implement Cost Breakdown section (needs business requirements)
- [ ] Implement Payment Terms section (needs business requirements)
- [ ] Wire form submission to API (create mutation hooks + mapper)
- [ ] Add form validation
- [ ] Add tests
- [ ] Set up i18n translation files
- [ ] Re-enable authentication
- [ ] Fix Vite build config for production builds
