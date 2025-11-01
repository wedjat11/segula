import React from "react";

interface FormTextareaProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  rows = 6,
}) => {
  const textareaId = `textarea-${placeholder.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={className}>
      <div className="relative">
        <textarea
          id={textareaId}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={`w-full px-5 lg:px-6 py-4 lg:py-5 text-base lg:text-lg rounded-3xl border-2 form-input resize-none ${
            error ? "border-red-500" : "border-primary/30"
          } bg-white/95 backdrop-blur-sm placeholder:text-gray-400 placeholder:text-base lg:placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300`}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
        />
      </div>
      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-2 text-sm lg:text-base text-red-500 error-message"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
