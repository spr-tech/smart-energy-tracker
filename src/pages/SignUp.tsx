import { Zap } from "lucide-react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const SignUp = () => {
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
        <form action="" className="flex flex-col gap-5 w-full p-3">
          <div className="mb-4">
            <h3 className="font-semibold text-xl">Create an account</h3>
            <span className="text-gray-500">
              Enter your details to get started
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-semibold text-lg">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="border border-gray-200 rounded-xl p-3 
             bg-gray-50/50 outline-none transition-all
             focus:bg-white focus:border-emerald-500 
              focus:outline-4 focus:outline-emerald-500/20 placeholder:text-xl "
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-semibold text-lg">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="you@example.com"
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
              className=" border border-gray-200 rounded-xl p-3 
             bg-gray-50/50 outline-none transition-all
             focus:bg-white focus:border-emerald-500 
              focus:outline-4 focus:outline-emerald-500/20 placeholder:text-xl "
            />
          </div>

          <Button type="signin">Sign up</Button>
        </form>

        <div className=" flex gap-2 justify-center ">
          <span>Don't have an account?</span>
          {/* <Button type="signup">Sign in</Button> */}
          <Link to="/login" className="text-emerald-500 font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
