import { PATH } from "@/constant/path"
import AddNewTeam from "@/pages/team/add-new"
import EditProfile from "@/pages/team/edit-profile"
import MatchingTree from "@/pages/team/matching-tree"
import MyStructure from "@/pages/team/my-structure"
import UserList from "@/pages/team/user-list"
import ViewProfile from "@/pages/team/view-profile"
import GoldTeam from "@/pages/team/gold-team"
import TeamView from "@/pages/team/team-view"
import DiamondTeam from "@/pages/team/diamond-team"
import KycStatus from "@/pages/team/kyc-status"
import EditKyc from "@/pages/team/kyc-status/edit"
import ReferralList from "@/pages/team/referral-list"
import BlockUnblock from "@/pages/team/block-unblock"
import ChangePassword from "@/pages/team/change-password"
import MemberLoginPage from "@/pages/team/memberLogin/MemberLoginPage"

export const teamRoutes = [
  {
    path: PATH.team.add,
    element: <AddNewTeam />,
  },
  {
    path: PATH.team.matchingTree,
    element: <MatchingTree />,
  },
  {
    path: PATH.team.teamStructure,
    element: <MyStructure />,
  },
  {
    path: PATH.team.userList,
    element: <UserList />,
  },
  {
    path: PATH.team.userProfile,
    element: <EditProfile />,
  },
  {
    path: PATH.team.viewProfile,
    element: <ViewProfile />,
  },
  {
    path: PATH.team.goldTeam,
    element: <GoldTeam />,
  },
  {
    path: PATH.team.diamondTeam,
    element: <DiamondTeam />,
  },
  {
    path: PATH.team.teamView,
    element: <TeamView />,
  },
  {
    path: PATH.team.kycStatus,
    element: <KycStatus />,
  },
  {
    path: PATH.team.editKyc,
    element: <EditKyc />,
  },
  {
    path: PATH.team.referralList,
    element: <ReferralList />,
  },
  {
    path: PATH.team.blockUnblock,
    element: <BlockUnblock />,
  },

  {
    path: PATH.team.memberLogin,
    element: <MemberLoginPage />,
  },
  {
    path: PATH.team.changePassword,
    element: <ChangePassword />,
  },
]
