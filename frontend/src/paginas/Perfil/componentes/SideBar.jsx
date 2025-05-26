import React from "react";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faHouse,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Sidebar = ({ pagina, setPagina, logout }) => {
  return (
    <div className="sidebar-menu">
      <button
        className={`menu-item ${pagina === "dados" ? "active" : ""}`}
        onClick={() => setPagina("dados")}
      >
        <FontAwesomeIcon icon={faUser} />
        Seus dados
      </button>

      <button
        className={`menu-item ${pagina === "pedidos" ? "active" : ""}`}
        onClick={() => setPagina("pedidos")}
      >
        <FontAwesomeIcon icon={faTruck} />
        Pedidos
      </button>

      <button
        className={`menu-item ${pagina === "enderecos" ? "active" : ""}`}
        onClick={() => setPagina("enderecos")}
      >
        <FontAwesomeIcon icon={faHouse} />
        Endereços
      </button>

      <button className="menu-item" onClick={() => logout()}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />
        Sair
      </button>
    </div>
  );
};

export default Sidebar;
