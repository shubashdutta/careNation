import { z } from "zod"

export const EditKycSchema = z.object({
  temporaryAddress: z.string().min(1, "Temporary address is required"),
  temporaryProvince: z.string().min(1, "Province is required"),
  temporaryDistrict: z.string().min(1, "District is required"),
  temporaryMunicipality: z.string().min(1, "Municipality is required"),
  temporaryLandmark: z.string().min(1, "Landmark is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  permanentProvince: z.string().min(1, "Province is required"),
  permanentDistrict: z.string().min(1, "District is required"),
  permanentMunicipality: z.string().min(1, "Municipality is required"),
  permanentLandmark: z.string().min(1, "Landmark is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  grandfatherName: z.string().min(1, "Grandfather's name is required"),
  panNumber: z.string().min(1, "PAN number is required"),
  panCard: z.any().optional(),
  nomineeName: z.string().optional(),
  relationship: z.string().optional(),
  nomineeNidNumber: z.string().optional(),
})

export type EditKycSchemaType = z.infer<typeof EditKycSchema>
