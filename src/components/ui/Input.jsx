const Input = ({ name, value, onChange, onSubmit, placeholder = 'Type here...', className = '', error, type = 'text', ...rest }) => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && value?.trim() !== '') {
        onSubmit(value);
      }
    };
  
    return (
      <div className={`flex flex-col ${className}`}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...rest} // Spread the rest of the props (including `register` from react-hook-form)
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  };
  
  export default Input;