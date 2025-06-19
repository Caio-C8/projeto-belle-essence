import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputSenha = ({ label, placeholder, value, onChange, className }) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className={`${className}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="input-group">
        <input
          type={mostrarSenha ? "text" : "password"}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        <span
          className="input-group-text"
          onClick={() => setMostrarSenha((anterior) => !anterior)}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={mostrarSenha ? faEyeSlash : faEye} />
        </span>
      </div>
    </div>
  );
};

export default InputSenha;
