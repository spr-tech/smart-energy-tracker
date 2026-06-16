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
          "flex  items-center  sm:text-sm font-semibold pt-4 pb-1 md:font-medium md:flex-row md:gap-2 md:p-2 md:rounded-lg";
        const active = "text-button md:bg-green-100";
        const inactive =
          "text-slate-500 md:hover:bg-slate-100 md:hover:text-slate-900";
        return `${base} ${isActive ? active : inactive}`;
      }}
    >
      <span className="relative group">
        {icon}
        <span className="absolute bottom-full mt-2 left-1/2 -translate-x-1/2 bg-button text-white text-xs px-2 py-1 rounded whitespace-nowrap hidden group-hover:block md:hidden">
          {label}
        </span>
      </span>
      <span className="hidden md:block md:text-[1rem]">{label}</span>
    </NavLink>
  );
};

export default SidebarLinks;
