import React, { useRef } from "react";

interface FileUploadProps {
  placeholder: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
  accept?: string;
  ariaLabel: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  placeholder,
  file,
  onChange,
  error,
  disabled = false,
  accept = ".pdf,.doc,.docx",
  ariaLabel,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    onChange(selectedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
          aria-describedby={error ? "file-error" : undefined}
        />
        <button
          type="button"
          onClick={handleClick}
          className={`w-full px-4 py-3 rounded-full border ${
            error ? "border-red-500" : "border-gray-300"
          } bg-white text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file-input-button ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-invalid={!!error}
        >
          <span className={file ? "text-gray-900" : "text-gray-500"}>
            {file ? file.name : placeholder}
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
      </div>
      {error && (
        <p
          id="file-error"
          className="mt-1 text-sm text-red-500 error-message"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
