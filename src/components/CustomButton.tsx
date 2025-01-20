// Import necessary modules
import React from "react";
import { LucideIcon } from "lucide-react";

// Define the interface for the button's props
interface CustomButtonProps {
  label: string;       // Text displayed on the button
  onClick?: () => void; // Function executed on button click
  className?: string;  // Additional class names for styling
  icon: LucideIcon;    // Icon component displayed in the button
  disabled?: boolean;  // Whether the button is disabled
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className = "",
  icon: Icon,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center font-medium py-2 px-4 rounded
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 transform transition duration-250"}
        ${className}
      `}
      disabled={disabled}
    >
      <Icon className="mr-2" />
      {label}
    </button>
  );
};

export default CustomButton;
