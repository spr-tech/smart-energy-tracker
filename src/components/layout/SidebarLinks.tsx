import { NavLink } from "react-router-dom";
type SidebarLinksProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const SidebarLinks = ({ to, icon, label }: SidebarLinksProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col md:flex-row items-center ${isActive ? "md:bg-green-200 text-green-400" : "text-slate-500 mdhover:bg-slate-100 hover:text-slate-900"}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarLinks;
