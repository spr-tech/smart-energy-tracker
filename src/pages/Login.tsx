import { Zap, Eye, EyeOff } from "lucide-react";
import Button from "../components/ui/Button";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPasswrd, setShowPasswrd] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailError || passwordError) {
      const timer = setTimeout(() => {
        setEmailError(null);
        setPasswordError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [emailError, passwordError]);

  const isLoggedin = localStorage.getItem("token");
  if (isLoggedin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    let isValid: boolean = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email");
        isValid = false;
      }
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;

    const saved = localStorage.getItem("registeredUser");

    if (!saved) {
      setEmailError("Account not found, click signup to register");
      return;
    }

    const verifiedUser = JSON.parse(saved) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (verifiedUser.email !== email) {
      setEmailError("Account not found, click signup to register");
      return;
    }

    if (verifiedUser.password !== password) {
      setPasswordError("incorrect password");
      return;
    }

    localStorage.setItem("token", "springle");

    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen md:h-screen items-center justify-center bg-gray-100 p-4">
      {/* Icon */}
      <div className="flex flex-col gap-3 items-center mb-6 text-center">
        <span className="bg-emerald-200/30 p-3 rounded-xl">
          <Zap size={50} className="text-button" />
        </span>
        <h1 className="text-3xl font-semibold text-gray-800">EnergyTrack</h1>
        <p className="text-gray-500 text-lg">
          Smart energy consumption dashboard
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-xl shadow-gray-200/50 p-6 rounded-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="mb-6">
            <h3 className="font-semibold text-2xl text-gray-800">
              Welcome back
            </h3>
            <p className="text-gray-500">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Email Group */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={`font-medium mb-1 ${emailError ? "text-red-600" : "text-gray-700"}`}
            >
              Email
            </label>
            <input
              autoFocus
              id="email"
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded-xl p-2 bg-gray-50/50 outline-none transition-all focus:bg-white focus:border-emerald-500"
            />
            <div className="h-6 mt-1">
              {emailError && (
                <span className="text-red-600 text-sm animate-fade-in">
                  {emailError}
                </span>
              )}
            </div>
          </div>

          {/* Password Group */}
          <div className="flex flex-col mt-2">
            <label
              htmlFor="password"
              className={`font-medium mb-1 ${passwordError ? "text-red-600" : "text-gray-700"}`}
            >
              Password
            </label>

            <div className="flex border border-gray-200 rounded-xl p-2 bg-gray-50/50 transition-all focus-within:bg-white focus-within:border-emerald-500">
              <input
                id="password"
                type={showPasswrd ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              <Button
                type="button"
                onClick={() => setShowPasswrd((prev) => !prev)}
              >
                {showPasswrd ? <Eye size={20} /> : <EyeOff size={20} />}
              </Button>
            </div>
            <div className="h-6 mt-1">
              {passwordError && (
                <span className="text-red-600 text-sm animate-fade-in">
                  {passwordError}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Button variant="sign" type="submit" className="bg-button">
              Sign in
            </Button>
          </div>
        </form>

        <div className="flex gap-2 justify-center mt-6 text-gray-600">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
