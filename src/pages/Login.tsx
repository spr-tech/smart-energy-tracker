import { Zap } from "lucide-react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSumbmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("enter email and password");
      return;
    }

    localStorage.setItem("token", "fake-token");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen items-center  justify-center bg-gray-100 ">
      <div className="flex flex-col gap-3 items-center mb-6">
        <span className="bg-emerald-200/30 p-3 rounded-xl">
          <Zap size={50} color="green" />
        </span>
        <h1 className="text-3xl font-semibold">EnergyTrack</h1>
        <span className="text-gray-500 text-xl">
          Smart energy consumption dashboard
        </span>
      </div>

      <div className="bg-white shadow shadow-gray-700/30 p-3 rounded-lg w-full max-w-lg">
        <form
          action=""
          onSubmit={handleSumbmit}
          className="flex flex-col gap-5 w-full p-3"
        >
          <div>
            <h3 className="font-semibold text-xl">Welcome back</h3>
            <span className="text-gray-500">
              Enter your credentials to access your dashboard
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-semibold text-lg">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 
             bg-gray-50/50 outline-none transition-all
             focus:bg-white focus:border-emerald-500 
              focus:outline-4 focus:outline-emerald-500/20 placeholder:text-xl "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-semibold text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="....."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border border-gray-200 rounded-xl p-3 
             bg-gray-50/50 outline-none transition-all
             focus:bg-white focus:border-emerald-500 
              focus:outline-4 focus:outline-emerald-500/20 placeholder:text-xl "
            />
          </div>

          <Button type="signin">Sign in</Button>
        </form>

        <div className=" flex gap-2 justify-center ">
          <span>Don't have an account?</span>
          {/* <Button type="signup">Sign up</Button> */}
          <Link to="/signup" className="text-emerald-500 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
