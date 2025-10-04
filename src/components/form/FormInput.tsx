import React from "react";

interface FormInputProps {
  type: "text" | "email" | "tel";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  icon,
  className = "",
}) => {
  const inputId = `input-${placeholder.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={className}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 rounded-full border form-input ${
            error ? "border-red-500" : "border-gray-300"
          } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-500 error-message"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
