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
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
            {icon}
          </div>
        )}
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-8 py-3 rounded-full border ${
            error ? "border-red-500" : "border-gray-300"
          } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer`}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
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
          className="mt-1 text-sm text-red-500 error-message"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
