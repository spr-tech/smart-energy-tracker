import { Zap, Eye, EyeOff } from "lucide-react";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPasswrd, setShowPasswrd] = useState<boolean>(false);

  //error state
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      const timer = setTimeout(() => {
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [nameError, emailError, passwordError]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors and flag
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

    let isValid = true;

    // setting name state
    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.length < 2) {
      setNameError("Name must me atleast 2 characters");
      isValid = false;
    }

    // setting email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Enter a vaid email address");
        isValid = false;
      }
    }

    //setting password
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    //the check
    if (!isValid) return;

    localStorage.setItem("token", "springle");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen md:h-screen items-center justify-center bg-gray-100 p-6 ">
      <div className="flex flex-col gap-3 items-center mb-6 mt-5">
        <span className="bg-emerald-200/30 p-3 rounded-xl">
          <Zap size={50} color="green" />
        </span>
        <h1 className="text-3xl font-semibold b">EnergyTrack</h1>
        <span className="text-gray-500 text-xl">
          Smart energy consumption dashboard
        </span>
      </div>

      <div className="bg-white shadow shadow-gray-700/30 p-3 rounded-lg w-full max-w-lg">
        <form
          action=""
          className="flex flex-col gap-6 w-full p-3"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-xl">Create an account</h3>
            <span className="text-gray-500">
              Enter your details to get started
            </span>
          </div>

          {/* name group */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-00 mb-1">
              Name
            </label>
            <input
              autoFocus
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded-xl p-2
             bg-gray-50/50 outline-none transition-all
             focus:bg-white focus:border-emerald-500 
              focus:outline-4 focus:outline-emerald-500/20 placeholder:text-xl "
            />

            <div className="h-3  ">
              {nameError && (
                <span className="text-red-600 text-md">{nameError}</span>
              )}
            </div>
          </div>

          {/* Email group */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-00 mb-1">
              Email
            </label>

            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="border border-gray-200 rounded-xl p-2 
             bg-gray-50/50 outline-none transition-all
             focus:bg-white focus:border-emerald-500 
              focus:outline-4 focus:outline-emerald-500/20 placeholder:text-xl "
            />

            <div className="h-3  ">
              {emailError && (
                <span className="text-red-600 text-md">{emailError}</span>
              )}
            </div>
          </div>

          {/* password group */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-gray-00 mb-1">
              Password
            </label>

            {/* show password toggler included */}
            <div
              className=" flex border border-gray-200 rounded-xl p-2 
             bg-gray-50/50 outline-none transition-all focus-within:border-emerald-500 
             "
            >
              <input
                id="password"
                type={showPasswrd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="....."
                className=" flex-1 outline-0 placeholder:text-xl"
              />

              <button
                type="button"
                onClick={() => setShowPasswrd((prev) => !prev)}
              >
                {showPasswrd ? <Eye size={20} /> : <EyeOff size={20} />}{" "}
              </button>
            </div>

            <div className="h-3 mb-2 ">
              {passwordError && (
                <span className=" text-red-600 text-md">{passwordError}</span>
              )}
            </div>
          </div>

          <Button variant="sign" type="submit">
            Sign up
          </Button>
        </form>

        <div className=" flex gap-2 justify-center ">
          <span>Don't have an account?</span>
          {/* <Button type="signup">Sign in</Button> */}
          <Link
            to="/login"
            className="text-emerald-500 font-medium hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
