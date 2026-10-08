/**
AUTH PATH
*/
const AUTH_PATH = {
  login: "/login",
  forgotPassword: "/forgot-password",
  changePassword: "/change-password",
  resetPassword: "/reset-password",
  verifyOtp: "/verify-otp",
}

/**
 * DASHBOARD PATH
 */
const DASHBOARD_PATH = {
  dashboard: "/dashboard",
  analytics: "/analytics",
}

/**
 * PRODUCT PATH
 */
const PRODUCT_PATH = {
  category: "/products/category",
  addCategory: "/products/category/add",
  list: "/products/list",
  addProduct: "/products/list/add",
  editProduct: "/products/edit/:id",
  viewProduct: "/products/list/view",
  expireProduct: "/products/list/expire",
}

/**
 * ORDER PATH
 */
const ORDER_PATH = {
  orderList: "/orders/order-list",
  deliveryManagement: "/orders/delivery-management",
}

/**
 * USERS PATH
 */
const USERS_PATH = {
  vendors: "/users/vendors",
  addVendor: "/users/vendors/add",
  editVendor: "/users/vendors/:id/edit",
  suppliers: "/users/suppliers",
  addSupplier: "/users/suppliers/add",
  editSupplier: "/users/suppliers/:id/edit",
  customers: "/users/customers",
  manageUsers: "/users/manage-users",
  deliveryRider: "/users/delivery-riders",
}

/**
 * CMS PATH
 */
const CMS_PATH = {
  homeSection: "/cms/home",
  aboutUs: "/cms/about-us",
  breadcrumb: "/cms/breadcrumb",
  banner: "/cms/banner",
  about: "/cms/about",
  blog: "/cms/blog",
  testimonial: "/cms/testimonial",
  faq: "/cms/faq",
  contactUs: "/cms/contact-us",
  media: "/cms/media",
}

/**
 * SETTINGS PATH
 */
const SETTINGS_PATH = {
  currency: "/settings/currency",
  subscriber: "/settings/subscriber",
  general: "/settings/general",
  policy: "/settings/policy",
  security: "/settings/security",
  role: "/settings/role",
  accountRole: "/settings/account-role",
}

const CAMPAIGN_PATH = {
  campaign: "/campaign",
  add: "/campaign/add",
  edit: "/campaign/:id",
  view: "/campaign/:id/view",
}

////////////////////////////////
const CONTENT_PATH = {
  announcement: "/content/announcement",
  fileManager: "/content/file-manager",
}

const TEAM_PATH = {
  add: "/team/add",
  matchingTree: "/team/matching-tree",
  teamStructure: "/team/team-structure",
  userList: "/team/user-list",
  userProfile: "/team/user-profile",
  viewProfile: "/team/view-profile",
  goldTeam: "/team/gold-team",
  diamondTeam: "/team/diamond-team",
  teamView: "/team/team-view",
  kycStatus: "/team/kyc-status",
  editKyc: "/team/kyc-status/:id/edit",
  referralList: "/team/referral-list",
  blockUnblock: "/team/block-unblock",
  memberLogin: "/team/member-login",
  changePassword: "/team/change-password",
}

/**
 *ALL PATH
 */
export const PATH = {
  auth: AUTH_PATH,
  dashboard: DASHBOARD_PATH,
  product: PRODUCT_PATH,
  brands: "/brands",
  attributes: "/attributes",
  warehouse: "/warehouse",
  campaign: CAMPAIGN_PATH,
  order: ORDER_PATH,
  users: USERS_PATH,
  cms: CMS_PATH,
  settings: SETTINGS_PATH,

  content: CONTENT_PATH,
  team: TEAM_PATH,
}
