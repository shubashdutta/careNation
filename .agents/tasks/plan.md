# Implementation Plan: Unified Store Form Component

## Design Decisions

**Shared Form Location & Architecture:**
The Province and Sales Point forms are identical except for the default `storeType` value and component names. Rather than duplicating code, we will create a single reusable `StoreFormModal` component in a new shared directory. This component accepts a `storeType` prop to set the initial/default store type while keeping all form UI and logic centralized. The Store Type selector remains visible and interactive in all contexts, allowing users to switch types within any module.

**Warehouse Integration:**
Warehouse currently uses a different schema and form structure (`WarehouseFormSchema` vs. `formSchema`). Since the user request does not mandate replacing the Warehouse form, we will NOT merge Warehouse into the unified form. Warehouse will remain independent with its own schema and form until explicitly requested.

**Import Paths:**
All three modules (Province, Sales Point, Warehouse) will share the unified `formSchema` and `StoreFormData` type. We will create a shared schema file at `src/pages/store-manager/shared/schema.ts`. Province and Sales Point will import from this shared schema instead of their local ones. This eliminates duplication and ensures consistency.

---

## Implementation Steps

- [ ] 1. Create shared schema file with unified form validation.
      New schema file consolidates the identical schemas from Province and Sales Point into a single source of truth. This schema will be used by all three modules going forward.
      Files: `src/pages/store-manager/shared/schema.ts`
      Verify: File exists with `formSchema` and `StoreFormData` exported; ensure schema matches the current Province/Sales Point schema exactly.

- [ ] 2. Create shared form component that accepts storeType prop.
      The unified form component is the centerpiece of this refactor. It accepts `storeType` as a prop (with default value "Province" for backward compatibility), allowing the same component to be used in all three modules. The Store Type selector is fully interactive in all contexts.
      Files: `src/pages/store-manager/shared/store-form-modal.tsx`
      Verify: Component exports `StoreFormModal` with props interface `{ isOpen, onClose, onSubmit, initialData?, title?, storeType? }`. Run TypeScript compilation to confirm no type errors.

- [ ] 3. Update Province module to use shared schema and component.
      Modify the Province schema to re-export from the shared schema. Create a thin wrapper component in `province/partials/form.tsx` that imports and re-exports `StoreFormModal` with the default `storeType="Province"`. This maintains the module's public API (ProvinceFormModal) while delegating to the shared component internally.
      Files: `src/pages/store-manager/province/schema.ts` (modify), `src/pages/store-manager/province/partials/form.tsx` (modify)
      Verify: Province schema file re-exports shared schema. Province form wrapper imports and uses shared component. Run Province module's build/tests to ensure no breakage.

- [ ] 4. Update Sales Point module to use shared schema and component.
      Apply the same pattern as Province: modify Sales Point schema to re-export from shared, and create a thin wrapper in `sales-point/partials/form.tsx` that delegates to the shared component with `storeType="Sales Point"`.
      Files: `src/pages/store-manager/sales-point/schema.ts` (modify), `src/pages/store-manager/sales-point/partials/form.tsx` (modify)
      Verify: Sales Point schema file re-exports shared schema. Sales Point form wrapper imports and uses shared component. Run Sales Point module's build/tests to ensure no breakage.

- [ ] 5. Verify all three modules' index files still work without changes.
      The index files (province/index.tsx, sales-point/index.tsx) already import from `partials/form.tsx` and use the default export. Since our wrappers maintain the same interface and export names, no changes are needed to index files. This step verifies the imports remain intact through the refactoring.
      Files: No changes needed; read-only verification of `src/pages/store-manager/province/index.tsx`, `src/pages/store-manager/sales-point/index.tsx`, `src/pages/store-manager/warehouse/index.tsx`
      Verify: Index files import from `./partials/form` and use ProvinceFormModal/SalesPointFormModal without modification. Run full build to confirm all modules compile and import chains are intact.

---

## Summary of Files

**Create:**
- `src/pages/store-manager/shared/schema.ts` — shared form schema and StoreFormData type
- `src/pages/store-manager/shared/store-form-modal.tsx` — unified form component

**Modify:**
- `src/pages/store-manager/province/schema.ts` — re-export from shared schema
- `src/pages/store-manager/province/partials/form.tsx` — wrapper around shared component
- `src/pages/store-manager/sales-point/schema.ts` — re-export from shared schema
- `src/pages/store-manager/sales-point/partials/form.tsx` — wrapper around shared component

**No Changes:**
- Province and Sales Point index files retain existing imports and behavior
- Warehouse module remains independent with its own schema and form

---

## Key Design Properties of Shared Component

The shared `StoreFormModal` component will have this interface:

```typescript
interface StoreFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: StoreFormData) => void
  initialData?: Partial<StoreFormData> | null
  title?: string
  storeType?: "Warehouse" | "Province" | "Sales Point" // optional, defaults to "Province"
}
```

When `storeType` is provided, it pre-sets the Store Type field to that value in the form's initial state. The Store Type selector remains visible and fully interactive, allowing users to change it at any time.

The module wrappers will re-export as follows:

**Province wrapper:**
```typescript
export default function ProvinceFormModal(props: Omit<StoreFormModalProps, 'storeType'>) {
  return <StoreFormModal {...props} storeType="Province" />
}
```

**Sales Point wrapper:**
```typescript
export default function SalesPointFormModal(props: Omit<StoreFormModalProps, 'storeType'>) {
  return <StoreFormModal {...props} storeType="Sales Point" />
}
```

This approach ensures that calling code in `province/index.tsx` and `sales-point/index.tsx` sees no changes, while the form is now unified and maintainable.
