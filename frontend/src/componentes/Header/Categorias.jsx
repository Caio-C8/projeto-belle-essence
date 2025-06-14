import React from "react";
import "./Categorias.css";
import { Link } from "react-router-dom";
import { useCategorias } from "../../contexto/CategoriasContexto";

const Categorias = () => {
  const { categorias } = useCategorias();

  return (
    <div className="py-4 px-5" style={{ backgroundColor: "#ffb4a2" }}>
      <div className="d-flex justify-content-center align-items-center container-fluid px-0">
        <div className="d-flex flex-nowrap overflow-auto categorias-scroll pb-2">
          {categorias.map((categoria, index) => (
            <div
              key={index}
              className="d-flex align-items-center mx-3 categoria-item text-nowrap"
              role="button"
            >
              <Link to={`/pesquisa/categoria/${categoria.slug}`}>
                <span className="categoria" style={{ fontSize: "1.2rem" }}>
                  {categoria.nomeOriginal}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorias;
