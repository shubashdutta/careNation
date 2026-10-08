import SidebarItem from "./sidebar-item";

export interface SidebarProps {
  sidebarExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarExpanded }) => {
  return (
    <aside
      className={`
      relative h-full bg-white
      transition-[width] duration-300 ease-in-out
      min-w-20
      ${sidebarExpanded ? "w-64" : "w-20"}
      overflow-hidden
    `}
    >
      <div className="h-full overflow-x-hidden overflow-y-auto">
        <SidebarItem sidebarExpanded={sidebarExpanded} />
      </div>
    </aside>
  );
};

export default Sidebar;
