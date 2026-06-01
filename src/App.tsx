import AppLayout from "./components/layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Readings from "./pages/Readings";
import Tips from "./pages/Tips";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";
import AuthGuard from "./components/AuthGuard";
import { useContext, useEffect } from "react";
import axios from "axios";
import { ReadingContext } from "./context/ReadingsContext";
import AddModal from "./components/readingsInfo/AddModal";

const App = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ReadingContext must be used inside Provider");
  }

  const { API_URL, setItems, setFetchError, setIsLoading, modalButton } =
    context;

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(API_URL);
        const sorted = [...(response?.data || [])].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setItems(sorted);
        setIsLoading(false);
        setFetchError("");
      } catch (err) {
        if (err instanceof Error) {
          setFetchError(err.message);
          setIsLoading(false);
        } else {
          setFetchError("Unknown error occurred");
        }
      }
    };

    fetchItems();
  }, [API_URL, setItems, setFetchError, setIsLoading]);

  return (
    <div className="h-dvh overflow-hidden">
      {modalButton && <AddModal />}

      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected pages */}
        <Route element={<AuthGuard />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="readings" element={<Readings />} />
            <Route path="tips" element={<Tips />} />
            <Route path="goals" element={<Goals />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
