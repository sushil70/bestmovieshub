import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
}) => {
  // Define base styles for the button
  const baseStyles =
    "px-4 py-2 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Define variant styles based on the 'variant' prop
  const variantStyles: Record<typeof variant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400",
    outline:
      "bg-transparent hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",
  };

  // Define size styles based on the 'size' prop
  const sizeStyles: Record<typeof size, string> = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
    xl: "text-xl px-8 py-4",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${sizeStyles[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
