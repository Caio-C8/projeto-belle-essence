import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoBagOutline } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faClipboard,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { useAutenticacao } from "../../contexto/AutenticarContexto";

import Categorias from "./Categorias";

const Header = () => {
  const { usuario, logout } = useAutenticacao();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textoBusca, setTextoBusca] = useState("");
  const navigate = useNavigate();

  const realizarBusca = () => {
    if (textoBusca.trim()) {
      navigate(`/pesquisa?pesq=${encodeURIComponent(textoBusca)}`);
    } else {
      navigate("/pesquisa");
    }
  };

  return (
    <>
      <header className="py-3 px-4 border-bottom">
        <div className="container-fluid">
          {/* Desktop & Mobile Row 1 */}
          <div className="row align-items-center">
            <div className="logo col-12 col-md-3 text-center text-md-start mb-2 mb-md-0">
              <Link to={usuario?.tipo === "admin" ? "/adm/" : "/"}>
                <img
                  src="../../src/assets/img/logoBelleEssenceSimplificada.png"
                  alt="Logo Belle Essence Simplificada"
                  style={{ height: "100px" }}
                />
              </Link>
            </div>

            {/* Desktop only: Search + Options */}
            <div className="d-none d-md-flex col-md-6 justify-content-center">
              <div
                className="input-group rounded shadow-sm"
                style={{ maxWidth: "450px" }}
              >
                <input
                  type="text"
                  className="barra-pesquisa form-control border-0"
                  placeholder="Procure por produtos"
                  value={textoBusca}
                  onChange={(e) => setTextoBusca(e.target.value)}
                />
                <button
                  onClick={realizarBusca}
                  className="btn btn-barra-pesquisa input-group-text bg-white border-0"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>

            {usuario?.tipo === "admin" ? (
              <div className="d-none d-md-flex col-md-3 justify-content-end align-items-center gap-4">
                <Link
                  className="d-flex align-items-center"
                  to="#"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="icone-header rotate"
                    rotation={180}
                  />
                </Link>

                <Link className="d-flex align-items-center" to="#">
                  <FontAwesomeIcon
                    icon={faClipboard}
                    className="icone-header"
                    style={{ fontSize: "1.7rem" }}
                  />
                </Link>
              </div>
            ) : (
              <div className="d-none d-md-flex col-md-3 justify-content-end align-items-center gap-4">
                <Link className="d-flex align-items-center" to="/perfil">
                  <FontAwesomeIcon icon={faUser} className="icone-header" />
                </Link>

                <Link
                  className="d-flex align-items-center"
                  to="/lista-favoritos"
                >
                  <FontAwesomeIcon icon={faHeart} className="icone-header" />
                </Link>

                <Link className="d-flex align-items-center" to="/carrinho">
                  <IoBagOutline className="icone-header" size={28} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {usuario?.tipo === "admin" ? <></> : <Categorias />}
    </>
  );
};

export default Header;
