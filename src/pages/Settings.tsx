import { useState } from "react";
import Button from "../components/ui/Button";
// import { useContext } from "react";

import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [userLoggedInfo, setUserLoggedInfo] = useState<{
    name: string;
    email: string;
  } | null>(() => {
    const saved = localStorage.getItem("registeredUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [formValues, setFormValues] = useState({
    name: userLoggedInfo?.name ?? "",
    email: userLoggedInfo?.email ?? "",
  });

  const [saveChanges, setSaveChanges] = useState(false);

  const handleSave = () => {
    const updated = { ...userLoggedInfo, ...formValues };
    setUserLoggedInfo(updated);
    localStorage.setItem("registeredUser", JSON.stringify(updated));
    setSaveChanges(true);
    setTimeout(() => setSaveChanges(false), 2000);
  };

  const hasChanges =
    userLoggedInfo?.name !== formValues.name ||
    userLoggedInfo.email !== formValues.email;

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto ">
        <header className="mb-6">
          <h3 className="font-bold text-2xl text-slate-800">Settings </h3>
          <span className="text-slate-600 ">
            Manage your account and app preferences.
          </span>
        </header>

        <section className=" flex flex-col gap-5 p-3 shadow-md border border-slate-200 rounded-lg mb-9">
          <div>
            <h3 className="text-base text-gray-800 font-medium ">
              Profile & Preferences
            </h3>
            <span className="text-slate-600 text-sm">
              Update your personal info and billing rates
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex flex-col">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="outline-button h-10 w-full md:w-80 rounded-lg ring ring-slate-300 p-2"
                value={formValues?.name}
                onChange={(e) =>
                  setFormValues((v) => ({ ...v, name: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="">Email</label>

              <input
                type="text"
                disabled
                className="outline-button w-full h-10 md:w-80 rounded-lg ring
              ring-slate-300 p-2 cursor-not-allowed text-slate-400"
                value={formValues?.email}
              />
            </div>
          </div>

          <div>
            <Button
              onClick={handleSave}
              className={`text-white text-lg p-2 rounded-lg font-medium transition-colors duration-200 ${
                saveChanges
                  ? "bg-green-400 cursor-default"
                  : hasChanges
                    ? "bg-button hover:bg-green-300"
                    : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {saveChanges ? "Saved ✓" : "Save Changes"}
            </Button>
          </div>
        </section>

        <section className=" flex flex-col gap-5 p-3 shadow-md border border-red-400 rounded-lg">
          {/* Clear Readings */}
          <div>
            <h1 className="text-red-500 font-medium text-[1.2rem]">
              Danger Zone
            </h1>
            <span className="text-slate-400">Irreversible actions.</span>
          </div>

          <div className="flex justify-between items-center border border-red-200 p-3 bg-red-50 rounded-lg">
            <div>
              <h1 className="text-slate-800 font-medium">Clear All Data</h1>
              <span className="text-slate-500">
                Permanently delete all your energy readings
              </span>
            </div>

            <Button className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-300 transition-colors duration-200">
              Clear Readings
            </Button>
          </div>

          {/* Sign out */}
          <div className="flex justify-between items-center border border-red-200 p-3 rounded-lg">
            <div>
              <h1 className="text-slate-800 font-medium transition-colors duration-300">
                Sign Out
              </h1>
              <span className="text-slate-500">
                Log out of your account on this device
              </span>
            </div>

            <Button
              onClick={handleSignOut}
              className=" text-slate-800 p-2 rounded-lg border border-slate-200 shadow-sm hover:bg-black hover:text-white transition-colors duration-200"
            >
              Sign Out
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Settings;
