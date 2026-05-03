import AppLayout from "./components/layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <div>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AppLayout>
    </div>
  );
};

export default App;
