import React from "react";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default Checkbox;
