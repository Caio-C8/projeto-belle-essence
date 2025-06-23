import React from "react";

const EnderecosEntrega = ({
  enderecos,
  enderecoSelecionado,
  setEnderecoSelecionado,
  cliente,
}) => {
  return (
    <div>
      <h2 className="mb-3">Endereço de Entrega</h2>
      <div>
        <div className="endereco-list">
          {enderecos.map((end) => (
            <div key={end.id_endereco} className="endereco-item mb-3 card ">
              <div className="d-flex gap-3 align-items-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="endereco"
                  id={`endereco-${end.id_endereco}`}
                  checked={enderecoSelecionado === end.id_endereco}
                  onChange={() => setEnderecoSelecionado(end.id_endereco)}
                />
                <label className="form-check-label w-100">
                  <div className="endereco-content">
                    <h6 className="mb-1">
                      {end.logradouro}, {end.numero}
                    </h6>
                    <p className="text-muted mb-0 small">
                      {end.bairro} - CEP {end.cep} - {end.cidade} - {end.estado}
                    </p>
                    <p className="text-muted mb-0 small">
                      {end.tipo} - {cliente.nome} {cliente.sobrenome}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary w-100 mb-5"
          onClick={() => (window.location.href = "/perfil?aba=enderecos")}
        >
          Usar Outro Endereço
        </button>
      </div>
    </div>
  );
};

export default EnderecosEntrega;
