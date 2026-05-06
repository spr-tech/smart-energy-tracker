import { Zap } from "lucide-react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors and flag
    setEmailError(null);
    setPasswordError(null);
    let isValid: boolean = true;

    // Email Validation
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

    // Password Validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;

    localStorage.setItem("token", "springle");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col gap-3 items-center mb-6 text-center">
        <span className="bg-emerald-200/30 p-3 rounded-xl">
          <Zap size={50} className="text-emerald-600" />
        </span>
        <h1 className="text-3xl font-semibold text-gray-800">EnergyTrack</h1>
        <p className="text-gray-500 text-lg">
          Smart energy consumption dashboard
        </p>
      </div>

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
              className={
                emailError
                  ? "font-medium text-red-600 mb-1"
                  : "font-medium text-gray-00 mb-1"
              }
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
              className="border border-gray-200 rounded-xl p-3 bg-gray-50/50 outline-none transition-all focus:bg-white focus:border-emerald-500 f"
            />
            <div className="h-6 mt-1">
              {emailError && (
                <span className="text-red-600 text-sm">{emailError}</span>
              )}
            </div>
          </div>

          {/* Password Group */}
          <div className="flex flex-col mt-2">
            <label
              htmlFor="password"
              className={
                passwordError
                  ? "font-medium text-red-600 mb-1"
                  : "font-medium text-gray-00 mb-1"
              }
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 bg-gray-50/50 outline-none transition-all focus:bg-white focus:border-emerald-500 "
            />
            <div className="h-6 mt-1">
              {passwordError && (
                <span className="text-red-600 text-sm">{passwordError}</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Button type="signin">Sign in</Button>
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
