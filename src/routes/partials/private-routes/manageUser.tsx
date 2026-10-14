import { PATH } from "@/constant/path"
import UserPermissionPage from "@/pages/manageUser/userPemission/UserPermissionPage"
import UserListPage from "@/pages/manageUser/users/userListPage"

export const ManageUser = [
  { path: PATH.users.customers, element: <UserListPage /> },
  { path: PATH.users.userPermission, element: <UserPermissionPage /> },
]
