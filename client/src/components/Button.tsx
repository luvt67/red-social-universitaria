import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
    >
      <h1 className="text-lg font-semibold">{label}</h1>
    </div>
  );
};

export default Button;
