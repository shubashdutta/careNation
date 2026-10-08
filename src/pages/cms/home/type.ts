// // export interface IHomeSectionService {
// //   id?: string
// //   sectionName: string
// //   sectionSubtitle: string
// //   mainLevel: string
// //   supportingLevel: string
// //   sectionImage: string
// //   sortOrder: number
// // }

// // export interface IHomeSection {
// //   id: string
// //   sectionName: string
// //   heroText: string
// //   marketPlaceText: string[]
// //   supportingText: string[]
// //   marketPlace: string[]
// //   sectionSubtitle: string
// //   sectionImage: string
// //   services: IHomeSectionService[]
// // }

export interface IHomeRoot {
  success: boolean
  statusCode: number
  message: string
  data: IHomeSection[]
}

// export interface IHomeSection {
//   id: string
//   sectionName: string
//   heroText: string
//   marketPlaceText: string[]
//   supportingText: string[]
//   marketPlace: string[]
//   sectionSubtitle: string
//   sectionImage: string
//   services: IHomeSectionService
// }

// export interface IHomeSectionService {
//   id: string
//   sectionName: string
//   sectionSubtitle: string
//   mainLevel: string
//   supportingLevel: string
//   sectionImage: string
//   sortOrder: number
// }

export interface IHomeSectionService {
  id?: string
  sectionName: string
  sectionSubtitle: string
  mainLevel: string
  supportingLevel: string
  sectionImage: string
  sortOrder: number
}

export interface IHomeSection {
  id: string
  sectionName: string
  heroText: string
  marketPlaceText: string[]
  supportingText: string[]
  marketPlace: string[]
  sectionSubtitle: string
  sectionImage: string
  services: IHomeSectionService[]
}
