import React from "react";

const TabelaCaracteristicas = ({ produto }) => {
  const linhas = [
    { label: "Código do produto", valor: produto.codigo_produto },
    { label: "Nome do produto", valor: produto.nome },
    { label: "Marca do produto", valor: produto.marca },
  ];

  if (produto.familia_olfativa) {
    linhas.push({
      label: "Família Olfativa",
      valor: produto.familia_olfativa,
    });
  }

  if (produto.concentracao) {
    linhas.push({
      label: "Concentração",
      valor: produto.concentracao,
    });
  }

  return (
    <div>
      <h3 className="mb-2">Características</h3>
      <div className="tabela-caracteristicas rounded overflow-hidden">
        <table className="table mb-0">
          <tbody>
            {linhas.map((linha, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "linha-par" : "linha-impar"}
              >
                <td className="coluna coluna-esquerda fw-medium">
                  {linha.label}
                </td>
                <td className="coluna">{linha.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaCaracteristicas;
