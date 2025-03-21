import React from "react";
import "./Header.css";
import Categorias from "../Categorias/Categorias";
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
// import { PiCircleHalfFill } from "react-icons/pi";

const Header = () => {
  return (
    <>
      <header className="header">
        <Link to="/">
          <div className="header__logo">
            <img
              src="src/assets/img/logoBelleEssenceSimplificada.png"
              alt="Logo Belle Essence Simplificada"
              className="header__logo__imagem"
            />
          </div>
        </Link>

        <div className="header__barra-pesquisa">
          <input
            className="header__barra-pesquisa__input"
            type="text"
            placeholder="Procure por produtos"
          />
          <IoIosSearch className="header__barra-pesquisa__icone" />
        </div>

        <div className="header__opcoes">
          {/* Botão para trocar tema (escuro/claro) */}
          {/* <div className="header__opcoes__item">
            <PiCircleHalfFill className="header__opcoes__icone" />
          </div> */}

          <div className="header__opcoes__item">
            <IoPersonOutline className="header__opcoes__icone" />
          </div>

          <div className="header__opcoes__item">
            <IoHeartOutline className="header__opcoes__icone" />
            <span className="header__opcoes__notificacao">0</span>
          </div>

          <div className="header__opcoes__item">
            <IoBagOutline className="header__opcoes__icone" />
            <span className="header__opcoes__notificacao">0</span>
          </div>
        </div>
      </header>

      <Categorias />
    </>
  );
};

export default Header;
