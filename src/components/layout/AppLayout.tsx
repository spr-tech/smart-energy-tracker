import { Outlet } from "react-router-dom";
import {
  Zap,
  LayoutDashboard,
  Gauge,
  LineChart,
  Target,
  Settings,
} from "lucide-react";
import SidebarLinks from "./SidebarLinks";

const AppLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen ">
      <main className="flex-1 order-1 md:order-2 bg-mist-100 overflow-y-auto">
        <Outlet />
      </main>

      <aside className="bg-neutral-100 order-2 md:order-1 md:border-r md:border-gray-300/70 md:p-4">
        <div className="hidden md:flex gap-2 items-center my-4 p-4 ">
          <span className="bg-green-200 p-3 rounded-lg">
            <Zap size={20} color="green" />
          </span>
          <h1 className="font-bold font-s text-2xl text-center">Energytrack</h1>
        </div>

        <nav className="flex justify-around  p-3 border-t border-gray-300/70  md:flex-col md:gap-1 md:px-3 md:border-t-0 md:w-60">
          <SidebarLinks
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />

          <SidebarLinks
            to="/readings"
            icon={<Gauge size={20} />}
            label="Readings"
          />

          <SidebarLinks
            to="/analytics"
            icon={<LineChart size={20} />}
            label="Analytics"
          />

          <SidebarLinks
            to="/goals"
            icon={<Target size={20} />}
            label="Goals and reports"
          />

          <SidebarLinks
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
        </nav>
      </aside>
    </div>
  );
};

export default AppLayout;
