type ButtonProps = {
  children: React.ReactNode;
  type?: "default" | "signup" | "signin" | "logout";
  onClick?: () => void;
};

const Button = ({ children, type = "default", onClick }: ButtonProps) => {
  const buttonStyles = {
    default: "",
    signup: "text-emerald-700 font-semi ",
    signin:
      "bg-emerald-500 text-white text-center p-3 rounded-md text-md hover:bg-emerald-300",
    logout:
      " flex gap-2 text-black font-semi hover:underline font-semibold text-lg",
  };
  return (
    <button
      className={`cursor-pointer  ${buttonStyles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
