import {
  Compass,
  FileText,
  Users,
  Wallet,
  Store,
  Package,
  ShoppingCart,
  ClipboardList,
  Settings as SettingsIcon,
  Mail,
  UserCheck,
} from "lucide-react"
import { PATH } from "@/constant/path"
import type { SidebarSection } from "@/layout/sidebar/type"

export const SidebarData: SidebarSection[] = [
  {
    id: 1,
    label: "",
    items: [
      {
        id: 11,
        title: "Dashboard",
        path: PATH.dashboard.dashboard,
        icon: <Compass />,
      },
      {
        id: 42,
        title: "Content Manager",
        icon: <FileText />,
        children: [
          { id: 421, title: "Announcement", path: PATH.content.announcement },
          { id: 422, title: "File Manager", path: PATH.content.fileManager },
        ],
      },
      {
        id: 64,
        title: "Team",
        // path: PATH.users.manageUsers,
        icon: <Users />,
        children: [
          { id: 641, title: "Add New", path: PATH.team.add },
          { id: 642, title: "Matching Tree", path: PATH.team.matchingTree },
          { id: 643, title: "Team Structure", path: PATH.team.teamStructure },
          { id: 644, title: "User List", path: PATH.team.userList },
          { id: 645, title: "Edit Profile", path: PATH.team.userProfile },
          { id: 645, title: "View Profile", path: PATH.team.viewProfile },
          { id: 646, title: "Team 1", path: PATH.team.goldTeam },
          { id: 647, title: "Team 2", path: PATH.team.diamondTeam },
          { id: 648, title: "Team View", path: PATH.team.teamView },
          { id: 649, title: "KYC Status", path: PATH.team.kycStatus },
          { id: 650, title: "Referral List", path: PATH.team.referralList },
          { id: 651, title: "Block / Unblock", path: PATH.team.blockUnblock },
          { id: 652, title: "Member Login", path: PATH.team.memberLogin },
          { id: 653, title: "Change Password", path: PATH.team.changePassword },
        ],
      },
      {
        id: 51,
        title: "Financial Manager",
        path: PATH.settings.currency,
        icon: <Wallet />,
      },
      {
        id: 61,
        title: "Store Manager",
        icon: <Store />,
        children: [
          { id: 611, title: "Vendors", path: PATH.users.vendors },
          { id: 612, title: "Suppliers", path: PATH.users.suppliers },
          { id: 25, title: "Warehouse", path: PATH.warehouse },
        ],
      },
      {
        id: 22,
        title: "Product Manager",
        icon: <Package />,
        children: [
          { id: 21, title: "Category", path: PATH.product.category },
          { id: 221, title: "Add Product", path: PATH.product.addProduct },
          { id: 222, title: "Product List", path: PATH.product.list },
          {
            id: 223,
            title: "Expire Product",
            path: PATH.product.expireProduct,
          },
          { id: 23, title: "Attributes", path: PATH.attributes },
          { id: 24, title: "Brands", path: PATH.brands },
        ],
      },
      {
        id: 31,
        title: "Purchase",
        icon: <ShoppingCart />,
        children: [
          { id: 311, title: "Order List", path: PATH.order.orderList },
          {
            id: 32,
            title: "Delivery Management",
            path: PATH.order.deliveryManagement,
          },
        ],
      },
      {
        id: 12,
        title: "Reports",
        path: PATH.dashboard.analytics,
        icon: <ClipboardList />,
      },
      {
        id: 53,
        title: "Setting",
        icon: <SettingsIcon />,
        children: [
          { id: 531, title: "General", path: PATH.settings.general },
          { id: 533, title: "Policy", path: PATH.settings.policy },
          { id: 532, title: "Security", path: PATH.settings.security },
          { id: 54, title: "Role", path: PATH.settings.role },
          { id: 55, title: "Assign Role", path: PATH.settings.accountRole },
        ],
      },
      {
        id: 428,
        title: "Customer Support",
        path: PATH.cms.contactUs,
        icon: <Mail />,
      },
      {
        id: 63,
        title: "Manage Users",
        icon: <UserCheck />,
        children: [
          { id: 631, title: "Customer", path: PATH.users.customers },
          { id: 65, title: "Delivery Rider", path: PATH.users.deliveryRider },
          { id: 52, title: "Subscriber", path: PATH.settings.subscriber },
        ],
      },
    ],
  },
]
