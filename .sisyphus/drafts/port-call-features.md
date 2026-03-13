# Draft: Port Call Features

## Current Implementation (confirmed)

### Port Call Form Structure
- **Location**: `libs/poseidon/quote-form/src/components/quoteFormPortCall.tsx`
- **Manning UI**: `libs/poseidon/quote-form-ui/src/lib/quoteFormPortCallManning.tsx`
- **Country selector**: `libs/poseidon/quote-form-ui/src/lib/quoteFormPortCallCountry.tsx`

### Current IQuoteForm.portCalls Shape
```typescript
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
```

### Current UI Elements
- Country/region dropdown (QuoteFormPortCallCountry)
- Port name text field
- Team type dropdown (OneDiver/TwoDiver)
- Team configuration DataTable (role, count, external columns with row editing)

## Available API Data (not yet exposed)

### Country/Region
- `CountryDto.code` - ISO code (for flags/validation)
- `CountryConfigDto.minTeamSize` - minimum team sizes per region

### Timeline/Travel
- `TimeLineItemDto` with type `Travel` - mobilization/travel durations
- `durationType`: Hour | Day | Shift
- `timeLineItemType`: Travel | Work | Preparation | Standby

### Equipment & Costs
- `EquipmentDto.cost` + `costOverrides` - internal costs
- `EquipmentDto.equipmentGroup` - equipment categorization
- `JobRateDto.cost` + `costOverrides` - personnel internal costs

### Expenses
- `ExpenseDto.surcharge` - standalone surcharges

### Key Finding
**No PortDto/PortCallDto exists** - port call data is stored in `QuoteDto.quoteValues` (generic map)

## Open Questions
- What specific features does user want to add?
- Priority/scope of changes?
- Business requirements available?

## Scope Boundaries
- INCLUDE: TBD
- EXCLUDE: TBD
