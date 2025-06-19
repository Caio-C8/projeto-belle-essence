import React from "react";

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  inputRef,
  disabled = false,
}) => {
  return (
    <div className={`${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input
        disabled={disabled}
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={inputRef}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
