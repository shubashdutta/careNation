export interface SidebarChild {
  id: number;
  title: string;
  path: string;
}

export interface SidebarItemData {
  id: number;
  title: string;
  path?: string;
  icon: React.ReactElement<{ className?: string }>;
  children?: SidebarChild[];
}

export interface SidebarSection {
  id: number;
  label: string;
  items: SidebarItemData[];
}
