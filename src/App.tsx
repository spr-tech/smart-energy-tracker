import AppLayout from "./components/layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Readings from "./pages/Readings";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";
import AuthGuard from "./components/AuthGuard";
import { useState, useEffect } from "react";
import type { Reading } from "./type/types";
import axios from "axios";
import ReadingsTable from "./components/readingsInfo/ReadingsTable";

const App = () => {
  const [items, setItems] = useState<Reading[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalButton, setModalButton] = useState<boolean>(false);

  const handleModalButton = () => {
    setModalButton((prev) => !prev);
  };
  console.log("powe:", setModalButton);
  const API_URL =
    "https://6a0371192afe8349b4b5376a.mockapi.io/api/energydata/energydata";

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(API_URL);

        setTimeout(() => {
          setItems(response?.data || []);
          setIsLoading(false);
        }, 2000);
        // console.log("ITEMS:", formattedData);

        setFetchError(null);
      } catch (err) {
        if (err instanceof Error) {
          setFetchError(err.message);
          setIsLoading(false);
        } else {
          setFetchError("Unknown error occurred");
        }
        // console.log("STATE ITEMS:", items);
        //   console.log("API ERROR:", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      {/* Show error if exists */}

      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected pages */}
        <Route element={<AuthGuard />}>
          <Route
            path="/"
            element={
              <AppLayout
                handleOpen={handleModalButton}
                errorMessage={fetchError}
              />
            }
          >
            <Route index element={<DashBoard />} />
            <Route
              path="readings"
              element={
                <Readings
                  isLoading={isLoading}
                  isOpen={modalButton}
                  setItems={setItems}
                  handleToggle={handleModalButton}
                  closeModal={setModalButton}
                  setErrorMessage={setFetchError}
                >
                  <ReadingsTable
                    items={items}
                    setItems={setItems}
                    setErrorMessage={setFetchError}
                  />
                </Readings>
              }
            />
            <Route path="analytics" element={<Analytics />} />
            <Route path="goals" element={<Goals />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
