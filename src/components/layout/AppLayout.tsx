import { Outlet } from "react-router-dom";
import {
  Zap,
  LayoutDashboard,
  Gauge,
  LineChart,
  Target,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import SidebarLinks from "./SidebarLinks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useContext } from "react";
import { ReadingContext } from "../../context/ReadingsContext";

const AppLayout = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ReadingContext must be used inside a Provider");
  }

  const { fetchError, handleAddModalClick, successMessage } = context;
  const navigate = useNavigate();
  const [userEmail] = useState<string | null>(() =>
    localStorage.getItem("loggedEmail"),
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-50 overflow-hidden">
      {/* SUCCESS message */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-green-500 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-lg animate-fade-in">
          {successMessage}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 flex flex-col bg-white border-t border-gray-200 md:relative md:h-full md:w-64 md:min-w-[16rem] md:border-t-0 md:border-r md:border-gray-300/70 shrink-0">
        {/* LOGO */}
        <div className="hidden md:flex gap-2 items-center my-4 p-4">
          <span className="bg-green-200 p-3 rounded-lg">
            <Zap size={20} color="green" />
          </span>
          <h1 className="font-bold text-2xl text-center">Energytrack</h1>
        </div>

        <div className="hidden md:block">
          <hr className="border-gray-300/70" />
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto">
          <div className="flex justify-around items-center p-2 md:flex-col md:gap-3 md:p-4 md:items-stretch">
            {/* ADD ACTION BUTTON */}
            <div className="hidden md:flex bg-button hover:bg-emerald-400 w-full items-center justify-center px-3 py-1 rounded-lg mb-4">
              <Button
                className="flex flex-1 justify-center items-center gap-3 text-white"
                onClick={handleAddModalClick}
              >
                <span className="rounded-full ring-2 ring-gray-200 p-1">
                  <Plus size={12} />
                </span>
                <span>Add reading</span>
              </Button>
            </div>

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
              to="/goals"
              icon={<LineChart size={20} />}
              label="Goals"
            />
            <SidebarLinks to="/tips" icon={<Target size={20} />} label="Tips" />
            <SidebarLinks
              to="/settings"
              icon={<Settings size={20} />}
              label="Settings"
            />
          </div>
        </nav>

        <div className="hidden md:block">
          <hr className="border-gray-300/70" />
        </div>

        {/* USER PROFILE & LOGOUT FOOTER */}
        <footer className="hidden md:flex p-6 flex-col gap-6 items-center bg-white">
          <div className="flex gap-3 items-center w-full px-2">
            <span className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
              {userEmail ? userEmail[0].toUpperCase() : "U"}
            </span>

            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {userEmail ? userEmail.split("@")[0] : "Guest User"}
              </p>
              <span className="text-xs text-gray-400 block truncate">
                {userEmail}
              </span>
            </div>
          </div>

          <div className="w-full">
            <Button
              className="flex gap-2 items-center text-gray-700 font-semibold text-sm hover:text-red-500 hover:underline w-full justify-center"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </Button>
          </div>
        </footer>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto pb-20 md:pb-0 bg-slate-50">
        {fetchError ? (
          <div className="flex justify-center items-center h-full text-red-500 font-bold p-4">
            {fetchError}
          </div>
        ) : (
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-8xl mx-auto">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
};

export default AppLayout;
