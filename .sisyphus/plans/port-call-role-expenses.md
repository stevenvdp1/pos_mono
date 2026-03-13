# Plan: Port Call Role Expenses Feature

## Overview
Add collapsible expense sections for each team role in port calls. Each role row expands to show two sections: **Local Worker Expenses** (travel time, etc.) and **External Worker Expenses** (visa, flight, hotel, etc.).

## Context

### Current State
- `QuoteFormPortCallManning` displays team roles in a DataTable with columns: role, count, external, local (computed)
- Each role has `id`, `role`, `count` (IQuoteOverrideField), and `external` (number)
- No expense tracking per role exists

### Target State
- Each team role row is expandable (PrimeReact DataTable row expansion)
- Expanded content shows Accordion with two tabs: "Local Expenses" and "External Expenses"
- Each expense tab contains an editable DataTable for adding/editing expenses
- Expenses follow IQuoteOverrideField pattern for consistency

### Files to Modify
- `libs/poseidon/quote-form/src/hooks/useQuoteForm.ts` — Add expense types to IQuoteForm
- `libs/poseidon/quote-form-ui/src/lib/quoteFormPortCallManning.tsx` — Add row expansion + expense UI
- `libs/poseidon/quote-form-ui/src/lib/index.ts` — Export new components if created separately

### Reference Patterns
- Row expansion: `quoteFormRatesEquipment.tsx` uses `expandedRows` + `onRowToggle`
- Editable DataTable: `quoteFormTimelineItems.tsx` pattern with `useFieldArray`, `update`, `append`
- Override fields: `IQuoteOverrideField<T>`, `QuoteOverrideField`, `QuoteOverrideEditText/Number`

---

## Tasks

### Phase 1: Data Model

- [ ] **Task 1.1**: Define expense interface types
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteOverrideField.tsx`
  - **Action**: Add `IWorkerExpense` interface after `IQuoteOverrideField`:
    ```typescript
    export interface IWorkerExpense {
      id: string
      description: IQuoteOverrideField<string>
      amount: IQuoteOverrideField<number>
    }
    ```
  - **Export**: Ensure it's exported from the file
  - **Verify**: TypeScript compiles without errors

- [ ] **Task 1.2**: Update IQuoteForm teamConfiguration type
  - **File**: `libs/poseidon/quote-form/src/hooks/useQuoteForm.ts`
  - **Action**: Add `localExpenses` and `externalExpenses` arrays to teamConfiguration:
    ```typescript
    teamConfiguration: Array<{
      id: JobRateDtoPersonnelRole
      role: IQuoteOverrideField<string>
      count: IQuoteOverrideField<number>
      external: number
      localExpenses: IWorkerExpense[]      // NEW
      externalExpenses: IWorkerExpense[]   // NEW
    }>
    ```
  - **Import**: Import `IWorkerExpense` from `@pos-mono/quote-form-ui`
  - **Verify**: TypeScript compiles without errors

- [ ] **Task 1.3**: Update useQuoteForm default values
  - **File**: `libs/poseidon/quote-form/src/hooks/useQuoteForm.ts`
  - **Action**: Update the port call creation logic (around line 76-86) to include empty expense arrays:
    ```typescript
    acc.push({
      id: role as JobRateDtoPersonnelRole,
      external: 0,
      role: { baseValue: role },
      count: { baseValue: 0 },
      localExpenses: [],      // NEW
      externalExpenses: []    // NEW
    });
    ```
  - **Also update**: The teamConfiguration update logic (around line 101-109) to preserve existing expenses
  - **Verify**: TypeScript compiles, form still works

### Phase 2: Expense Table Component

- [ ] **Task 2.1**: Create RoleExpensesTable component
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteFormRoleExpenses.tsx` (NEW FILE)
  - **Action**: Create a reusable expense DataTable component:
    - Props: `{ portCallIndex: number, roleIndex: number, expenseType: 'local' | 'external' }`
    - Uses `useFieldArray` for `portCalls.${portCallIndex}.teamConfiguration.${roleIndex}.${expenseType}Expenses`
    - Columns: description (QuoteOverrideEditText), amount (QuoteOverrideEditNumber), row editor
    - Add button for new expenses
    - Follow `quoteFormTimelineItems.tsx` pattern exactly
  - **Verify**: Component renders without errors when imported

- [ ] **Task 2.2**: Export RoleExpensesTable
  - **File**: `libs/poseidon/quote-form-ui/src/lib/index.ts`
  - **Action**: Add export: `export * from './quoteFormRoleExpenses';`
  - **Verify**: Import works from `@pos-mono/quote-form-ui`

### Phase 3: Row Expansion UI

- [ ] **Task 3.1**: Add row expansion state to QuoteFormPortCallManning
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteFormPortCallManning.tsx`
  - **Action**: 
    - Import `useState` from React
    - Import `Accordion, AccordionTab` from `primereact/accordion`
    - Add state: `const [expandedRows, setExpandedRows] = useState<any>(null);`
  - **Verify**: No render errors

- [ ] **Task 3.2**: Add DataTable expansion props
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteFormPortCallManning.tsx`
  - **Action**: Add to DataTable:
    ```tsx
    expandedRows={expandedRows}
    onRowToggle={(e) => setExpandedRows(e.data)}
    rowExpansionTemplate={rowExpansionTemplate}
    ```
  - **Also add**: `<Column expander style={{ width: '3rem' }} />` as first column
  - **Verify**: Expander column appears, clicking toggles (template not yet defined)

- [ ] **Task 3.3**: Implement rowExpansionTemplate
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteFormPortCallManning.tsx`
  - **Action**: Import `RoleExpensesTable` and create template:
    ```tsx
    const rowExpansionTemplate = (rowData: any) => {
      const roleIndex = teamConfiguration?.findIndex((tc: any) => tc.id === rowData.id) ?? -1;
      if (roleIndex === -1) return null;
      
      return (
        <div className="p-3">
          <Accordion multiple>
            <AccordionTab header={t("localExpenses")}>
              <RoleExpensesTable 
                portCallIndex={index} 
                roleIndex={roleIndex} 
                expenseType="local" 
              />
            </AccordionTab>
            <AccordionTab header={t("externalExpenses")}>
              <RoleExpensesTable 
                portCallIndex={index} 
                roleIndex={roleIndex} 
                expenseType="external" 
              />
            </AccordionTab>
          </Accordion>
        </div>
      );
    };
    ```
  - **Verify**: Expanding a row shows accordion with two tabs

### Phase 4: Integration & Polish

- [ ] **Task 4.1**: Add unique ID generation for new expenses
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteFormRoleExpenses.tsx`
  - **Action**: Use `crypto.randomUUID()` or simple counter for generating expense IDs when adding new expenses
  - **Verify**: New expenses get unique IDs

- [ ] **Task 4.2**: Add expense total display (optional enhancement)
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteFormRoleExpenses.tsx`
  - **Action**: Add footer showing sum of expense amounts (follow timelineItems pattern)
  - **Verify**: Footer displays correct total

- [ ] **Task 4.3**: Visual polish
  - **File**: `libs/poseidon/quote-form-ui/src/lib/quoteFormPortCallManning.tsx`
  - **Action**: 
    - Add appropriate padding/margins to expansion template
    - Ensure accordion styling is consistent with rest of form
  - **Verify**: UI looks professional and consistent

### Phase 5: Validation

- [ ] **Task 5.1**: Run TypeScript checks
  - **Command**: `nx run quote-form:typecheck` and `nx run quote-form-ui:typecheck`
  - **Action**: Fix any type errors (note: pre-existing DeepPartial errors are acceptable)
  - **Verify**: No new type errors introduced

- [ ] **Task 5.2**: Run linting
  - **Command**: `nx run quote-form-ui:lint`
  - **Action**: Fix any lint errors
  - **Verify**: Lint passes

- [ ] **Task 5.3**: Manual testing
  - **Command**: `nx serve poseidon-fe`
  - **Action**: 
    1. Navigate to quote form
    2. Add a port call
    3. Verify team configuration table shows expander column
    4. Click expander on a role row
    5. Verify accordion with Local/External tabs appears
    6. Add an expense to each tab
    7. Edit an expense
    8. Verify data persists when collapsing/expanding
  - **Verify**: All interactions work correctly

---

## Success Criteria
1. Each team role row in port call manning table has an expand button
2. Expanding shows Accordion with "Local Expenses" and "External Expenses" tabs
3. Each expense tab has an editable DataTable (add/edit expenses)
4. Expenses use IQuoteOverrideField pattern (description, amount)
5. TypeScript compiles without new errors
6. UI is consistent with existing form styling

## Non-Goals (Out of Scope)
- Backend API integration for expenses (stored in quoteValues)
- Cost calculation/summaries based on expenses
- Predefined expense templates
- Expense validation rules

## Dependencies
- PrimeReact Accordion component (already in project)
- Existing IQuoteOverrideField infrastructure
- Existing QuoteOverrideEdit* components

## Estimated Effort
- Phase 1 (Data Model): ~30 min
- Phase 2 (Component): ~45 min
- Phase 3 (Row Expansion): ~30 min
- Phase 4 (Polish): ~20 min
- Phase 5 (Validation): ~15 min
- **Total**: ~2.5 hours
