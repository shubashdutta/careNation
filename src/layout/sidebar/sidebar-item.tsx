import React, { useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { FiChevronRight, FiChevronDown } from "react-icons/fi"
import type { SidebarItemData } from "./type"
import { SidebarData } from "@/data"

const SidebarItem = ({ sidebarExpanded }: { sidebarExpanded: boolean }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [openMenus, setOpenMenus] = useState<number[]>([])
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null)

  const toggleMenu = (id: number) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]
    )
  }

  const isParentActive = (item: SidebarItemData): boolean => {
    if (item.path && item.path !== "" && location.pathname === item.path)
      return true
    if (item.children) {
      return item.children.some(
        (child) =>
          child.path && child.path !== "" && location.pathname === child.path
      )
    }
    return false
  }

  const renderItem = (item: SidebarItemData) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openMenus.includes(item.id)
    const isHovered = hoveredMenu === item.id
    const active = isParentActive(item)

    return (
      <div key={item.id} className="space-y-1">
        <div
          className="relative flex items-center"
          onMouseEnter={() => setHoveredMenu(item.id)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          {hasChildren ? (
            <div
              onClick={() => {
                if (item.path) navigate(item.path)
                toggleMenu(item.id)
              }}
              className={`group flex h-12 w-full cursor-pointer items-center rounded-md px-4 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary-500 text-white"
                  : "text-[#2F234F] hover:bg-gray-100 hover:text-gray-900"
              } ${!sidebarExpanded ? "justify-center px-0" : ""}`}
            >
              {React.cloneElement(item.icon, {
                className: "h-5 w-5 shrink-0 transition-all duration-200",
              })}
              {sidebarExpanded && (
                <>
                  <span className="ml-3.5 flex-1 truncate text-sm font-medium">
                    {item.title}
                  </span>
                  <span className="ml-auto shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <FiChevronDown className="h-4 w-4" />
                    ) : (
                      <FiChevronRight className="h-4 w-4" />
                    )}
                  </span>
                </>
              )}
            </div>
          ) : (
            <NavLink
              to={item.path || "/"}
              onClick={() => setOpenMenus([])}
              className={({ isActive }) =>
                `group flex h-12 w-full items-center rounded-md px-4 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-[#2F234F] hover:bg-gray-100 hover:text-gray-900"
                } ${!sidebarExpanded ? "justify-center px-0" : ""}`
              }
            >
              {React.cloneElement(item.icon, {
                className: "h-5 w-5 shrink-0 transition-all duration-200",
              })}
              {sidebarExpanded && (
                <span className="ml-3.5 truncate text-sm font-medium">
                  {item.title}
                </span>
              )}
            </NavLink>
          )}

          {/* Hover Menu Popover for Collapsed Sidebar */}
          {!sidebarExpanded && hasChildren && isHovered && (
            <div
              className="absolute top-0 left-full z-50 ml-2 min-w-52 animate-in rounded-md border border-gray-100 bg-white py-2 shadow-xl duration-150 fade-in slide-in-from-left-2"
              onMouseEnter={() => setHoveredMenu(item.id)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className="border-b border-gray-100 px-4 py-2">
                <span className="font-semibold text-gray-900">
                  {item.title}
                </span>
              </div>
              <div className="py-1">
                {item.children!.map((child) => {
                  const isChildActive = location.pathname === child.path
                  return (
                    <NavLink
                      key={child.id}
                      to={child.path}
                      className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                        isChildActive
                          ? "bg-primary-500 font-medium text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                      }`}
                    >
                      <span>{child.title}</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Expanded Submenu List */}
        {hasChildren && isOpen && sidebarExpanded && (
          <div className="ml-8 flex flex-col space-y-1 border-l-2 border-gray-100 py-1 pl-3 transition-all duration-200">
            {item.children!.map((child) => (
              <NavLink
                key={child.id}
                to={child.path}
                className={({ isActive }) =>
                  `flex h-9 items-center rounded-md px-3 text-xs transition-all duration-150 ${
                    isActive
                      ? "bg-green-50 font-semibold text-primary-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2 px-3 py-4">
      {SidebarData.map((section) => (
        <div key={section.id} className="space-y-1.5">
          {sidebarExpanded && section.label && (
            <p className="px-4 pb-1 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              {section.label}
            </p>
          )}
          {section.items.map(renderItem)}
        </div>
      ))}
    </div>
  )
}

export default SidebarItem
