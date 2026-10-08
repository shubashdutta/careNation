import {
  Bell,
  Search,
  SlidersHorizontal,
  Menu,
  Settings,
  LogOut,
  Flag,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

interface HeaderProps {
  sidebarExpanded: boolean
  onToggleSidebar: () => void
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="sticky top-0 left-0 z-40 h-20 w-full bg-[#2F234F] text-white transition-all">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Side: Brand Logo / Title & Sidebar Toggle & Search Input */}
        <div className="flex flex-1 items-center gap-4">
          {/* Logo or Brand Name */}
          <div className="flex items-center gap-3 pr-2">
            {/* {Logo ? (
              <img src={Logo} alt="Care Nation Logo" className="h-10 w-auto" />
            ) : (
              <span className="font-serif text-2xl font-bold tracking-wide text-white">
                Care Nation
              </span>
            )} */}
            <h2 className="text-3xl font-semibold text-white">Care Nation</h2>
          </div>

          {/* Toggle Sidebar Button */}
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search Input Bar */}
          <div className="relative w-full max-w-md">
            <div className="relative flex w-full items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="h-11 w-full rounded-xl bg-white pr-10 pl-10 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none"
              />
              <button
                type="button"
                aria-label="Filter"
                className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-[#2F234F] transition-colors hover:bg-purple-100"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Buttons & Profile Dropdown */}
        <div className="flex items-center gap-3">
          {/* Yellow Flag / Quick Action Icon */}
          <button
            aria-label="Action Flag"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D97706] transition-all hover:brightness-95"
          >
            <Flag className="h-5 w-5 fill-current" />
          </button>

          {/* Notifications Button */}
          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-[#1AC32E]" />
          </button>

          {/* User Profile Pill & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full bg-cyan-50 p-1 pr-3.5 pl-1 text-gray-800 transition-colors outline-none hover:bg-cyan-100">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Profile"
                />
                <AvatarFallback className="bg-[#1AC32E] text-white">
                  SG
                </AvatarFallback>
              </Avatar>
              <Settings className="h-5 w-5 text-[#2563EB]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-2 text-gray-800 shadow-lg"
            >
              <div className="py-2">
                <div className="flex items-center gap-3 px-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-[#1AC32E] text-white">
                      SG
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      Sumit Ghimire
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      sumitghimire018@gmail.com
                    </p>
                  </div>
                </div>

                <div className="mx-3 mt-3 w-fit rounded-full bg-[#1AC32E] px-4 py-0.5 text-xs font-medium text-white capitalize">
                  Admin
                </div>

                <Separator className="my-3" />

                <MenuItem
                  icon={<Settings size={16} />}
                  label="Settings"
                  path="/settings"
                />
                <div onClick={() => {}}>
                  <MenuItem icon={<LogOut size={16} />} label="Logout" />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header

const MenuItem = ({
  path,
  icon,
  label,
}: {
  path?: string
  icon: React.ReactNode
  label: string
}) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => {
        if (path) navigate(path)
      }}
      className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
    >
      <span className="text-gray-500">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  )
}
// import { useEffect, useState, useCallback } from "react"
// import {
//   Bell,
//   Search,
//   SlidersHorizontal,
//   Menu,
//   Settings,
//   LogOut,
//   Flag,
// } from "lucide-react"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useNavigate } from "react-router-dom"
// import { Separator } from "@/components/ui/separator"

// interface HeaderProps {
//   sidebarExpanded: boolean
//   onToggleSidebar: () => void
// }

// const Header = ({ sidebarExpanded, onToggleSidebar }: HeaderProps) => {
//   const [isFullscreen, setIsFullscreen] = useState(
//     Boolean(document.fullscreenElement)
//   )

//   const toggleFullscreen = useCallback(async () => {
//     try {
//       if (!document.fullscreenElement) {
//         await document.documentElement.requestFullscreen()
//       } else {
//         await document.exitFullscreen()
//       }
//     } catch (err) {
//       console.error("Fullscreen failed", err)
//     }
//   }, [])

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(Boolean(document.fullscreenElement))
//     }
//     document.addEventListener("fullscreenchange", handleFullscreenChange)
//     return () =>
//       document.removeEventListener("fullscreenchange", handleFullscreenChange)
//   }, [])

//   return (
//     <header className="sticky top-0 left-0 z-40 h-20 w-full bg-[#2F234F] text-white transition-all">
//       <div className="flex h-full items-center justify-between px-6">
//         {/* Left Side: Brand Logo / Title & Sidebar Toggle & Search Input */}
//         <div className="flex flex-1 items-center gap-4">
//           {/* Logo or Brand Name */}
//           <div className="flex items-center gap-3 pr-2">
//             {/* {Logo ? (
//               <img src={Logo} alt="Care Nation Logo" className="h-10 w-auto" />
//             ) : (
//               <span className="font-serif text-2xl font-bold tracking-wide text-white">
//                 Care Nation
//               </span>
//             )} */}
//             <h2 className="text-3xl font-semibold text-white">Care Nation</h2>
//           </div>

//           {/* Toggle Sidebar Button */}
//           <button
//             onClick={onToggleSidebar}
//             aria-label="Toggle sidebar"
//             className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
//           >
//             <Menu className="h-5 w-5" />
//           </button>

//           {/* Search Input Bar */}
//           <div className="relative w-full max-w-md">
//             <div className="relative flex w-full items-center">
//               <Search className="absolute left-3.5 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="h-11 w-full rounded-xl bg-white pr-10 pl-10 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none"
//               />
//               <button
//                 type="button"
//                 aria-label="Filter"
//                 className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-[#2F234F] transition-colors hover:bg-purple-100"
//               >
//                 <SlidersHorizontal className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Quick Action Buttons & Profile Dropdown */}
//         <div className="flex items-center gap-3">
//           {/* Yellow Flag / Quick Action Icon */}
//           <button
//             aria-label="Action Flag"
//             className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D97706] transition-all hover:brightness-95"
//           >
//             <Flag className="h-5 w-5 fill-current" />
//           </button>

//           {/* Notifications Button */}
//           <button
//             aria-label="Notifications"
//             className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
//           >
//             <Bell className="h-5 w-5" />
//             <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-[#1AC32E]" />
//           </button>

//           {/* User Profile Pill & Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full bg-cyan-50 p-1 pr-3.5 pl-1 text-gray-800 transition-colors outline-none hover:bg-cyan-100">
//               <Avatar className="h-9 w-9">
//                 <AvatarImage
//                   src="https://github.com/shadcn.png"
//                   alt="User Profile"
//                 />
//                 <AvatarFallback className="bg-[#1AC32E] text-white">
//                   SG
//                 </AvatarFallback>
//               </Avatar>
//               <Settings className="h-5 w-5 text-[#2563EB]" />
//             </DropdownMenuTrigger>

//             <DropdownMenuContent
//               align="end"
//               sideOffset={10}
//               className="mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-2 text-gray-800 shadow-lg"
//             >
//               <div className="py-2">
//                 <div className="flex items-center gap-3 px-3">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage src="https://github.com/shadcn.png" />
//                     <AvatarFallback className="bg-[#1AC32E] text-white">
//                       SG
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="overflow-hidden">
//                     <p className="truncate text-sm font-semibold text-gray-900">
//                       Sumit Ghimire
//                     </p>
//                     <p className="truncate text-xs text-gray-500">
//                       sumitghimire018@gmail.com
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mx-3 mt-3 w-fit rounded-full bg-[#1AC32E] px-4 py-0.5 text-xs font-medium text-white capitalize">
//                   Admin
//                 </div>

//                 <Separator className="my-3" />

//                 <MenuItem
//                   icon={<Settings size={16} />}
//                   label="Settings"
//                   path="/settings"
//                 />
//                 <div onClick={() => {}}>
//                   <MenuItem icon={<LogOut size={16} />} label="Logout" />
//                 </div>
//               </div>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header

// const MenuItem = ({
//   path,
//   icon,
//   label,
// }: {
//   path?: string
//   icon: React.ReactNode
//   label: string
// }) => {
//   const navigate = useNavigate()
//   return (
//     <div
//       onClick={() => {
//         if (path) navigate(path)
//       }}
//       className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
//     >
//       <span className="text-gray-500">{icon}</span>
//       <span className="font-medium">{label}</span>
//     </div>
//   )
// }
