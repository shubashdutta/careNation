import { useEffect, useState } from "react"
import Header from "./header"
import Sidebar from "./sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(() => {
    const saved = localStorage.getItem("sidebar-expanded")
    return saved ? saved === "true" : true
  })

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", String(sidebarExpanded))
  }, [sidebarExpanded])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <Header
        sidebarExpanded={sidebarExpanded}
        onToggleSidebar={() => setSidebarExpanded((prev) => !prev)}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="sidebar-scroll h-full overflow-y-auto no-scrollbar">
          <Sidebar sidebarExpanded={sidebarExpanded} />
        </div>

        <main className="flex-1 overflow-auto bg-[#e9ebee]/60 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
