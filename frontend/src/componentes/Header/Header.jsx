import React, { useState } from "react";
import "./Header.css";
import Categorias from "./Categorias";
import { Link } from "react-router-dom";
import { IoBagOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-light py-3 px-4 border-bottom">
        <div className="container-fluid">
          {/* Desktop & Mobile Row 1 */}
          <div className="row align-items-center">
            <div className="logo col-12 col-md-3 text-center text-md-start mb-2 mb-md-0">
              <Link to="/">
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
                />
                <Link
                  to="/pesquisa"
                  className="btn-barra-pesquisa input-group-text bg-white border-0"
                >
                  <IoIosSearch />
                </Link>
              </div>
            </div>

            <div className="d-none d-md-flex col-md-3 justify-content-end gap-4">
              <Link to="/perfil">
                <IoPersonOutline className="icone-header" size={28} />
              </Link>

              <Link to="/lista-favoritos">
                <IoHeartOutline className="icone-header" size={28} />
              </Link>

              <Link to="/carrinho">
                <IoBagOutline className="icone-header" size={28} />
              </Link>
            </div>

            {/* Mobile only: Menu + Search */}
            <div className="d-flex d-md-none col-12 justify-content-between align-items-center mt-2">
              <button
                className="btn btn-outline-dark"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>

              <div
                className="input-group rounded shadow-sm"
                style={{ maxWidth: "70%" }}
              >
                <input
                  type="text"
                  className="barra-pesquisa form-control border-0"
                  placeholder="Procure por produtos"
                />
                <Link
                  to="/pesquisa"
                  className="btn-barra-pesquisa input-group-text bg-white border-0"
                >
                  <IoIosSearch />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="d-md-none mt-3">
              <ul className="list-group">
                <Link className="item" to="/perfil">
                  <li className="list-group-item d-flex align-items-center">
                    <IoPersonOutline className="me-2" /> Perfil
                  </li>
                </Link>
                <Link className="item" to="/lista-favoritos">
                  <li className="list-group-item d-flex align-items-center">
                    <IoHeartOutline className="me-2" /> Favoritos
                  </li>
                </Link>
                <Link className="item" to="/carrinho">
                  <li className="list-group-item d-flex align-items-center">
                    <IoBagOutline className="me-2" /> Carrinho
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </header>

      <Categorias />
    </>
  );
};

export default Header;
