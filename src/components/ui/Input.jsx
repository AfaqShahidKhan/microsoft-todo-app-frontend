const Input = ({
  name,
  value,
  onChange,
  onSubmit,
  placeholder = "Type here...",
  className = "",
  error,
  type = "text",
  icon = null, // Icon passed dynamically as a prop
  ...rest
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && value?.trim() !== "") {
      onSubmit(value);
    }
  };

  return (
    <div className="relative w-full">
      {/* Conditionally Render Icon Inside the Input */}

      {/* Input Field */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full ${
          icon ? "pl-10" : "pl-4"
        } pr-4 py-2 rounded-md bg-dark text-white focus:outline-none focus:ring-1 focus:ring-gray-500 ${className}`}
        {...rest}
      />
      {icon && (
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
