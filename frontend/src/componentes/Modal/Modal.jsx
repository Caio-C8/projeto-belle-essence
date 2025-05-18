import React, { useEffect } from "react";
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
            X
          </button>
        </div>
        <form className="modal-body">
          {campos.map((campo, index) =>
            campo.type === "select" ? (
              <div key={index}>
                <label>{`${campo.label}: `}</label>
                <select value={campo.value} onChange={campo.onChange}>
                  <option value="">Selecione</option>
                  {campo.options?.map((opcao, index) => (
                    <option key={index} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={index}>
                <label>{`${campo.label}: `}</label>
                <input
                  type={campo.type || "text"}
                  placeholder={campo.placeholder}
                  name={campo.name}
                  value={campo.value}
                  onChange={campo.onChange}
                  ref={campo.mask || null}
                  autoComplete="off"
                />
              </div>
            )
          )}
        </form>
        <div className="modal-footer">
          <button onClick={vericarCamposESalvar}>Salvar</button>
          <button onClick={fechar}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
