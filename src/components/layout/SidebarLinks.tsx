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
        `flex flex-col  sm:text-slate-500 text-[10px] sm:text-sm md:text-[1.3rem] font-semibold md:font-medium md:flex-row md:gap-2 items-center ${isActive ? "md:bg-green-100 text-button md:p-2 md:rounded-lg" : "text-slate-400 md:hover:bg-slate-100 md:p-2 rounded-lg hover:text-slate-900"}`
      }
    >
      <span>{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarLinks;
