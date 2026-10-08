const AUTH_ENDPOINT = {
  LOGIN: "/auth/sign-in",
  LOGOUT: "/user/logout",
  REFRESH_TOKEN: "/auth/refresh-token",
  FORGOT_PASSWORD: "/auth/forgot-password",
  CHANGE_PASSWORD: "/user/change-password",
  RESET_PASSWORD: "/user/reset-password/",
  VERIFY_OTP: "/user/verify-otp",
}

const ORDER_ENDPOINT = {
  LIST: "/orders",
  DETAIL: "/orders/:id",
  BULK_DELETE: "/orders/bulk-delete",
  UPDATE_STATUS: "/orders/:id/status",
}

const BRAND_ENDPOINT = {
  LIST: "/brand",
  DETAIL: "/brand/:id",
  CREATE: "/brand",
  UPDATE: "/brand/:id",
  DELETE: "/brand/:id",
  BULK_DELETE: "/brand/bulk-delete",
  UPDATE_STATUS: "/brand/:id/status",
}

const WAREHOUSE_ENDPOINT = {
  LIST: "/warehouse",
  DETAIL: "/warehouse/:id",
  CREATE: "/warehouse",
  UPDATE: "/warehouse/:id",
  DELETE: "/warehouse/:id",
  BULK_DELETE: "/warehouse/bulk-delete",
  CITIES: "/warehouse/cities",
}

const VENDOR_ENDPOINT = {
  LIST: "/vendor",
  DETAIL: "/vendor/:id",
  CREATE: "/vendor",
  UPDATE: "/vendor/:id",
  DELETE: "/vendor/:id",
  BULK_DELETE: "/vendor/bulk-delete",
  UPDATE_STATUS: "/vendor/:id/status",
}

const SUPPLIER_ENDPOINT = {
  LIST: "/supplier",
  DETAIL: "/supplier/:id",
  CREATE: "/supplier",
  UPDATE: "/supplier/:id",
  DELETE: "/supplier/:id",
  BULK_DELETE: "/supplier/bulk-delete",
}

const CMS_ENDPOINT = {
  HOME_SECTION: "/home",
  TESTIMONIAL: "/testimonial",
  FAQ: "/faq",
  CONTACT_US: "/contact-us",
}

const CAMPAIGN_ENDPOINT = {
  LIST: "/camping",
  DETAIL: "/camping/:id",
  CREATE: "/camping",
  UPDATE: "/camping/:id",
  DELETE: "/camping/:id",
  ADD_PRODUCT: "/camping-product",
  BULK_DELETE: "/camping/bulk-delete",
  UPDATE_STATUS: "/camping/:id/status",
}

export const END_POINT = {
  AUTH: AUTH_ENDPOINT,
  ORDER: ORDER_ENDPOINT,
  BRAND: BRAND_ENDPOINT,
  WAREHOUSE: WAREHOUSE_ENDPOINT,
  VENDOR: VENDOR_ENDPOINT,
  SUPPLIER: SUPPLIER_ENDPOINT,
  CAMPAIGN: CAMPAIGN_ENDPOINT,
  CMS: CMS_ENDPOINT,
  MEDIA: "/media",
  MEDIA_ATTACHMENT: "/media/attachment",
  UPLOAD: "/upload",

  FILE: "/file",
}
