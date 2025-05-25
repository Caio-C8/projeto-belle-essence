import React, { useEffect } from "react";
import Select from "../../componentes/Campos/Select";
import Input from "../../componentes/Campos/Input";
import InputSenha from "../../componentes/Campos/InputSenha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";

const Modal = ({ titulo, campos, aberto, fechar, salvar }) => {
  useEffect(() => {
    const fecharModalEsc = (e) => {
      if (e.key === "Escape") fechar();
    };
    window.addEventListener("keydown", fecharModalEsc);
    return () => window.removeEventListener("keydown", fecharModalEsc);
  }, [fechar]);

  if (!aberto) return null;

  const fecharModalFundo = (e) => {
    if (e.target.className === "modal-fundo") fechar();
  };

  const vericarCamposESalvar = () => {
    const ignorarCampos = ["complemento", "ponto de referencia"];

    const campoVazio = campos.some((campo) => {
      if (ignorarCampos.includes(campo.name)) return false;

      return (
        campo.value === null || campo.value === "" || campo.value === undefined
      );
    });

    if (campoVazio) {
      return alert("Preencha todos os campos.");
    }

    salvar();
  };

  return (
    <div className="modal-fundo" onClick={fecharModalFundo}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>{titulo}</h2>
          <button onClick={fechar} className="btn-fechar">
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "1.7rem" }} />
          </button>
        </div>
        <form className="modal-body">
          <div className="row g-3">
            {campos.map((campo, index) => {
              if (campo.type === "select") {
                return (
                  <Select
                    key={index}
                    label={campo.label}
                    value={campo.value}
                    onChange={campo.onChange}
                    options={campo.options}
                    className={"col-md-12"}
                  />
                );
              }

              if (campo.type === "password") {
                return (
                  <InputSenha
                    key={index}
                    label={campo.label}
                    placeholder={campo.placeholder}
                    value={campo.value}
                    onChange={campo.onChange}
                    className={"col-md-12"}
                  />
                );
              }

              return (
                <Input
                  key={index}
                  label={campo.label}
                  type={campo.type || "text"}
                  placeholder={campo.placeholder}
                  value={campo.value}
                  onChange={campo.onChange}
                  className={"col-md-12"}
                  inputRef={campo.mask || null}
                />
              );
            })}
          </div>
        </form>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={vericarCamposESalvar}>
            Salvar
          </button>
          <button className="btn btn-cancelar" onClick={fechar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
