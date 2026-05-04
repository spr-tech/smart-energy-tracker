import AppLayout from "./components/layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import Readings from "./pages/Readings";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <div>
      <Routes>
        {/* {Auth pages} */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/readings" element={<Readings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/Goals" element={<Goals />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
