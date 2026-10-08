import { SidebarData } from "@/data";

const moduleNameToSidebarTitle: Record<string, string> = {
  lead: "Leads",
  target: "Target Task",
};

export const getActiveSidebarItems = (
  moduleData: { app_name: string; is_active: boolean }[]
) => {
  const activeModules =
    moduleData
      ?.filter((mod) => mod.is_active)
      .map((mod) => moduleNameToSidebarTitle[mod.app_name] || mod.app_name) ||
    [];

  if (!activeModules.includes("Dashboard")) {
    activeModules.unshift("Dashboard");
  }

  const activeSidebar = SidebarData.map((section) => ({
    ...section,
    items: section.items.filter((item) => activeModules.includes(item.title)),
  })).filter((section) => section.items.length > 0);

  return activeSidebar;
};
