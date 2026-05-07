import { Outlet } from "react-router-dom";
import {
  Zap,
  LayoutDashboard,
  Gauge,
  LineChart,
  Target,
  Settings,
  LogOut,
} from "lucide-react";
import SidebarLinks from "./SidebarLinks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const AppLayout = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(() =>
    localStorage.getItem("loggedEmail"),
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen ">
      <main className="flex-1 order-1 md:order-2 bg-[#f7fafc] overflow-y-auto">
        <Outlet />
      </main>

      <aside className="md:flex flex-col bg-[#ffffff] order-2 md:order-1 md:border-r md:border-gray-300/70 md:min-w-80">
        {/* logo */}
        <div className="hidden md:flex gap-2 items-center my-4 p-4 ">
          <span className="bg-green-200 p-3 rounded-lg">
            <Zap size={20} color="green" />
          </span>
          <h1 className="font-bold font-s text-2xl text-center">Energytrack</h1>
        </div>

        <div className="hidden md:block ">
          <hr className="border-gray-300/70" />
        </div>
        
        {/* other sidebar */}
        <nav className="flex-1">
          <div className="flex  justify-around p-3 border-t border-gray-300/70 md:flex-col md:gap-3 md:mx-2  md:border-t-0 ">
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
              label="Goals "
            />

            <SidebarLinks
              to="/settings"
              icon={<Settings size={20} />}
              label="Settings"
            />
          </div>
        </nav>

        <div className="hidden md:block ">
          <hr className="border-gray-300/70" />
        </div>

        <footer className=" hidden md:flex p-7 flex-col gap-7 items-center">
          <div className="flex gap-2 items-center">
            <div>
              <span className="h-9 w-9 rounded-full bg-emerald-100 xt-emerald-700 flex items-center justify-center font-bold shrink-0">
                {userEmail ? userEmail[0].toUpperCase() : "U"}
              </span>
            </div>

            <div className="overflow-hidden w-30">
              <p className="text-lg font-semibold text-gray-800 truncate">
                {userEmail || "Guest User"}
              </p>
            </div>
          </div>

          <div>
            <Button variant="logout" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Sign out</span>
            </Button>
          </div>
        </footer>
      </aside>
    </div>
  );
};

export default AppLayout;
