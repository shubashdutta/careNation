# Unified Store Form Component

This refactor consolidates Province, Sales Point, and Warehouse form handling into a single shared component, eliminating duplicate form logic while maintaining per-module encapsulation through thin wrapper components. Province and Sales Point forms are converted to wrappers; Warehouse gains its first dedicated form. The Store Type selector is prominently displayed and fully interactive in all contexts. All required fields, validation, and layout are unified. TypeScript compilation passes with zero errors.

**Watch for:** The schema defines every field as required except password and contactPerson, but the schema doesn't distinguish whether fields should be required/optional by store type — all three types are treated identically. If different store types require different field constraints, this needs refinement.

**Verdict**: APPROVED

## High-level view

The shared component (`StoreFormModal`) absorbs all form logic into a single, self-contained unit with a local Zod schema. It accepts a `storeType` prop to set the initial store type but allows users to switch types via checkboxes; the form doesn't lock to the injected type. This gives the wrappers full control over default behavior while preserving flexibility.

Each module wrapper (Province, Sales Point, Warehouse) now delegates to the shared component, passing through props unchanged and specifying only the `storeType` default. The wrappers are thin — they're just pass-through interfaces that guarantee type safety and provide a default title for each context. This pattern is applied consistently across all three modules.

The Store Type selector uses checkboxes and is always visible, even though each wrapper defaults to a single type. Users can change the type mid-form, which aligns with the original request to "show in the same form" — Province, Sales Point, and Warehouse now all render identically with the selector live.

Form state resets correctly when `initialData` changes, and the Modal wrapping is consistent with existing UI patterns. Backward compatibility is maintained: parent components importing the module wrappers need no code changes.

<details>
<summary>Issues (1)</summary>

1. **Field optionality not store-type-aware** — The Zod schema treats all store types identically. If Province, Sales Point, and Warehouse have different required fields, the schema needs to branch on `storeType`. Verify with product that field constraints are the same across all three types; if not, use Zod's `.superRefine()` or conditional logic to enforce type-specific rules.

</details>

<details>
<summary>Details</summary>

### Shared component is self-contained

The `store-form.tsx` defines its own Zod schema with all required fields inlined. It does not import `schema.ts` from any module (Province, Sales Point, Warehouse). This avoids cross-module coupling and keeps the shared component portable. The schema includes all fields visible in the form (provinceCode, storeName, email, mobileNo, password, contactPerson, vatNo, address, city, district, province, country, status, storeType). Field optionality is defined once here; field validation is unified.

### Thin wrappers delegate completely

Each wrapper (ProvinceFormModal, SalesPointFormModal, WarehouseFormModal) imports `StoreFormModal` and `StoreFormData` from the shared component. They accept the same props interface (isOpen, onClose, onSubmit, initialData, title), provide sensible defaults (title matches the store type), and pass all props through to the shared component with only the `storeType` prop hardcoded. The wrappers re-export `StoreFormData` for backward compatibility with parent imports. This pattern is applied identically to all three modules, making the codebase predictable.

### Store Type selector is live and visible

The Store Type field renders three checkboxes (Warehouse, Province, Sales Point) that are always visible and fully interactive. Users can switch types mid-form. Each wrapper sets a default `storeType`, but the selector is not disabled; users can override it. This fulfills the requirement that all three store types now display "in the same form" and matches the original request to stop using separate forms and diffs for Province, Sales Point, and Warehouse.

### Form resets correctly

The component uses `useEffect` to reset the form whenever `initialData` or `storeType` changes. The reset merges the injected `storeType` and `initialData` into fresh defaults, preserving the incoming storeType even if initialData doesn't explicitly set it. This ensures the form reflects the context when edited data is loaded.

### TypeScript compilation passes

The verify.md reports `npx tsc --noEmit` passes with zero errors. Imports are resolved, types are consistent, and the shared component is properly exported and imported. No type safety gaps.

### Backward compatibility preserved

Parent components (Province index, Sales Point index) that import and use the module wrappers require zero code changes. The wrapper interfaces match what parents expect (isOpen, onClose, onSubmit, initialData, title). The default export remains a component. The re-export of `StoreFormData` allows parents to continue typing their state without reaching into the shared component.

### Schema field optionality (confirmed concern)

The formSchema treats password and contactPerson as optional; all other fields are required. This constraint applies uniformly to all three store types. If different store types should enforce different field requirements (e.g., Warehouse might not require a contactPerson), the schema needs refinement using `.superRefine()` or a discriminated union approach to branch validation by storeType. **This should be verified with the product owner.** For now, the implementation assumes all store types share the same validation rules.

</details>

<details>
<summary>File map</summary>

- **src/components/shared/store-form.tsx** — New shared form component. Defines Zod schema, renders form with all fields, Store Type selector (checkboxes), Status selector, city/district/province/country dropdowns, and Reset/Save buttons. Exports `StoreFormModal`, `formSchema`, `StoreFormData`.

- **src/pages/store-manager/province/partials/form.tsx** — Refactored thin wrapper. Imports `StoreFormModal` from shared component. Delegates to shared component with `storeType="Province"`. Re-exports `StoreFormData` for parent type safety.

- **src/pages/store-manager/sales-point/partials/form.tsx** — Refactored thin wrapper. Imports `StoreFormModal` from shared component. Delegates to shared component with `storeType="Sales Point"`. Re-exports `StoreFormData` for parent type safety.

- **src/pages/store-manager/warehouse/partials/form.tsx** — New thin wrapper. Mirrors Province and Sales Point pattern. Imports `StoreFormModal` from shared component. Delegates to shared component with `storeType="Warehouse"`. Re-exports `StoreFormData`.

Full diff available via `git diff <base-branch>`.

</details>
