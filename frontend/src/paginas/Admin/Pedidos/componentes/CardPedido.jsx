import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { formatarData } from "../../../../utilidades/formatarData";
import { formatarPreco } from "../../../../utilidades/formatarPreco";
import Select from "../../../../componentes/Campos/Select";

const CardPedido = ({ pedido, onStatusChange }) => {
  const [pedidoAtual, setPedidoAtual] = useState(pedido);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(pedido.status);
  const [originalStatus, setOriginalStatus] = useState(pedido.status);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const handleEditar = () => {
    setOriginalStatus(selectedStatus);
    setIsEditing(true);
  };

  const handleCancelar = () => {
    setSelectedStatus(originalStatus);
    setIsEditing(false);
  };

  const handleSalvar = async () => {
    if (selectedStatus === originalStatus) {
      alert("Altere o status antes de salvar.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/adm/alterar-status-pedido/${pedido.id_pedido}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: selectedStatus }),
        }
      );

      const { mensagem } = await res.json();

      if (res.ok) {
        alert(mensagem || "Status atualizado com sucesso.");
        setIsEditing(false);
        setPedidoAtual({ ...pedidoAtual, status: selectedStatus }); // Atualiza original
        if (onStatusChange) onStatusChange();
      } else {
        alert(mensagem || "Erro ao atualizar status.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro de conexão.");
    }
  };

  const calcularValorTotal = () =>
    pedido.itens.reduce(
      (total, item) => total + item.qtde * item.preco_unitario,
      0
    );

  return (
    <div className="card mb-3 shadow-sm rounded-4 p-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column align-items-start justify-content-center w-100">
            <h3 className="mb-1 fw-semibold">
              Número do pedido: #{pedido.id_pedido}
            </h3>
            <h5 className="mb-1 text-muted">
              Data de realização do pedido: {formatarData(pedido.data_pedido)}
            </h5>
            <h5 className="mb-0 fw-medium">
              Valor total do pedido: {formatarPreco(calcularValorTotal())}
            </h5>
          </div>

          <div className="text-center">
            <h5 className="mb-3 fw-semibold">Status do Pedido</h5>
            <h5
              className="fw-semibold"
              style={{
                color:
                  pedido.status === "Pronto para retirada"
                    ? "#0EA700"
                    : pedido.status === "Realizado"
                    ? "#1c1c1c"
                    : pedido.status === "Aguardando pagamento"
                    ? "#1c1c1c"
                    : pedido.status === "Em separação"
                    ? "#F0DC00"
                    : pedido.status === "Em transporte"
                    ? "#F0DC00"
                    : pedido.status === "Cancelado"
                    ? "#E00000"
                    : "#0EA700",
              }}
            >
              {selectedStatus}
            </h5>
          </div>
        </div>

        {showDetails && (
          <div id="detalhesPedido" className="mt-3">
            <table className="table table-borderless mb-4">
              <tbody>
                {pedido.itens.map((item) => (
                  <tr
                    key={item.id_item_pedido}
                    className="item"
                    style={{ borderBottom: "1px solid #ccc" }}
                  >
                    <td>{`${item.qtde}x ${item.nome_produto}`}</td>
                    <td className="text-end">
                      {formatarPreco(item.preco_unitario * item.qtde)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="fw-bold text-center">Endereço de Entrega</h6>
                <p className="mb-1">
                  {pedido.endereco.logradouro}, {pedido.endereco.numero}
                </p>
                <p className="mb-1">
                  {pedido.endereco.cidade} - {pedido.endereco.estado}
                </p>
                <p className="mb-0">
                  {pedido.endereco.bairro} - CEP {pedido.endereco.cep} -{" "}
                  {pedido.endereco.tipo}
                </p>
              </div>

              <div>
                <h6 className="fw-bold text-center">Dados do Cliente</h6>
                <p className="mb-1">
                  {pedido.cliente.nome} {pedido.cliente.sobrenome}
                </p>
                <p className="mb-1">{pedido.cliente.celular}</p>
                <p className="mb-0">{pedido.cliente.email}</p>
              </div>

              <div className="d-flex flex-column gap-3">
                <Select
                  label="Status do pedido:"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={!isEditing}
                  options={[
                    "Realizado",
                    "Aguardando pagamento",
                    "Em separação",
                    "Em transporte",
                    "Entregue",
                    "Cancelado",
                    "Pronto para retirar",
                  ]}
                />

                {isEditing ? (
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success" onClick={handleSalvar}>
                      Salvar
                    </button>

                    <button className="btn btn-danger" onClick={handleCancelar}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={handleEditar}>
                    Editar Status
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-2">
          <button onClick={toggleDetails} className="show-more-btn">
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`icone-seta ${showDetails ? "rotacionar" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPedido;
