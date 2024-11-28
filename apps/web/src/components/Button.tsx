import React from "react";

interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const Button = ({ title, type, className, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        className={`lg:mx-0 text-base font-bold bg-steel-blue text-white mt-2 py-4 px-8 rounded-[10px] shadow-custom focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-200 ease-in-out ${className}`}
        type={type}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};
