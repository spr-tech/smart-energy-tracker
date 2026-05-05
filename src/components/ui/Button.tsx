type ButtonProps = {
  children: React.ReactNode;
  type?: "default" | "signup" | "signin";
};

const Button = ({ children, type = "default" }: ButtonProps) => {
  const buttonStyles = {
    default: "",
    signup: "text-emerald-700 font-semibold",
    signin:
      "bg-emerald-500 text-white text-center p-3 rounded-md text-md hover:bg-emerald-300",
  };
  return (
    <button className={`cursor-pointer  ${buttonStyles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
