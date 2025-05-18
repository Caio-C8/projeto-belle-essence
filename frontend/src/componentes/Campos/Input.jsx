import React from "react";

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
  inputRef,
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input
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
