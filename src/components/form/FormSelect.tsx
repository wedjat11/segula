import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  placeholder,
  value,
  onChange,
  options,
  error,
  disabled = false,
  icon,
  className = "",
}) => {
  const selectId = `select-${placeholder.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={className}>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 lg:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 lg:w-6 lg:h-6 text-primary/60">
            {icon}
          </div>
        )}
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${
            icon ? "pl-11 lg:pl-14" : "pl-5 lg:pl-6"
          } pr-10 lg:pr-12 py-4 lg:py-5 text-base lg:text-lg rounded-full border-2 ${
            error ? "border-red-500" : "border-primary/30"
          } bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none cursor-pointer transition-all duration-300 ${
            !value ? "text-gray-400" : "text-gray-900"
          }`}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <option value="" className="text-gray-400">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-4 lg:right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 lg:w-6 lg:h-6 text-primary/60 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-2 text-sm lg:text-base text-red-500 error-message"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
