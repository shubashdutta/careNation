import * as z from 'zod'

export const formSchema = z.object({
  storeType: z.enum(['Warehouse', 'Province', 'Sales Point']),
  provinceCode: z.string().min(1, 'Province Code is required'),
  storeName: z.string().min(1, 'Store Name is required'),
  email: z.string().email('Invalid email address'),
  mobileNo: z.string().min(1, 'Mobile No. is required'),
  password: z.string().optional(),
  contactPerson: z.string().optional(),
  vatNo: z.string().min(1, 'VAT No. is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  province: z.string().min(1, 'Province is required'),
  country: z.string().min(1, 'Country is required'),
  status: z.enum(['Active', 'Inactive']),
})

export type StoreFormData = z.infer<typeof formSchema>