import React from "react";

interface FormMessageProps {
  type: "success" | "error";
  message: string;
}

export const FormMessage: React.FC<FormMessageProps> = ({ type, message }) => {
  const baseClasses = "mb-6 p-4 rounded-lg";
  const typeClasses =
    type === "success"
      ? "bg-green-100 border border-green-400 text-green-700"
      : "bg-red-100 border border-red-400 text-red-700";

  return (
    <div
      className={`${baseClasses} ${typeClasses}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};
