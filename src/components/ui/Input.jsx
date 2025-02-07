const Input = ({
  name,
  value,
  onChange,
  onSubmit,
  placeholder = "Type here...",
  className = "",
  error,
  type = "text",
  icon = null,
  iconPosition = "right",
  ...rest
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && value?.trim() !== "") {
      onSubmit(value);
    }
  };

  return (
    <div className="relative w-full">
      {/* Conditionally Render Icon Based on Position */}
      {icon && iconPosition === "left" && (
        <span className="absolute inset-y-0 left-3 flex items-center justify-start">
          {icon}
        </span>
      )}

      {/* Input Field */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full ${
          icon && iconPosition === "left" ? "pl-10" : "pl-4"
        } ${
          icon && iconPosition === "right" ? "pr-10" : "pr-4"
        } py-2 rounded-md text-dark focus:outline-none focus:ring-1 focus:ring-gray-500 ${className}`}
        {...rest}
      />

      {icon && iconPosition === "right" && (
        <span className="absolute inset-y-0 right-3 flex items-center justify-end">
          {icon}
        </span>
      )}

      {/* Error Message */}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
