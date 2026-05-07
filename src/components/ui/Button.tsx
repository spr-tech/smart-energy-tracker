type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "sign" | "logout";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

const Button = ({
  children,
  variant = "default",
  type = "button",
  onClick,
  className = "",
}: ButtonProps) => {
  const buttonStyles = {
    default: "",
    sign: "bg-button text-white text-center p-3 rounded-md text-md hover:bg-emerald-400",
    logout:
      " flex gap-2 text-black font-semi hover:underline font-semibold text-lg",
  };
  return (
    <button
      type={type}
      className={`cursor-pointer  ${buttonStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
