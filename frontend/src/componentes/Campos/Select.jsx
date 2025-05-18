import React from "react";

const Select = ({ label, value, onChange, options, className }) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <select className="form-select" value={value} onChange={onChange}>
        <option value="" disabled>
          Selecione
        </option>
        {options.map((op, index) => (
          <option key={index} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
