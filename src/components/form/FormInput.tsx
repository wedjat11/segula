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
          <div className="absolute left-4 lg:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 lg:w-6 lg:h-6 text-primary/60">
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
            icon ? "pl-11 lg:pl-14" : "pl-5 lg:pl-6"
          } pr-5 lg:pr-6 py-4 lg:py-5 text-base lg:text-lg rounded-full border-2 form-input ${
            error ? "border-red-500" : "border-primary/30"
          } bg-white/95 backdrop-blur-sm placeholder:text-gray-400 placeholder:text-base lg:placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300`}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-sm lg:text-base text-red-500 error-message"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
