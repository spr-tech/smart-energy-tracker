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

// type AppLayoutProps = {
//   handleOpenModal: () => void;
//   errorMessage: string | null;
// };

const AppLayout = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("fdgfgg");
  }

  const { fetchError, handleAddModalClick } = context;

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
        {fetchError ? (
          <p className="flex justify-center items-center h-screen text-red-400  font-bold">
            {fetchError}
          </p>
        ) : (
          <div className="px-5 py-7 lg:px-20">
            <Outlet />
          </div>
        )}
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
          <div className="flex justify-around gap-4 p-3 border-t border-gray-300/70 md:flex-col md:gap-3 md:mx-2 md:border-t-0  md:items-stretch">
            {/* Add button container */}
            <div className="hidden md:flex bg-button hover:bg-emerald-400 w-full items-center justify-center p-3 rounded-lg mt-4 mb-6">
              <Button
                className="flex flex-1 justify-center items-center gap-3 text-white"
                onClick={handleAddModalClick}
              >
                <span className="rounded-full ring-2 ring-gray-200 p-1">
                  {<Plus size={23} />}
                </span>
                <span>Add reading </span>
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

            <SidebarLinks
              to="/tips"
              icon={<Target size={20} />}
              label="Tips "
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
            <Button
              className="flex gap-2 text-black font-semi hover:underline font-semibold text-lg"
              onClick={handleLogout}
            >
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
