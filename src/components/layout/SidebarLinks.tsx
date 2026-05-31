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
      className={({ isActive }) => {
        const base =
          "flex flex-col items-center text-[10px] sm:text-sm md:text-base font-semibold md:font-medium md:flex-row md:gap-2 md:p-2 md:rounded-lg";
        const active = "text-button md:bg-green-100";
        const inactive =
          "text-slate-400 md:hover:bg-slate-100 md:hover:text-slate-900";
        return `${base} ${isActive ? active : inactive}`;
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarLinks;