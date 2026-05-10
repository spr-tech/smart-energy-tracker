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

const App = () => {
  const [items, setItems] = useState<Reading[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const KEY = "RdUJ42M8x1jhc4W3lP6c2ytCxEAndo4SJ1cXTahK";

  // ⚠️ NOTE: This URL is still an EXAMPLE structure — adjust to real EIA endpoint if needed
  const EIA_URL =
    `https://api.eia.gov/v2/electricity/retail-sales/data/?api_key=${KEY}` +
    `&data[]=price` +
    `&data[]=sales` +
    `&facets[sectorid][]=RES` +
    `&frequency=monthly` +
    `&sort[0][column]=period` +
    `&sort[0][direction]=desc` +
    `&length=100`;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(EIA_URL);

        console.log("RAW API RESPONSE:", response.data);
        console.log("FULL RESPONSE:", response);
        console.log("DATA ONLY:", response.data);

        // ⚠️ Adjust depending on actual API response shape
        const rawData = response.data?.response?.data || [];
        console.log("raw:", rawData[0]);

        const formattedData: Reading[] = rawData.map((item: any) => ({
          id: crypto.randomUUID(),
          date: item.period,
          kwh: Number(item.sales) * 1000,
          cost: item.price,
          p: item.stateDescription || "No notes",.''
        }));

        setItems(formattedData);
        // console.log("ITEMS:", formattedData);

        setFetchError(null);
      } catch (err) {
        if (err instanceof Error) {
          setFetchError(err.message);
        } else {
          setFetchError("Unknown error occurred");
        }
        // console.log("STATE ITEMS:", items);
        //   console.log("API ERROR:", err);
      }
    };

    fetchItems();
  }, [EIA_URL]);

  return (
    <div>
      {/* Show error if exists */}
      {fetchError && (
        <p style={{ color: "red", textAlign: "center" }}>{fetchError}</p>
      )}
      =
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected pages */}
        <Route element={<AuthGuard />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="readings" element={<Readings items={items} />} />
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
