import React from "react";
import { FiLoader } from "react-icons/fi"; // Loader icon for loading state

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | icon
  size = "md", // sm | md | lg
  isLoading = false,
  disabled = false,
  icon = null,
  iconPosition = "left", // left | right
  className = "",
  ...rest
}) => {
  // Define styles based on variants
  const baseStyles =
    "flex items-center justify-start rounded-md font-semibold transition duration-200 ease-in-out focus:outline-none";

  const variantStyles = {
    primary: "bg-primary text-foreground hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-secondary text-foreground hover:bg-gray-600 focus:ring-gray-400",
    icon: "p-2 text-white rounded-full w-full bg-extragray hover:bg-grays", // For circular icon buttons
  };

  const sizeStyles = {
    sm: "px-2 text-sm",
    md: "px-4 text-base",
    lg: "px-6 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        sizeStyles[size]
      } ${className} ${
        (isLoading || disabled) && "opacity-50 cursor-not-allowed"
      }`}
      {...rest}
    >
      {/* Loading State */}
      {isLoading ? (
        <FiLoader className="animate-spin h-5 w-5" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}

          {children}

          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
